interface IImageUtility {
  getPreviewSource: (source: string) => string;
}

export const ImageUtility: IImageUtility = {
  getPreviewSource: (source: string): string => {
    const split: string[] = source.split(".");

    return `${split[0]}-preview.${split[1]}`;
  }
}