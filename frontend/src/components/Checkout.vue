<template>
  <div class="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white p-8 rounded shadow">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

      <!-- Payment Method -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
        <select v-model="paymentMethod" class="w-full border border-gray-300 rounded px-3 py-2">
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
          <option value="netbanking">Net Banking</option>
        </select>
      </div>

      <!-- Card Details -->
      <div v-if="paymentMethod === 'card'" class="space-y-4">
        <div>
          <input
            type="text"
            v-model="cardNumber"
            placeholder="Card Number"
            class="w-full border px-3 py-2 rounded"
            :class="{ 'border-red-500': errors.cardNumber }"
          />
          <p v-if="errors.cardNumber" class="text-red-500 text-sm mt-1">{{ errors.cardNumber }}</p>
        </div>

        <div>
          <input
            type="text"
            v-model="cardName"
            placeholder="Name on Card"
            class="w-full border px-3 py-2 rounded"
            :class="{ 'border-red-500': errors.cardName }"
          />
          <p v-if="errors.cardName" class="text-red-500 text-sm mt-1">{{ errors.cardName }}</p>
        </div>

        <div class="flex space-x-2">
          <div class="w-1/2">
            <input
              type="text"
              v-model="expiry"
              placeholder="MM/YY"
              class="w-full border px-3 py-2 rounded"
              :class="{ 'border-red-500': errors.expiry }"
            />
            <p v-if="errors.expiry" class="text-red-500 text-sm mt-1">{{ errors.expiry }}</p>
          </div>
          <div class="w-1/2">
            <input
              type="text"
              v-model="cvv"
              placeholder="CVV"
              class="w-full border px-3 py-2 rounded"
              :class="{ 'border-red-500': errors.cvv }"
            />
            <p v-if="errors.cvv" class="text-red-500 text-sm mt-1">{{ errors.cvv }}</p>
          </div>
        </div>
      </div>

      <!-- UPI -->
      <div v-if="paymentMethod === 'upi'" class="mt-4">
        <input
          type="text"
          v-model="upiId"
          placeholder="Enter UPI ID"
          class="w-full border px-3 py-2 rounded"
          :class="{ 'border-red-500': errors.upiId }"
        />
        <p v-if="errors.upiId" class="text-red-500 text-sm mt-1">{{ errors.upiId }}</p>
      </div>

      <!-- Net Banking -->
      <div v-if="paymentMethod === 'netbanking'" class="mt-4 space-y-4">
        <select
          v-model="bank"
          class="w-full border px-3 py-2 rounded"
          :class="{ 'border-red-500': errors.bank }"
        >
          <option disabled value="">Select Bank</option>
          <option>HDFC</option>
          <option>ICICI</option>
          <option>SBI</option>
          <option>Axis</option>
        </select>
        <p v-if="errors.bank" class="text-red-500 text-sm mt-1">{{ errors.bank }}</p>

        <input
          type="text"
          v-model="netbankUsername"
          placeholder="Enter Net Banking Username"
          class="w-full border px-3 py-2 rounded"
          :class="{ 'border-red-500': errors.netbankUsername }"
        />
        <p v-if="errors.netbankUsername" class="text-red-500 text-sm mt-1">{{ errors.netbankUsername }}</p>

        <input
          type="password"
          v-model="netbankPassword"
          placeholder="Enter Password"
          class="w-full border px-3 py-2 rounded"
          :class="{ 'border-red-500': errors.netbankPassword }"
        />
        <p v-if="errors.netbankPassword" class="text-red-500 text-sm mt-1">{{ errors.netbankPassword }}</p>
      </div>

      <!-- Pay Button -->
      <button
        @click="submitPayment"
        :disabled="isProcessing"
        class="mt-6 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition disabled:opacity-50"
      >
        {{ isProcessing ? 'Processing...' : 'Pay Now' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { usePaymentValidation } from '../composables/usePaymentValidation'

const router = useRouter()

// Form fields
const paymentMethod = ref('card')
const cardNumber = ref('')
const cardName = ref('')
const expiry = ref('')
const cvv = ref('')
const upiId = ref('')
const bank = ref('')
const netbankUsername = ref('')
const netbankPassword = ref('')
const isProcessing = ref(false)

// Validation composable
const { errors, validators, clearErrors } = usePaymentValidation()

// Real-time validation
watch(cardNumber, val => errors.cardNumber = validators.cardNumber(val))
watch(cardName, val => errors.cardName = validators.cardName(val))
watch(expiry, val => errors.expiry = validators.expiry(val))
watch(cvv, val => errors.cvv = validators.cvv(val))
watch(upiId, val => errors.upiId = validators.upiId(val))
watch(bank, val => errors.bank = validators.bank(val))
watch(netbankUsername, val => errors.netbankUsername = validators.netbankUsername(val))
watch(netbankPassword, val => errors.netbankPassword = validators.netbankPassword(val))

// Submit handler
async function submitPayment() {
  clearErrors()
  let valid = true

  if (paymentMethod.value === 'card') {
    if (validators.cardNumber(cardNumber.value)) valid = false
    if (validators.cardName(cardName.value)) valid = false
    if (validators.expiry(expiry.value)) valid = false
    if (validators.cvv(cvv.value)) valid = false
  }

  if (paymentMethod.value === 'upi') {
    if (validators.upiId(upiId.value)) valid = false
  }

  if (paymentMethod.value === 'netbanking') {
    if (validators.bank(bank.value)) valid = false
    if (validators.netbankUsername(netbankUsername.value)) valid = false
    if (validators.netbankPassword(netbankPassword.value)) valid = false
  }

  if (!valid) {
    toast.error('Please fix the errors before submitting.')
    return
  }

  isProcessing.value = true
  toast.info('Processing payment...')

  await new Promise(resolve => setTimeout(resolve, 2000))

  const failed = Math.random() < 0.2
  const cardDeclined = paymentMethod.value === 'card' && cardNumber.value.startsWith('4')

  if (failed || cardDeclined) {
    isProcessing.value = false
    toast.error(cardDeclined
      ? 'Card declined by bank. Try another card.'
      : 'Payment failed. Please try again.')
    return
  }

  isProcessing.value = false
  toast.success('Payment submitted successfully!')
  setTimeout(() => {
    router.push('/home')
  }, 1000)
}
</script>
  