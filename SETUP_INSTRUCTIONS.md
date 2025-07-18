# Onboarding Portal Setup Instructions

## Enable Firestore in Firebase Console

You need to enable the Firestore API for your project. Follow these steps:

1. Go to the Firebase Console: https://console.firebase.google.com/
2. Select your project: `onboarding-portal-df83e`
3. In the left sidebar, click on **Firestore Database**
4. Click **Create database**
5. Choose either **Production mode** or **Test mode** (Test mode is easier for development)
6. Select a location closest to your users
7. Click **Enable**

## Enable Firebase Authentication

1. In the Firebase Console, click on **Authentication** in the left sidebar
2. Click **Get started**
3. Enable the **Email/Password** provider by clicking on it and toggling the switch
4. Click **Save**

## After Enabling Services

Once you've enabled both Firestore and Authentication, run the database setup script again:

```bash
npm run setup-db
```

## Start the Development Server

```bash
npm run dev
```

Access your application at: http://localhost:3000