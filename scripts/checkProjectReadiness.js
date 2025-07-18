import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('Checking project readiness for sharing...\n');

// Check for essential files
const essentialFiles = [
  'firebase/config.js',
  'services/authService.js',
  'services/taskService.js',
  'contexts/AuthContext.js',
  'app/login/page.js',
  'app/register/page.js',
  'app/dashboard/page.js',
  'README.md',
  'API_DOCUMENTATION.md'
];

let allFilesExist = true;

essentialFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} is missing`);
    allFilesExist = false;
  }
});

// Check for node_modules (should be excluded from sharing)
const nodeModulesPath = path.join(projectRoot, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('\n⚠️  node_modules directory exists - remember to exclude it when sharing');
}

// Check for .next directory (should be excluded from sharing)
const nextBuildPath = path.join(projectRoot, '.next');
if (fs.existsSync(nextBuildPath)) {
  console.log('⚠️  .next directory exists - remember to exclude it when sharing');
}

console.log('\n' + (allFilesExist ? 
  '✅ Project is ready to be shared! See SHARING_GUIDE.md for instructions.' : 
  '❌ Some essential files are missing. Please check the errors above.'));