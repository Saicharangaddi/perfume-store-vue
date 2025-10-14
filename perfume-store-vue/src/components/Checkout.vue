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
        <input type="text" v-model="cardNumber" placeholder="Card Number" class="w-full border px-3 py-2 rounded" />
        <input type="text" v-model="cardName" placeholder="Name on Card" class="w-full border px-3 py-2 rounded" />
        <div class="flex space-x-2">
          <input type="text" v-model="expiry" placeholder="MM/YY" class="w-1/2 border px-3 py-2 rounded" />
          <input type="text" v-model="cvv" placeholder="CVV" class="w-1/2 border px-3 py-2 rounded" />
        </div>
      </div>

      <!-- UPI -->
      <div v-if="paymentMethod === 'upi'" class="mt-4">
        <input type="text" v-model="upiId" placeholder="Enter UPI ID" class="w-full border px-3 py-2 rounded" />
      </div>

      <!-- Net Banking -->
      <div v-if="paymentMethod === 'netbanking'" class="mt-4">
        <select v-model="bank" class="w-full border px-3 py-2 rounded">
          <option disabled value="">Select Bank</option>
          <option>HDFC</option>
          <option>ICICI</option>
          <option>SBI</option>
          <option>Axis</option>
        </select>
      </div>

      <!-- Pay Button -->
      <button
        @click="submitPayment"
        class="mt-6 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
      >
        Pay Now
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const paymentMethod = ref('card')
const cardNumber = ref('')
const cardName = ref('')
const expiry = ref('')
const cvv = ref('')
const upiId = ref('')
const bank = ref('')
const router = useRouter()

function submitPayment() {
  alert('Payment submitted successfully!')
  router.push('/home')
}
</script>