import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController"
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController"
import { Router } from "express"

const passwordRoutes = Router()

const sendForgotPasswordMailCotroller = new SendForgotPasswordMailController()
const resetPasswordCotroller = new ResetPasswordUserController()

passwordRoutes.post('/forgot', sendForgotPasswordMailCotroller.handle)
passwordRoutes.post('/reset', resetPasswordCotroller.handle)

export { passwordRoutes }