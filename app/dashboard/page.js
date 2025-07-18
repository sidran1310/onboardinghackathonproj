'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext.js';
import { getTasksForUser, getCompletedTasks, markTaskCompleted, markTaskNotCompleted } from '../../services/taskService.js';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [completedTaskIds, setCompletedTaskIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser, userData, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        // Get tasks for the user
        const tasksResult = await getTasksForUser(currentUser.uid);
        
        if (tasksResult.error) {
          setError(tasksResult.error);
          return;
        }
        
        // Get completed tasks
        const completedResult = await getCompletedTasks(currentUser.uid);
        
        if (completedResult.error) {
          setError(completedResult.error);
          return;
        }
        
        setTasks(tasksResult.tasks || []);
        setCompletedTaskIds(completedResult.completedTasks || []);
      } catch (error) {
        setError('Failed to fetch tasks');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentUser, router]);

  const handleToggleTask = async (taskId, isCompleted) => {
    try {
      if (isCompleted) {
        await markTaskNotCompleted(currentUser.uid, taskId);
        setCompletedTaskIds(completedTaskIds.filter(id => id !== taskId));
      } else {
        await markTaskCompleted(currentUser.uid, taskId);
        setCompletedTaskIds([...completedTaskIds, taskId]);
      }
    } catch (error) {
      setError('Failed to update task status');
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      setError('Failed to log out');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Dashboard</h1>
          <div>
            {userData && (
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium">{userData.role}</span> | {userData.department} | {userData.level}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold mb-4">Your Onboarding Checklist</h2>
          
          {tasks.length === 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
              No tasks found for your role, department, and level.
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {tasks.map((task) => {
                  const isCompleted = completedTaskIds.includes(task.id);
                  
                  return (
                    <li key={task.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id={`task-${task.id}`}
                              name={`task-${task.id}`}
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              checked={isCompleted}
                              onChange={() => handleToggleTask(task.id, isCompleted)}
                            />
                            <label
                              htmlFor={`task-${task.id}`}
                              className={`ml-3 block text-sm font-medium ${
                                isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'
                              }`}
                            >
                              {task.title}
                            </label>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {task.category}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className={`flex items-center text-sm ${
                              isCompleted ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {task.description}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              Estimated time: {task.estimatedTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}