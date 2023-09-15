import { container } from 'tsyringe'

import '@shared/container/providers'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'

import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository'
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository'

import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository'
import { RentalRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository'

import { UsersTokensRepository } from './../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersTokensRepository } from './../../modules/accounts/repositories/IUsersTokensRepository';

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
)

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
)

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)