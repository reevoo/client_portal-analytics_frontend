/**
 * We need to wrap this methods to be able to mock them in the tests.
 */
export const routeUtils = {
  redirectTo: (newUrl) => { window.location.href = newUrl },
}
