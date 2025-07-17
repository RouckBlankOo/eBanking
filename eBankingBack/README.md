# eBanking Backend Authentication System

A comprehensive Node.js backend authentication system for the eBanking mobile application built with Express.js, MongoDB, and JWT.

## 🚀 Features

### Authentication & Authorization

- ✅ User Registration with email and phone verification
- ✅ Secure login with JWT tokens
- ✅ Password reset via email verification
- ✅ Refresh token implementation
- ✅ Account lockout after failed attempts
- ✅ Rate limiting for security

### User Management

- ✅ Complete user profile management
- ✅ Personal information collection
- ✅ Address information management
- ✅ Identity verification workflow
- ✅ Profile completion tracking

### Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Input validation and sanitization
- ✅ Rate limiting on sensitive endpoints
- ✅ CORS configuration
- ✅ Helmet for security headers

### Communication

- ✅ Email verification via Nodemailer
- ✅ SMS verification via Twilio
- ✅ Beautiful HTML email templates
- ✅ Fallback SMS simulation for development

## 📁 Project Structure

```
eBankingBack/
├── models/
│   ├── User.js              # User schema with authentication
│   └── Verification.js      # Verification codes schema
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── user.js             # User management routes
│   └── verification.js     # Verification routes
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── utils/
│   ├── jwt.js              # JWT token utilities
│   ├── generators.js       # Code generation utilities
│   ├── email.js            # Email sending utilities
│   └── sms.js              # SMS sending utilities
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies and scripts
└── server.js               # Main server file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Install Dependencies

```bash
cd eBankingBack
npm install
```

### 2. Environment Configuration

Copy the `.env` file and configure your environment variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ebanking

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS (Twilio - optional)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### 4. Run the Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

The server will start on `http://localhost:4022`

## 📱 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint               | Description              | Authentication |
| ------ | ---------------------- | ------------------------ | -------------- |
| POST   | `/register`            | Register new user        | Public         |
| POST   | `/login`               | Login user               | Public         |
| POST   | `/verify-email`        | Verify email address     | Public         |
| POST   | `/verify-phone`        | Verify phone number      | Public         |
| POST   | `/resend-verification` | Resend verification code | Public         |
| POST   | `/forgot-password`     | Request password reset   | Public         |
| POST   | `/reset-password`      | Reset password with code | Public         |
| POST   | `/logout`              | Logout user              | Private        |
| GET    | `/me`                  | Get current user         | Private        |

### User Routes (`/api/user`)

| Method | Endpoint                 | Description                 | Authentication |
| ------ | ------------------------ | --------------------------- | -------------- |
| GET    | `/profile`               | Get user profile            | Private        |
| PUT    | `/profile`               | Update basic profile        | Private        |
| PUT    | `/personal-info`         | Update personal information | Private        |
| PUT    | `/address-info`          | Update address information  | Private        |
| PUT    | `/identity-verification` | Submit identity documents   | Private        |
| PUT    | `/change-password`       | Change password             | Private        |
| DELETE | `/account`               | Delete account              | Private        |

### Verification Routes (`/api/verification`)

| Method | Endpoint               | Description                  | Authentication |
| ------ | ---------------------- | ---------------------------- | -------------- |
| POST   | `/send-verification`   | Send verification code       | Public         |
| POST   | `/verify-code`         | Verify any code              | Public         |
| POST   | `/verify-code-attempt` | Verify with attempt tracking | Public         |
| GET    | `/status/:userId`      | Get verification status      | Private        |
| DELETE | `/clear/:userId`       | Clear pending verifications  | Private        |

## 🔧 Usage Examples

### Register a New User

```bash
curl -X POST http://localhost:4022/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "password": "SecurePassword123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:4022/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

### Access Protected Route

```bash
curl -X GET http://localhost:4022/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔒 Security Features

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Rate Limiting

- Authentication endpoints: 5 attempts per 15 minutes
- Verification endpoints: 3 attempts per 5 minutes
- General API: 100 requests per 15 minutes

### Account Security

- Account lockout after 5 failed login attempts
- JWT tokens with expiration
- Refresh token rotation
- Password reset with time-limited codes

## 🧪 Development Features

### Email Simulation

When email credentials are not configured, the system will log email content to the console for development purposes.

### SMS Simulation

When Twilio is not configured, SMS messages will be logged to the console in development mode.

### Database Seeding

The system automatically creates indexes and handles database schema validation.

## 📊 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed validation errors if applicable"]
}
```

## 🚀 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI_PROD=mongodb+srv://user:pass@cluster.mongodb.net/ebanking
JWT_SECRET=very-secure-production-secret
```

### Security Checklist

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Configure production database
- [ ] Set up email service (SendGrid, SES, etc.)
- [ ] Configure SMS service (Twilio)
- [ ] Set up monitoring and logging
- [ ] Enable database backup

## 🤝 Integration with Frontend

The backend is designed to work seamlessly with the React Native frontend located in the `eBankingFront` folder. The API endpoints match the expected structure in the frontend components.

### Frontend Integration Points

- Login screen connects to `/api/auth/login`
- Registration flow uses `/api/auth/register`
- Verification screens use `/api/verification/*` endpoints
- Profile screens use `/api/user/*` endpoints

## 📝 Notes

- All timestamps are in ISO 8601 format
- Verification codes expire after 15 minutes
- User accounts are locked for 2 hours after 5 failed attempts
- Profile completion is tracked automatically
- All sensitive operations require authentication

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check if MongoDB is running
   - Verify connection string in `.env`

2. **Email Not Sending**

   - Check email credentials in `.env`
   - Verify app password for Gmail

3. **SMS Not Sending**

   - Verify Twilio credentials
   - Check phone number format

4. **JWT Token Issues**
   - Ensure JWT_SECRET is set
   - Check token expiration

## 📞 Support

For issues and questions related to the eBanking backend authentication system, please check the error logs and ensure all environment variables are properly configured.
