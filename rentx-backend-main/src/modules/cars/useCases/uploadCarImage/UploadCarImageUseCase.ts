import { IStorageProvider } from './../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute({
    car_id,
    images_names
  }: IRequest): Promise<void> {
    images_names.map(async (image) => {
      await this.carsImageRepository.create(car_id, image)
      await this.storageProvider.save(image, 'cars')
    })
  }
}

export { UploadCarImageUseCase }