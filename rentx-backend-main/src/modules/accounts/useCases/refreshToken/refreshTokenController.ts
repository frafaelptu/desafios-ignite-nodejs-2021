import { RefreshTokenUseCase } from './refreshTokenUseCase';
import { container } from 'tsyringe';
import { Request, Response } from "express";

export class RefreshTokenController {

  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token ||
      req.headers["x-access-token"] ||
      req.query.token

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

    const refresh_token = await refreshTokenUseCase.execute(token)

    return res.json(refresh_token)
  }
}