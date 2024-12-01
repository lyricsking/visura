/**
 * Error logger
 *
 * Logs error to console, can be replaced by winston or sentry
 * @param error
 * @returns {void}
 */
export const logger = (error: unknown) => console.error(error);
