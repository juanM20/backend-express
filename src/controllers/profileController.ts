import { type Request, type Response } from "express";
import prisma from "../database/prismaClient.js";

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { userId, bio, avatarUrl } = req.body;
    const profile = await prisma.profile.create({
      data: {
        userId,
        bio,
        avatarUrl,
      },
    });
    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

