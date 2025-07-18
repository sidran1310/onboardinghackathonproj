import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';

// Sample tasks for different roles, departments, and levels
const sampleTasks = [
  {
    id: 'task1',
    title: 'Complete HR paperwork',
    description: 'Fill out all required HR forms including tax documents and benefits enrollment.',
    applicableRoles: ['developer', 'designer', 'manager', 'admin'],
    applicableDepartments: ['engineering', 'design', 'product', 'marketing', 'sales', 'hr'],
    applicableLevels: ['entry', 'mid', 'senior', 'lead'],
    estimatedTime: '1 hour',
    category: 'administrative'
  },
  {
    id: 'task2',
    title: 'Set up development environment',
    description: 'Install required software and tools for your development work.',
    applicableRoles: ['developer'],
    applicableDepartments: ['engineering'],
    applicableLevels: ['entry', 'mid', 'senior', 'lead'],
    estimatedTime: '4 hours',
    category: 'technical'
  },
  {
    id: 'task3',
    title: 'Review company policies',
    description: 'Read through the company handbook and policies.',
    applicableRoles: ['developer', 'designer', 'manager', 'admin'],
    applicableDepartments: ['engineering', 'design', 'product', 'marketing', 'sales', 'hr'],
    applicableLevels: ['entry', 'mid', 'senior', 'lead'],
    estimatedTime: '2 hours',
    category: 'administrative'
  },
  {
    id: 'task4',
    title: 'Meet with team members',
    description: 'Schedule 1:1 meetings with all team members.',
    applicableRoles: ['developer', 'designer', 'manager', 'admin'],
    applicableDepartments: ['engineering', 'design', 'product', 'marketing', 'sales', 'hr'],
    applicableLevels: ['entry', 'mid', 'senior', 'lead'],
    estimatedTime: '3 hours',
    category: 'social'
  },
  {
    id: 'task5',
    title: 'Complete design tools training',
    description: 'Go through the training for design tools used by the company.',
    applicableRoles: ['designer'],
    applicableDepartments: ['design'],
    applicableLevels: ['entry', 'mid', 'senior', 'lead'],
    estimatedTime: '8 hours',
    category: 'technical'
  },
  {
    id: 'task6',
    title: 'Set up project management tools',
    description: 'Get access and learn how to use the project management tools.',
    applicableRoles: ['developer', 'designer', 'manager', 'admin'],
    applicableDepartments: ['engineering', 'design', 'product', 'marketing', 'sales'],
    applicableLevels: ['entry', 'mid', 'senior', 'lead'],
    estimatedTime: '2 hours',
    category: 'technical'
  },
  {
    id: 'task7',
    title: 'Review current projects',
    description: 'Get familiar with ongoing projects and their status.',
    applicableRoles: ['developer', 'designer', 'manager'],
    applicableDepartments: ['engineering', 'design', 'product'],
    applicableLevels: ['mid', 'senior', 'lead'],
    estimatedTime: '4 hours',
    category: 'work'
  },
  {
    id: 'task8',
    title: 'Set up team leadership training',
    description: 'Schedule and complete leadership training sessions.',
    applicableRoles: ['manager'],
    applicableDepartments: ['engineering', 'design', 'product', 'marketing', 'sales', 'hr'],
    applicableLevels: ['lead'],
    estimatedTime: '8 hours',
    category: 'training'
  }
];

// Function to set up the database with sample tasks
export const setupDatabase = async () => {
  try {
    // Add each task to the tasks collection
    for (const task of sampleTasks) {
      await setDoc(doc(db, 'tasks', task.id), task);
    }
    
    console.log('Database setup completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error setting up database:', error);
    
    if (error.code === 'permission-denied') {
      console.error('\n\nFIRESTORE API NOT ENABLED!\n');
      console.error('Please enable the Firestore API by visiting:');
      console.error('https://console.firebase.google.com/project/onboarding-portal-df83e/firestore');
      console.error('\nSee SETUP_INSTRUCTIONS.md for detailed steps.\n');
    }
    
    return { error };
  }
};

// Run the setup function
setupDatabase();