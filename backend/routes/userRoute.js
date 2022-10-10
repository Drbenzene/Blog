import express from 'express';
import { registerUser, loginUser, verifyEmail, Dashboard  } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify/:email/:token', verifyEmail);
userRouter.get('/dashboard', protect, Dashboard  )

export default userRouter;

