<template>
  <v-container class="fill-height festive-container" style="min-height: 100vh">
    <!-- Floating confetti elements -->
    <div class="confetti-container">
      <div
        class="confetti"
        v-for="n in 20"
        :key="n"
        :style="{ animationDelay: Math.random() * 3 + 's' }"
      >
        🎉
      </div>
    </div>

    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card class="elevation-24 festive-card" rounded="xl">
          <!-- Festive header with gradient background -->
          <div class="festive-header pa-6">
            <div class="text-center">
              <!-- Official Logo -->
              <div class="logo-container mb-3">
                <img
                  src="/Expressersweepstakeslogo.png"
                  alt="Express ER Sweepstakes Logo"
                  class="sweepstakes-logo"
                />
              </div>
              <div class="text-h3 font-weight-bold celebration-title">
                🎉 Express ER Sweepstakes 🎉
              </div>
              <div class="text-h6 mt-3 celebration-subtitle">
                ✨ Enter for your chance to win BIG! ✨
              </div>
              <div class="prize-banner mt-3">🏆 AMAZING PRIZES AWAIT! 🏆</div>
            </div>
          </div>

          <v-card-text class="pa-6">
            <v-form @submit.prevent="submitEntry" v-model="valid">
              <v-text-field
                v-model="formData.first_name"
                label="🎪 First Name"
                variant="outlined"
                :rules="nameRules"
                required
                class="mb-3 festive-field"
                prepend-inner-icon="mdi-account"
                color="primary"
              />

              <v-text-field
                v-model="formData.last_name"
                label="🎭 Last Name"
                variant="outlined"
                :rules="nameRules"
                required
                class="mb-3 festive-field"
                prepend-inner-icon="mdi-account"
                color="primary"
              />

              <v-text-field
                v-model="formData.phone_number"
                label="📱 Phone Number"
                variant="outlined"
                :rules="phoneRules"
                required
                class="mb-4 festive-field"
                prepend-inner-icon="mdi-phone"
                placeholder="(555) 123-4567"
                hint="Format: (XXX) XXX-XXXX"
                color="primary"
                @input="formatPhoneInput"
              />

              <v-btn
                type="submit"
                color="primary"
                size="x-large"
                block
                :loading="loading"
                :disabled="!valid"
                class="mb-3 celebration-button"
                elevation="8"
              >
                <v-icon left size="large">mdi-trophy</v-icon>
                🎯 ENTER TO WIN! 🎯
                <v-icon right size="large">mdi-confetti</v-icon>
              </v-btn>
            </v-form>

            <!-- Success Message -->
            <v-alert
              v-if="showSuccess"
              type="success"
              variant="tonal"
              closable
              @click:close="showSuccess = false"
              class="mt-4 celebration-alert"
              color="success"
              border="start"
              elevation="4"
            >
              <template v-slot:prepend>
                <div class="success-celebration">🎉</div>
              </template>
              <div class="text-h6 font-weight-bold">🏆 CONGRATULATIONS! 🏆</div>
              <div class="mt-1">
                🎊 Your entry has been submitted successfully! Good luck in the drawing! 🍀
              </div>
            </v-alert>

            <!-- Error Message -->
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              closable
              @click:close="errorMessage = ''"
              class="mt-4"
              color="error"
              border="start"
              elevation="4"
            >
              <template v-slot:prepend>
                <div class="error-icon">⚠️</div>
              </template>
              <div class="font-weight-bold">Oops! Something went wrong</div>
              <div class="mt-1">{{ errorMessage }} Please try again! 🔄</div>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Background decoration -->
    <div class="background-pattern"></div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { supabase, type SweepstakesEntry } from '@/lib/supabase'

const valid = ref(false)
const loading = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

const formData = reactive({
  first_name: '',
  last_name: '',
  phone_number: '',
})

const nameRules = [
  (value: string) => !!value || 'Name is required',
  (value: string) => value.length >= 2 || 'Name must be at least 2 characters',
]

const phoneRules = [
  (value: string) => !!value || 'Phone number is required',
  (value: string) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    return phoneRegex.test(value) || 'Phone must be in format (XXX) XXX-XXXX'
  },
]

// Format phone number as user types
const formatPhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '')

  if (value.length <= 3) {
    formData.phone_number = value
  } else if (value.length <= 6) {
    formData.phone_number = `(${value.slice(0, 3)}) ${value.slice(3)}`
  } else {
    formData.phone_number = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
  }
}

const resetForm = () => {
  formData.first_name = ''
  formData.last_name = ''
  formData.phone_number = ''
}

const submitEntry = async () => {
  if (!valid.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const entry: SweepstakesEntry = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      phone_number: formData.phone_number.trim(),
    }

    const { error } = await supabase.from('sweepstakes_entries').insert([entry])

    if (error) {
      throw error
    }

    showSuccess.value = true
    resetForm()
  } catch (error) {
    console.error('Error submitting entry:', error)
    errorMessage.value = 'Failed to submit entry. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

/* Festive container with animated gradient background */
.festive-container {
  background: linear-gradient(45deg, #16213e, #1a1a2e, #0f3460, #16213e);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  position: relative;
  overflow: hidden;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Confetti animation */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  font-size: 20px;
  animation: confettiFall 4s linear infinite;
  opacity: 0.8;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.confetti:nth-child(odd) {
  left: 10%;
  animation-duration: 3s;
}

.confetti:nth-child(even) {
  left: 85%;
  animation-duration: 5s;
}

.confetti:nth-child(3n) {
  left: 50%;
  animation-duration: 4s;
}

/* Festive card styling */
.festive-card {
  background: linear-gradient(
    135deg,
    rgba(255, 107, 53, 0.1),
    rgba(247, 147, 30, 0.1),
    rgba(255, 210, 63, 0.1)
  );
  border: 2px solid rgba(255, 107, 53, 0.3);
  box-shadow:
    0 0 30px rgba(255, 107, 53, 0.4),
    0 0 60px rgba(247, 147, 30, 0.2);
  backdrop-filter: blur(15px);
  position: relative;
  z-index: 2;
  animation: cardGlow 3s ease-in-out infinite alternate;
}

@keyframes cardGlow {
  0% {
    box-shadow:
      0 0 30px rgba(255, 107, 53, 0.4),
      0 0 60px rgba(247, 147, 30, 0.2);
  }
  100% {
    box-shadow:
      0 0 40px rgba(255, 107, 53, 0.6),
      0 0 80px rgba(247, 147, 30, 0.3);
  }
}

/* Festive header */
.festive-header {
  background: linear-gradient(135deg, #ff6b35, #f7931e, #ffd23f);
  background-size: 300% 300%;
  animation: headerGradient 4s ease infinite;
  border-radius: 24px 24px 0 0;
  position: relative;
  overflow: hidden;
}

.festive-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes headerGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.celebration-icon {
  font-size: 3rem;
  animation: bounce 2s ease-in-out infinite;
}

/* Logo styling */
.logo-container {
  position: relative;
  z-index: 2;
}

.sweepstakes-logo {
  max-width: 100%;
  width: clamp(120px, 50vw, 200px);
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: logoGlow 3s ease-in-out infinite alternate;
  transition: transform 0.3s ease;
}

.sweepstakes-logo:hover {
  transform: scale(1.05);
}

@keyframes logoGlow {
  0% {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 15px rgba(255, 107, 53, 0.3));
  }
  100% {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 25px rgba(255, 107, 53, 0.6));
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.celebration-title {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: textGlow 2s ease-in-out infinite alternate;
  font-size: clamp(1.5rem, 5vw, 2.125rem) !important;
  line-height: 1.2;
}

@keyframes textGlow {
  0% {
    text-shadow:
      2px 2px 4px rgba(0, 0, 0, 0.5),
      0 0 10px rgba(255, 255, 255, 0.3);
  }
  100% {
    text-shadow:
      2px 2px 4px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(255, 255, 255, 0.5);
  }
}

.celebration-subtitle {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
}

.prize-banner {
  background: linear-gradient(90deg, #ffd700, #ffa500, #ffd700);
  color: #000;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  display: inline-block;
  animation: prizeGlow 1.5s ease-in-out infinite alternate;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

@keyframes prizeGlow {
  0% {
    transform: scale(1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(255, 215, 0, 0.5);
  }
}

/* Form field styling */
.festive-field {
  position: relative;
}

.festive-field .v-field {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
}

.festive-field .v-field:hover {
  border-color: rgba(255, 107, 53, 0.6);
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.3);
}

.festive-field .v-field--focused {
  border-color: #ff6b35;
  box-shadow: 0 0 25px rgba(255, 107, 53, 0.5);
}

/* Celebration button */
.celebration-button {
  background: linear-gradient(45deg, #ff6b35, #f7931e, #ffd23f) !important;
  background-size: 300% 300%;
  animation: buttonGradient 3s ease infinite;
  font-weight: bold;
  font-size: 1.1rem !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.celebration-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.celebration-button:hover::before {
  left: 100%;
}

@keyframes buttonGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.celebration-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 107, 53, 0.4);
}

/* Alert styling */
.celebration-alert {
  border-left: 5px solid #66bb6a;
  background: linear-gradient(135deg, rgba(102, 187, 106, 0.1), rgba(139, 195, 74, 0.1));
  animation: celebrationPulse 2s ease-in-out infinite;
}

@keyframes celebrationPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.success-celebration {
  font-size: 2rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-icon {
  font-size: 1.5rem;
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* Background pattern override */
.background-pattern {
  display: none; /* Hide the old pattern, we're using the new festive background */
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .festive-container {
    padding: 8px !important;
  }

  .festive-card {
    margin: 8px;
    border-radius: 16px;
  }

  .festive-header {
    padding: 16px !important;
  }

  .celebration-title {
    font-size: clamp(1.5rem, 4vw, 1.75rem) !important;
    line-height: 1.2;
  }

  .celebration-subtitle {
    font-size: clamp(1rem, 3vw, 1.25rem) !important;
  }

  .prize-banner {
    font-size: clamp(0.875rem, 2.5vw, 1rem);
    padding: 6px 12px;
  }

  .celebration-icon {
    font-size: 2rem;
  }

  .sweepstakes-logo {
    width: clamp(100px, 40vw, 150px);
  }

  .confetti {
    font-size: 16px;
  }

  .celebration-button {
    font-size: clamp(1rem, 3vw, 1.1rem) !important;
    padding: 12px 16px !important;
  }

  .v-card-text {
    padding: 16px !important;
  }
}

/* Extra small mobile devices */
@media (max-width: 375px) {
  .festive-container {
    padding: 4px !important;
  }

  .festive-card {
    margin: 4px;
  }

  .festive-header {
    padding: 12px !important;
  }

  .celebration-title {
    font-size: clamp(1.25rem, 5vw, 1.5rem) !important;
  }

  .celebration-subtitle {
    font-size: clamp(0.875rem, 3vw, 1rem) !important;
  }

  .prize-banner {
    font-size: clamp(0.75rem, 2.5vw, 0.875rem);
    padding: 4px 8px;
  }

  .sweepstakes-logo {
    width: clamp(80px, 35vw, 120px);
  }
}
</style>
