import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import fs from "fs";

import { merge } from 'lodash';
import { Request, Response, Router } from 'express';

export class SwaggerMiddleware {
    private _router: Router;

    constructor() {
        this._router = Router();
        const urls: { url: string; name: string }[] = [];
        const base = YAML.load(path.join(__dirname, "../../swagger/Base.yaml"));
        const sections = this.getDirectories(path.join(__dirname, "../../swagger"));

        base.servers = [{
            url: `${process.env.APPLICATION__PROTOCOL}://${process.env.APPLICATION__HOST}:${process.env.APPLICATION__PORT}`
        }];

        sections.forEach((section) => {
            const docsDir = path.join(__dirname, `../../swagger/${section}`);
            const versions = this.getDirectories(docsDir);

            versions.forEach((version) => {
                const versionDir = path.join(docsDir, version);
                const versionFiles = this.loadYamlFiles(versionDir);
                const swaggerDoc = merge({}, base, ...versionFiles);

                this._router.get(`/swagger/${version}.json`, (req: Request, res: Response) =>
                    res.json(swaggerDoc)
                );

                urls.push({ url: `/swagger/${version}.json`, name: `API ${version}` });
            });
        });

        const options: any = {
            explorer: true,
            swaggerOptions: {
                urls,
                urlsPrimaryName: urls[urls.length - 1]?.name ?? undefined
            }
        }

        this._router.use("/swagger", swaggerUI.serve, swaggerUI.setup(undefined, options));
    }

    public setup() {
        return this._router;
    }

    private getDirectories(dir: string): string[] {
        return fs
            .readdirSync(dir, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name);
    }

    private loadYamlFiles(dir: string): string[] {
        return fs
            .readdirSync(dir)
            .filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"))
            .map((file) => YAML.load(path.join(dir, file)));
    }
}