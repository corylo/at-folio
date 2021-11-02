interface IStringUtility {
  replaceCaseInsensitive: (value: string, from: string, to: string) => string;
}

export const StringUtility: IStringUtility = {
  replaceCaseInsensitive: (value: string, from: string, to: string): string => {
    return value.replace(new RegExp(from, "ig"), to);
  }
}