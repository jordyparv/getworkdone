function generateRandomUsername(length = 8) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let username = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    username += charset.charAt(randomIndex);
  }

  return username;
}

export default generateRandomUsername;
