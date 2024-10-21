<template>
      <!-- Hero Section -->
      <div class="container mx-auto px-4 py-3">
        <div class="relative">
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div v-for="(service, index) in services" 
                 :key="index"
                 class="border border-orange-500/20 p-6 rounded-lg backdrop-blur-sm hover:border-orange-500 transition-colors">
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
            description: 'Specialized in covert fullstack operations and strategic deployment.'
          },
          {
            icon: 'Database',
            title: 'Data Intelligence',
            description: 'Advanced data analysis and pattern recognition systems.'
          },
          {
            icon: 'Cpu',
            title: 'Tech Ops',
            description: 'Cutting-edge technology integration and deployment.'
          }
        ]
      }
    }
  }
  </script>