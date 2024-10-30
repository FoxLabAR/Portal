<template>
  <div ref="contactSection" class="min-h-screen bg-black p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Initial State -->
      <div v-if="!isHacking && !isHacked && !isLocked" class="text-center space-y-6 transition-opacity duration-500"
        :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }">
        <h2 class="text-orange-500 font-mono text-2xl">[FOXLAB_SECURE_TERMINAL]</h2>
        <p class="text-gray-400 font-mono">ACCESS RESTRICTED - AUTHORIZATION REQUIRED</p>
        <div class="relative h-20 flex items-center justify-center">
          <div class="typing-text font-mono text-green-500 text-sm">
            > SCROLLING DETECTED... INITIATING SEQUENCE...
          </div>
        </div>
      </div>

      <!-- Hacking Animation -->
      <div v-if="isHacking && !isHacked" class="space-y-4">
        <div class="border border-orange-500/50 p-4 bg-black/50 font-mono text-sm">
          <div class="space-y-2">
            <div v-for="(line, index) in displayedAccessLines" :key="index" class="text-green-500 typing-effect">
              > {{ line }}
            </div>
          </div>
        </div>
        <div class="w-full bg-gray-900 h-2 rounded">
          <div class="bg-orange-500 h-2 rounded transition-all duration-500" :style="{ width: `${hackProgress}%` }" />
        </div>
      </div>

      <!-- Contact Form -->
      <div v-if="isHacked && !isLocked" class="space-y-6 animate-fade-in">
        <div class="flex items-center gap-2 text-orange-500 font-mono mb-4">
          <div class="w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 class="text-xl">FOXLAB SECURE CHANNEL</h2>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-2">
            <label class="block text-orange-500 font-mono text-sm">CODENAME_</label>
            <input v-model="formData.codename" type="text"
              class="w-full bg-gray-900 border border-orange-500/50 text-gray-300 font-mono p-2 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="ENTER YOUR CODENAME" />
          </div>

          <div class="space-y-2">
            <label class="block text-orange-500 font-mono text-sm">ENCRYPTION_KEY [EMAIL]</label>
            <input v-model="formData.email" type="email"
              class="w-full bg-gray-900 border border-orange-500/50 text-gray-300 font-mono p-2 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="ENTER YOUR ENCRYPTION KEY" />
          </div>

          <div class="space-y-2">
            <label class="block text-orange-500 font-mono text-sm">MESSAGE_CONTENTS</label>
            <textarea v-model="formData.message"
              class="w-full h-32 bg-gray-900 border border-orange-500/50 text-gray-300 font-mono p-2 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="ENTER YOUR ENCRYPTED MESSAGE" />
          </div>

          <div class="flex justify-end">
            <button type="submit"
              class="bg-orange-500 hover:bg-orange-600 text-black font-mono py-2 px-6 rounded flex items-center gap-2 transition-colors"
              :disabled="isSubmitting">
              <div class="w-4 h-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
              </div>
              {{ isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE' }}
            </button>
          </div>
        </form>

        <div class="text-gray-500 font-mono text-xs">
          [WARNING: ALL COMMUNICATIONS ARE MONITORED AND LOGGED]
        </div>
      </div>

      <!-- Locked State -->
      <div v-if="isLocked" class="space-y-6">
        <div class="border-2 border-red-500 p-8 bg-black text-center space-y-6">
          <div class="text-red-500 font-mono text-2xl">
            [TERMINAL_LOCKED]
          </div>
          <div class="text-red-500 font-mono text-xl">
            MESSAGE RECEIVED...
          </div>
          <div class="flex justify-center mt-4">
            <img src="logo_foxlab.svg" alt="FOXLAB" class="w-24 h-24 animate-pulse" />
          </div>
          <div class="text-orange-500 font-mono text-sm mt-4 typing-text-fast">
            TERMINAL WILL SELF-DESTRUCT IN {{ countdown }} SECONDS
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const contactSection = ref(null);
const isVisible = ref(false);
const isHacking = ref(false);
const isHacked = ref(false);
const isLocked = ref(false);
const hackProgress = ref(0);
const displayedAccessLines = ref([]);
const isSubmitting = ref(false);
const countdown = ref(10);
let observer = null;
let countdownInterval = null;

const formData = reactive({
  codename: '',
  email: '',
  message: ''
});

const hackingLines = [
  "INITIATING FOXLAB SECURE CONNECTION...",
  "ACCESSING SECURE NETWORK...",
  "ESTABLISHING ENCRYPTED CHANNEL...",
  "VERIFYING FOXLAB CLEARANCE...",
  "TERMINAL ACCESS GRANTED."
];

const encryptionLines = [
  "MESSAGE INTERCEPTED",
  "INITIATING CODEC ENCRYPTION",
  "ACTIVATING STEALTH PROTOCOLS",
  "TERMINAL COMPROMISED",
];

const startHacking = () => {
  if (isHacking.value) return;

  isHacking.value = true;
  displayedAccessLines.value = [];
  hackProgress.value = 0;

  hackingLines.forEach((line, index) => {
    setTimeout(() => {
      displayedAccessLines.value.push(line);
      hackProgress.value = ((index + 1) / hackingLines.length) * 60;

      if (index === hackingLines.length - 1) {
        setTimeout(() => {
          isHacked.value = true;
        }, 500);
      }
    }, index * 400);
  });
};

const startEncryption = () => {
  displayedAccessLines.value = [];
  hackProgress.value = 0;

  encryptionLines.forEach((line, index) => {
    setTimeout(() => {
      displayedAccessLines.value.push(line);
      hackProgress.value = ((index + 1) / encryptionLines.length) * 60;

      if (index === encryptionLines.length - 1) {
        setTimeout(() => {
          isLocked.value = true;
          startCountdown();
          isHacking.value = false
        }, 300);
      }
    }, index * 500);
  });
};

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
      // Here you could add additional effects or actions when countdown reaches zero
    }
  }, 1000);
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // Enviar datos a Google Sheets
    const response = await fetch('https://script.google.com/macros/s/AKfycbzu6RkbOd-xIIBLafHC4dXKnxOUZ5nv4OL7dJJZYlpzN_I7V6TXysV9JN4zkmXWcU8Xpw/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    isHacking.value = true;
    isHacked.value = false;
    startEncryption();
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      isVisible.value = entry.isIntersecting;

      if (entry.isIntersecting) {
        setTimeout(startHacking, 1000);
        observer.disconnect();
      }
    },
    {
      threshold: 0.3,
    }
  );

  if (contactSection.value) {
    observer.observe(contactSection.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>
