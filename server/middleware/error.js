export const handleApiError = (err, req, res, next) => {
    
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;
  return res.status(err.statusCode).json({
    success: false,
    messasge: err.message,
  });
};
