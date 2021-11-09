import { auth, pubsub } from "firebase-functions";

import { AuthService } from "./services/authService";
import { DefaultPhotoService } from "./services/defaultPhotoService";

exports.onDeleteUser = auth.user()
  .onDelete(AuthService.onDeleteUser);

exports.updateDefaultPhotos = pubsub
  .schedule("0,30 0-23 * * *")
  .onRun(DefaultPhotoService.updateAll);