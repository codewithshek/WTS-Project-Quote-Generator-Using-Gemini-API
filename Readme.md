# AI Quote Generator - Web Technologies Lab Project


## 1. Project Overview

This project is a dynamic, full-stack web application designed to generate unique and inspiring quotes using the power of Google's Gemini generative AI. The application provides users with two primary functions:

- Fetching a random, non-repeating quote at the click of a button.
- Generating a custom quote based on a user-provided emotion or mood.

The core of this project lies in its **client-server architecture**. A clean, responsive frontend built with **HTML** and **Bootstrap** communicates with a robust **Node.js backend**, which securely handles all interactions with the Gemini API. This ensures that API keys are not exposed on the client side and allows for logic to prevent the repetition of quotes.

---

## 2. Features

- **Random Quote Generation:** A single click fetches a unique, inspiring quote.
- **Emotion-Based Quotes:** Users can input a feeling (e.g., "happy," "motivated," "curious"), and the AI will generate a tailored quote to match that emotion.
- **Uniqueness Guaranteed:** The server maintains a record of all quotes generated during a session to ensure that the user never sees the same quote twice.
- **Responsive Design:** The user interface is built with Bootstrap, ensuring a seamless experience on devices of all sizes, from desktops to mobile phones.
- **Secure API Integration:** All API calls are handled by the Node.js server, protecting the Gemini API key from being exposed in the browser.

---

## 3. Technologies Used

### Frontend

- HTML5
- Bootstrap 5 (for styling and responsiveness)
- JavaScript (for DOM manipulation and API requests)

### Backend

- Node.js (as the runtime environment)
- Express.js (for creating the server and API endpoints)

### API

- Google Gemini API (for AI-powered content generation)

### Node.js Packages

- `express`: Web application framework
- `cors`: To enable Cross-Origin Resource Sharing
- `node-fetch`: To make HTTP requests from the Node.js server to the Gemini API

---

## 4. Project Structure

The project is organized with a clear separation between the server-side logic and the client-side files.

```
quote-generator/
├── public/
│   └── index.html      # The main frontend file
├── node_modules/       # Directory for all installed packages
├── package.json        # Lists project dependencies and scripts
├── package-lock.json   # Records exact versions of dependencies
└── server.js           # The backend server logic

```

---

## 5. Setup and Installation Guide

### Prerequisites

- Ensure you have **Node.js** installed on your computer. This will also install **npm** (Node Package Manager).

### Steps

1. **Download Files:** Place all the project files (`server.js`, `package.json`, and the `public` folder containing `index.html`) into a single project directory.
2. **Install Dependencies:** Open a terminal or command prompt, navigate to your project directory, and run:

   ```bash
   npm install

   ```

3. **Add API Key:**
   - Open the `server.js` file in a code editor.
   - Locate the line:
     ```js
     const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
     ```
   - Replace `"YOUR_GEMINI_API_KEY"` with your actual Google Gemini API key.

---

## 6. Running the Application

1. **Start the Server:** In your terminal, from the project's root directory, run:

   ```bash
   npm start
   ```

2. **Confirmation:** You should see a confirmation message in the terminal:

   ```
   Server is running on http://localhost:3000
   ```

3. **View in Browser:** Open your web browser and navigate to:

   ```
   http://localhost:3000
   ```

🎉 The **AI Quote Generator** application will now be live and ready to use!
