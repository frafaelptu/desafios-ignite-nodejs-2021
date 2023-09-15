import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { ICreateRentalDto } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from "../entities/Rental";


class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { car_id, end_date: null }
    })
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { user_id, end_date: null }
    })
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total
  }: ICreateRentalDto): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id)
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ["car"]
    })
  }
}

export { RentalRepository }