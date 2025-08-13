# Developer Onboarding Guide

Welcome to the Student Portal project! This guide will help you understand the project structure, architecture, and how to get started as a developer.

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 16+ and npm
- Git
- Code editor (VS Code recommended)

### **Setup**
```bash
# Clone the repository
git clone <repository-url>
cd student-portal

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 🏗️ **Project Architecture**

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

### **Architecture Pattern**
The project follows a **Service Layer Architecture**:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React UI      │    │  Service Layer  │    │   Backend API   │
│   Components    │───▶│  (useApi hook)  │───▶│   (REST/GraphQL)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📚 **Key Concepts**

### **1. Component Architecture**
- **Layout Components**: Handle overall page structure
- **Page Components**: Main content for each route
- **UI Components**: Reusable, generic components
- **Service Components**: Handle business logic and API calls

### **2. State Management**
- **Local State**: `useState` for component-specific state
- **Custom Hooks**: `useApi`, `useEditDialog` for complex state logic
- **Service Layer**: Centralized data management

### **3. Routing**
- **React Router**: Client-side routing between pages
- **Protected Routes**: Authentication-based access control
- **Nested Routes**: Organized route structure

## 🔧 **Development Workflow**

### **Adding New Features**

#### **1. Create a New Page**
```javascript
// src/pages/NewFeature.jsx
import React from 'react';
import { PAGE_TITLES } from '../constants/ui';

const NewFeature = () => {
  return (
    <div className="bg-slate-800 text-white rounded-lg p-6">
      <h1 className="text-2xl font-bold text-sky-300 mb-4">
        {PAGE_TITLES.newFeature}
      </h1>
      {/* Your content here */}
    </div>
  );
};

export default NewFeature;
```

#### **2. Add Route**
```javascript
// src/AppShell.jsx
import NewFeature from './pages/NewFeature';

// Add to routes
<Route path="/new-feature" element={<NewFeature />} />
```

#### **3. Add Navigation**
```javascript
// src/components/layout/Sidebar.jsx
import { NewIcon } from 'lucide-react';

const menuItems = [
  // ... existing items
  { 
    text: 'New Feature', 
    icon: <NewIcon className="h-5 w-5" />, 
    path: '/new-feature' 
  },
];
```

#### **4. Add Constants**
```javascript
// src/constants/ui.js
export const PAGE_TITLES = {
  // ... existing titles
  newFeature: 'New Feature',
};
```

### **Adding New API Endpoints**

#### **1. Update API Configuration**
```javascript
// src/config/api.js
export const API_ENDPOINTS = {
  // ... existing endpoints
  newFeature: {
    list: { method: 'GET', path: '/new-feature' },
    create: { method: 'POST', path: '/new-feature' },
    update: { method: 'PUT', path: '/new-feature/:id' },
    delete: { method: 'DELETE', path: '/new-feature/:id' },
  },
};
```

#### **2. Add Service Methods**
```javascript
// src/services/studentService.js
async getNewFeatures(options = {}) {
  try {
    const response = await apiService.get(API_ENDPOINTS.newFeature.list.path);
    return response.data || response;
  } catch (error) {
    console.error('Error fetching new features:', error);
    throw error;
  }
}
```

#### **3. Use in Components**
```javascript
import { useApi } from '../hooks/useApi';
import studentService from '../services/studentService';

const { data, loading, error } = useApi(
  () => studentService.getNewFeatures(),
  { autoExecute: true }
);
```

## 🎨 **Styling Guidelines**

### **Tailwind CSS Classes**
- **Colors**: Use semantic color classes (`text-sky-300`, `bg-slate-800`)
- **Spacing**: Consistent spacing scale (`p-6`, `mb-4`, `space-y-4`)
- **Responsive**: Mobile-first approach (`sm:grid-cols-2`, `lg:w-64`)

### **Component Styling**
```javascript
// Good: Consistent with project theme
<div className="bg-slate-800 text-white border border-slate-600 rounded-lg p-6">
  <h3 className="text-lg font-semibold text-sky-300 mb-4">Title</h3>
  {/* Content */}
</div>

// Avoid: Inline styles or inconsistent classes
<div style={{ backgroundColor: '#1f2937', color: 'white' }}>
  <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Title</h3>
</div>
```

## 🔌 **API Integration**

### **Using the useApi Hook**

#### **Simple GET Request**
```javascript
const { data, loading, error } = useApi(
  () => studentService.getProfile(),
  { autoExecute: true }
);
```

#### **Manual Execution**
```javascript
const { execute, loading } = useApi(
  (data) => studentService.updateProfile(data),
  { autoExecute: false }
);

const handleSubmit = () => {
  execute(formData);
};
```

#### **With Options**
```javascript
const { data, loading, error, refetch } = useApi(
  () => studentService.getCourses({ semester: 3 }),
  { 
    autoExecute: true,
    cache: true,
    retry: true,
    retryAttempts: 3
  }
);
```

### **Error Handling**
```javascript
const { data, loading, error } = useApi(
  () => studentService.getProfile()
);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
if (!data) return <div>No data available</div>;

return <div>Welcome, {data.name}!</div>;
```

## 🧪 **Testing**

### **Component Testing**
```javascript
// src/components/__tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### **API Testing**
```javascript
// src/services/__tests__/studentService.test.js
import studentService from '../studentService';
import apiService from '../apiService';

jest.mock('../apiService');

describe('StudentService', () => {
  it('fetches profile successfully', async () => {
    const mockProfile = { name: 'John Doe', email: 'john@example.com' };
    apiService.get.mockResolvedValue({ data: mockProfile });

    const result = await studentService.getProfile();
    expect(result).toEqual(mockProfile);
    expect(apiService.get).toHaveBeenCalledWith('/student/profile');
  });
});
```

## 📝 **Code Standards**

### **JavaScript/React**
- **Functional Components**: Use function declarations, not arrow functions
- **Hooks**: Follow React hooks rules and best practices
- **Props**: Destructure props at the beginning of components
- **State**: Use appropriate state management patterns

### **Documentation**
- **JSDoc**: Document all functions and components
- **Inline Comments**: Explain complex logic
- **README**: Keep documentation updated

### **Code Formatting**
```bash
# Format code with Prettier
npm run format

# Check formatting
npm run format:check
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

## 🔍 **Debugging**

### **Common Issues**

#### **1. API Calls Not Working**
- Check browser console for errors
- Verify API endpoints in `src/config/api.js`
- Ensure backend server is running
- Check CORS configuration

#### **2. Styling Issues**
- Verify Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Use browser dev tools to inspect elements

#### **3. Routing Problems**
- Ensure routes are properly defined in `AppShell.jsx`
- Check for typos in route paths
- Verify navigation links are correct

### **Debug Tools**
- **React DevTools**: Component inspection and state debugging
- **Redux DevTools**: State management debugging (if using Redux)
- **Network Tab**: API call monitoring
- **Console**: Error logging and debugging

## 📚 **Learning Resources**

### **React Fundamentals**
- [React Official Docs](https://reactjs.org/docs/getting-started.html)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)
- [React Router](https://reactrouter.com/docs/en/v6)

### **Tailwind CSS**
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### **API Integration**
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API Best Practices](https://restfulapi.net/)
- [JWT Authentication](https://jwt.io/introduction)

## 🤝 **Contributing**

### **Pull Request Process**
1. Create a feature branch from `main`
2. Make your changes following the code standards
3. Add tests for new functionality
4. Update documentation as needed
5. Submit a pull request with clear description

### **Code Review Checklist**
- [ ] Code follows project standards
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] Proper error handling
- [ ] Responsive design considerations

## 🆘 **Getting Help**

### **Internal Resources**
- **Code Comments**: Check component documentation
- **Constants**: Review `src/constants/ui.js` for available options
- **Examples**: Look at existing components for patterns

### **External Resources**
- **Stack Overflow**: React and JavaScript questions
- **GitHub Issues**: Project-specific problems
- **Discord/Slack**: Team communication

### **Asking Questions**
When asking for help, include:
- What you're trying to accomplish
- What you've already tried
- Error messages or unexpected behavior
- Relevant code snippets

## 🎯 **Next Steps**

1. **Explore the Codebase**: Familiarize yourself with existing components
2. **Run the Application**: Make sure everything works locally
3. **Make a Small Change**: Try adding a new feature or fixing a bug
4. **Read the Documentation**: Understand the project architecture
5. **Join the Team**: Participate in code reviews and discussions

Welcome to the team! 