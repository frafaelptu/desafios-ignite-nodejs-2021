import { IUserResponseDTO } from "../dto/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";
import { instanceToInstance } from 'class-transformer'

export class UserMap {
  static toDTO({
    id,
    email,
    name,
    avatar,
    driver_license,
    avatar_url
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      email,
      name,
      avatar,
      driver_license,
      avatar_url
    })

    return user
  }
}