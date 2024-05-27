
//Interface to do dependency inversion
export interface IJiraUserApi {

    getCurrentUser: () => Promise<any>;
    
  };