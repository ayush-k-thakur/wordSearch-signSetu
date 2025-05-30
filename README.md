# WORD-SEARCH

A full-stack MERN application for searching, adding, editing, and deleting words with definitions, images, and videos.

## Features

- Search for words and view their definitions
- Add new words with optional image and video URLs
- Edit or delete existing words
- Pagination and search filtering
- Responsive UI with React, Tailwind CSS, and DaisyUI

## Folder Structure

```
.
├── backend/      # Express.js API and MongoDB models
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/     # React app (Vite, Tailwind, DaisyUI)
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Atlas or local)

### Backend Setup

1. `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB URI and port:
   ```
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   ```
4. Start the server: `npm start`

### Frontend Setup

1. `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Endpoints

- `GET /api/words` - Get all words
- `GET /api/words/:query` - Get a word by query
- `POST /api/words` - Add a new word
- `PUT /api/words/:id` - Update a word
- `DELETE /api/words/:id` - Delete a word
