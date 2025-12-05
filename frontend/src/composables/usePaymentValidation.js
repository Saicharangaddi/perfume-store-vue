import { reactive } from 'vue'

export function usePaymentValidation() {
  const errors = reactive({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upiId: '',
    bank: '',
    netbankUsername: '',
    netbankPassword: ''
  })

  function clearErrors() {
    for (const key in errors) errors[key] = ''
  }

  function isFutureExpiry(dateStr) {
    const [mm, yy] = dateStr.split('/')
    if (!mm || !yy) return false
    const expDate = new Date(`20${yy}`, mm)
    return expDate > new Date()
  }

  function isValidExpiry(dateStr) {
    const [mm, yy] = dateStr.split('/')
    const month = parseInt(mm)
    const year = parseInt(yy)
    if (!mm || !yy || isNaN(month) || isNaN(year)) return false
    if (month < 1 || month > 12) return false
    return isFutureExpiry(dateStr)
  }

  const validators = {
    cardNumber: val => /^\d{16}$/.test(val) ? '' : 'Card number must be 16 digits',
    cardName: val => /^[A-Za-z\s]+$/.test(val.trim()) ? '' : 'Name on card must contain only letters',
    expiry: val => (/^\d{2}\/\d{2}$/.test(val) && isValidExpiry(val)) ? '' : 'Enter a valid future expiry date (MM/YY)',
    cvv: val => /^\d{3}$/.test(val) ? '' : 'CVV must be 3 digits',
    upiId: val => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(val.trim()) ? '' : 'Enter a valid UPI ID (e.g., yourname@bank)',
    bank: val => val ? '' : 'Please select a bank',
    netbankUsername: val => val.trim() ? '' : 'Username is required',
    netbankPassword: val => val.trim() ? '' : 'Password is required'
  }

  return { errors, validators, clearErrors }
}