# Sharing Guide for Onboarding Portal

## Option 1: Share via Git Repository

1. Create a new repository on GitHub, GitLab, or your preferred Git hosting service
2. Initialize Git in your local project (if not already done):
   ```bash
   cd /Users/pranavdubey/onboarding-portal
   git init
   git add .
   git commit -m "Initial commit with backend implementation"
   ```
3. Add the remote repository and push:
   ```bash
   git remote add origin <repository-url>
   git push -u origin main
   ```
4. Share the repository URL with your teammates

## Option 2: Share via ZIP Archive

1. Create a ZIP archive of the project:
   ```bash
   cd /Users/pranavdubey
   zip -r onboarding-portal.zip onboarding-portal -x "onboarding-portal/node_modules/*" "onboarding-portal/.next/*"
   ```
2. Share the ZIP file via email, file sharing service, or team collaboration tool

## Firebase Access

Ensure your teammates have access to the Firebase project:

1. Go to the Firebase Console: https://console.firebase.google.com/project/onboarding-portal-df83e
2. Click on "Settings" (gear icon) > "Project settings" > "Users and permissions"
3. Click "Add member" and enter your teammate's email address
4. Select appropriate permissions (Editor or Viewer)
5. Click "Add member"

## Important Notes for Teammates

1. Make sure they read the README.md file for setup instructions
2. Direct frontend developers to the API_DOCUMENTATION.md file
3. Remind them to run `npm run setup-db` after installation to populate the database
4. The basic UI components are already implemented but can be enhanced:
   - Login page
   - Registration page
   - Dashboard with task list

## Collaboration Tips

1. Agree on coding standards and Git workflow
2. Use feature branches for new frontend components
3. Consider setting up a project management tool (Trello, Jira, etc.)
4. Schedule regular sync-ups to discuss progress and challenges