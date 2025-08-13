# Student Portal - React Application

A modern, responsive student portal built with React, featuring a comprehensive dashboard, course management, CGPA calculator, and assignment tracking system. This project demonstrates strong frontend development skills with modern UI/UX practices.

## ✨ **Features**

### **🎯 Core Functionality**
- **Dashboard**: Comprehensive overview with personal data, guardian info, degree program, and admin notifications
- **Courses**: Course listing with grades, credits, and academic progress
- **CGPA Calculator**: Real-time grade point average calculation with course breakdown
- **Assignments**: Assignment tracking with filtering and status management
- **Responsive Design**: Mobile-first approach with smooth animations

### **🎨 UI/UX Excellence**
- **Creative Animations**: 3D hover effects, glassmorphism, and smooth transitions
- **Interactive Charts**: Animated data visualization for course performance
- **Modern Design**: Dark theme with consistent color scheme and typography
- **Accessibility**: Keyboard navigation, screen reader support, and ARIA labels
- **Loading States**: Creative loading animations and skeleton screens

## 🏗️ **Architecture**

### **Component-Based Architecture**
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── ui/             # Generic UI components (Button, Modal, etc.)
├── pages/              # Page components (Dashboard, Courses, etc.)
├── hooks/              # Custom React hooks
├── constants/          # Application constants
├── data/               # Mock data and utilities
└── utils/              # Utility functions
```

### **Key Design Patterns**
- **Custom Hooks**: Reusable logic for state management
- **Component Composition**: Flexible, reusable UI components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimization**: Lazy loading and efficient re-renders

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 16+ and npm
- Git
- Code editor (VS Code recommended)

### **Installation**
```bash
# Clone the repository
git clone https://github.com/Giri-123s/studentportal.git
cd studentportal

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

## 🎨 **UI Components**

### **Reusable Components**
- **DataCard**: Display data with edit functionality
- **StatsCard**: Show statistics with icons and hover effects
- **Modal**: Reusable modal dialogs with backdrop
- **FormField**: Consistent form inputs with validation
- **Button**: Multiple button variants (primary, outline, ghost)
- **SelectDropdown**: Custom dropdown component
- **AnimatedCard**: Creative animated cards with 3D effects
- **CreativeChart**: Interactive data visualization

### **Design System**
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Theme**: Consistent dark color scheme
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React icon library

## 📚 **Custom Hooks**

### **useEditDialog Hook**
Manages edit dialog state and temporary data:

```javascript
const personalDialog = useEditDialog(personalData);
```

### **useApi Hook** (Ready for Backend Integration)
Manages API calls with loading states and error handling:

```javascript
const { data, loading, error, execute } = useApi(
  () => studentService.getProfile(),
  { autoExecute: true }
);
```

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

### **Live Demo**
- **🌐 Live Application**: https://ass-ey8h31td5-giri-123s-projects.vercel.app
- **📁 GitHub Repository**: https://github.com/Giri-123s/studentportal.git

## 🔧 **Development**

### **Adding New Features**
1. Create page component in `src/pages/`
2. Add route in `src/AppShell.jsx`
3. Update navigation in `src/components/layout/Sidebar.jsx`
4. Add constants in `src/constants/ui.js`
5. Follow existing component patterns

### **Component Guidelines**
- Use existing UI components when possible
- Follow the established design system
- Ensure mobile responsiveness
- Add proper accessibility attributes
- Include JSDoc documentation

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
- **Styling Issues**: Verify Tailwind CSS configuration
- **Build Errors**: Clear node_modules and reinstall dependencies

## 📚 **Learning Resources**

### **React & Frontend**
- [React Official Documentation](https://reactjs.org/docs/)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library
- **Framer Motion**: For smooth animations

---

**Built with ❤️ for modern frontend development**
