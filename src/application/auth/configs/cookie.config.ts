import { CookieOptions } from "express";

export const CookieConfig = {
  accessToken: {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    domain: process.env.CLIENT_DOMAIN,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  } as CookieOptions,
  refreshToken: {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    domain: process.env.CLIENT_DOMAIN,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30),
  } as CookieOptions,
  onboardingToken: {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    domain: process.env.CLIENT_DOMAIN
  } as CookieOptions,
  tokenDelete: {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    domain: process.env.CLIENT_DOMAIN
  } as CookieOptions
};
