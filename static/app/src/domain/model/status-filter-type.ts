export type StatusFilterType = {
    statesToShow: string[];
  };
  
  export const defaultStatusFilter: StatusFilterType = {
    statesToShow: ['new', 'indeterminate', 'done']
  };
  