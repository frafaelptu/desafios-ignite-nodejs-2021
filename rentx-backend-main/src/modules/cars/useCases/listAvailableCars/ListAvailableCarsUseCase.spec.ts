import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory()
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
	})
	it('should be able to list all available cars', async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car1",
			description: "Car description",
			daily_rate: 110.00,
			license_plate: "ABC-123",
			fine_amount: 40.00,
			brand: "Car Brand",
			category_id: "cateegory_id"
		})

		const cars = await listAvailableCarsUseCase.execute({})

		expect(cars).toEqual([car])
	})

	it("should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car2",
			description: "Car description",
			daily_rate: 110.00,
			license_plate: "ABC-123",
			fine_amount: 40.00,
			brand: "Car Brand 2",
			category_id: "cateegory_id2"
		})

		const cars = await listAvailableCarsUseCase.execute({
			name: "Car2",
		})

		expect(cars).toEqual([car])
	})

	it("should be able to list all available cars by brand", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car3",
			description: "Car description",
			daily_rate: 110.00,
			license_plate: "ABC-123",
			fine_amount: 40.00,
			brand: "Car Brand 3",
			category_id: "cateegory_id3"
		})

		const cars = await listAvailableCarsUseCase.execute({
			brand: "Car Brand 3",
		})

		expect(cars).toEqual([car])
	})

	it("should be able to list all available cars by category", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car4",
			description: "Car description",
			daily_rate: 110.00,
			license_plate: "ABC-123",
			fine_amount: 40.00,
			brand: "Car Brand 4",
			category_id: "cateegory_id4"
		})

		const cars = await listAvailableCarsUseCase.execute({
			category_id: "cateegory_id4",
		})

		expect(cars).toEqual([car])
	})
})