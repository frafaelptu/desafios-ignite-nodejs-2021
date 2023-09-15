import { ListRentalByUserController } from './../../../../modules/rentals/useCases/listRentalByUser/ListRentalByUserController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRentals/CreateRentalController'
import { Router } from 'express'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalByUserController = new ListRentalByUserController()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle)
rentalRoutes.get('/user', ensureAuthenticated, listRentalByUserController.handle)

export { rentalRoutes }