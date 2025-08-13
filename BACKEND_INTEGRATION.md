# Backend Integration Guide

This guide explains how to integrate the Student Portal frontend with various backend technologies and APIs.

## 🏗️ **Architecture Overview**

The frontend is designed with a **service layer architecture** that makes backend integration straightforward:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React UI      │    │  Service Layer  │    │   Backend API   │
│   Components    │───▶│  (useApi hook)  │───▶│   (REST/GraphQL)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 **Quick Start Integration**

### **1. Update API Configuration**

Edit `src/config/api.js` to point to your backend:

```javascript
export const API_BASE_URLS = {
  development: 'http://localhost:8000/api/v1',        // Your dev server
  staging: 'https://staging-api.yourdomain.com/api/v1', // Your staging server
  production: 'https://api.yourdomain.com/api/v1'     // Your production server
};
```

### **2. Replace Mock Data**

Update components to use the API service instead of mock data:

```javascript
// Before (using mock data)
import { studentData } from '../data/studentData';

// After (using API service)
import { useApi } from '../hooks/useApi';
import studentService from '../services/studentService';

const Dashboard = () => {
  const { data: profile, loading, error } = useApi(
    () => studentService.getProfile(),
    { autoExecute: true }
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>Welcome, {profile.name}!</div>;
};
```

## 🔧 **Backend Technology Integration**

### **Node.js/Express Backend**

#### **Required Endpoints**

```javascript
// Authentication
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
PUT /api/v1/auth/change-password

// Student Profile
GET /api/v1/student/profile
PUT /api/v1/student/profile
GET /api/v1/student/guardian
PUT /api/v1/student/guardian

// Academic
GET /api/v1/academic/courses
GET /api/v1/academic/courses/:id
GET /api/v1/academic/cgpa
GET /api/v1/academic/transcript

// Assignments
GET /api/v1/assignments
POST /api/v1/assignments
PUT /api/v1/assignments/:id
DELETE /api/v1/assignments/:id
POST /api/v1/assignments/:id/submit

// Notifications
GET /api/v1/notifications
PUT /api/v1/notifications/:id/read
POST /api/v1/notifications
PUT /api/v1/notifications/:id
```

#### **Response Format**

```javascript
// Success Response
{
  "success": true,
  "data": {
    // Your data here
  },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "field": "error message"
    }
  }
}
```

#### **Express.js Example**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Student profile endpoint
app.get('/api/v1/student/profile', authenticateToken, async (req, res) => {
  try {
    const studentId = req.user.id;
    const profile = await Student.findById(studentId);
    
    res.json({
      success: true,
      data: profile,
      message: 'Profile retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve profile'
      }
    });
  }
});

// Update profile endpoint
app.put('/api/v1/student/profile', authenticateToken, async (req, res) => {
  try {
    const studentId = req.user.id;
    const updates = req.body;
    
    const updatedProfile = await Student.findByIdAndUpdate(
      studentId, 
      updates, 
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: updatedProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid profile data',
        details: error.message
      }
    });
  }
});
```

### **Python/Django Backend**

#### **Django REST Framework Example**

```python
# models.py
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    student_id = models.CharField(max_length=20, unique=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
class Course(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=200)
    credits = models.IntegerField()
    grade = models.CharField(max_length=2)
    grade_points = models.DecimalField(max_digits=3, decimal_places=2)

# serializers.py
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'student_id', 'email', 'phone']

# views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer
    
    def get_queryset(self):
        return Student.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def profile(self, request):
        student = self.get_queryset().first()
        serializer = self.get_serializer(student)
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Profile retrieved successfully'
        })
    
    @action(detail=False, methods=['put'])
    def update_profile(self, request):
        student = self.get_queryset().first()
        serializer = self.get_serializer(student, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'data': serializer.data,
                'message': 'Profile updated successfully'
            })
        
        return Response({
            'success': False,
            'error': {
                'code': 'VALIDATION_ERROR',
                'message': 'Invalid profile data',
                'details': serializer.errors
            }
        }, status=400)

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'student', StudentViewSet, basename='student')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
```

### **PHP/Laravel Backend**

#### **Laravel API Example**

```php
<?php
// app/Http/Controllers/Api/StudentController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\StudentResource;

class StudentController extends Controller
{
    public function profile()
    {
        $student = auth()->user()->student;
        
        return response()->json([
            'success' => true,
            'data' => new StudentResource($student),
            'message' => 'Profile retrieved successfully'
        ]);
    }
    
    public function updateProfile(UpdateProfileRequest $request)
    {
        $student = auth()->user()->student;
        $student->update($request->validated());
        
        return response()->json([
            'success' => true,
            'data' => new StudentResource($student),
            'message' => 'Profile updated successfully'
        ]);
    }
    
    public function courses()
    {
        $courses = auth()->user()->student->courses;
        
        return response()->json([
            'success' => true,
            'data' => CourseResource::collection($courses),
            'message' => 'Courses retrieved successfully'
        ]);
    }
}

// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/student/profile', [StudentController::class, 'profile']);
    Route::put('/student/profile', [StudentController::class, 'updateProfile']);
    Route::get('/academic/courses', [StudentController::class, 'courses']);
});
```

### **Java/Spring Boot Backend**

#### **Spring Boot Example**

```java
// StudentController.java
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @GetMapping("/student/profile")
    public ResponseEntity<ApiResponse<StudentDTO>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            StudentDTO profile = studentService.getProfile(userDetails.getUsername());
            return ResponseEntity.ok(new ApiResponse<>(true, profile, "Profile retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(false, null, "Failed to retrieve profile"));
        }
    }
    
    @PutMapping("/student/profile")
    public ResponseEntity<ApiResponse<StudentDTO>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid StudentDTO studentDTO) {
        try {
            StudentDTO updatedProfile = studentService.updateProfile(userDetails.getUsername(), studentDTO);
            return ResponseEntity.ok(new ApiResponse<>(true, updatedProfile, "Profile updated successfully"));
        } catch (ValidationException e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, null, "Validation failed"));
        }
    }
}

// ApiResponse.java
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    
    // Constructors, getters, setters
}
```

## 🔐 **Authentication Integration**

### **JWT Token Implementation**

```javascript
// Frontend: src/services/apiService.js
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    return {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${token}`
    };
  }
  return DEFAULT_HEADERS;
};

// Backend: Express.js example
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: { message: 'Access token required' }
    });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: { message: 'Invalid or expired token' }
      });
    }
    req.user = user;
    next();
  });
};
```

## 📊 **Database Schema Examples**

### **PostgreSQL Schema**

```sql
-- Students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    name VARCHAR(100) NOT NULL,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    code VARCHAR(10) NOT NULL,
    name VARCHAR(200) NOT NULL,
    credits INTEGER NOT NULL,
    grade VARCHAR(2),
    grade_points DECIMAL(3,2),
    semester INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments table
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **MongoDB Schema**

```javascript
// Student Schema
const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  guardian: {
    name: String,
    phone: String,
    email: String,
    address: String
  },
  degreeProgram: {
    program: String,
    discipline: String,
    joinDate: Date
  }
}, { timestamps: true });

// Course Schema
const courseSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  grade: String,
  gradePoints: Number,
  semester: Number
}, { timestamps: true });
```

## 🧪 **Testing Your Integration**

### **1. Test API Endpoints**

Use tools like Postman or curl to test your endpoints:

```bash
# Test profile endpoint
curl -X GET http://localhost:8000/api/v1/student/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Test profile update
curl -X PUT http://localhost:8000/api/v1/student/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### **2. Frontend Testing**

Update the frontend to use your API:

```javascript
// Test with real API
const { data: profile, loading, error } = useApi(
  () => studentService.getProfile(),
  { autoExecute: true }
);

console.log('Profile data:', profile);
console.log('Loading state:', loading);
console.log('Error state:', error);
```

## 🚀 **Deployment Considerations**

### **Environment Variables**

```bash
# .env.local
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
REACT_APP_ENVIRONMENT=development

# .env.production
REACT_APP_API_BASE_URL=https://api.yourdomain.com/api/v1
REACT_APP_ENVIRONMENT=production
```

### **CORS Configuration**

```javascript
// Express.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Django
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://yourdomain.com"
]

// Laravel
'cors' => [
    'allowed_origins' => ['http://localhost:3000', 'https://yourdomain.com'],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
],
```

## 📚 **Additional Resources**

- [React Query](https://react-query.tanstack.com/) - Alternative to useApi hook
- [Axios](https://axios-http.com/) - Alternative HTTP client
- [SWR](https://swr.vercel.app/) - React Hooks for data fetching
- [GraphQL](https://graphql.org/) - Alternative to REST API

## 🆘 **Need Help?**

If you encounter issues during integration:

1. Check the browser console for errors
2. Verify API endpoints are accessible
3. Ensure CORS is properly configured
4. Check authentication token validity
5. Review the API response format

The service layer is designed to be flexible and can be easily adapted to different backend technologies and response formats. 