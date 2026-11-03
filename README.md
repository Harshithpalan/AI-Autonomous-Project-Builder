# AI Autonomous Project Builder

A modern web application built with Vue.js 3 that allows users to generate code using AI assistance.

## Features

- **Authentication System**: Login and registration with secure session management
- **Dashboard**: Overview of statistics and recent code generations
- **AI Code Generator**: Generate code in multiple languages and frameworks
- **Modern UI**: Clean, responsive design with gradient themes
- **State Management**: Pinia for efficient state handling
- **Routing**: Vue Router for seamless navigation

## Tech Stack

- Vue.js 3 with Composition API
- Vite for fast development
- Vue Router for navigation
- Pinia for state management
- Axios for API calls

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable Vue components
├── views/           # Page components (Login, Register, Dashboard, Generator)
├── stores/          # Pinia stores (auth, generator)
├── router/          # Vue Router configuration
├── App.vue          # Root component
└── main.js          # Application entry point
```

## License

MIT
