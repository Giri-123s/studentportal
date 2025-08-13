# Student Portal - React Application

A modern, responsive student portal built with React, featuring a comprehensive dashboard, course management, CGPA calculator, and assignment tracking system.

## ✨ **Features**

### **🎯 Core Functionality**
- **Dashboard**: Comprehensive overview with personal data, guardian info, degree program, and admin notifications
- **Courses**: Course listing with grades, credits, and academic progress
- **CGPA Calculator**: Real-time grade point average calculation with course breakdown
- **Assignments**: Assignment tracking with filtering and status management
- **Responsive Design**: Mobile-first approach with smooth animations

### **🔧 Technical Features**
- **Service Layer Architecture**: Clean separation between UI and business logic
- **API Integration Ready**: Comprehensive backend integration support
- **Custom Hooks**: Reusable hooks for API management and state handling
- **Component Library**: Consistent, reusable UI components
- **TypeScript Ready**: Structured for easy TypeScript migration

## 🏗️ **Architecture**

### **Service Layer Pattern**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React UI      │    │  Service Layer  │    │   Backend API   │
│   Components    │───▶│  (useApi hook)  │───▶│   (REST/GraphQL)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Folder Structure**
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── ui/             # Generic UI components (Button, Modal, etc.)
├── pages/              # Page components (Dashboard, Courses, etc.)
├── services/           # API service layer
├── hooks/              # Custom React hooks
├── config/             # Configuration files
├── constants/          # Application constants
├── data/               # Mock data and utilities
└── utils/              # Utility functions
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 16+ and npm
- Git
- Code editor (VS Code recommended)

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd student-portal

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

## 🔌 **Backend Integration**

### **Easy Backend Connection**
The project is designed for seamless backend integration with:

- **API Service Layer**: Centralized HTTP client with authentication
- **Environment Configuration**: Easy switching between dev/staging/production
- **Error Handling**: Comprehensive error management and retry logic
- **Caching**: Built-in request caching for performance
- **Authentication**: JWT token support with automatic header management

### **Supported Backend Technologies**
- **Node.js/Express**: Full example implementations provided
- **Python/Django**: REST framework integration examples
- **PHP/Laravel**: API resource examples
- **Java/Spring Boot**: Controller examples
- **Any REST API**: Flexible configuration for any backend

### **Quick Integration Steps**
1. Update `src/config/api.js` with your backend URLs
2. Replace mock data calls with API service calls
3. Use the `useApi` hook for automatic state management
4. Configure authentication if needed

See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for detailed integration guides.

## 🎨 **UI Components**

### **Reusable Components**
- **DataCard**: Display data with edit functionality
- **StatsCard**: Show statistics with icons
- **Modal**: Reusable modal dialogs
- **FormField**: Consistent form inputs
- **Button**: Multiple button variants
- **SelectDropdown**: Custom dropdown component
- **AnimatedCard**: Creative animated cards
- **CreativeChart**: Interactive data visualization

### **Design System**
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Consistent dark color scheme
- **Animations**: Smooth transitions and hover effects
- **Icons**: Lucide React icon library

## 📚 **Custom Hooks**

### **useApi Hook**
Manages API calls with loading states, error handling, and caching:

```javascript
const { data, loading, error, execute } = useApi(
  () => studentService.getProfile(),
  { autoExecute: true }
);
```

### **useEditDialog Hook**
Manages edit dialog state and temporary data:

```javascript
const personalDialog = useEditDialog(personalData);
```

### **useApiLazy & useApiPolling**
Specialized hooks for manual execution and real-time updates.

## 🧪 **Testing**

### **Testing Setup**
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### **Testing Strategy**
- **Component Testing**: React Testing Library for UI components
- **Service Testing**: Mock API responses for service layer
- **Hook Testing**: Custom hook testing utilities
- **Integration Testing**: End-to-end user workflows

## 📝 **Code Quality**

### **Standards**
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automatic code formatting
- **JSDoc**: Comprehensive documentation
- **TypeScript Ready**: Structured for easy TypeScript migration

### **Code Formatting**
```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint
```

## 🚀 **Deployment**

### **Build Process**
```bash
# Create production build
npm run build

# Test production build locally
npm run serve
```

### **Environment Configuration**
```bash
# .env.local (development)
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1

# .env.production
REACT_APP_API_BASE_URL=https://api.yourdomain.com/api/v1
```

## 📖 **Documentation**

### **Available Guides**
- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)**: Complete backend integration guide
- **[DEVELOPER_ONBOARDING.md](./DEVELOPER_ONBOARDING.md)**: Developer setup and workflow guide
- **Code Comments**: Comprehensive JSDoc documentation throughout the codebase

### **API Documentation**
- **Endpoint Definitions**: Complete API endpoint specifications
- **Request/Response Formats**: Standardized data structures
- **Authentication**: JWT token implementation details
- **Error Handling**: Comprehensive error codes and messages

## 🔧 **Development**

### **Adding New Features**
1. Create page component in `src/pages/`
2. Add route in `src/AppShell.jsx`
3. Update navigation in `src/components/layout/Sidebar.jsx`
4. Add constants in `src/constants/ui.js`
5. Create service methods if needed

### **Adding New API Endpoints**
1. Update `src/config/api.js` with new endpoints
2. Add service methods in appropriate service files
3. Use `useApi` hook in components
4. Handle loading, error, and success states

## 🤝 **Contributing**

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes following code standards
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

### **Code Standards**
- Follow existing code patterns and architecture
- Add comprehensive documentation
- Include tests for new features
- Ensure responsive design
- Follow accessibility guidelines

## 🆘 **Support**

### **Getting Help**
- **Documentation**: Check the comprehensive guides first
- **Code Comments**: Inline documentation throughout the codebase
- **Examples**: Look at existing components for patterns
- **Issues**: Report bugs and request features via GitHub

### **Common Issues**
- **Port Conflicts**: Change port in package.json if 3000 is busy
- **API Errors**: Check backend server and CORS configuration
- **Styling Issues**: Verify Tailwind CSS configuration
- **Build Errors**: Clear node_modules and reinstall dependencies

## 📚 **Learning Resources**

### **React & Frontend**
- [React Official Documentation](https://reactjs.org/docs/)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### **Backend Integration**
- [REST API Best Practices](https://restfulapi.net/)
- [JWT Authentication](https://jwt.io/introduction)
- [CORS Configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library
- **Framer Motion**: For smooth animations

---

**Built with ❤️ for modern web development**
