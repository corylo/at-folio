import { pubsub } from "firebase-functions";

import { DefaultPhotoService } from "./services/defaultPhotoService";

exports.updateDefaultPhotos = pubsub
  .schedule("0,10,20,30,40,50 0-23 * * *")
  .onRun(DefaultPhotoService.updateAll);