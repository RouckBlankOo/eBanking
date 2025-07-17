const crypto = require('crypto');

// Generate random verification code
const generateVerificationCode = (length = 6) => {
  const digits = '0123456789';
  let code = '';
  
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  
  return code;
};

// Generate secure random string
const generateSecureRandom = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate random user ID (for demo purposes)
const generateRandomUserId = () => {
  const adjectives = ['Swift', 'Bright', 'Smart', 'Quick', 'Sharp', 'Fast', 'Bold', 'Cool'];
  const nouns = ['User', 'Client', 'Member', 'Person', 'Individual', 'Customer', 'Account'];
  const numbers = Math.floor(Math.random() * 1000);
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective}${noun}${numbers}`;
};

module.exports = {
  generateVerificationCode,
  generateSecureRandom,
  generateRandomUserId
};
