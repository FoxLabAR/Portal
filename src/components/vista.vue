<template>
  <div class="min-h-screen bg-zinc-900 text-gray-100">
    <!-- Navigation -->
    <nav class="p-4 flex justify-between items-center border-b border-orange-500/20">
      <div class="flex items-center gap-2">
        <span class="text-orange-500 font-mono">[FOX-LAB]</span>
        <div class="h-2 w-2 bg-orange-500 animate-pulse rounded-full"></div>
      </div>
      <div class="flex gap-6 font-mono text-sm">
        <a href="#" class="hover:text-orange-500 transition-colors">MISSION</a>
        <a href="#" class="hover:text-orange-500 transition-colors">INTEL</a>
        <a href="#" class="hover:text-orange-500 transition-colors">OPERATIVES</a>
        <a href="#" class="hover:text-orange-500 transition-colors">CONTACT</a>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-20">
      <div class="relative">
        <div class="absolute -top-10 left-0 text-orange-500/20 font-mono">
          <div>FOXHOUND INSPIRED</div>
          <div>TACTICAL DEV TEAM</div>
        </div>
        
        <h1 class="text-6xl font-bold mb-6">
          <span class="text-orange-500">FOX</span>LAB_
          <span class="animate-pulse">|</span>
        </h1>
        
        <p class="text-xl text-gray-400 max-w-2xl mb-8 font-mono">
          Elite fullstack development and data analysis unit. 
          Specialized in tactical web solutions and strategic data operations.
        </p>

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

      <!-- Stats Section -->
      <div class="mt-20 grid grid-cols-3 gap-8 font-mono">
        <div v-for="(stat, index) in stats" 
             :key="index"
             class="border-l-2 border-orange-500/20 pl-4">
          <div class="text-3xl font-bold">{{ stat.value }}</div>
          <div class="text-gray-400">{{ stat.label }}</div>
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
      ],
      stats: [
        {
          value: '5+',
          label: 'Years Active'
        },
        {
          value: '20+',
          label: 'Operations Complete'
        },
        {
          value: '15+',
          label: 'Elite Operatives'
        }
      ]
    }
  }
}
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
    opacity: 0;
  }
}
</style>