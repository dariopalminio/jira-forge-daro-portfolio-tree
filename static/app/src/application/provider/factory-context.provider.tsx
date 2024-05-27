import { FC, useContext, useEffect, useState } from "react";
import FactoryContext from "./factory-context";

/*
HACK: Temporary solution for the problem of switching to fake mode. 
This is technical debt. Commenting lines of code is an easy solution but it is not a scalable or 
maintainable practice, especially as the project grows.
*/
//For production comment this import and for fake mode uncomment this import
//import GlobalFactory from '../../infrastructure/fake/global-factory-fake-mode';

//For production uncomment this import and for fake mode comment it
import GlobalFactory from "../../infrastructure/global-factory";

interface Props {children?: React.ReactNode}

/**
 * In this application, dependency injection is handled through the use of context. 
 * A context is created that provides the global object factory instance to provide 
 * instances of API clients to custom hook.
 * This is used to inversion of control (IoC). 
 * A IoC container is used to identify and inject its dependencies using functional programming.
 */
const FactoryContextProvider: FC<Props> = ({ children }) => {
  const [globalFactory, setGlobalFactory] = useState<any>(GlobalFactory);
  /**
  Initialized state: By adding an initialized state, 
  you can control when child components are rendered. 
  This ensures that they don't try to access the context's objects before it is completely ready.
   */
  const [initialized, setInitialized] = useState(false);  // State to control initialization

  useEffect(() => {
      const factory = GlobalFactory();
      factory.initialize();
      setGlobalFactory(factory);
      setInitialized(true);  // Set initialized to true to force re-render
      console.log("FactoryContextProvider-->useEffect");
      console.log("FactoryContextProvider-->globalFactory", globalFactory);
  }, []);

  const getObject = (key: string) => {
      return globalFactory.get(key);
  };

  return (
      <FactoryContext.Provider value={{ getObject }}>
          {initialized ? children : null}  
      </FactoryContext.Provider>
  );
};

export default FactoryContextProvider;
