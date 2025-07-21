# Lendsqr Frontend Assessment

This project is a frontend implementation of the Lendsqr web application, built using React, TypeScript, and SCSS. It was created as part of an assessment to evaluate intermediate-to-senior-level frontend engineering skills.

The goal was to reproduce a given Figma design as closely as possible while meeting specific technical requirements such as data fetching, routing, storage, and responsiveness.


🔗 Live Demo
[Click here to view the deployed app]()


📁 Pages Implemented

- **Login Page** – Users can log in to access the app
- **Dashboard Page** – Displays summary cards and navigation
- **User Page** – Lists 500 users fetched from a mock API
- **User Details Page** – Shows user info stored using localStorage


🛠 Tech Stack

- **React** – Component-based frontend development
- **TypeScript** – Type safety and better tooling
- **SCSS** – Clean and maintainable styles
- **Mocky.io** – Used to host mock API data
- **LocalStorage** – Stores selected user data for quick access
- **React Router** – For navigating between pages


📦 Features

- Pixel-perfect match to the provided Figma design
- All icons exported directly from Figma and used in the app
- User list dynamically fetched from a mock API with 500 entries
- User details are saved to and retrieved from localStorage
- Fully mobile responsive layout
- Logout functionality implemented by clicking the profile avatar


📡 Mock API

Mock data was generated using [mocky.io](https://mocky.io). A JSON array with 500 user records is fetched from a public URL and used to populate the user list.


 🚀 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/lendsqr-assessment.git

# Navigate to the project directory
cd lendsqr-assessment

# Install dependencies
npm install

# Run the app
npm run dev
