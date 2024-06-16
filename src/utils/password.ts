import crypto from 'crypto'

export function hashPassword(password: string): {
  salt: string
  hashedPassword: string
} {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.createHash('sha256')
  hash.update(salt + password)
  const hashedPassword = hash.digest('hex')
  return {
    salt,
    hashedPassword,
  }
}

export function comparePasswords(
  plainPassword: string,
  salt: string,
  hashedPassword: string,
): boolean {
  const hash = crypto.createHash('sha256')
  hash.update(salt + plainPassword)
  const hashedPlainPassword = hash.digest('hex')
  return hashedPlainPassword === hashedPassword
}

// Example usage:
/*
const { salt, hashedPassword } = hashPassword('mySecretPassword');

console.log('Salt:', salt);
console.log('Hashed Password:', hashedPassword);

const plainTextPassword = 'mySecrestPassword';
const passwordsMatch = comparePasswords(plainTextPassword, salt, hashedPassword);

console.log('Do passwords match?', passwordsMatch);
*/
