
import GlobalFactory from './global-factory-fake-mode';
//import GlobalFactory from './global-factory-production-mode';

export const REACT_APP_FAKE: string = process.env.REACT_APP_FAKE? process.env.REACT_APP_FAKE : 'false'; 

export const Factory = GlobalFactory();
Factory.initialize();



