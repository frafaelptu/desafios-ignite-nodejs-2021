import uploadConfig from '@config/upload';
import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import multer from 'multer';

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

const upload = multer(uploadConfig)

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get(
  '/available',
  listAvailableCarsController.handle
)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImageController.handle
)

export { carsRoutes }