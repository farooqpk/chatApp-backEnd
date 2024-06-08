import { Request, Response } from "express";
import { clearFromRedis, getDataFromRedis } from "../../redis";
import { prisma } from "../../utils/prisma";
import { createJwtToken } from "../../utils/createJwtToken";

export const loginToken = async (req: Request, res: Response) => {
  try {
    const userId = req.body?.userId;
    const token = req.body?.loginToken;

    if (!token || !userId) {
      return res.status(400).json({
        success: false,
        message: "token or userId is missing",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        username: true,
        publicKey: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const storedLoginToken = await getDataFromRedis(
      `loginToken:${userId}`,
      true
    );

    if (!storedLoginToken || storedLoginToken !== token) {
      return res.status(400).json({
        success: false,
        message: "login token is invalid",
      });
    }

    // remove login token from redis
    await clearFromRedis({ key: `loginToken:${userId}` });

    const accesstoken = createJwtToken(
      user.userId,
      user.username,
      user.publicKey,
      "access"
    );
    const refreshtoken = createJwtToken(
      user.userId,
      user.username,
      user.publicKey,
      "refresh"
    );

    return res.status(200).json({
      success: true,
      message: "login token verified successfully",
      accesstoken,
      refreshtoken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
