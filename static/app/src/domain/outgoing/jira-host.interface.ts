

//Interface to do dependency inversion
export interface IJiraHost {

    navigateToNewWindows: (relativeUrl: string) => Promise<void>;

  };