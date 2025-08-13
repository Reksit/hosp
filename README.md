# Healthcare Management System

A comprehensive healthcare management system with real-time ambulance tracking, hospital resource management, and staff coordination.

## Features

### Frontend (React + TypeScript)
- **Multi-role Authentication**: Support for Ambulance Drivers, Hospital Admins, Doctors, and Nurses
- **Real-time Dashboard**: Role-specific dashboards with live updates
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Location Tracking**: Live ambulance location updates
- **Resource Management**: Bed allocation and staff management interfaces

### Backend (Spring Boot)
- **JWT Authentication**: Secure token-based authentication
- **Email Verification**: Two-step email verification for account security
- **RESTful APIs**: Comprehensive API endpoints for all operations
- **WebSocket Support**: Real-time updates for ambulance tracking
- **Role-based Access Control**: Secure endpoints based on user roles
- **MySQL Database**: Robust data persistence with JPA/Hibernate

## Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for development and building

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- MySQL 8.0
- WebSocket for real-time updates
- Spring Mail for email verification

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- MySQL 8.0+
- Maven 3.6+

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE healthcare_management;
```

2. Create a MySQL user (optional):
```sql
CREATE USER 'healthcare_user'@'localhost' IDENTIFIED BY 'healthcare_password';
GRANT ALL PRIVILEGES ON healthcare_management.* TO 'healthcare_user'@'localhost';
FLUSH PRIVILEGES;
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Update `src/main/resources/application.yml` with your database credentials:
```yaml
spring:
  datasource:
    username: your_db_username
    password: your_db_password
```

3. Configure email settings for verification (optional):
```yaml
spring:
  mail:
    username: your-email@gmail.com
    password: your-app-password
```

4. Set environment variables (optional):
```bash
export DB_USERNAME=your_db_username
export DB_PASSWORD=your_db_password
export EMAIL_USERNAME=your-email@gmail.com
export EMAIL_PASSWORD=your-app-password
export JWT_SECRET=your-jwt-secret-key
```

5. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the project root and install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/verify-email?token={token}` - Email verification
- `POST /api/auth/resend-verification?email={email}` - Resend verification email

### Ambulances
- `GET /api/ambulances/hospital/{hospitalId}` - Get hospital ambulances
- `GET /api/ambulances/my-ambulance` - Get driver's ambulance
- `PUT /api/ambulances/update-location` - Update ambulance location
- `POST /api/ambulances` - Create new ambulance

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/{id}/stats` - Get hospital statistics
- `POST /api/hospitals` - Create hospital

### Beds
- `GET /api/beds/hospital/{hospitalId}` - Get hospital beds
- `POST /api/beds` - Create bed
- `PUT /api/beds/{id}/assign` - Assign bed to patient

### Users
- `GET /api/users/hospital/{hospitalId}` - Get hospital staff
- `GET /api/users/profile` - Get user profile
- `GET /api/users/{id}/work-hours` - Get user work hours
- `POST /api/users/work-hours` - Log work hours

## User Roles and Access

### Ambulance Driver
- Update ambulance location and status
- View pickup assignments
- Access emergency contacts
- Track work hours

### Hospital Admin
- Manage hospital resources (beds, ambulances, staff)
- View real-time ambulance tracking
- Access hospital statistics and reports
- Create and manage user accounts

### Doctor
- View patient assignments and consultations
- Manage bed assignments
- Track work hours and schedules
- Access patient information

### Nurse
- View patient care tasks
- Administer medications and treatments
- Monitor patient vitals
- Track work hours and schedules

## Real-time Features

The application uses WebSocket for real-time updates:
- Ambulance location tracking
- Status updates
- Hospital dashboard updates

WebSocket endpoint: `/ws`
Subscribe to topics:
- `/topic/ambulance-updates/{hospitalId}` - Ambulance updates for specific hospital

## Development

### Running Tests
```bash
# Backend tests
cd backend
mvn test

# Frontend tests (if configured)
npm test
```

### Building for Production

#### Backend
```bash
cd backend
mvn clean package
java -jar target/healthcare-management-0.0.1-SNAPSHOT.jar
```

#### Frontend
```bash
npm run build
```

## Environment Variables

### Backend
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `EMAIL_USERNAME` - Email username for verification emails
- `EMAIL_PASSWORD` - Email password (use app password for Gmail)
- `JWT_SECRET` - Secret key for JWT token generation
- `FRONTEND_URL` - Frontend URL for CORS and email links

### Frontend
The frontend automatically connects to `http://localhost:8080` for the backend API.

## Security Features

- JWT-based authentication with secure token storage
- Role-based access control for all endpoints
- Email verification for new accounts
- Password encryption with BCrypt
- CORS configuration for secure cross-origin requests
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.