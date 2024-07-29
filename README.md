# Workout Planning Web Application

This is a workout planning web application that allows users to register, log in, record personal information, set workout goals, and generate weekly workout plans. The application is built using TypeScript, Next.js, Tailwind CSS, and MongoDB. It also uses an LLM provider to generate workout goals based on user input.

## Documentation

- [Netxjs version 14](https://nextjs.org/learn-pages-router/basics/create-nextjs-app/setup)
- [Tailwind](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/docs/storage?hl=th)
- [PDF-lip](https://www.npmjs.com/package/pdf-lib/v/1.3.1)
- [Mongose](https://mongoosejs.com/)
- [LLM Provider - openai](https://platform.openai.com/docs/concepts)





## Features

- User registration with email and password
- User login with registered credentials
- Dashboard with a 3-step form to record personal information, workout goals, and generate weekly workout plans
- Dynamic inputs for weekly activities
- Integration with an LLM provider to suggest workout goals
- Streamed response from LLM provider for real-time feedback
- Ability to save or regenerate workout plans to pdf
- View list of saved plans on the dashboard
- User logout functionality

## Technologies

- TypeScript
- Next.js
- Tailwind CSS
- MongoDB
- Firebase
- LLM provider for workout goal generation ( openai)

## Prerequisites

- Node.js (v14.x or higher)
- Yarn (v1.x or higher)
- MongoDB (local or MongoDB Atlas)
- Firebase account for get credentials key
- LLM provider account for get credentials key


## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HeyzzWatcharin/workout-planning-app.git

   cd workout-planning-app 

2. Setup credentials:
Create a .env.local file in the root directory and add the following variables:
   ```bash
   - MongoDB
   MONGODB_URI=<your_mongodb_connection_string>

   - Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=<your_firebase_api_key>
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_firebase_project_id>
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
   NEXT_PUBLIC_FIREBASE_APP_ID=<your_firebase_app_id>
   
   - LLM provider
   LLM_API_KEY=<your_llm_api_key>
   ```
You can get the Firebase credentials from the Firebase console. Go to project settings, scroll down to the "Your apps" section, and copy the Firebase config values to your .env file.

3. Install dependencies:
```bash
yarn install
```

4. Run repository
```bash
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

## How to Use
1. Register:
- If you don't have an account?. go to the registration page and create a new account using your email and password.

2. Login:
- Log in with your registered email and password.

3. Complete the 3-step form:
- Fill out the personal information form.
- Select workout goals suggested by the LLM provider.
- Generate or save your weekly workout plan.

4. View Plans:
- On the dashboard, you can see the list of your saved workout plans. Click on a plan to view the details.
