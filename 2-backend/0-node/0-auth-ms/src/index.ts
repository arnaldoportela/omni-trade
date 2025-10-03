import "reflect-metadata";
import dotenv from "dotenv";

import { IoCContainer } from "./3-crosscutting/ioc/IoCContainer";

import { DomainDI } from "./2-domain/DomainDI";
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

    public bootstrap() {
        DomainDI.register(this.container);
        ApplicationDI.register(this.container);
        SequelizeDBDrivenAdapterDI.register(this.container);
        ExpressHttpDrivingAdapterDI.register(this.container);

        new SequelizeDatabaseRunnable(
            process.env.CONNECTION_STRING || ""
        ).start();

        new ExpressServerRunnable(
            Number(process.env.APPLICATION__PORT)
        ).start();
    }
}

new CompositionRoot().bootstrap();