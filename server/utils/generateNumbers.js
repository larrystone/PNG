const generateNumber = () => 0 + (`${Math.random()}`).substring(2, 11);

export default (total = 20) => {
  const numbers = new Set();
  for (let i = 0; i < total; i += 1) {
    numbers.add(generateNumber());
  }

  return [...numbers].sort();
};
