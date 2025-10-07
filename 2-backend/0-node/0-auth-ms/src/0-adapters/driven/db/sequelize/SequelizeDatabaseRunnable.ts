import { Sequelize } from "sequelize";
import config from "../../../../../db/sequelize/config/config";

import { Subject } from "./models/Subject";
import { Credential } from "./models/Credential";
import { Session } from "./models/Session";

import { Runnable } from "@crosscutting/Runnable";

const models: any[] = [
    Subject,
    Credential,
    Session
];

export class SequelizeDatabaseRunnable implements Runnable {
    private sequelize!: Sequelize;
    private readonly connectionString: string

    constructor(_connectionString: string) {
        this.connectionString = _connectionString;
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