<template>
  <div class="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white p-8 rounded shadow">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

      <!-- Payment Method -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
        <select v-model="paymentMethod" class="w-full border border-gray-300 
        rounded px-3 py-2">
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
          <p v-if="errors.cardNumber" class="text-red-500 text-sm mt-1">
            {{ errors.cardNumber }}</p>
        </div>

        <div>
          <input
            type="text"
            v-model="cardName"
            placeholder="Name on Card"
            class="w-full border px-3 py-2 rounded"
            :class="{ 'border-red-500': errors.cardName }"
          />
          <p v-if="errors.cardName" class="text-red-500 text-sm mt-1">
            {{ errors.cardName }}</p>
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
            <p v-if="errors.expiry" class="text-red-500 text-sm mt-1">
              {{ errors.expiry }}</p>
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
      <div v-if="paymentMethod === 'upi' " class="mt-4">
        <input
          type="text"
          v-model="upiId"
          placeholder="Enter UPI ID"
          class="w-full border px-3 py-2 rounded"
          :class="{ 'border-red-500': errors.upiId }"
        />
        <p v-if="errors.upiId" class="text-red-500 text-sm mt-1">{{ errors.upiId }}</p>
      </div>

      <!-- Net Banking Login -->
<div v-if="paymentMethod === 'netbanking'" class="mt-4 space-y-4">
  <!-- Bank Selection -->
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

  <!-- Username -->
  <input
    type="text"
    v-model="netbankUsername"
    placeholder="Enter Net Banking Username"
    class="w-full border px-3 py-2 rounded"
    :class="{ 'border-red-500': errors.netbankUsername }"
  />
  <p v-if="errors.netbankUsername" class="text-red-500 text-sm mt-1">{{ errors.netbankUsername }}</p>

  <!-- Password -->
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
        class="mt-6 w-full bg-pink-600 text-white py-2 
        rounded hover:bg-pink-700 transition">
        Pay Now
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

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

// Error messages
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

// Utility
function isFutureExpiry(dateStr) {
  const [mm, yy] = dateStr.split('/')
  if (!mm || !yy) return false
  const expDate = new Date(`20${yy}`, mm)
  const now = new Date()
  return expDate > now
}

function clearErrors() {
  for (const key in errors) errors[key] = ''
}

watch(cardNumber, val => {
  errors.cardNumber = /^\d{16}$/.test(val) ? '' : 'Card number must be 16 digits'
})
watch(cardName, val => {
  errors.cardName = val.trim() ? '' : 'Name on card is required'
})
watch(expiry, val => {
  errors.expiry = (/^\d{2}\/\d{2}$/.test(val) && isFutureExpiry(val)) ? '' : 'Enter a valid future expiry date (MM/YY)'
})
watch(cvv, val => {
  errors.cvv = /^\d{3}$/.test(val) ? '' : 'CVV must be 3 digits'
})
watch(upiId, val => {
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/
  errors.upiId = upiRegex.test(val.trim()) ? '' : 'Enter a valid UPI ID (e.g., yourname@bank)'
})
watch(bank, val => {
  errors.bank = val ? '' : 'Please select a bank'
})
watch(netbankUsername, val => {
  errors.netbankUsername = val.trim() ? '' : 'Username is required'
})
watch(netbankPassword, val => {
  errors.netbankPassword = val.trim() ? '' : 'Password is required'
})

// Submit handler
function submitPayment() {
  clearErrors()
  let valid = true

  if (paymentMethod.value === 'card') {
    if (!/^\d{16}$/.test(cardNumber.value)) valid = false
    if (!cardName.value.trim()) valid = false
    if (!/^\d{2}\/\d{2}$/.test(expiry.value) || !isFutureExpiry(expiry.value)) valid = false
    if (!/^\d{3}$/.test(cvv.value)) valid = false
  }

  if (paymentMethod.value === 'upi') {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/
    if (!upiId.value.trim() || !upiRegex.test(upiId.value.trim())) valid = false
  }

  if (paymentMethod.value === 'netbanking') {
    if (!bank.value) valid = false
    if (!netbankUsername.value.trim()) valid = false
    if (!netbankPassword.value.trim()) valid = false
  }

  if (!valid) return

  alert('Payment submitted successfully!')
  router.push('/home')
}
</script>