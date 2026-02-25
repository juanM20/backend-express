import express from 'express';
import userRoutes from './routes/userRoutes.js';

console.log('Starting app (top of module)');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});