import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

import dayjs from "dayjs"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    )
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'Test',
      fine_amount: 40,
      category_id: '12345',
      brand: 'Test'
    })

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if user already have a rental', async () => {
    await rentalRepositoryInMemory.create({
      user_id: "test",
      car_id: "1111",
      expected_return_date: dayAdd24Hours
    })

    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "121212",
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toEqual(new AppError("User already have a rental!"))
  })

  it('should not be able to create a new rental if car already have a rental', async () => {
    await rentalRepositoryInMemory.create({
      user_id: "123",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })

    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toEqual(new AppError("Car is unavailable!"))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      })

    }).rejects.toEqual(new AppError("Invalid return time!"))
  })
})