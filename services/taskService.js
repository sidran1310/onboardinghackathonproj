import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  query, 
  where, 
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../firebase/config.js';

// Get tasks based on user role, department, and level
export const getTasksForUser = async (userId) => {
  try {
    // Get user data
    const userDoc = await getDoc(doc(db, "users", userId));
    
    if (!userDoc.exists()) {
      return { error: "User not found" };
    }
    
    const userData = userDoc.data();
    const { role, department, level } = userData;
    
    // Query tasks based on user attributes
    const tasksQuery = query(
      collection(db, "tasks"),
      where("applicableRoles", "array-contains", role)
    );
    
    const taskSnapshot = await getDocs(tasksQuery);
    
    // Filter tasks by department and level
    const tasks = [];
    taskSnapshot.forEach((doc) => {
      const taskData = doc.data();
      
      // Check if task applies to this department
      const departmentMatch = taskData.applicableDepartments.includes(department);
      
      // Check if task applies to this level
      const levelMatch = taskData.applicableLevels.includes(level);
      
      if (departmentMatch && levelMatch) {
        tasks.push({
          id: doc.id,
          ...taskData
        });
      }
    });
    
    return { tasks };
  } catch (error) {
    return { error };
  }
};

// Mark a task as completed
export const markTaskCompleted = async (userId, taskId) => {
  try {
    const userTasksRef = doc(db, "userTasks", userId);
    const userTasksDoc = await getDoc(userTasksRef);
    
    if (userTasksDoc.exists()) {
      // Update existing document
      await updateDoc(userTasksRef, {
        completedTasks: arrayUnion(taskId),
        updatedAt: new Date()
      });
    } else {
      // Create new document
      await setDoc(userTasksRef, {
        completedTasks: [taskId],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Mark a task as not completed
export const markTaskNotCompleted = async (userId, taskId) => {
  try {
    const userTasksRef = doc(db, "userTasks", userId);
    const userTasksDoc = await getDoc(userTasksRef);
    
    if (userTasksDoc.exists()) {
      await updateDoc(userTasksRef, {
        completedTasks: arrayRemove(taskId),
        updatedAt: new Date()
      });
      return { success: true };
    }
    
    return { error: "User tasks not found" };
  } catch (error) {
    return { error };
  }
};

// Get completed tasks for a user
export const getCompletedTasks = async (userId) => {
  try {
    const userTasksRef = doc(db, "userTasks", userId);
    const userTasksDoc = await getDoc(userTasksRef);
    
    if (userTasksDoc.exists()) {
      return { completedTasks: userTasksDoc.data().completedTasks || [] };
    }
    
    return { completedTasks: [] };
  } catch (error) {
    return { error };
  }
};