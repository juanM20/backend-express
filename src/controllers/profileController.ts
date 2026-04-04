import { type Request, type Response } from "express";
import {prisma} from "../../lib/prisma";

interface profile {
  bio?: string;
  avatar_url?: string;
}

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { bio, avatarUrl } = req.body;
    const { userId } = req.user || {};
    console.log("Creating profile for userId:", userId);
    if(!userId) {
        res.status(401).json({ error: "User ID is required" });
        return;
    }

    
    // Verificar si ya existe un perfil para este usuario
    const existingProfile = await prisma.profiles.findUnique({
      where: { user_id: userId },
    });

    if (existingProfile) {
      return res.status(409).json({ error: 'Profile already exists for this user' });
    }

    const profile = await prisma.profiles.create({
      data: {
        user_id: userId,
        bio,
        avatar_url: avatarUrl,
      },
    });
    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { bio, avatarUrl } = req.body;
    const { userId } = req.user || {};
    console.log("Updating profile for userId:", userId);
    if(!userId) {
        res.status(401).json({ error: "User ID is required" });
        return;
    }

    const data: Partial<profile> = {};
    if (bio !== undefined) data.bio = bio;
    if (avatarUrl !== undefined) data.avatar_url = avatarUrl;

    const profile = await prisma.profiles.update({
      where: { user_id: userId },
      data,
    });
    res.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};