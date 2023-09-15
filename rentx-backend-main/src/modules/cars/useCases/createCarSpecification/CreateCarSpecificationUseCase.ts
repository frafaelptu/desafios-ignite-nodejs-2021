import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { AppError } from '@shared/errors/AppError';
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) { }

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carAllreadyExists = await this.carsRepository.findById(car_id)

    if (!carAllreadyExists) {
      throw new AppError("Car does not exists!")
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )

    carAllreadyExists.specifications = specifications

    await this.carsRepository.create(carAllreadyExists)

    return carAllreadyExists
  }
}

export { CreateCarSpecificationUseCase }