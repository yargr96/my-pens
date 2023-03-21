export interface IModule {
    beforeUnmount?: () => void;
}

export type Module = (mountElement: Element) => IModule;
