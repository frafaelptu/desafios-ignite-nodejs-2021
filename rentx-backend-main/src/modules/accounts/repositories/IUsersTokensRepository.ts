import { UserTokens } from '../infra/typeorm/entities/UserTokens';
import { ICreateUserTokenDTO } from './../dto/ICreateUserTokenDTO';

export interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateUserTokenDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>
  deleteById(refresh_token_id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UserTokens>
}