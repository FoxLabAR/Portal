<template>
    <div class="bg-zinc-900 text-gray-100 py-16">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="relative mb-16">
          <div class="absolute -top-8 left-0 text-orange-500/20 font-mono text-sm">
            CONFIDENTIAL - MISSIONS FILES
          </div>
          <h2 class="text-4xl font-bold mb-4 flex items-center gap-3">
            <Map class="text-orange-500 h-8 w-8" />
            <span class="text-orange-500">FOX</span>LAB_MISSIONS
          </h2>
        </div>  
        <!-- Team Grid -->
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { 
    Map, 
    Code, 
    Database, 
    Globe, 
    Terminal, 
    Server,
    Bot,
    Brain
  } from 'lucide-vue-next'
  
  export default {
    name: 'FoxLabMission',
    components: {
      Map,
      Code,
      Database,
      Globe,
      Terminal,
      Server,
      Bot,
      Brain
    },
    setup() {
      const selectedMember = ref(null)
  
      const missions = [
        {
          id: 1,
          name: "Nikolas Barroso",
          codename: "PHANTOM_CODER",
          image:"Nikolas.png",
          role: "Frontend Developer",
          stats: [
            { name: "SKILL", value: 89 },
            { name: "EXP", value: 60 },
            { name: "TECH", value: 45 }
          ],
          skills: [
            { name: "Frontend", icon: "Code", active: true },
            { name: "Backend", icon: "Server", active: true },
            { name: "Database", icon: "Database", active: true },
            { name: "AI", icon: "Brain", active: false },
            { name: "DevOps", icon: "Terminal", active: true },
            { name: "Security", icon: "Shield", active: false },
            { name: "Architecture", icon: "Globe", active: true }
          ],
          description: "Especialista en desarrollo full stack con énfasis en arquitectura de sistemas y optimización de rendimiento."
        },
        ]
      return {
        selectedMember,
        missions
      }
    }
  }
  </script>
  
  <style scoped>
  .card-expanded {
    transform: scale(1.05);
    z-index: 10;
  }
  </style>