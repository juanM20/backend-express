import { Router } from "express"
import { createProfile } from "../controllers/profileController.js";

const router = Router();

router.post("/create", createProfile);

export default router;