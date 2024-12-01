# Quiz App

A dynamic and engaging Quiz App that challenges users with various quizzes. Built using Next.js, React, and Tailwind CSS, this app provides a smooth and interactive experience for users to test their knowledge.

## Screenshots

![App Screenshot](public/assets/images/qa1)
![App Screenshot](public/assets/images/qa2)
![App Screenshot](public/assets/images/qa3)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Responsive and visually appealing design.
- Variety of quiz topics for users to explore.
- Smooth and dynamic UI with animations.
- User authentication with Clerk (or another authentication provider).
- Progress tracking and score display.

## Technologies Used
- [Next.js](https://nextjs.org/) - React framework for server-rendered applications.
- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
- [Clerk](https://clerk.dev/) - Authentication and user management for React applications.


## API

This project uses https://opentdb.com/ to fetch quiz questions.
## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/lokajaya1/quiz-app.git
   cd quiz-app
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Set up environment variables:
Create a .env.local file at the root of your project and add necessary environment variables for Clerk or other services you are using:
   ```bash
   NEXT_PUBLIC_CLERK_API=<your-clerk-api>
   ```
2. Run the development server:
   ```bash
   npm run dev

3.	Open http://localhost:3000 to view the app in your browser.
