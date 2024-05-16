import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export interface ConfigOptions {
  // Google OAuth
  OAUTH_GOOGLE_ID: string;
  OAUTH_GOOGLE_SECRET: string;
  OAUTH_GOOGLE_REDIRECT: string;

  // Json Web Token
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRE: string;
  JWT_REFRESH_EXPIRE: string;

  // Database
  DATABASE_URL: string;
}

const validationSchema = Joi.object({
  OAUTH_GOOGLE_ID: Joi.string(),
  OAUTH_GOOGLE_SECRET: Joi.string(),
  OAUTH_GOOGLE_REDIRECT: Joi.string(),

  JWT_SECRET: Joi.string(),
  JWT_REFRESH_SECRET: Joi.string(),
  JWT_EXPIRE: Joi.string().optional().allow('').default('1h'),
  JWT_REFRESH_EXPIRE: Joi.string().optional().allow('').default('30d'),

  DATABASE_URL: Joi.string(),
});

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
  validationSchema,
  validationOptions: { allowUnknown: true },
};
