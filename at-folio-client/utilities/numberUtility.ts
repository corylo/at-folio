interface INumberUtility {
  random: (min: number, max: number) => number;
  randomSign: () => number;
}

export const NumberUtility: INumberUtility = {
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  randomSign: (): number => {
    return NumberUtility.random(0, 100) % 2 === 0 ? 1 : -1;
  }
}