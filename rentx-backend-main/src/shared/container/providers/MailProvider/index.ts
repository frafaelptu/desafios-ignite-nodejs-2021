import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { IMailProvider } from './IMailProvider';
import { container } from 'tsyringe'
import { SESMailProviderProvider } from './implementations/SESMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProviderProvider)
}

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
)