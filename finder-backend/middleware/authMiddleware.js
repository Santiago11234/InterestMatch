// import jwt from 'jsonwebtoken';

// const secretKey = process.env.SECRET_KEY;
// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. Missing token' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, secretKey);
//     req.user = decodedToken;
//     next();
//   } catch (err) {
//     res.status(403).json({ error: 'Invalid token' });
//   }
// };

// export default authMiddleware;
