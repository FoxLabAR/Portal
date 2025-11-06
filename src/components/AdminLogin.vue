<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo y Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img src="/logo_foxlab.svg" alt="FOXLAB" class="w-24 h-24" />
        </div>
        <h1 class="text-2xl font-mono text-orange-500 mb-2">
          [FOXLAB_ADMIN_TERMINAL]
        </h1>
        <p class="text-gray-400 font-mono text-sm">
          RESTRICTED ACCESS - AUTHORIZATION REQUIRED
        </p>
      </div>

      <!-- Login Form -->
      <div class="border-2 border-orange-500/50 bg-black/80 p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div class="space-y-2">
            <label class="block text-orange-500 font-mono text-sm">
              ACCESS_ID [EMAIL]
            </label>
            <input
              v-model="credentials.email"
              type="email"
              required
              class="w-full bg-gray-900 border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="agent@foxlab.com"
              :disabled="isLoading"
            />
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label class="block text-orange-500 font-mono text-sm">
              SECURITY_KEY [PASSWORD]
            </label>
            <input
              v-model="credentials.password"
              type="password"
              required
              class="w-full bg-gray-900 border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="••••••••"
              :disabled="isLoading"
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="bg-red-500/10 border border-red-500/50 p-3 rounded"
          >
            <p class="text-red-500 font-mono text-sm">
              [ERROR] {{ errorMessage }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-orange-500 hover:bg-orange-600 text-black font-mono py-3 px-6 rounded flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock v-if="!isLoading" class="w-5 h-5" />
            <Loader2 v-else class="w-5 h-5 animate-spin" />
            <span>{{ isLoading ? 'AUTHENTICATING...' : 'INITIATE ACCESS' }}</span>
          </button>
        </form>

        <!-- Hacking Animation -->
        <div v-if="isAuthenticating" class="mt-6 space-y-2">
          <div
            v-for="(line, index) in hackingLines"
            :key="index"
            class="text-green-500 font-mono text-xs typing-effect"
          >
            > {{ line }}
          </div>
          <div class="w-full bg-gray-900 h-1 rounded mt-4">
            <div
              class="bg-orange-500 h-1 rounded transition-all duration-300"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 font-mono text-xs">
            [WARNING: UNAUTHORIZED ACCESS WILL BE LOGGED]
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Lock, Loader2 } from 'lucide-vue-next';
import { signIn } from '../lib/supabase';

const emit = defineEmits(['login-success']);

const credentials = reactive({
  email: '',
  password: '',
});

const isLoading = ref(false);
const isAuthenticating = ref(false);
const errorMessage = ref('');
const progress = ref(0);

const hackingLines = [
  'VERIFYING ACCESS CREDENTIALS...',
  'ESTABLISHING SECURE CONNECTION...',
  'BYPASSING SECURITY PROTOCOLS...',
  'ACCESSING FOXLAB MAINFRAME...',
  'AUTHENTICATION SUCCESSFUL.',
];

const handleLogin = async () => {
  isLoading.value = true;
  isAuthenticating.value = true;
  errorMessage.value = '';
  progress.value = 0;

  try {
    // Simular animación de hacking
    for (let i = 0; i <= hackingLines.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      progress.value = ((i + 1) / hackingLines.length) * 100;
    }

    // Intentar login
    const { user, session } = await signIn(
      credentials.email,
      credentials.password
    );

    if (session) {
      // Login exitoso
      await new Promise((resolve) => setTimeout(resolve, 500));
      emit('login-success', { user, session });
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    errorMessage.value = error.message || 'Invalid credentials. Access denied.';
    isAuthenticating.value = false;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.typing-effect {
  animation: typing 0.3s steps(40);
}

@keyframes typing {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
