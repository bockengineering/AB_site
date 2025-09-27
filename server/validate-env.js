#!/usr/bin/env node

/**
 * Environment validation script
 * Checks if all required environment variables are set
 */

const requiredEnvVars = [
  'NODE_ENV',
  'PORT'
];

const optionalEnvVars = [
  'NOTION_API_KEY',
  'NOTION_PODCAST_DATABASE_ID',
  'MONGODB_URI',
  'JWT_SECRET'
];

console.log('🔍 Validating environment variables...\n');

let hasErrors = false;

// Check required variables
console.log('Required variables:');
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: ${process.env[varName]}`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    hasErrors = true;
  }
});

console.log('\nOptional variables:');
optionalEnvVars.forEach(varName => {
  if (process.env[varName]) {
    // Mask sensitive values
    const value = varName.includes('SECRET') || varName.includes('KEY') || varName.includes('URI')
      ? '***' + process.env[varName].slice(-4)
      : process.env[varName];
    console.log(`✅ ${varName}: ${value}`);
  } else {
    console.log(`⚠️  ${varName}: NOT SET (optional)`);
  }
});

if (hasErrors) {
  console.log('\n❌ Environment validation failed!');
  process.exit(1);
} else {
  console.log('\n✅ Environment validation passed!');
  process.exit(0);
}