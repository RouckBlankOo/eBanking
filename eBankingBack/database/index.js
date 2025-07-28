const mongoose = require('mongoose');

const Achievement = require('./models/Achievement');
const Address = require('./models/Address');
const Bank = require('./models/Bank');
const BankTransfer = require('./models/BankTransfer');
const Card = require('./models/Card');
const CryptoTransaction = require('./models/CryptoTransaction');
const CryptoWallet = require('./models/CryptoWallet');
const Notification = require('./models/Notification');
const Referral = require('./models/Referral');
const Transaction = require('./models/Transaction');
const User = require('./models/User');

const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = {
  connectToDatabase,
  Achievement,
  Address,
  Bank,
  BankTransfer,
  Card,
  CryptoTransaction,
  CryptoWallet,
  Notification,
  Referral,
  Transaction,
  User,
};
