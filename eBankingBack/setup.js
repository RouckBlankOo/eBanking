#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up eBanking Backend...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envDevPath = path.join(__dirname, '.env.development');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envDevPath)) {
    fs.copyFileSync(envDevPath, envPath);
    console.log('✅ Created .env file from .env.development');
  } else {
    console.log('❌ No .env file found. Please create one based on .env.development');
    process.exit(1);
  }
} else {
  console.log('✅ .env file exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.log('❌ Failed to install dependencies');
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed');
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running (or update MONGODB_URI in .env)');
console.log('2. Configure email settings in .env (optional for development)');
console.log('3. Run: npm start or node server.js');
console.log('4. API will be available at: http://localhost:4022/api');
console.log('\n📖 Check README.md for detailed documentation');
