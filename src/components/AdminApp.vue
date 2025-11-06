<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen bg-black flex items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div class="text-orange-500 font-mono text-xl animate-pulse">
          [VERIFYING CREDENTIALS...]
        </div>
        <div class="flex gap-2">
          <div class="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></div>
          <div class="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
      </div>
    </div>

    <!-- Admin Panel Content -->
    <div v-else-if="isAuthenticated" class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-black border border-orange-500/20 rounded-lg p-4">
          <h2 class="text-orange-500 font-mono text-sm mb-4 flex items-center gap-2">
            <Terminal class="w-4 h-4" />
            NAVIGATION
          </h2>
          <nav class="space-y-2">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="activeSection = item.id"
              class="w-full flex items-center gap-3 px-4 py-3 rounded font-mono text-sm transition-colors"
              :class="
                activeSection === item.id
                  ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50'
                  : 'text-gray-400 hover:bg-orange-500/10 hover:text-orange-500'
              "
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span>{{ item.label }}</span>
            </button>
          </nav>
        </div>

        <!-- Quick Stats -->
        <div class="bg-black border border-orange-500/20 rounded-lg p-4 mt-6">
          <h2 class="text-orange-500 font-mono text-sm mb-4 flex items-center gap-2">
            <BarChart3 class="w-4 h-4" />
            QUICK STATS
          </h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-400 font-mono text-xs">Projects</span>
              <span class="text-orange-500 font-mono text-sm font-bold">{{ stats.projects }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-400 font-mono text-xs">Team</span>
              <span class="text-orange-500 font-mono text-sm font-bold">{{ stats.team }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-400 font-mono text-xs">Messages</span>
              <span class="text-orange-500 font-mono text-sm font-bold">{{ stats.contacts }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="lg:col-span-3">
        <AdminProjects v-if="activeSection === 'projects'" />
        <AdminTeam v-else-if="activeSection === 'team'" />

        <!-- Contacts Section (Coming Soon) -->
        <div v-else-if="activeSection === 'contacts'" class="bg-black border border-orange-500/20 rounded-lg p-6">
          <h2 class="text-orange-500 font-mono text-xl">MESSAGES</h2>
          <p class="text-gray-400 font-mono text-sm mt-4">Coming soon...</p>
        </div>

        <!-- Settings Section (Coming Soon) -->
        <div v-else class="bg-black border border-orange-500/20 rounded-lg p-6">
          <h2 class="text-orange-500 font-mono text-xl">SETTINGS</h2>
          <p class="text-gray-400 font-mono text-sm mt-4">Coming soon...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Terminal,
  BarChart3,
  FolderKanban,
  Users,
  Mail,
  Settings,
} from 'lucide-vue-next';
import AdminProjects from './AdminProjects.vue';
import AdminTeam from './AdminTeam.vue';
import { getSession } from '../lib/supabase';

const isAuthenticated = ref(false);
const isLoading = ref(true);
const activeSection = ref('projects');
const stats = ref({
  projects: 0,
  team: 0,
  contacts: 0,
});

const menuItems = [
  { id: 'projects', label: 'PROJECTS', icon: FolderKanban },
  { id: 'team', label: 'TEAM', icon: Users },
  { id: 'contacts', label: 'MESSAGES', icon: Mail },
  { id: 'settings', label: 'SETTINGS', icon: Settings },
];

// Verificar sesión existente
const checkSession = async () => {
  console.log('[ADMIN] Verificando sesión...');

  try {
    const session = await getSession();

    console.log('[ADMIN] Resultado de getSession():', {
      hasSession: !!session,
      session: session
    });

    if (!session) {
      // No hay sesión, redirigir al home con parámetro para abrir modal
      console.log('[ADMIN] No hay sesión, redirigiendo a home...');
      window.location.href = '/?login=required';
      return;
    }

    console.log('[ADMIN] ✅ Sesión válida encontrada');
    console.log('[ADMIN] Usuario:', session.user?.email);
    console.log('[ADMIN] Expira:', new Date(session.expires_at * 1000).toLocaleString());

    isAuthenticated.value = true;
    isLoading.value = false;
  } catch (error) {
    console.error('[ADMIN] Error al verificar sesión:', error);
    window.location.href = '/?login=required';
  }
};

const handleLogout = () => {
  console.log('[ADMIN] Cerrando sesión...');
  isAuthenticated.value = false;
  window.location.href = '/';
};

onMounted(() => {
  checkSession();
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
