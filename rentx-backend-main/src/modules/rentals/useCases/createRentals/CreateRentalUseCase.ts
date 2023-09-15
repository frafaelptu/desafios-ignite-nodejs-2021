import { AppError } from './../../../../shared/errors/AppError';
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;

}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumRentalHours = 24;

    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError("Car is unavailable!")
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError("User already have a rental!")
    }

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    )

    if (compare < minimumRentalHours) {
      throw new AppError("Invalid return time!")
    }

    await this.carsRepository.updateAvailable(car_id, false)

    return await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date
    })
  }
}

export { CreateRentalUseCase }