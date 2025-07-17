const twilio = require('twilio');

// Initialize Twilio client
let twilioClient = null;

const initializeTwilio = () => {
  if (!twilioClient && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return twilioClient;
};

// Send SMS verification code
const sendSMS = async (phoneNumber, code, fullName) => {
  try {
    const client = initializeTwilio();
    
    if (!client) {
      console.warn('Twilio not configured, simulating SMS send');
      console.log(`SMS would be sent to ${phoneNumber}: Your eBanking verification code is: ${code}`);
      return { 
        success: true, 
        message: 'SMS simulated (Twilio not configured)',
        sid: 'simulated_' + Date.now()
      };
    }

    const message = await client.messages.create({
      body: `Hello ${fullName || 'User'}, your eBanking verification code is: ${code}. This code expires in 15 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    console.log('SMS sent successfully:', message.sid);
    return {
      success: true,
      message: 'SMS sent successfully',
      sid: message.sid
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    
    // Fallback for development - log the code
    if (process.env.NODE_ENV === 'development') {
      console.log(`SMS would be sent to ${phoneNumber}: Your eBanking verification code is: ${code}`);
      return { 
        success: true, 
        message: 'SMS simulated (development mode)',
        sid: 'dev_' + Date.now()
      };
    }
    
    throw error;
  }
};

// Send password reset SMS
const sendPasswordResetSMS = async (phoneNumber, code, fullName) => {
  try {
    const client = initializeTwilio();
    
    if (!client) {
      console.warn('Twilio not configured, simulating SMS send');
      console.log(`Password reset SMS would be sent to ${phoneNumber}: ${code}`);
      return { 
        success: true, 
        message: 'SMS simulated (Twilio not configured)',
        sid: 'simulated_' + Date.now()
      };
    }

    const message = await client.messages.create({
      body: `Hello ${fullName || 'User'}, your eBanking password reset code is: ${code}. This code expires in 15 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    console.log('Password reset SMS sent successfully:', message.sid);
    return {
      success: true,
      message: 'SMS sent successfully',
      sid: message.sid
    };
  } catch (error) {
    console.error('Error sending password reset SMS:', error);
    
    // Fallback for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Password reset SMS would be sent to ${phoneNumber}: ${code}`);
      return { 
        success: true, 
        message: 'SMS simulated (development mode)',
        sid: 'dev_' + Date.now()
      };
    }
    
    throw error;
  }
};

module.exports = {
  sendSMS,
  sendPasswordResetSMS
};
