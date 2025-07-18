import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';

// Function to check if Firestore is accessible
const checkFirestore = async () => {
  try {
    console.log('Checking Firestore connection...');
    const querySnapshot = await getDocs(collection(db, 'test-collection'));
    console.log('✅ Firestore is properly configured and accessible!');
    return true;
  } catch (error) {
    console.error('❌ Error accessing Firestore:', error.message);
    
    if (error.code === 'permission-denied') {
      console.error('\n⚠️ FIRESTORE API NOT ENABLED!');
      console.error('Please enable the Firestore API by visiting:');
      console.error('https://console.firebase.google.com/project/onboarding-portal-df83e/firestore');
      console.error('\nSee SETUP_INSTRUCTIONS.md for detailed steps.\n');
    }
    
    return false;
  }
};

// Run the check
checkFirestore();