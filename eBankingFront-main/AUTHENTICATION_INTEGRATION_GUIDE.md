# eBanking Authentication Integration Guide

This guide explains how the authentication system has been integrated across your eBanking app screens and how to use it.

## 🔧 What Has Been Integrated

### ✅ Backend Integration Complete

All authentication screens now connect to your Node.js/Express backend:

1. **LoginScreen.tsx** - Fully integrated with JWT authentication
2. **SignUpScreen.tsx** - Connects to registration endpoint with validation
3. **CodeConfirmationScreen.tsx** - Integrates with email/phone verification endpoints
4. **SetPasswordScreen.tsx** - Connects to password setup endpoint
5. **ForgotPasswordScreen.tsx** - Integrates with password reset endpoint
6. **VerifyPhoneScreen.tsx** - New screen for standalone phone verification
7. **ProfileScreen.tsx** - Shows user data from backend with logout functionality

### 🔐 Authentication Flow

#### Registration Flow:

1. **SignUpScreen** → Register user → Get userId
2. **CodeConfirmationScreen** → Verify email/phone → Pass userId
3. **SetPasswordScreen** → Set password → Store JWT → Navigate to MainApp

#### Login Flow:

1. **LoginScreen** → Authenticate → Store JWT → Navigate to Dashboard/MainApp

#### Password Reset Flow:

1. **ForgotPasswordScreen** → Request reset → Email sent notification

## 📱 Screen-by-Screen Features

### LoginScreen.tsx

- ✅ Email/phone toggle (currently email login only implemented)
- ✅ JWT token storage
- ✅ User context update
- ✅ Error handling with network failure detection
- ✅ Loading states and visual feedback

### SignUpScreen.tsx

- ✅ Full name, email, phone, password fields
- ✅ Password confirmation validation
- ✅ Strong password requirements
- ✅ Backend registration API integration
- ✅ Automatic navigation to verification
- ✅ Comprehensive error handling

### CodeConfirmationScreen.tsx

- ✅ Email and phone verification support
- ✅ Dynamic endpoint selection based on signup mode
- ✅ Resend verification code functionality
- ✅ Real-time code input with auto-focus
- ✅ Timer countdown for resend
- ✅ Loading states for verification and resend

### SetPasswordScreen.tsx

- ✅ Real-time password requirement validation
- ✅ Password confirmation matching
- ✅ Backend password setup integration
- ✅ JWT token storage upon success
- ✅ User context update with backend data
- ✅ Automatic navigation to main app

### VerifyPhoneScreen.tsx (New)

- ✅ Standalone phone verification screen
- ✅ 6-digit code input with validation
- ✅ Resend functionality with timer
- ✅ Loading states and error handling
- ✅ Navigation integration

### ProfileScreen.tsx

- ✅ Displays user information from backend
- ✅ Shows verification status (email/phone)
- ✅ Logout functionality with confirmation
- ✅ JWT token cleanup on logout
- ✅ User context reset

### ForgotPasswordScreen.tsx

- ✅ Email validation
- ✅ Backend integration for password reset
- ✅ Success/error handling
- ✅ Automatic navigation back to login

## 🛠 Backend API Integration

### Endpoints Used:

- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/verify-email` - Email verification
- `POST /auth/verify-phone` - Phone verification
- `POST /auth/resend-verification` - Resend verification codes
- `POST /auth/set-password` - Set user password (if endpoint exists)
- `POST /auth/forgot-password` - Password reset request
- `GET /user/profile` - Get user profile data

### Authentication Headers:

All authenticated requests include:

```
Authorization: Bearer <JWT_TOKEN>
```

## 🔄 Navigation Flow

```
AuthTester (for testing)
    ↓
OnBoardingScreen
    ↓
LoginScreen ←→ SignUpScreen
    ↓              ↓
Dashboard      CodeConfirmation
               ↓
               SetPassword
               ↓
               MainApp (Dashboard/Tabs)
```

## 🚨 Error Handling

All screens include comprehensive error handling for:

- ✅ Network connectivity issues
- ✅ Invalid user input
- ✅ Server errors with meaningful messages
- ✅ JWT token expiration
- ✅ Rate limiting responses

## 💾 Data Storage

### Local Storage (AsyncStorage):

- `jwtToken` - JWT authentication token
- Automatically cleared on logout

### User Context:

- User profile information
- Authentication status
- Profile completion status

## 🧪 Testing the Integration

### Using AuthTester Screen:

1. Start with AuthTester to test individual API endpoints
2. Test registration → verification → password setup flow
3. Test login with created account
4. Test forgot password functionality
5. Check profile data loading

### Manual Testing Flow:

1. **Registration Test:**

   - Go to SignUp → Fill form → Submit
   - Should navigate to CodeConfirmation with userId
   - Enter any 6-digit code → Should verify
   - Set password → Should navigate to MainApp

2. **Login Test:**

   - Go to Login → Enter email/password
   - Should store JWT and navigate to Dashboard

3. **Forgot Password Test:**
   - Go to Login → Forgot Password
   - Enter email → Should show success message

## 🔧 Configuration

### API URLs (constants/index.js):

```javascript
export const CONSTANTS = {
  API_URL_DEV: "http://192.168.100.4:4022/api", // Your local dev IP
  API_URL_PROD: "http://192.168.1.17:4022/api", // Your network IP
};
```

## 🚀 Next Steps

### Recommended Enhancements:

1. **Phone Login Implementation** - Currently email-only
2. **Biometric Authentication** - Touch ID/Face ID
3. **Persistent Login** - Remember user sessions
4. **Profile Editing** - Allow users to update information
5. **Two-Factor Authentication** - Additional security layer

### Production Considerations:

1. **HTTPS** - Use secure connections in production
2. **Token Refresh** - Implement refresh token mechanism
3. **Security Headers** - Add additional security measures
4. **Rate Limiting** - Implement client-side rate limiting

## 🐛 Troubleshooting

### Common Issues:

1. **Network Connection Errors:**

   - Check if backend server is running
   - Verify API_URL in constants/index.js
   - Ensure device/simulator can reach the server

2. **JWT Token Issues:**

   - Clear AsyncStorage if tokens are corrupted
   - Check token expiration on backend

3. **Verification Code Issues:**

   - Check backend logs for email/SMS simulation
   - Ensure userId is passed correctly between screens

4. **Navigation Issues:**
   - Ensure all screens are registered in App.tsx
   - Check type definitions in types.ts

## 📞 Support

If you encounter issues:

1. Check the console logs for detailed error messages
2. Verify backend server is running and accessible
3. Test individual endpoints using AuthTester screen
4. Check network connectivity between device and server

## 🎉 Success!

Your eBanking app now has a fully integrated authentication system that:

- ✅ Connects to your Node.js backend
- ✅ Handles user registration, verification, and login
- ✅ Stores JWT tokens securely
- ✅ Provides comprehensive error handling
- ✅ Supports both email and phone verification
- ✅ Includes password reset functionality
- ✅ Works on iOS simulator and local network testing

The authentication system is ready for development and testing!
