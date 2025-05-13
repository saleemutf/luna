# Devavo UX UI - Leave Management Chat Interface

A modern, intuitive chat-based interface for managing leave requests and scenarios. This application provides an interactive way to handle leave management through a conversational UI, making the process more engaging and user-friendly.

## Features

- 💬 Chat-based interface for leave management
- 🔄 Real-time WebSocket communication
- 💾 Save and manage chat history
- 📱 Responsive design with modern UI
- 🎨 Tailwind CSS for styling
- ⚛️ Built with React and modern web technologies

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0.0 or higher)
- pnpm (v7.0.0 or higher)
- A modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/DevavoUxUi.git
cd DevavoUxUi
```

2. Install dependencies using pnpm:
```bash
pnpm install
```

## Configuration

1. Configure the WebSocket connection:
   - Open `src/features/chat/ChatInterface.jsx`
   - Update the WebSocket URL if needed:
     ```javascript
     const websocket = new WebSocket('ws://localhost:8000/ws/chat');
     ```

2. Environment Variables (if needed):
   - Create a `.env` file in the root directory
   - Add any necessary environment variables:
     ```
     REACT_APP_API_URL=your_api_url
     REACT_APP_WS_URL=your_websocket_url
     ```

## Running the Application

1. Start the development server:
```bash
pnpm dev
```

2. Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── features/
│   ├── chat/           # Chat-related components
│   ├── Navigation/     # Navigation and sidebar components
│   └── Search/         # Search functionality
├── hooks/              # Custom React hooks
└── App.jsx            # Main application component
```

## Key Features Explained

### Chat Interface
- Real-time messaging with WebSocket connection
- Message history with save functionality
- Support for different message types (user/assistant)

### Navigation
- Collapsible left sidebar
- Quick access to different sections
- History management with categorized views

### Leave Management
- Create and manage leave scenarios
- Handle leave requests
- View shared leave scenarios
- Approval workflow

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
