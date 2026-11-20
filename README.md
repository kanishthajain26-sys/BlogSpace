# BlogSpace – Full Stack Blog Application

## About the Project

BlogSpace is a full-stack blog application that allows users to create, read, update, delete, search, and explore blogs.

The application includes user authentication and a personal dashboard where logged-in users can manage their own blogs.

This project was developed as part of my web development learning journey.

## Features

- User Registration and Login
- JWT-Based Authentication
- Protected Dashboard Routes
- Create New Blogs
- View All Blogs
- Edit Existing Blogs
- Delete Blogs
- Search Blogs
- Filter Blogs by Categories
- User Profile
- Personal Blog Dashboard
- Logout Functionality

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Project Structure

```text
BlogSpace/
│
├── index.html
├── style.css
├── script.js
│
├── pages/
│   ├── auth.css
│   ├── register.html
│   ├── login.html
│   ├── auth.js
│   ├── dashboard.html
│   ├── dashboard.js
│   ├── create-blog.html
│   ├── blog.js
│   └── blog-details.html
│
└── server/
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── User.js
    │   └── Blog.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── blogRoutes.js
    ├── .env
    ├── package.json
    └── server.js
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kanishthajain26-sys/BlogSpace.git
```

### 2. Open the Project

```bash
cd BlogSpace
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the server folder.

Add your own MongoDB connection string and JWT secret using the variable names expected by the backend configuration.

Never upload your actual `.env` file or database credentials to GitHub.

### 5. Start the Backend

```bash
node server.js
```

### 6. Run the Frontend

Open the frontend `index.html` file using VS Code Live Server.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login a user |
| GET | `/api/auth/profile` | Get user profile |

### Blogs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs/my-blogs` | Get user's blogs |
| POST | `/api/blogs` | Create a blog |
| GET | `/api/blogs/:id` | Get blog details |
| PUT | `/api/blogs/:id` | Update a blog |
| DELETE | `/api/blogs/:id` | Delete a blog |

## GitHub Repository

[BlogSpace – GitHub](https://github.com/kanishthajain26-sys/BlogSpace)

## Future Improvements

- Further UI and accessibility improvements
- Production deployment
- Additional testing and bug fixes

## Learning Outcomes

Through this project, I gained practical experience in:

- Frontend and backend integration
- REST API development
- MongoDB database operations
- JWT authentication
- CRUD operations
- Responsive web design
- Git and GitHub

---

**Developed with dedication as part of my Full Stack Web Development learning journey.**
