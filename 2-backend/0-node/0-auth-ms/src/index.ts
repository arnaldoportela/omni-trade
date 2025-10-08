import "reflect-metadata";

import { IoCContainer } from "./3-crosscutting/ioc/IoCContainer";
import { ApplicationDI } from "./1-application/ApplicationDI";
import { SequelizeDBDrivenAdapterDI } from "./0-adapters/driven/db/sequelize/SequelizeDBDrivenAdapterDI";
import { ExpressHttpDrivingAdapterDI } from "./0-adapters/driving/http/express/ExpressHttpDrivingAdapterDI";
import { SequelizeDatabaseRunnable } from "./0-adapters/driven/db/sequelize/SequelizeDatabaseRunnable";
import { ExpressServerRunnable } from "./0-adapters/driving/http/express/ExpressServerRunnable";
import { OpenTelemetryRunnable } from "@adapters/driven/observability/openTelemetry/OpenTelemetryRunnable";
import { Config } from "@crosscutting/config/Config";
import { CrosscuttingDI } from "@crosscutting/CrosscuttingDI";
import { DomainDI } from "@domain/DomainDI";

class CompositionRoot {
    private readonly container: IoCContainer;
    private readonly config: Config;

    constructor() {
        this.container = IoCContainer.getInstance();
        this.container.register({ service: Config });
        this.config = this.container.resolve(Config);
    }

    public async bootstrap(): Promise<void> {
        CrosscuttingDI.register(this.container);
        DomainDI.register(this.container);
        ApplicationDI.register(this.container);
        SequelizeDBDrivenAdapterDI.register(this.container);
        ExpressHttpDrivingAdapterDI.register(this.container);

        await new OpenTelemetryRunnable()
            .start();

        await new SequelizeDatabaseRunnable(this.config.connectionString)
            .start();

        await new ExpressServerRunnable(this.config.appPort)
            .start();
    }
}

async function main() {
    await new CompositionRoot().bootstrap();
}


main().catch((err) => {
    console.error("Fatal error while bootstrapping app:", err);
    process.exit(1);
});