import { Router } from "express"
import { createProfile } from "../controllers/profileController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", authenticateToken, createProfile);

export default router;