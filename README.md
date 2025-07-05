# Real-time Chat Application

A modern real-time chat application built with React, Redux Toolkit, and Socket.io. This application provides secure authentication, real-time messaging, and conversation management capabilities.

## Features

- 🔐 **Authentication System**: Secure user registration and login
- 💬 **Real-time Messaging**: Instant message delivery using Socket.io
- 📝 **Conversation Management**: Create and manage conversations between users
- 🔄 **Infinite Scroll**: Smooth message and conversation loading
- 📱 **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- 👤 **User Profiles**: Gravatar integration for user avatars
- 🕐 **Timestamps**: Message timing with Moment.js

## Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **JSON Server** - REST API with file-based database
- **JSON Server Auth** - Authentication middleware
- **Socket.io** - Real-time bidirectional communication

## Project Structure

```
├── server/                 # Backend server
│   ├── server.js          # Main server file
│   ├── db.json            # Database file
│   └── package.json       # Server dependencies
├── src/                   # Frontend source
│   ├── app/               # Redux store configuration
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-based modules
│   │   ├── api/           # API slice configurations
│   │   ├── auth/          # Authentication features
│   │   ├── conversations/ # Conversation management
│   │   ├── messages/      # Message handling
│   │   └── users/         # User management
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   └── utils/             # Utility functions
├── .env                   # Environment variables
└── README.md             # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:9001`

### Frontend Setup
1. Navigate to the root directory:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:9001
VITE_API_CONVERSATION_PER_PAGE=10
VITE_API_MESSAGE_PER_PAGE=10
```

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - User login

### Users
- `GET /users` - Get all users (protected)

### Conversations
- `GET /conversations` - Get user conversations (protected)
- `POST /conversations` - Create new conversation (protected)
- `PATCH /conversations/:id` - Update conversation (protected)

### Messages
- `GET /messages` - Get messages (protected)
- `POST /messages` - Send message (protected)

## Key Features Implementation

### Real-time Communication
The application uses Socket.io for real-time features:
- Instant message delivery
- Live conversation updates
- User presence indicators

### State Management
Redux Toolkit is used for:
- Authentication state
- Conversation management
- Message handling
- API caching with RTK Query

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- Input validation and sanitization

### User Experience
- Infinite scroll for messages and conversations
- Responsive design for all devices
- Loading states and error handling
- Optimistic updates for better UX

## Database Schema

The application uses a JSON-based database with the following structure:

### Users
```json
{
  "id": 1,
  "email": "user@example.com",
  "password": "$2a$10$...", // hashed
  "name": "User Name"
}
```

### Conversations
```json
{
  "id": 1,
  "participants": "user1@example.com-user2@example.com",
  "users": [/* user objects */],
  "message": "Last message",
  "timestamp": 1751200166881
}
```

### Messages
```json
{
  "id": 1,
  "conversationId": 1,
  "sender": {/* user object */},
  "receiver": {/* user object */},
  "message": "Hello!",
  "timestamp": 1751200166881
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start server with nodemon

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with ❤️ by Learn with Sumit
- Socket.io for real-time communication
- Redux Toolkit for state management
- Tailwind CSS for styling