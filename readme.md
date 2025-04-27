# Bug/Issue Tracker System

## 📖 Overview
The **Bug Tracker System** is a web-based application designed to help teams manage and track Bugs, bugs, and tasks efficiently. It provides features for creating, assigning, and resolving tickets, along with user role management, comments, and file attachments.

---

## 🚀 Features
### 🧑‍💼 User Roles
- **Admin**: Full control over the system, including user management and ticket assignments.
- **Developer**: Can work on assigned tickets, update statuses, and add comments.
- **QA/Tester**: Can report bugs, add comments, and verify fixes.
- **Manager**: Can oversee tickets and assign tasks to team members.

### 🐞 Ticket Management
- Create, update, and delete tickets.
- Assign tickets to developers.
- Track ticket statuses: `Open`, `In Progress`, `Resolved`, `Closed`, `Cancelled`.
- Prioritize tickets: `Low`, `Medium`, `High`, `Critical`.

### 💬 Comments
- Add comments to tickets for better collaboration.
- Edit and delete comments with proper authorization.

### 📂 Attachments
- Upload files and screenshots related to tickets or comments.
- Manage attachments with ticket and comment associations.

### 🔒 Authentication & Authorization
- Secure login and signup with JWT.
- Role-based access control (RBAC) for different user actions.

### 📊 Activity Tracking
- Log ticket activities such as creation, status changes, comments, and attachments.

---

## 🛠️ Tech Stack
| Technology         | Purpose                              |
|--------------------|--------------------------------------|
| **Node.js**        | Backend runtime                     |
| **Express**        | Web framework                       |
| **Sequelize**      | ORM for database interaction        |
| **SQLite**         | Database for development and testing|
| **JWT**            | Authentication and session management|
| **Multer**         | File upload handling                |
| **Jest**           | Unit testing framework              |

---

## 📂 Folder Structure
```plaintext
/issueTrackerSystem
  ├── controllers/       # Business logic for routes
  ├── db/                # Database initialization and seed files
  ├── helpers/           # Utility functions
  ├── middlewares/       # Middleware for authentication, rate limiting, etc.
  ├── models/            # Sequelize models for database tables
  ├── routers/           # API route definitions
  ├── test/              # Unit tests
  ├── uploads/           # Uploaded files
  ├── .env               # Environment variables
  ├── app.js             # Express app setup
  ├── server.js          # Server entry point
```

---

## 📜 API Endpoints
### User Routes
- **POST** `/api/v1/users/signup` - Register a new user.
- **POST** `/api/v1/users/login` - Login and get a token.
- **GET** `/api/v1/users/data` - Get all users (Admin only).
- **GET** `/api/v1/users/data/:id` - Get user by ID.
- **PUT** `/api/v1/users/update/:id` - Update user by ID.
- **DELETE** `/api/v1/users/delete/:id` - Delete user by ID.

### Ticket Routes
- **POST** `/api/v1/ticket/create` - Create a new ticket.
- **GET** `/api/v1/ticket/data` - Get all tickets.
- **GET** `/api/v1/ticket/data/:id` - Get ticket by ID.
- **GET** `/api/v1/ticket/unassigned` - Get unassigned tickets.
- **PUT** `/api/v1/ticket/update/:id` - Update ticket by ID.

### Ticket Assignment Routes
- **GET** `/api/v1/ticket_assignment/create?ticketId=1` - Assign a ticket to a user.
- **GET** `/api/v1/ticket_assignment/my_assigned_tickets` - Get tickets assigned to the logged-in user.
- **PUT** `/api/v1/ticket_assignment/update/status/:ticketId` - Update ticket status.
- **DELETE** `/api/v1/ticket_assignment/delete/:ticketAssignmentId` - Delete a ticket assignment.

### Comment Routes
- **POST** `/api/v1/comment/:ticketId/comments` - Add a comment to a ticket.
- **GET** `/api/v1/comment/data` - Get all comments.
- **GET** `/api/v1/comment/extract` - Extract comment data with related ticket and user details.
- **PUT** `/api/v1/comment/edit/:commentId` - Edit a comment.
- **DELETE** `/api/v1/comment/delete/:commentId` - Delete a comment.

### Attachment Routes
- **POST** `/api/v1/attachment/:ticketId/attachments/comment/:commentId` - Upload attachments.
- **GET** `/api/v1/attachment/data` - Get all attachments.
- **GET** `/api/v1/attachment/data/:ticketId/:commentId` - Get attachments by ticket and comment ID.
- **DELETE** `/api/v1/attachment/delete/:attachmentId` - Delete an attachment.

---

## 🗄️ Database Models
### User
| Field       | Type       | Description                  |
|-------------|------------|------------------------------|
| `id`        | Integer    | Primary key                  |
| `name`      | String     | User's name                  |
| `email`     | String     | Unique email address         |
| `password`  | String     | Hashed password              |
| `role`      | Enum       | Role: `developer`, `admin`, etc. |

### Ticket
| Field         | Type       | Description                  |
|---------------|------------|------------------------------|
| `id`          | Integer    | Primary key                  |
| `title`       | String     | Ticket title                 |
| `description` | String     | Detailed description         |
| `status`      | Enum       | `open`, `in_progress`, etc.  |
| `priority`    | Enum       | `low`, `medium`, `high`, etc.|

### Comment
| Field       | Type       | Description                  |
|-------------|------------|------------------------------|
| `id`        | Integer    | Primary key                  |
| `comment`   | String     | Comment text                 |
| `ticketId`  | Integer    | Associated ticket ID         |
| `userId`    | Integer    | User who made the comment    |

---

## 🔧 Environment Variables
Add the following variables to your `.env` file:
```properties
NODE_ENV=development
DB_DIALECT=sqlite
DB_STORAGE=../database/dev.sqlite
PORT=5000
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 🚀 Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/issue-tracker-system.git
cd issue-tracker-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed the Database
- Development:
  ```bash
  npm run seed:dev
  ```
- Testing:
  ```bash
  npm run seed:test
  ```

### 4. Start the Server
```bash
npm run dev
```

---

## 🧪 Running Tests
Run unit tests using Jest:
```bash
npm test
```

---

## 🧠 Future Enhancements
- Add real-time notifications using WebSockets.
- Implement advanced search and filtering for tickets.
- Add analytics and reporting dashboards.
- Integrate third-party tools like Slack or email notifications.

---

## 📝 License
This project is licensed under the MIT License.