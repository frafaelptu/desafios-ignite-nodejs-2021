import { AppError } from '@errors/AppError';
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider
let mailProviderInMemory: MailProviderInMemory

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProviderInMemory
    )
  })

  it("should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: "589899",
      email: "vubik@gadmihver.mu",
      name: "Cornelia Lindsey",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("vubik@gadmihver.mu")

    expect(sendMail).toHaveBeenCalled()
  })

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ka@uj.gr")
    ).rejects.toEqual(new AppError("User does not exists!"))
  })

  it("should be able to create a user token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_license: "424429",
      email: "ejgob@zivosheg.eu",
      name: "Jim Bennett",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("ejgob@zivosheg.eu")

    expect(generateTokenMail).toHaveBeenCalled()
  })
})