import { ImageSize } from "../enums/imageSize";

interface IImageUtility {
  getPreviewSource: (source: string) => string;
  getSmallSource: (source: string) => string;
  getSourceBySize: (source: string, size: ImageSize) => string;
}

export const ImageUtility: IImageUtility = {
  getPreviewSource: (source: string): string => {
    const split: string[] = source.split(".");

    return `${split[0]}-preview.${split[1]}`;
  },
  getSmallSource: (source: string): string => {
    const split: string[] = source.split(".");

    return `${split[0]}-small.${split[1]}`;
  },
  getSourceBySize: (source: string, size: ImageSize): string => {
    switch(size) {
      case ImageSize.Small:
        return ImageUtility.getSmallSource(source);
      default:
        return source;
    }
  }
}