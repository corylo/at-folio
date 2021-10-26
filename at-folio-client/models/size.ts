export interface ISize {
  height: number;
  width: number;
}

export const defaultSize = (): ISize => ({
  height: 0,
  width: 0
});