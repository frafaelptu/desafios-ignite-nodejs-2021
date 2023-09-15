import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
    brand,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand,
      id
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    return this.cars
      .filter(car => {
        if (car.available === true ||
          ((name && car.name === name) ||
            (brand && car.brand === brand) ||
            (category_id && car.category_id === category_id))
        ) {
          return car
        }
        return null
      })
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id)
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === id)
    this.cars[findIndex].available = available
  }
}

export { CarsRepositoryInMemory }