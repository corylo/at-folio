import { config } from "firebase-functions";
import { createApi } from "unsplash-js";
import fetch from 'node-fetch';

export const Unsplash = createApi({ 
  accessKey: config().unsplash.access_key,
  fetch
});