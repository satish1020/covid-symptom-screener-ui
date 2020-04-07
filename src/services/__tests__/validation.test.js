import { isInvalidEmail, isInvalidPhoneNumber } from '../validation'

describe('registration form utils', () => {
  describe('isInvalidEmail', () => {
    it('should not allow spaces', () => {
      expect(isInvalidEmail('ab c@gmail.com')).toBeTruthy()
      expect(isInvalidEmail('a  b c @gmail .com')).toBeTruthy()
      expect(isInvalidEmail('abc@gmail.com')).toBeFalsy()
    })

    it('should not allow special characters', () => {
      expect(isInvalidEmail('a*@gmail.com')).toBeTruthy()
      expect(isInvalidEmail('a!@gmail.com')).toBeTruthy()
      expect(isInvalidEmail('a_b@gmail.com')).toBeFalsy()
      expect(isInvalidEmail('a_______b@gmail.com')).toBeFalsy()
    })

    it('should test domains', () => {
      expect(isInvalidEmail('abc@gmail.c')).toBeTruthy()
      expect(isInvalidEmail('abc@gmail.co')).toBeFalsy()
      expect(isInvalidEmail('abc@gmail.com')).toBeFalsy()
    })
  })

  describe('isInvalidPhoneNumber', () => {
    it('should only allow numbers', () => {
      expect(isInvalidPhoneNumber('555-555-555a')).toBeTruthy()
      expect(isInvalidPhoneNumber('555-555-5555')).toBeFalsy()
    })

    it('should not allow spaces', () => {
      expect(isInvalidPhoneNumber('555 555-5555')).toBeTruthy()
      expect(isInvalidPhoneNumber('555 555 5555')).toBeTruthy()
    })

    it('should not allow incorrectly formatted numbers', () => {
      expect(isInvalidPhoneNumber('(555) 555-5555')).toBeTruthy()
      expect(isInvalidPhoneNumber('5555555555')).toBeTruthy()
      expect(isInvalidPhoneNumber('555-555-555')).toBeTruthy()
      expect(isInvalidPhoneNumber('5555-555-555')).toBeTruthy()
      expect(isInvalidPhoneNumber('555-5555-555')).toBeTruthy()
    })
  })
})
