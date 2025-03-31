import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";
//import { randomUUID } from "crypto";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { UID, password } = req.body;
    const user = await registerUser(UID, password);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { UID, password } = req.body;
    const token = await loginUser(UID, password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
