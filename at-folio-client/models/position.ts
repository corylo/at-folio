export interface IPosition {
  x: number;
  y: number;
}

export const defaultPosition = (): IPosition => ({
  x: 0,
  y: 0
});