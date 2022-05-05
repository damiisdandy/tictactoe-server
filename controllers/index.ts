import e, { RequestHandler } from "express";
import { prisma } from "../app";
import { generateID } from "../utils";

const serverError = (res: any, error: any) =>
  res.status(500).json({
    status: false,
    message: 'Internal Server Error',
    error_message: error.toString(),
  });


export const createGame: RequestHandler = async (req, res) => {
  try {
    const { creator } = req.body;
    if (!creator) {
      return res.status(400).json({
        status: false,
        data: null,
        message: `Creator's id is required! (creator)`
      })
    } else {
      // delete previous games when creating a new game
      await prisma.game.deleteMany({
        where: {
          creator,
        }
      });
      const data = await prisma.game.create({
        data: {
          board: `[
            [null, null, null],
            [null, null, null],
            [null, null, null],
          ]`,
          code: generateID(8),
          creator,
        }
      });
      return res.status(201).json({
        status: true,
        data,
        message: "game successfully created"
      })
    }

  } catch (err) {
    serverError(res, err);
  }
}

export const getGame: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const game = await prisma.game.findFirst({
      where: {
        code,
      }
    })
    if (!game) {
      return res.status(404).json({
        status: false,
        data: null,
        message: 'game does not exist',
      })
    } else {
      return res.status(200).json({
        status: true,
        data: game,
        message: 'success'
      })
    }
  } catch (err) {
    serverError(res, err)
  }
}