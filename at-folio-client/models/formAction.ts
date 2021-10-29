export interface IFormAction {
  icon?: string;
  id: string;
  label: string;
  handleOnClick: (...args: any[]) => any;
}