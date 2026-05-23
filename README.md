# DocAppoint - Doctor Appointment Booking System

**Live Website:** [App URL](https://assingment9-frontend-deploy.onrender.com)

DocAppoint is a modern, responsive, full-stack Doctor Appointment Booking System designed to help patients find top-rated doctors and manage their medical appointments efficiently.

## Key Features

*   **Seamless Appointment Booking**: Easily browse all top-rated doctors and book appointments through an intuitive interface.
*   **Secure Authentication**: Fully functional JWT-based authentication system featuring explicit Email/Password registration with strict security rules, alongside one-click Google Social Login.
*   **Comprehensive Private Dashboard**: Logged-in users have access to a private dashboard where they can manage (update/delete) their bookings and edit their profile instantly.
*   **Real-time Search & Filtering**: Instantly search for specific doctors by their names using our optimized search feature on the All Appointments page.
*   **Reliable User Experience**: The single-page application guarantees that authenticated users stay logged in even on page reloads, without being awkwardly redirected to the login page.

## Tech Stack

*   **Frontend**: React, React Router Dom, TailwindCSS, React-Helmet-Async, Swiper.js, Lucide React
*   **Backend**: Node.js, Express, Mongoose (MongoDB), JSONWebToken (JWT), BcryptJS
*   **Authentication**: Firebase Auth (Google Provider), Backend Custom JWT verification

## Setup Instructions

To run this application, ensure you add the following Environment variables to your environment:

1.  `MONGODB_URI`: Your MongoDB database connection string.
2.  `JWT_SECRET`: A secure secret key for generating your JWT tokens.
3.  `VITE_FIREBASE_API_KEY`: Firebase web configuration api key.
4.  `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain.
5.  `VITE_FIREBASE_PROJECT_ID`: Firebase project ID.
6.  `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket.
7.  `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID.
8.  `VITE_FIREBASE_APP_ID`: Firebase application ID.

*Note: Once MongoDB is connected, the app will automatically seed 5 robust dummy doctors into the database to allow immediate testing!*
