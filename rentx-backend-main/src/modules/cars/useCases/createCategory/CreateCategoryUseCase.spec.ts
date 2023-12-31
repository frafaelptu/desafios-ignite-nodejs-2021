import { AppError } from "@errors/AppError"
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    }
    await createCategoryUseCase.execute(category)

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(createdCategory).toHaveProperty("id");
    expect(createdCategory.name).toContain(category.name);
  })

  it("should not be able to create a category that already exists", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    }

    await createCategoryUseCase.execute(category)

    await expect(async () => {
      await createCategoryUseCase.execute(category)
    }).rejects.toEqual(new AppError("Category Category Test already exists"));
  })
})