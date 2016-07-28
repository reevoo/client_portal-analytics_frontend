import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const MIDDLEWARES = [thunk]

/**
 * Creates a mock of Redux store with middleware.
 */
export const createMockStore = configureMockStore(MIDDLEWARES)
