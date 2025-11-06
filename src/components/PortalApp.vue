<template>
  <div>
    <!-- Main Content Slot -->
    <slot />

    <!-- Footer with Login Trigger -->
    <FoxLabFooter @open-login="showLoginModal = true" />

    <!-- Login Modal -->
    <LoginModal v-model="showLoginModal" @login-success="handleLoginSuccess" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FoxLabFooter from './FoxLabFooter.vue';
import LoginModal from './LoginModal.vue';

const showLoginModal = ref(false);

const handleLoginSuccess = () => {
  showLoginModal.value = false;
  // La redirección se maneja en el modal
};

onMounted(() => {
  // Abrir modal si viene del redirect de auth
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('login') === 'required') {
    showLoginModal.value = true;
    // Limpiar URL
    window.history.replaceState({}, '', window.location.pathname);
  }
});
</script>
