# eBanking Backend API Documentation

## Base URL

```
http://localhost:4022/api
```

## Authentication

Most endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Response Format

All responses follow this format:

```json
{
  "success": true|false,
  "message": "Description",
  "data": {...} // Optional
}
```

## Authentication Endpoints

### 1. Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "password": "SecurePassword123!"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully. Verification codes sent to email and phone.",
  "data": {
    "userId": "user_id_here",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "fullName": "John Doe"
  }
}
```

### 2. Login User

**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_access_token_here",
  "refreshToken": "jwt_refresh_token_here",
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "emailVerified": false,
    "phoneVerified": false,
    "profileCompletionStatus": {
      "personalInformation": false,
      "addressInformation": false,
      "identityVerification": false
    }
  }
}
```

### 3. Verify Email

**POST** `/auth/verify-email`

Verify email address with verification code.

**Request Body:**

```json
{
  "userId": "user_id_here",
  "code": "123456"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### 4. Verify Phone

**POST** `/auth/verify-phone`

Verify phone number with verification code.

**Request Body:**

```json
{
  "userId": "user_id_here",
  "code": "123456"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Phone number verified successfully"
}
```

### 5. Resend Verification

**POST** `/auth/resend-verification`

Resend verification code to email or phone.

**Request Body:**

```json
{
  "userId": "user_id_here",
  "type": "email" // or "phone"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Verification code sent to your email"
}
```

### 6. Forgot Password

**POST** `/auth/forgot-password`

Request password reset code.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "If an account with this email exists, a password reset code has been sent"
}
```

### 7. Reset Password

**POST** `/auth/reset-password`

Reset password using verification code.

**Request Body:**

```json
{
  "email": "john@example.com",
  "code": "123456",
  "newPassword": "NewSecurePassword123!"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

### 8. Logout

**POST** `/auth/logout`

Logout user and invalidate refresh token.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Request Body:**

```json
{
  "refreshToken": "refresh_token_here"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 9. Get Current User

**GET** `/auth/me`

Get current authenticated user information.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "emailVerified": true,
    "phoneVerified": true,
    "profileCompletionStatus": {...}
  }
}
```

## User Management Endpoints

### 1. Get Profile

**GET** `/user/profile`

Get complete user profile.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "emailVerified": true,
    "phoneVerified": true,
    "profileCompletionStatus": {
      "personalInformation": false,
      "addressInformation": false,
      "identityVerification": false
    },
    "personalInfo": {...},
    "addressInfo": {...},
    "identityVerification": {...},
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 2. Update Profile

**PUT** `/user/profile`

Update basic profile information.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Request Body:**

```json
{
  "fullName": "John Updated Doe",
  "phoneNumber": "+1234567891"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    // Updated user object
  }
}
```

### 3. Update Personal Information

**PUT** `/user/personal-info`

Update personal information for KYC.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Request Body:**

```json
{
  "dateOfBirth": "1990-01-01",
  "nationality": "American",
  "occupation": "Software Engineer",
  "employmentStatus": "employed",
  "monthlyIncome": 5000,
  "sourceOfIncome": "Salary from tech company"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Personal information updated successfully",
  "data": {
    "personalInfo": {...},
    "profileCompletionStatus": {
      "personalInformation": true,
      "addressInformation": false,
      "identityVerification": false
    }
  }
}
```

### 4. Update Address Information

**PUT** `/user/address-info`

Update address information.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Request Body:**

```json
{
  "street": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "postalCode": "10001",
  "country": "United States",
  "residenceType": "owned"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Address information updated successfully",
  "data": {
    "addressInfo": {...},
    "profileCompletionStatus": {
      "personalInformation": true,
      "addressInformation": true,
      "identityVerification": false
    }
  }
}
```

### 5. Submit Identity Verification

**PUT** `/user/identity-verification`

Submit identity verification documents.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Request Body:**

```json
{
  "documentType": "passport",
  "documentNumber": "A12345678",
  "documentImages": [
    "https://example.com/document1.jpg",
    "https://example.com/document2.jpg"
  ]
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Identity verification information submitted successfully",
  "data": {
    "identityVerification": {
      "documentType": "passport",
      "documentNumber": "A12345678",
      "documentImages": [...],
      "verificationStatus": "pending"
    },
    "profileCompletionStatus": {
      "personalInformation": true,
      "addressInformation": true,
      "identityVerification": true
    }
  }
}
```

### 6. Change Password

**PUT** `/user/change-password`

Change user password.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Request Body:**

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### 7. Delete Account

**DELETE** `/user/account`

Delete user account permanently.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Request Body:**

```json
{
  "password": "CurrentPassword123!",
  "confirmDeletion": "DELETE"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

## Verification Endpoints

### 1. Send Verification Code

**POST** `/verification/send-verification`

Send verification code to user's email or phone.

**Request Body:**

```json
{
  "userId": "user_id_here", // Optional if email/phone provided
  "phoneNumber": "+1234567890", // Optional
  "email": "john@example.com", // Optional
  "type": "email" // or "phone"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Verification code sent to your email",
  "data": {
    "userId": "user_id_here",
    "contact": "john@example.com",
    "expiresIn": 15
  }
}
```

### 2. Verify Code

**POST** `/verification/verify-code`

Verify any type of verification code.

**Request Body:**

```json
{
  "userId": "user_id_here",
  "code": "123456",
  "type": "email" // "email", "phone", or "password_reset"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "verifiedAt": "2025-01-01T00:00:00.000Z",
    "type": "email"
  }
}
```

### 3. Verify Code with Attempt Tracking

**POST** `/verification/verify-code-attempt`

Verify code with attempt counting.

**Request Body:**

```json
{
  "userId": "user_id_here",
  "code": "123456",
  "type": "email"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "verifiedAt": "2025-01-01T00:00:00.000Z",
    "type": "email"
  }
}
```

**Error Response (400) - Wrong Code:**

```json
{
  "success": false,
  "message": "Invalid verification code. 3 attempts remaining",
  "data": {
    "remainingAttempts": 3,
    "attemptsUsed": 2
  }
}
```

### 4. Get Verification Status

**GET** `/verification/status/:userId`

Get verification status for user.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "emailVerified": true,
    "phoneVerified": false,
    "profileCompletionStatus": {
      "personalInformation": true,
      "addressInformation": false,
      "identityVerification": false
    },
    "profileCompletionPercentage": 33,
    "pendingVerifications": [
      {
        "type": "phone",
        "contact": "+1234567890",
        "expiresAt": "2025-01-01T00:15:00.000Z",
        "attempts": 1,
        "remainingAttempts": 4
      }
    ]
  }
}
```

### 5. Clear Pending Verifications

**DELETE** `/verification/clear/:userId`

Clear all pending verifications for user.

**Headers:** `Authorization: Bearer YOUR_TOKEN`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Pending verifications cleared",
  "data": {
    "deletedCount": 2
  }
}
```

## Error Responses

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Authentication Error (401)

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Access Denied (403)

```json
{
  "success": false,
  "message": "Access denied"
}
```

### Not Found (404)

```json
{
  "success": false,
  "message": "User not found"
}
```

### Rate Limit (429)

```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Rate Limits

- **Authentication endpoints**: 5 requests per 15 minutes
- **Verification endpoints**: 3 requests per 5 minutes
- **General API endpoints**: 100 requests per 15 minutes

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@$!%\*?&)

## Testing

### Health Check

**GET** `/health`

Check if API is running.

**Success Response (200):**

```json
{
  "success": true,
  "message": "eBanking Backend API is running",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### Example cURL Commands

**Register:**

```bash
curl -X POST http://localhost:4022/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","phoneNumber":"+1234567890","password":"SecurePassword123!"}'
```

**Login:**

```bash
curl -X POST http://localhost:4022/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePassword123!"}'
```

**Get Profile:**

```bash
curl -X GET http://localhost:4022/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
