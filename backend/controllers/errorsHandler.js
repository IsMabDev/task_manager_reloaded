const Prisma = require("@prisma/client");

const errorsHandler = (err, req, res, next) => {
  
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(400).json({ message: "Email already exists.", source:err.source });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message: "verify your credentials",error: err.message, source:err.source });
  }
  console.error(`[${err.source || "Unknown Source"}]: ${err.message}`);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    source: err.source || "Unknown Source",
  });
};

module.exports = errorsHandler;