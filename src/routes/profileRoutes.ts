import { Router } from "express"
import { createProfile, updateProfile } from "../controllers/profileController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", authenticateToken, createProfile);
router.patch("/update", authenticateToken, updateProfile);

export default router;