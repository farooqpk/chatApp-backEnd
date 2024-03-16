import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const findUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        username: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "there is an error while fetching user",
    });
  }
};
