
/*
HACK: Temporary solution for the problem of switching to fake mode. 
This is technical debt. Commenting lines of code is an easy solution but it is not a scalable or 
maintainable practice, especially as the project grows.
*/
//For production comment this import and for fake mode uncomment this import
import GlobalFactory from './global-factory-fake-mode';

//For production uncomment this import and for fake mode comment it
//import GlobalFactory from './global-factory-production-mode';

export const REACT_APP_FAKE: string = process.env.REACT_APP_FAKE? process.env.REACT_APP_FAKE : 'false'; 

export const Factory = GlobalFactory();
Factory.initialize();



