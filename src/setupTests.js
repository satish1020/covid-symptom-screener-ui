// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
class LocalStorageMock {
  store
  constructor() {
    this.store = {}
  }
}
global.localStorage = new LocalStorageMock()
