export interface Startable {
  start(): Promise<void>;
}
export interface Stoppable {
  stop(): Promise<void>;
}
export type Runnable = Startable & Stoppable;