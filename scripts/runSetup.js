// This is a Node.js script to run the database setup
import { setupDatabase } from './setupDatabase.js';

console.log('Starting database setup...');
setupDatabase()
  .then(result => {
    if (result.success) {
      console.log('Database setup completed successfully!');
    } else {
      console.error('Database setup failed:', result.error);
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('Error running setup:', error);
    process.exit(1);
  });