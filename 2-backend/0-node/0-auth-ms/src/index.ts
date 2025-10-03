import "reflect-metadata";
import dotenv from "dotenv";

import { IoCContainer } from "./3-crosscutting/ioc/IoCContainer";
import { ApplicationDI } from "./1-application/ApplicationDI";
import { SequelizeDBDrivenAdapterDI } from "./0-adapters/driven/db/sequelize/SequelizeDBDrivenAdapterDI";
import { ExpressHttpDrivingAdapterDI } from "./0-adapters/driving/http/express/ExpressHttpDrivingAdapterDI";
import { SequelizeDatabaseRunnable } from "./0-adapters/driven/db/sequelize/SequelizeDatabaseRunnable";
import { ExpressServerRunnable } from "./0-adapters/driving/http/express/ExpressServerRunnable";

dotenv.config();

class CompositionRoot {
    private readonly container: IoCContainer;

    constructor() {
        this.container = IoCContainer.getInstance();
    }

    public async bootstrap(): Promise<void> {
        ApplicationDI.register(this.container);
        SequelizeDBDrivenAdapterDI.register(this.container);
        ExpressHttpDrivingAdapterDI.register(this.container);

        await new SequelizeDatabaseRunnable(
            process.env.CONNECTION_STRING ?? ""
        ).start();

        await new ExpressServerRunnable(
            Number(process.env.APPLICATION__PORT)
        ).start();
    }
}

async function main() {
  await new CompositionRoot().bootstrap();
}


main().catch((err) => {
  console.error("Fatal error while bootstrapping app:", err);
  process.exit(1);
});