import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user";
import { validationResult } from "express-validator";
import UserInterface from "../interfaces/user.interface";

class UserController {
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            // Your existing createUser logic here
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email, phoneNumber, password }: UserInterface = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            // Check if user with email already exists
            let user = await User.findOne({ where: { email } });
            if (user) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            user = await User.create({
                firstName,
                lastName,
                email,
                phoneNumber,
                password: hashedPassword,
            });

            res.status(201).json({ message: "User registered successfully",data:user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: UserInterface = req.body;

            // Check if user exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }

            // Access the JWT secret key from environment variable
            const jwtSecret: Secret | undefined = process.env.JWT_SECRET;

            if (!jwtSecret) {
                throw new Error('JWT secret key is not defined');
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

            res.status(200).json({message:"Login Successful", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new UserController();
