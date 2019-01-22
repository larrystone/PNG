const min = 100000000;
const max = 999999999
const generateNumber = () => 0 + `${Math.random() * (max - min) + min}`.substring(0, 9);

export default (total) => {
  const numbers = new Set();
  for (let i = 0; i < total; i += 1) {
    numbers.add(generateNumber());
  }

  return [...numbers].sort();
};
