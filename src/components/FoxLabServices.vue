<template>
      <!-- Hero Section -->
      <div class="container mx-auto px-4 py-20">
        <div class="relative">
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div v-for="(service, index) in services" 
                 :key="index"
                 class="border border-orange-500/20 p-6 rounded-lg backdrop-blur-sm">
              <component :is="service.icon" class="text-orange-500 mb-4 h-8 w-8" />
              <h3 class="font-mono text-lg mb-2">{{ service.title }}</h3>
              <p class="text-gray-400">{{ service.description }}</p>
            </div>
          </div>
        </div>

      </div>
  </template>
  
  <script>
  import { Terminal, Database, Cpu } from 'lucide-vue-next'
  
  export default {
    name: 'FoxLabLanding',
    components: {
      Terminal,
      Database,
      Cpu
    },
    data() {
      return {
        services: [
          {
            icon: 'Terminal',
            title: 'Tactical Development',
            description: 'Especializados en operaciones fullstack encubiertas y despliegue estratégico.'
          },
          {
            icon: 'Database',
            title: 'Data Intelligence',
            description: 'Sistemas avanzados de análisis de datos y reconocimiento de patrones.'
          },
          {
            icon: 'Cpu',
            title: 'Tech Ops',
            description: 'Integración y despliegue de tecnología de vanguardia.'
          }
        ]
      }
    }
  }
  </script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.backdrop-blur-sm:hover {
  border-color: rgba(249, 115, 22, 0.4);
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.1);
}
</style>