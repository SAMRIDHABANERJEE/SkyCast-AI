# SkyCast AI ⛅

<div align="center">

![SkyCast AI Banner](https://private-user-images.githubusercontent.com/159876365/477138731-0aa67016-6eaf-458a-adb2-6e31a0763ed6.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjY4NjM3OTksIm5iZiI6MTc2Njg2MzQ5OSwicGF0aCI6Ii8xNTk4NzYzNjUvNDc3MTM4NzMxLTBhYTY3MDE2LTZlYWYtNDU4YS1hZGIyLTZlMzFhMDc2M2VkNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMjI3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTIyN1QxOTI0NTlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03YWY5NWI5NWQyMjhkZjY4ZDI5ZTg4YzQ4MzljOGFkMjlkZWZhOWM0N2Q0YWY5Mzk5YzViZTE5MmM0ZWNjYWMyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.c14YabgdoF1nOMy4rqjCn4Xli8RNmtqB1CcFdB-9Pdw)

**A modern, responsive weather dashboard powered by AI**

[Live Demo](https://sky-cast-ai.vercel.app) · [Report Bug](https://github.com/SAMRIDHABANERJEE/SkyCast-AI/issues) · [Request Feature](https://github.com/SAMRIDHABANERJEE/SkyCast-AI/issues)

[![TypeScript](https://img.shields.io/badge/TypeScript-94.3%25-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 About

**SkyCast AI** is a modern, responsive weather application that provides real-time weather updates and comprehensive forecasts. Built with React and TypeScript, it delivers weather data including temperature, air quality, and environmental conditions through an intuitive dashboard interface.

The application leverages AI capabilities through Google's Gemini API to provide intelligent weather insights and forecasts, making weather information more accessible and actionable for users.

---

## ✨ Features

### Core Features
- 🌡️ **Real-Time Weather Data** - Get current weather conditions for any location
- 📊 **Comprehensive Dashboard** - View temperature, humidity, wind speed, and more at a glance
- 🌫️ **Air Quality Index** - Monitor air quality levels and pollutant information
- 📅 **Extended Forecasts** - Multi-day weather predictions
- 🔍 **Location Search** - Search for weather by city name or coordinates
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

### AI-Powered Features
- 🤖 **AI Weather Insights** - Intelligent weather analysis powered by Gemini API
- 💡 **Smart Recommendations** - Get contextual suggestions based on weather conditions
- 🗣️ **Natural Language Processing** - Ask questions about weather in plain English

### User Experience
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable viewing
- ⚡ **Fast Performance** - Optimized loading and data fetching
- 📍 **Geolocation Support** - Automatic location detection

---

## 🎬 Demo

Check out the live application: [**SkyCast AI**](https://sky-cast-ai.vercel.app)

### Screenshots

> Add your application screenshots here to showcase the UI/UX

---

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Next-generation frontend tooling for faster builds
- **CSS3** - Modern styling with responsive design

### APIs & Services
- **Google Gemini API** - AI-powered weather insights
- **Weather API** - Real-time weather data (OpenWeatherMap/WeatherAPI)
- **Geolocation API** - Browser-based location services

### Deployment
- **Vercel** - Serverless deployment platform
- **GitHub** - Version control and collaboration

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager
- A **Gemini API Key** from [Google AI Studio](https://ai.google.dev/)
- A **Weather API Key** (if using external weather services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SAMRIDHABANERJEE/SkyCast-AI.git
   cd SkyCast-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_WEATHER_API_KEY=your_weather_api_key_here
   ```

   > ⚠️ **Important**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

---

## 💻 Usage

### Basic Usage

1. **Search for a Location**
   - Enter a city name in the search bar
   - Or allow location access for automatic detection

2. **View Weather Data**
   - Current temperature and conditions
   - Hourly and daily forecasts
   - Air quality information
   - Wind speed, humidity, and pressure

3. **AI Insights**
   - Ask questions about the weather
   - Get personalized recommendations
   - View AI-generated weather summaries

### Example Queries
```
"What should I wear today?"
"Will it rain this weekend?"
"Is the air quality safe for outdoor activities?"
"What's the best time to go for a walk?"
```

---

## 📁 Project Structure

```
SkyCast-AI/
├── components/          # React components
│   ├── Dashboard/       # Main dashboard components
│   ├── WeatherCard/     # Weather display components
│   ├── Search/          # Search functionality
│   └── UI/              # Reusable UI components
├── services/            # API services and utilities
│   ├── gemini.ts        # Gemini API integration
│   ├── weather.ts       # Weather API integration
│   └── geolocation.ts   # Location services
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── metadata.json        # Project metadata
```

---

## 🔌 API Integration

### Gemini API
The application uses Google's Gemini API for AI-powered features:
- Natural language weather queries
- Intelligent weather insights
- Contextual recommendations

### Weather Data API
Weather data is fetched from reliable weather services:
- Current weather conditions
- Hourly and daily forecasts
- Air quality index
- Historical weather data

---

## 🌐 Deployment

### Deploy on Vercel

1. **Fork or clone this repository**

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure environment variables**
   - Add your API keys in Vercel's environment variables section

4. **Deploy**
   - Vercel will automatically build and deploy your application

### Deploy on Other Platforms

The application can also be deployed on:
- **Netlify** - Similar to Vercel with continuous deployment
- **GitHub Pages** - For static hosting
- **AWS Amplify** - For AWS integration
- **Railway** - For full-stack deployments

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Samridha Banerjee**

- GitHub: [@SAMRIDHABANERJEE](https://github.com/SAMRIDHABANERJEE)
- Project Link: [https://github.com/SAMRIDHABANERJEE/SkyCast-AI](https://github.com/SAMRIDHABANERJEE/SkyCast-AI)
- Live Demo: [https://sky-cast-ai.vercel.app](https://sky-cast-ai.vercel.app)

---

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) - For AI capabilities
- [OpenWeatherMap](https://openweathermap.org/) - For weather data
- [React](https://reactjs.org/) - For the amazing UI library
- [Vite](https://vitejs.dev/) - For the blazing fast build tool
- [Vercel](https://vercel.com/) - For seamless deployment
- [Google AI Studio](https://ai.studio/) - For the project template

---

## 🌟 Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ by [Samridha Banerjee](https://github.com/SAMRIDHABANERJEE)**

</div>
