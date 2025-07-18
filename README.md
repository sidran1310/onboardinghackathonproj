# Onboarding Portal

A platform where new team members receive personalized onboarding checklists based on role, department, and level.

## Tech Stack
- Next.js
- Firebase (Authentication & Firestore)
- Tailwind CSS

## Setup Instructions

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Firebase account access

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd onboarding-portal
```

2. Install dependencies
```bash
npm install
```

3. Firebase Setup
- Ensure you have access to the Firebase project: `onboarding-portal-df83e`
- The Firebase configuration is already set up in `firebase/config.js`

4. Populate the database with sample tasks
```bash
npm run setup-db
```

5. Start the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

- `/app` - Next.js app directory with pages and routes
- `/firebase` - Firebase configuration
- `/services` - Firebase service functions (auth, tasks)
- `/contexts` - React context providers
- `/scripts` - Database setup scripts

### API Routes

- `/api/auth/register` - Register new users
- `/api/auth/login` - User login
- `/api/tasks` - Get tasks for current user
- `/api/tasks/complete` - Mark tasks as completed

### Authentication

The app uses Firebase Authentication with email/password. Users need to register with:
- Email
- Password
- Role (developer, designer, manager, admin)
- Department (engineering, design, product, marketing, sales, hr)
- Level (entry, mid, senior, lead)

### Database Structure

Firestore collections:
- `users` - User profiles with role, department, and level
- `tasks` - Onboarding tasks with applicability criteria
- `userTasks` - Tracks completed tasks for each user
