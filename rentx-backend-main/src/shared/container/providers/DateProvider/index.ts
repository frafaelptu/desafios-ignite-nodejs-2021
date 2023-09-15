import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { container } from "tsyringe";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
) 