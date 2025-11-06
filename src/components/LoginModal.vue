<template>
  <!-- Modal Backdrop -->
  <Teleport to="body" v-if="isMounted">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <!-- Modal Content -->
        <Transition name="modal-slide">
          <div
            v-if="isOpen"
            class="relative w-full max-w-md border-2 border-orange-500/50 bg-black/95 shadow-2xl shadow-orange-500/20"
          >
            <!-- Decorative Header -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0"></div>

            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 text-gray-400 hover:text-orange-500 transition-colors z-10"
              :disabled="isLoading"
            >
              <X class="w-5 h-5" />
            </button>

            <!-- Modal Header -->
            <div class="border-b border-orange-500/20 p-6 pb-4">
              <div class="flex items-center gap-3 mb-2">
                <Shield class="w-6 h-6 text-orange-500" />
                <h2 class="text-xl font-mono text-orange-500 tracking-wider">
                  [RESTRICTED_ACCESS]
                </h2>
              </div>
              <p class="text-gray-400 font-mono text-xs">
                > AUTHORIZATION REQUIRED TO PROCEED
              </p>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
              <!-- Login Form -->
              <form v-if="!isAuthenticating" @submit.prevent="handleLogin" class="space-y-5">
                <!-- Email Input -->
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-orange-500 font-mono text-xs">
                    <KeyRound class="w-3 h-3" />
                    ACCESS_IDENTIFIER
                  </label>
                  <input
                    v-model="credentials.email"
                    type="email"
                    required
                    autocomplete="email"
                    class="w-full bg-zinc-900/50 border border-orange-500/30 text-gray-300 font-mono p-3 text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
                    placeholder="agent@foxlab.com"
                    :disabled="isLoading"
                  />
                </div>

                <!-- Password Input -->
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-orange-500 font-mono text-xs">
                    <Lock class="w-3 h-3" />
                    SECURITY_CIPHER
                  </label>
                  <input
                    v-model="credentials.password"
                    type="password"
                    required
                    autocomplete="current-password"
                    class="w-full bg-zinc-900/50 border border-orange-500/30 text-gray-300 font-mono p-3 text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
                    placeholder="••••••••••••"
                    :disabled="isLoading"
                  />
                </div>

                <!-- Error Message -->
                <Transition name="fade">
                  <div
                    v-if="errorMessage"
                    class="bg-red-500/10 border border-red-500/30 p-3 rounded flex items-start gap-2"
                  >
                    <AlertCircle class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p class="text-red-400 font-mono text-xs">
                      {{ errorMessage }}
                    </p>
                  </div>
                </Transition>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full bg-orange-500 hover:bg-orange-600 text-black font-mono py-3 px-6 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <component
                    :is="isLoading ? Loader2 : ShieldCheck"
                    :class="{ 'animate-spin': isLoading, 'group-hover:scale-110': !isLoading }"
                    class="w-5 h-5 transition-transform"
                  />
                  <span>{{ isLoading ? 'AUTHENTICATING...' : 'INITIATE ACCESS' }}</span>
                </button>
              </form>

              <!-- Authentication Animation -->
              <div v-else class="space-y-4">
                <div class="space-y-2">
                  <div
                    v-for="(line, index) in displayedLines"
                    :key="index"
                    class="text-green-500 font-mono text-xs opacity-0 animate-fade-in"
                    :style="{ animationDelay: `${index * 100}ms` }"
                  >
                    > {{ line }}
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="w-full bg-zinc-900 h-2 rounded overflow-hidden">
                  <div
                    class="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded transition-all duration-300"
                    :style="{ width: `${progress}%` }"
                  />
                </div>

                <p class="text-gray-400 font-mono text-xs text-center">
                  [PROGRESS: {{ progress }}%]
                </p>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="border-t border-orange-500/20 p-4 bg-zinc-900/30">
              <p class="text-gray-600 font-mono text-xs text-center flex items-center justify-center gap-2">
                <AlertTriangle class="w-3 h-3" />
                UNAUTHORIZED ACCESS WILL BE LOGGED AND TRACED
              </p>
            </div>

            <!-- Decorative Bottom -->
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0"></div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import {
  X,
  Shield,
  Lock,
  KeyRound,
  ShieldCheck,
  Loader2,
  AlertCircle,
  AlertTriangle,
} from 'lucide-vue-next';
import { signIn } from '../lib/supabase';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'login-success']);

const isMounted = ref(false);
const isOpen = ref(props.modelValue);
const credentials = ref({
  email: '',
  password: '',
});
const isLoading = ref(false);
const isAuthenticating = ref(false);
const errorMessage = ref('');
const progress = ref(0);
const displayedLines = ref([]);

const hackingLines = [
  'VERIFYING CREDENTIALS...',
  'ACCESSING SECURE NETWORK...',
  'BYPASSING FIREWALL...',
  'ESTABLISHING ENCRYPTED TUNNEL...',
  'AUTHENTICATION SUCCESSFUL',
];

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
  if (!newVal) {
    resetForm();
  }
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
  if (!newVal) {
    document.body.style.overflow = '';
  } else {
    document.body.style.overflow = 'hidden';
  }
});

const closeModal = () => {
  if (!isLoading.value) {
    isOpen.value = false;
  }
};

const resetForm = () => {
  credentials.value = { email: '', password: '' };
  errorMessage.value = '';
  isAuthenticating.value = false;
  isLoading.value = false;
  progress.value = 0;
  displayedLines.value = [];
};

const handleLogin = async () => {
  isLoading.value = true;
  isAuthenticating.value = true;
  errorMessage.value = '';
  progress.value = 0;
  displayedLines.value = [];

  try {
    // Simular animación de hacking
    for (let i = 0; i < hackingLines.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      displayedLines.value.push(hackingLines[i]);
      progress.value = ((i + 1) / hackingLines.length) * 100;
    }

    // Intentar login
    console.log('[LOGIN] Intentando autenticación...');
    console.log('[LOGIN] Email:', credentials.value.email);

    const data = await signIn(
      credentials.value.email,
      credentials.value.password
    );

    console.log('[LOGIN] Respuesta de signIn:', data);
    console.log('[LOGIN] ¿Hay data?', !!data);
    console.log('[LOGIN] ¿Hay data.session?', !!data?.session);
    console.log('[LOGIN] ¿Hay data.user?', !!data?.user);

    if (data && data.session) {
      // Login exitoso
      console.log('[LOGIN] Login exitoso!');
      console.log('[LOGIN] Session:', data.session);
      console.log('[LOGIN] User:', data.user);

      await new Promise((resolve) => setTimeout(resolve, 500));
      emit('login-success', data);

      // Redirigir a admin
      console.log('[LOGIN] Redirigiendo a /admin...');
      window.location.href = '/admin';
    } else if (data && data.user && !data.session) {
      console.error('[LOGIN] Usuario válido pero sin sesión');
      console.error('[LOGIN] Data completa:', JSON.stringify(data, null, 2));
      throw new Error('Autenticación exitosa pero sin sesión. Verifica la configuración de Supabase.');
    } else {
      console.error('[LOGIN] No hay sesión en la respuesta');
      console.error('[LOGIN] Data recibida:', JSON.stringify(data, null, 2));
      throw new Error('No se pudo iniciar sesión - sin sesión');
    }
  } catch (error) {
    console.error('[LOGIN] Error de autenticación:', error);
    console.error('[LOGIN] Error completo:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });

    errorMessage.value =
      error.message === 'Invalid login credentials'
        ? '[ERROR] INVALID CREDENTIALS - ACCESS DENIED'
        : '[ERROR] ' + error.message;
    isAuthenticating.value = false;
    progress.value = 0;
    displayedLines.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  isMounted.value = true;
});
</script>

<style scoped>
/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s ease;
}

.modal-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Fade In Animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease forwards;
}

/* Spin Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
