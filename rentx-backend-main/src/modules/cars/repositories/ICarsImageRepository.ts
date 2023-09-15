import { CarsImage } from "../infra/typeorm/entities/CarsImage";

interface ICarsImageRepository {
  create(car_id: string, image_name: string): Promise<CarsImage>;
}

export { ICarsImageRepository }