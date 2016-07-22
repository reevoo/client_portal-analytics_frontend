import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import httpRequest from 'superagent'

const MIDDLEWARES = [thunk]

/**
 * Creates a mock of Redux store with middleware.
 */
export const createMockStore = configureMockStore(MIDDLEWARES)

export const fakeNextRequest = (response, success = true) =>
  spyOn(httpRequest.Request.prototype, 'end').and.callFake((cb) => cb(null, {ok: success, body: {...response}}))
