import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../database/database.js';

const SECRET_KEY = process.env.JWT_SECRET || '';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!SECRET_KEY) {
            res.status(500).json({ error: 'JWT_SECRET is not configured' });
            return;
        }

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const user = result.rows[0];

        if(user.password !== password) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }  

        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ 
            message: 'Login successful',
            token: token,
            userId: { id: user.id, name: user.name, email: user.email }
        });
        console.log('User logged in:', user.email);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}