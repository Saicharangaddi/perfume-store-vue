
import { reactive } from 'vue'

export function useAuthValidation() {
  const errors = reactive({
    username: '',
    email: '',
    password: '',
    general: ''
  })

  const touched = reactive({
    username: false,
    email: false,
    password: false
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|net|org)$/i
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/
  const usernameRegex = /^[A-Za-z\s]+$/

  function validateUsername(val) {
    return usernameRegex.test(val.trim())
      ? ''
      : 'Username must contain only letters'
  }

  function validateEmail(val) {
    return emailRegex.test(val.trim())
      ? ''
      : 'Enter a valid email address'
  }

  function validatePassword(val) {
    return passwordRegex.test(val.trim())
      ? ''
      : 'Password must be at least 6 characters, include uppercase, lowercase, number, and special character'
  }

  function clearErrors() {
    for (const key in errors) errors[key] = ''
  }

  return {
    errors,
    touched,
    validateUsername,
    validateEmail,
    validatePassword,
    clearErrors
  }
}