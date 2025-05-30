import jwt from "jsonwebtoken";

const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Login first" });
    }

    const decodedData = jwt.verify(token, process.env.VERIFY_CODE);

    req.user = decodedData.id;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
const admin = async (req, res, next) => {
  try {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
      return res.status(401).json({ success: false, message: "Only admin can access" });
    }

    const decodedData = jwt.verify(adminToken, process.env.VERIFY_CODE);

    req.user = decodedData.id;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export  {isAuthenticate,admin};
