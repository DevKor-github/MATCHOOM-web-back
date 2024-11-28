import { CookieOptions } from "express";

export const CookieConfig = {
  accessToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  } as CookieOptions,
  refreshToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30),
  } as CookieOptions,
  onboardingToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  } as CookieOptions,
  tokenDelete: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  } as CookieOptions
};
