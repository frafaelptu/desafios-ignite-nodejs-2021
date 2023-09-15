import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class ListRentalByUserUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository
  ) { }

  async execute(user_id: string): Promise<Rental[]> {
    return await this.rentalRepository.findByUser(user_id)
  }
}


