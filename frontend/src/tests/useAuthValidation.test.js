// tests/useAuthValidation.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthValidation } from '../composables/useAuthValidation'

describe('useAuthValidation', () => {
  let validateUsername, validateEmail, validatePassword, errors, clearErrors

  beforeEach(() => {
    const composable = useAuthValidation()
    validateUsername = composable.validateUsername
    validateEmail = composable.validateEmail
    validatePassword = composable.validatePassword
    errors = composable.errors
    clearErrors = composable.clearErrors
  })

  it('validates correct username', () => {
    expect(validateUsername('John Doe')).toBe('')
  })

  it('rejects username with numbers', () => {
    expect(validateUsername('John123')).toBe('Username must contain only letters')
  })

  it('validates correct email', () => {
    expect(validateEmail('test@example.com')).toBe('')
  })

  it('rejects invalid email', () => {
    expect(validateEmail('invalid@')).toBe('Enter a valid email address')
  })

  it('validates strong password', () => {
    expect(validatePassword('Test@123')).toBe('')
  })

  it('rejects weak password', () => {
    expect(validatePassword('abc')).toContain('Password must')
  })

  it('clears all errors', () => {
    errors.email = 'Some error'
    clearErrors()
    expect(errors.email).toBe('')
  })
})