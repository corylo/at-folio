import { useEffect, useState } from "react";

import { ImageStatus } from "../../at-folio-enums/imageStatus";

interface IUseLoadImageEffect {
  status: ImageStatus;
}

export const useLoadImageEffect = (previewSource: string, loadedSource: string): IUseLoadImageEffect => {
  const [status, setStatus] = useState<ImageStatus>(ImageStatus.Waiting);

  useEffect(() => {
    const preview: HTMLImageElement = new Image();
    preview.src = previewSource;

    preview.onload = () => {
      setStatus(ImageStatus.Preview);
    };

    preview.onerror = (e: any) => {
      setStatus(ImageStatus.Loaded);
    }
  }, []);

  useEffect(() => {
    if(status === ImageStatus.Preview) {
      const loaded: HTMLImageElement = new Image();
      loaded.src = loadedSource;

      loaded.onload = () => {
        setStatus(ImageStatus.Loaded);
      };
    }
  }, [status])

  return {
    status
  }
}