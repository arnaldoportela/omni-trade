import { Sequelize } from "sequelize";
import config from "../../../../../db/config/config";

import { Subject } from "./models/Subject";
import { Credential } from "./models/Credential";
import { Session } from "./models/Session";

import { Runnable } from "../../../../3-crosscutting/Runnable";

const models: any[] = [
    Subject,
    Credential,
    Session
];

export class SequelizeDatabaseRunnable implements Runnable {
    private sequelize!: Sequelize;

    constructor(private readonly connectionString: string) {

    }

    async start(): Promise<void> {
        this.sequelize = new Sequelize(this.connectionString, config);
        models.forEach((model:any) => model.setup(this.sequelize));
        models.forEach((model:any) => model.associate && model.associate(this.sequelize.models));
    }
    async stop(): Promise<void> {
        if (this.sequelize) await this.sequelize.close();
    }
}