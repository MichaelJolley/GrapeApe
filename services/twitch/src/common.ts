import * as restler from 'restler';
import * as dotenv from 'dotenv';

dotenv.config();

import * as config from './config';

export { config };

export const log = (level: string, message: string) => {
  const captains: any = console;
  const { hours, minutes } = getTime();
  captains[level](`[${hours}:${minutes}] ${message}`);
};

export const getTime = () => {
  const date = new Date();
  const rawMinutes = date.getMinutes();
  const rawHours = date.getHours();
  const hours = (rawHours < 10 ? '0' : '') + rawHours.toLocaleString();
  const minutes = (rawMinutes < 10 ? '0' : '') + rawMinutes.toLocaleString();
  return { hours, minutes };
};

export const get = (url: string) => {
  return new Promise((resolve, reject) => {
      restler.get(url, {
          headers: {
              "Authorization": `Bearer ${config.twitchClientToken}`,
              "Client-ID": config.twitchClientId,
              "Content-Type": "application/json"
          }
      }).on("complete", (data: any) => {
          resolve(data);
      });
  });
};
