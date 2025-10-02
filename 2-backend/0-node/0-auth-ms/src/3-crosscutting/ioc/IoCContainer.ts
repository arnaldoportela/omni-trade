// IoCContainer.ts
import { IoCServiceDescriptor } from "./IoCServiceDescriptor";
import { IoCServiceLifetimeEnum } from "./IoCServiceLifetimeEnum";
import { Constructor, AbstractConstructor } from "./IoCTypes";

export interface Registration<T = any> {
  service: Constructor<T> | AbstractConstructor<T>;
  useClass?: Constructor<T>;
  useValue?: T;
  lifetime?: IoCServiceLifetimeEnum;
}

export class IoCContainer {
  private services: IoCServiceDescriptor<any>[] = [];
  private static _container: IoCContainer;

  public static getInstance(): IoCContainer {
    if (!this._container) {
      this._container = new IoCContainer();
    }
    return this._container;
  }

  public register<T>(spec: Registration<T>): IoCServiceDescriptor<T> {
    this.throwIfExists(spec.service);

    let desc: IoCServiceDescriptor<T>;

    if (spec.useValue) {
      // register instance
      desc = IoCServiceDescriptor.fromFull(
        this,
        spec.service,
        (spec.useValue as any).constructor,
        spec.useValue,
        spec.lifetime ?? IoCServiceLifetimeEnum.TRANSIENT
      );
    } else if (spec.useClass) {
      // register abstract → implementation
      desc = IoCServiceDescriptor.fromAbstract(
        this,
        spec.service,
        spec.useClass,
        spec.lifetime ?? IoCServiceLifetimeEnum.TRANSIENT
      );
    } else {
      // register class by itself
      desc = IoCServiceDescriptor.fromServiceType(
        this,
        spec.service as Constructor<T>,
        spec.lifetime ?? IoCServiceLifetimeEnum.TRANSIENT
      );
    }

    this.services.push(desc);
    return desc;
  }

  public unregister<T>(ctor: Constructor<T> | AbstractConstructor<T>): void {
    const idx = this.services.findIndex(s => s.getServiceType() === ctor);
    if (idx !== -1) this.services.splice(idx, 1);
  }

  public resolve<T>(ctor: Constructor<T> | AbstractConstructor<T>): T {
    const desc = this.services.find(s => s.getServiceType() === ctor);
    if (!desc) {
      throw new Error(`Service of type ${ctor.name} isn't registered.`);
    }
    return desc.getImplementation();
  }

  private throwIfExists<T>(ctor: Constructor<T> | AbstractConstructor<T>): void {
    if (this.services.some(s => s.getServiceType() === ctor)) {
      throw new Error(`Service ${ctor.name} already registered.`);
    }
  }
}
