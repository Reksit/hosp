# Healthcare Management System - Backend

This is the Spring Boot backend for the Healthcare Management System.

## Features

- **Multi-role Authentication**: Support for Ambulance Drivers, Hospital Admins, Doctors, and Nurses
- **Email Verification**: Two-step email verification for secure account creation
- **Real-time Location Tracking**: WebSocket-based real-time ambulance location updates
- **Hospital Resource Management**: Bed allocation, staff management, and ambulance tracking
- **Work Hour Tracking**: Comprehensive work hour logging for medical staff
- **JWT Security**: Secure authentication with JWT tokens

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data JPA**
- **MySQL Database**
- **WebSocket for real-time updates**
- **JWT for authentication**
- **Spring Mail for email verification**

## Setup Instructions

### Prerequisites

- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE healthcare_management;
```

2. Update the database configuration in `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/healthcare_management
    username: your_username
    password: your_password
```

### Email Configuration

Configure email settings in `application.yml`:
```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com
    password: your-app-password
```

### Environment Variables

Set the following environment variables:
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `EMAIL_USERNAME`: Email username for sending verification emails
- `EMAIL_PASSWORD`: Email password (use app password for Gmail)
- `JWT_SECRET`: Secret key for JWT token generation

### Running the Application

1. Clone the repository
2. Navigate to the backend directory
3. Run the application:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

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
- `PUT /api/ambulances/{id}` - Update ambulance
- `DELETE /api/ambulances/{id}` - Delete ambulance

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `POST /api/hospitals` - Create hospital
- `GET /api/hospitals/{id}/stats` - Get hospital statistics

### Beds
- `GET /api/beds/hospital/{hospitalId}` - Get hospital beds
- `POST /api/beds` - Create bed
- `PUT /api/beds/{id}` - Update bed
- `PUT /api/beds/{id}/assign` - Assign bed to patient

### Users
- `GET /api/users/hospital/{hospitalId}` - Get hospital staff
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `GET /api/users/{id}/work-hours` - Get user work hours

## Database Schema

The application uses the following main entities:
- **User**: System users (drivers, admins, doctors, nurses)
- **Hospital**: Hospital information and location
- **Ambulance**: Ambulance details and real-time location
- **Bed**: Hospital bed management
- **WorkHour**: Staff work hour tracking

## Real-time Features

The application uses WebSocket for real-time updates:
- Ambulance location tracking
- Status updates
- Hospital dashboard updates

Connect to WebSocket endpoint: `/ws`
Subscribe to topics:
- `/topic/ambulance-updates/{hospitalId}` - Ambulance updates for specific hospital

## Security

- JWT-based authentication
- Role-based access control
- Email verification required
- Password encryption with BCrypt
- CORS configuration for frontend integration

## Testing

Run tests with:
```bash
mvn test
```

## Deployment

For production deployment:
1. Update `application.yml` with production database settings
2. Set environment variables for sensitive data
3. Build the application: `mvn clean package`
4. Run the JAR file: `java -jar target/healthcare-management-0.0.1-SNAPSHOT.jar`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.