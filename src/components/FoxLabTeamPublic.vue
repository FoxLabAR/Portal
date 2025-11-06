<template>
  <div class="bg-zinc-900 text-gray-100 py-16">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="relative mb-16">
        <div class="absolute -top-8 left-0 text-orange-500/20 font-mono text-sm tracking-wider">
          CLASSIFIED - PERSONNEL FILES
        </div>
        <div class="flex items-center justify-between">
          <h2 class="text-4xl font-bold mb-4 flex items-center gap-3">
            <Users class="text-orange-500 h-8 w-8" />
            <span class="text-orange-500">FOX</span>LAB_TEAM
          </h2>
          <div class="hidden lg:flex items-center gap-4 text-orange-500/60">
            <div class="flex items-center gap-2">
              <Shield class="h-4 w-4" />
              <span class="text-sm">Active Agents: {{ activeCount }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="i in 3"
          :key="i"
          class="border border-orange-500/20 p-6 rounded-lg animate-pulse"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="w-20 h-20 rounded-full bg-orange-500/20"></div>
            <div class="flex-1">
              <div class="h-4 bg-orange-500/20 rounded mb-2"></div>
              <div class="h-3 bg-orange-500/10 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="member in team"
          :key="member.id"
          class="border border-orange-500/20 rounded-lg p-6 bg-black/40 hover:border-orange-500/50 transition-all hover:transform hover:scale-105 group"
        >
          <!-- Agent Header -->
          <div class="flex items-start gap-4 mb-6">
            <!-- Avatar -->
            <div class="relative">
              <div
                class="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center overflow-hidden border-2 border-orange-500/50"
              >
                <img
                  v-if="member.avatar_url"
                  :src="member.avatar_url"
                  :alt="member.name"
                  class="w-full h-full object-cover"
                />
                <User v-else class="w-10 h-10 text-orange-500" />
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-black flex items-center justify-center"
              >
                <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-100 mb-1">{{ member.name }}</h3>
              <p class="text-orange-500 font-mono text-sm mb-2">{{ member.role }}</p>
              <div class="flex items-center gap-2 text-green-500 font-mono text-xs">
                <Radio class="w-3 h-3" />
                <span>ACTIVE</span>
              </div>
            </div>
          </div>

          <!-- Bio -->
          <p v-if="member.bio" class="text-gray-400 text-sm mb-6 leading-relaxed">
            {{ member.bio }}
          </p>

          <!-- Specialties -->
          <div v-if="member.specialties?.length" class="mb-6">
            <div class="text-orange-500/60 font-mono text-xs mb-3 flex items-center gap-2">
              <Code class="w-3 h-3" />
              SPECIALTIES
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(specialty, idx) in member.specialties"
                :key="idx"
                class="px-3 py-1 bg-orange-500/10 text-orange-500 rounded font-mono text-xs border border-orange-500/20"
              >
                {{ specialty }}
              </span>
            </div>
          </div>

          <!-- Social Links -->
          <div class="flex gap-2 pt-4 border-t border-orange-500/10">
            <a
              v-if="member.github_url"
              :href="member.github_url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded transition-colors font-mono text-xs"
            >
              <Github class="w-4 h-4" />
              <span class="hidden sm:inline">GitHub</span>
            </a>
            <a
              v-if="member.linkedin_url"
              :href="member.linkedin_url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded transition-colors font-mono text-xs"
            >
              <Linkedin class="w-4 h-4" />
              <span class="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              v-if="member.email"
              :href="`mailto:${member.email}`"
              class="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded transition-colors font-mono text-xs"
            >
              <Mail class="w-4 h-4" />
              <span class="hidden sm:inline">Contact</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!isLoading && team.length === 0"
        class="text-center py-16 border-2 border-orange-500/20 rounded-lg"
      >
        <Lock class="w-16 h-16 text-orange-500/20 mx-auto mb-4" />
        <p class="text-orange-500 font-mono text-xl mb-2">[CLASSIFIED]</p>
        <p class="text-gray-400 font-mono text-sm">
          TEAM INFORMATION UNAVAILABLE
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  Users,
  User,
  Shield,
  Radio,
  Code,
  Github,
  Linkedin,
  Mail,
  Lock,
} from 'lucide-vue-next';
import { getActiveTeamMembers } from '../lib/supabase';

const team = ref([]);
const isLoading = ref(true);

const activeCount = computed(() => team.value.length);

const loadTeam = async () => {
  try {
    team.value = await getActiveTeamMembers();
  } catch (error) {
    console.error('Error loading team:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadTeam();
});
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
