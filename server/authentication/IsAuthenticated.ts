import { Request, Response } from "express";

export function isAuthenticated (): boolean {
  // Always authenticated for now!
  const isLoggedIn = true;

  return isLoggedIn;
}

/**
 * A route middleware that checks if the caller is authenticated.
 * If they aren't the middleware respond with an error message.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export function isAuthenticatedApiMiddleware (req: Request, res: Response, next: Function) {
  if (isAuthenticated()) {
    next();
  }
  else {
    res.json({
      error: "You don't have the permission to do this.",
      success: false
    });
  }
}

export default isAuthenticatedApiMiddleware;
