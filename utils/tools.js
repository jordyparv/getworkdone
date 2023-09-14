export const sanitizeInput = (input) => {
  input = input.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '');
  return input.trim();
};
