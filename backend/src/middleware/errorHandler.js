function notFound(req, res, next) {
  res.status(404).json({ success: false, message: 'Route not found' });
}
function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Server error',
    details: err.details || undefined
  });
}
module.exports = { notFound, errorHandler };