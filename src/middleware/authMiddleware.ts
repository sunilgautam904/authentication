import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  const accessSecret = process.env.JWT_ACCESS_SECRET || '';
  try {
    const decoded = jwt.verify(token, accessSecret) as any;
    req.user = decoded.userId;
    next();
  } catch (error: any) {
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};
