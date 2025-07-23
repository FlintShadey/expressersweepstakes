<template>
  <v-container class="fill-height" style="min-height: 100vh;">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12" rounded="lg">
          <v-card-title class="text-center pa-6">
            <div class="text-h4 text-primary font-weight-bold">
              Express ER Sweepstakes
            </div>
            <div class="text-subtitle-1 mt-2 text-medium-emphasis">
              Enter for your chance to win!
            </div>
          </v-card-title>

          <v-card-text class="pa-6">
            <v-form @submit.prevent="submitEntry" v-model="valid">
              <v-text-field
                v-model="formData.first_name"
                label="First Name"
                variant="outlined"
                :rules="nameRules"
                required
                class="mb-3"
                prepend-inner-icon="mdi-account"
              />

              <v-text-field
                v-model="formData.last_name"
                label="Last Name"
                variant="outlined"
                :rules="nameRules"
                required
                class="mb-3"
                prepend-inner-icon="mdi-account"
              />

              <v-text-field
                v-model="formData.phone_number"
                label="Phone Number"
                variant="outlined"
                :rules="phoneRules"
                required
                class="mb-4"
                prepend-inner-icon="mdi-phone"
                placeholder="(555) 123-4567"
                hint="Format: (XXX) XXX-XXXX"
                @input="formatPhoneInput"
              />

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                :disabled="!valid"
                class="mb-3"
              >
                <v-icon left>mdi-trophy</v-icon>
                Submit for the contest drawing
              </v-btn>
            </v-form>

            <!-- Success Message -->
            <v-alert
              v-if="showSuccess"
              type="success"
              variant="tonal"
              closable
              @click:close="showSuccess = false"
              class="mt-4"
            >
              <v-icon>mdi-check-circle</v-icon>
              Thank you! Your entry has been submitted successfully.
            </v-alert>

            <!-- Error Message -->
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              closable
              @click:close="errorMessage = ''"
              class="mt-4"
            >
              <v-icon>mdi-alert-circle</v-icon>
              {{ errorMessage }}
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
  phone_number: ''
})

const nameRules = [
  (value: string) => !!value || 'Name is required',
  (value: string) => value.length >= 2 || 'Name must be at least 2 characters'
]

const phoneRules = [
  (value: string) => !!value || 'Phone number is required',
  (value: string) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    return phoneRegex.test(value) || 'Phone must be in format (XXX) XXX-XXXX'
  }
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
      phone_number: formData.phone_number.trim()
    }

    const { error } = await supabase
      .from('sweepstakes_entries')
      .insert([entry])

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

.background-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(25, 118, 210, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(25, 118, 210, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(25, 118, 210, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(25, 118, 210, 0.1) 75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
  z-index: -1;
  pointer-events: none;
}

.v-card {
  backdrop-filter: blur(10px);
  background: rgba(var(--v-theme-surface), 0.9) !important;
}

@media (max-width: 600px) {
  .v-card {
    margin: 16px;
  }
  
  .text-h4 {
    font-size: 1.75rem !important;
  }
}
</style>
