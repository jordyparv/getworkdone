function generateRandomUsername(length) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let username = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    username += charset.charAt(randomIndex);
  }

  return username;
}

// Usage:
const randomUsername = generateRandomUsername(8); // Change the length as needed
console.log(randomUsername);

export default generateRandomUsername;
