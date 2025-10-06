// IoCServiceDescriptor.ts
import "reflect-metadata";
import type { IoCContainer } from "./IoCContainer";
import { IoCServiceLifetimeEnum } from "./IoCServiceLifetimeEnum";
import type { Constructor, AbstractConstructor } from "./IoCTypes";

export class IoCServiceDescriptor<T> {
  private serviceType: Constructor<T> | AbstractConstructor<T>;
  private implementationType: Constructor<T>;
  private implementation: T | null = null;
  private lifetime: IoCServiceLifetimeEnum;
  private container: IoCContainer;

  private constructor(
    container: IoCContainer,
    serviceType: Constructor<T> | AbstractConstructor<T>,
    implementationType: Constructor<T>,
    implementation: T | null,
    lifetime: IoCServiceLifetimeEnum
  ) {
    this.container = container;
    this.serviceType = serviceType;
    this.implementationType = implementationType;
    this.implementation = implementation;
    this.lifetime = lifetime;
  }

  // --- Factories ---
  static fromImplementation<T>(
    container: IoCContainer,
    implementation: T,
    lifetime: IoCServiceLifetimeEnum = IoCServiceLifetimeEnum.SINGLETON
  ): IoCServiceDescriptor<T> {
    const type = (implementation as any).constructor as Constructor<T>;
    return new IoCServiceDescriptor(container, type, type, implementation, lifetime);
  }

  static fromServiceType<T>(
    container: IoCContainer,
    serviceType: Constructor<T>,
    lifetime: IoCServiceLifetimeEnum = IoCServiceLifetimeEnum.TRANSIENT
  ): IoCServiceDescriptor<T> {
    return new IoCServiceDescriptor(container, serviceType, serviceType, null, lifetime);
  }

  static fromAbstract<T, TImpl extends T>(
    container: IoCContainer,
    abstractCtor: AbstractConstructor<T>,
    implCtor: Constructor<TImpl>,
    lifetime: IoCServiceLifetimeEnum = IoCServiceLifetimeEnum.TRANSIENT
  ): IoCServiceDescriptor<T> {
    return new IoCServiceDescriptor(container, abstractCtor, implCtor, null, lifetime);
  }

  static fromFull<T, TImpl extends T>(
    container: IoCContainer,
    serviceType: Constructor<T> | AbstractConstructor<T>,
    implementationType: Constructor<TImpl>,
    implementation: TImpl,
    lifetime: IoCServiceLifetimeEnum = IoCServiceLifetimeEnum.SINGLETON
  ): IoCServiceDescriptor<T> {
    return new IoCServiceDescriptor(container, serviceType, implementationType, implementation, lifetime);
  }

  // --- API ---
  public getServiceType(): Constructor<T> | AbstractConstructor<T> {
    return this.serviceType;
  }

  public getImplementation(): T {
    switch (this.lifetime) {
      case IoCServiceLifetimeEnum.SINGLETON:
        return this.implementation ?? this.createInstance(this.implementationType);

      case IoCServiceLifetimeEnum.TRANSIENT:
        return this.createInstance(this.implementationType);

      default:
        throw new Error("Unsupported lifetime.");
    }
  }

  private createInstance<U>(ctor: Constructor<U>): U {
    const paramTypes: Constructor[] = Reflect.getMetadata("design:paramtypes", ctor) ?? [];
    const params = paramTypes.map(dep => this.container.resolve(dep));
    return new ctor(...params);
  }
}
