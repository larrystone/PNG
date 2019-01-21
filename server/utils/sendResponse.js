export default (res, statusCode, data) => {
  res.status(statusCode).json(data);
};
