import { config } from 'dotenv';

config();

export default {
  appName: process.env.APP_NAME,
  environment: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
};
