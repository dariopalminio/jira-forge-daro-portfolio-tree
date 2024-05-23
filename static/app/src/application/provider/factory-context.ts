import { createContext } from 'react';


export interface IFactoryContext {
    getObject: (key: string) => any;
};

export const IFactoryContextDefaultValues: IFactoryContext = {
    getObject: (key: string) => undefined
};

const FactoryContext = createContext<IFactoryContext>(IFactoryContextDefaultValues);

export default FactoryContext;