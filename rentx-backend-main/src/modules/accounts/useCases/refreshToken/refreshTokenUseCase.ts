import { AppError } from './../../../../shared/errors/AppError';
import { IUsersTokensRepository } from './../../repositories/IUsersTokensRepository';
import { verify, sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe';
import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!")
    }

    const {
      secret_token,
      secret_refresh_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user_id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    })

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token
    })

    return {
      token: newToken,
      refresh_token
    }
  }
}