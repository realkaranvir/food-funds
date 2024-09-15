import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Forbidden: Invalid or expired token" });
    }

    req.user = decoded; // Attach decoded token data to the request
    next();
  });
};

/**
 * Function to sign a JWT token
 * @param {Object} payload - Data to be included in the token (e.g., user details)
 * @param {String} expiresIn - Optional expiration time for the token (e.g., '1h', '7d')
 * @returns {String} - The signed JWT token
 */

export const signToken = (payload, expiresIn) => {
  // Sign the token using the payload and secret key
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};
