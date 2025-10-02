import * as http from "http";
import { App } from "./App";
import { Runnable } from "../../../../3-crosscutting/Runnable";
import { IoCContainer } from "../../../../3-crosscutting/ioc/IoCContainer";

export class ExpressServerRunnable implements Runnable {
  private httpServer: http.Server;
  private readonly _app: App;

  constructor(private readonly port: number) {
    this._app = IoCContainer.getInstance().resolve(App)
    this.httpServer = http.createServer(this._app.build());
  }

  public async start(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer.listen(this.port, () => {
        console.log(`=== Auth MS is running on port ${this.port}\n`);
        resolve();
      });
    });
  }

  public async stop(): Promise<void> {

  }
}