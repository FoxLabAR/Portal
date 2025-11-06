<!-- Footer.vue -->
<template>
  <footer class="bg-[#1a1a1a] border-t border-orange-500/20 relative">
    <!-- Decorative Element -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0"></div>
    
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Brand Section -->
        <div class="space-y-4 md:col-span-2">
          <div class="flex items-center gap-3">
            <Terminal class="h-5 w-5 text-orange-500" />
            <h3 class="text-orange-500 font-mono text-lg tracking-wider">[FOXLAB]</h3>
          </div>
          <p class="text-gray-400 font-mono text-sm leading-relaxed">
            TACTICAL DEVELOPMENT UNIT
            <br />
            [CLEARANCE LEVEL: TOP_SECRET]
          </p>
          <!-- Status Indicators -->
          <div class="flex flex-wrap gap-4 pt-4">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-gray-400 font-mono text-xs">SYSTEMS ONLINE</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <span class="text-gray-400 font-mono text-xs">SIGNAL STRENGTH: 98%</span>
            </div>
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <Map class="h-4 w-4 text-orange-500" />
            <h4 class="text-orange-500 font-mono text-sm">NAVIGATION_</h4>
          </div>
          <ul class="space-y-3">
            <li v-for="link in navigationLinks" :key="link.href">
              <a :href="link.href" 
                 class="flex items-center gap-2 text-gray-400 hover:text-orange-500 font-mono text-sm transition-all group">
                <ChevronRight class="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <Radio class="h-4 w-4 text-orange-500" />
            <h4 class="text-orange-500 font-mono text-sm">CONTACT_FREQUENCY</h4>
          </div>
          <ul class="space-y-3">
            <li>
              <a href="mailto:barroso.ouharriet@gmail.com" 
                 class="flex items-center gap-2 text-gray-400 hover:text-orange-500 font-mono text-sm transition-colors group">
                <Lock class="h-3 w-3 group-hover:rotate-12 transition-transform" />
                [ENCRYPTED_CHANNEL]
              </a>
            </li>
            <li class="flex items-center gap-2 text-gray-400 font-mono text-sm">
              <Signal class="h-3 w-3" />
              FREQUENCY: 140.85
            </li>
            <li>
              <button
                @click="openLoginModal"
                class="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-mono text-xs transition-colors group mt-2 opacity-50 hover:opacity-100"
                title="Admin Access"
              >
                <Lock class="h-3 w-3 group-hover:rotate-12 transition-transform" />
                [SYS_ACCESS]
              </button>
            </li>
          </ul>
          <!-- Social Links -->
          <div class="flex gap-4 pt-4">
            <a v-for="social in socialLinks" 
               :key="social.name"
               :href="social.url"
               :title="social.name"
               class="text-gray-400 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-500/5">
              <component :is="social.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-orange-500/20 pt-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 bg-orange-500/50 rounded-full animate-pulse"></div>
            <p class="text-gray-500 font-mono text-xs">
              [ACCESS_ID: {{ currentYear }}-FOX-{{ accessCode }}]
            </p>
          </div>
          
          <!-- System Status -->
          <div class="flex items-center gap-4 text-xs font-mono">
            <span class="text-gray-500">UPTIME: {{ uptimeHours }}h</span>
            <span class="text-gray-500">MEMORY: {{ memoryUsage }}%</span>
            <span class="text-green-500">STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Terminal,
  ChevronRight,
  Radio,
  Lock,
  Signal,
  Map,
  Github,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-vue-next'

const emit = defineEmits(['open-login'])

// Navigation Links
const navigationLinks = [
  { href: '#intel', label: 'INTEL' },
  { href: '#missions', label: 'PROJECTS' },
  { href: '#operatives', label: 'OPERATIVES' }
]

// Social Links
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/FoxLabAR', icon: Github },
  { name: 'Email', url: 'mailto:barroso.ouharriet@gmail.com', icon: Mail }
]

// Reactive Values
const currentYear = new Date().getFullYear()
const uptimeHours = ref(0)
const memoryUsage = ref(0)
const accessCode = ref('XXXXX')

// Methods
const generateAccessCode = () => {
  return Math.random().toString(36).substr(2, 5).toUpperCase()
}

const updateSystemMetrics = () => {
  uptimeHours.value = Math.floor(Math.random() * 1000)
  memoryUsage.value = Math.floor(Math.random() * 20) + 80 // 80-100%
  accessCode.value = generateAccessCode()
}

const openLoginModal = () => {
  emit('open-login')
}

// Lifecycle
onMounted(() => {
  updateSystemMetrics()
  // Update metrics periodically
  setInterval(updateSystemMetrics, 60000) // Every minute
})
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
    opacity: .5;
  }
}

/* Hover effects for links */
a:hover .icon {
  transform: translateX(4px);
}
</style>