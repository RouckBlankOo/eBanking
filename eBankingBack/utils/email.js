const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send verification email
const sendVerificationEmail = async (email, code, fullName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"eBanking" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification - eBanking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin-bottom: 10px;">eBanking</h1>
            <p style="color: #666; font-size: 16px;">Secure Digital Banking</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Hello ${fullName || 'User'},
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Thank you for creating an account with eBanking. To complete your registration, please verify your email address using the code below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: #007bff; color: white; font-size: 24px; font-weight: bold; padding: 15px 30px; border-radius: 5px; display: inline-block; letter-spacing: 2px;">
                ${code}
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.5;">
              This code will expire in 15 minutes. If you didn't create an account with eBanking, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; color: #999; font-size: 12px;">
            <p>© 2025 eBanking. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `,
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, code, fullName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"eBanking" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset - eBanking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin-bottom: 10px;">eBanking</h1>
            <p style="color: #666; font-size: 16px;">Secure Digital Banking</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Hello ${fullName || 'User'},
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              We received a request to reset your password. Use the code below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: #dc3545; color: white; font-size: 24px; font-weight: bold; padding: 15px 30px; border-radius: 5px; display: inline-block; letter-spacing: 2px;">
                ${code}
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.5;">
              This code will expire in 15 minutes. If you didn't request a password reset, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; color: #999; font-size: 12px;">
            <p>© 2025 eBanking. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `,
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};
