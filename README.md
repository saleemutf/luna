# Devavo UX UI - Leave Management Chat Interface

A modern, intuitive chat-based interface for managing leave requests and scenarios. This application provides an interactive way to handle leave management through a conversational UI, making the process more engaging and user-friendly.

## 🚀 Features

- 💬 Chat-based interface for leave management
- 🔄 Real-time WebSocket communication
- 🎨 TailwindCSS for styling
- ⚛️ Built with React and Vite
- 🎯 Interactive UI components



## 🛠️ Technology Stack

- **Frontend Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Package Manager:** pnpm
- **Code Quality:** ESLint
- **Development Mode:** Development server with HMR

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0.0 or higher)
- pnpm (v7.0.0 or higher)
- A modern web browser

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/DevavoUxUi.git
cd DevavoUxUi
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
DevavoUxUi/
├── src/
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature-specific components
│   ├── assets/        # Static assets
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles
├── public/            # Public assets
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
└── eslint.config.js   # ESLint configuration
```

## 🔧 Configuration

### Environment Setup

1. Create a `.env` file in the root directory:
```env
VITE_APP_API_URL=your_api_url
VITE_APP_WS_URL=your_websocket_url
```

### WebSocket Configuration

Update the WebSocket connection in your chat component:
```javascript
const websocket = new WebSocket(import.meta.env.VITE_APP_WS_URL);
```

## 🎯 Key Features

### Chat Interface
- Real-time messaging system
- Message history persistence
- Support for various message types
- Interactive chat components
- Smart message suggestions

### Leave Management
- Create and track leave requests
- Manage leave scenarios
- View and share leave history
- Approval workflow system
- Status tracking

### User Interface
- Modern, responsive design
- Interactive components
- Accessibility features
- Loading states and animations

## 📝 Development Guidelines

- Use functional components and React hooks
- Follow TailwindCSS best practices
- Implement proper error handling
- Write clean, maintainable code
- Follow the established project structure
- Use proper component naming conventions
