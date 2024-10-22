<template>
    <div class="bg-zinc-900 text-gray-100 py-16">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="relative mb-16">
          <div class="absolute -top-8 left-0 text-orange-500/20 font-mono text-sm">
            CONFIDENTIAL - PERSONNEL FILES
          </div>
          <h2 class="text-4xl font-bold mb-4 flex items-center gap-3">
            <Users class="text-orange-500 h-8 w-8" />
            <span class="text-orange-500">FOX</span>LAB_OPERATIVES
          </h2>
        </div>
  
        <!-- Team Grid -->

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="member in teamMembers" 
               :key="member.id" 
               class="relative"
               @mouseenter="selectedMember = member.id"
               @mouseleave="selectedMember = null">
            
            <!-- Card Container -->
            <div :class="[
              'transition-all duration-300 ease-in-out',
              'border border-orange-500/20 rounded-lg overflow-hidden',
              'backdrop-blur-sm hover:border-orange-500/40',
              selectedMember === member.id ? 'scale-105 shadow-lg shadow-orange-500/10' : ''
            ]">
              
              <!-- Basic Info (Always Visible) -->
              <div class="p-4 ">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-lg overflow-hidden border-2 border-orange-500/20">
                    <img :src="`/`+member.image" :alt="member.name" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 class="font-mono text-lg text-orange-500">{{ member.name }}</h3>
                    <p class="text-sm text-gray-400">{{ member.role }}</p>
                  </div>
                </div>
              </div>
  
              <!-- Expanded Info (Visible on Hover) -->
              <div v-show="selectedMember === member.id"
                   class="p-4 border-t border-orange-500/20">
                <!-- Status Bars -->
                <div class="space-y-2 mb-4">
                  <div v-for="stat in member.stats" :key="stat.name" class="flex items-center gap-2">
                    <span class="text-xs font-mono w-20">{{ stat.name }}</span>
                    <div class="flex-grow bg-zinc-700 h-2 rounded-full">
                      <div class="h-full bg-orange-500 rounded-full"
                           :style="{ width: `${stat.value}%` }">
                      </div>
                    </div>
                    <span class="text-xs font-mono">{{ stat.value }}</span>
                  </div>
                </div>
  
                <!-- Skills/Parameters -->
                <div class="grid grid-cols-7 gap-1 mb-4">
                  <div v-for="skill in member.skills" 
                       :key="skill.name"
                       :class="[
                         'w-8 h-8 flex items-center justify-center rounded',
                         skill.active ? 'bg-orange-500 text-white' : 'bg-zinc-700 text-gray-400'
                       ]"
                       :title="skill.name">
                    <component :is="skill.icon" class="w-4 h-4" />
                  </div>
                </div>
  
                <!-- Description -->
                <div class="font-mono text-sm text-gray-400 border-t border-orange-500/20 pt-4">
                  <p>{{ member.description }}</p>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { 
    Users, 
    Code, 
    Database, 
    Globe, 
    Terminal, 
    Server,
    Bot,
    Brain
  } from 'lucide-vue-next'
  
  export default {
    name: 'FoxLabTeam',
    components: {
      Users,
      Code,
      Database,
      Globe,
      Terminal,
      Server,
      Bot,
      Brain,
    },
    setup() {
      const selectedMember = ref(null)
  
      const teamMembers = [
        {
          id: 1,
          name: "CYNTHIA MILOSZ",
          codename: "FUR_SEAL",
          image:"Cynthia.png",
          role: "Data Scientist / Marketing Specialist",
          stats: [
            { name: "SKILL", value: 92 },
            { name: "EXP", value: 82 },
            { name: "TECH", value: 88 }
          ],
          skills: [
            { name: "AI", icon: "Brain", active: true },
            { name: "Data", icon: "Database", active: true },
            { name: "Python", icon: "Code", active: true },
            { name: "Cloud", icon: "Globe", active: true },
            { name: "ML", icon: "Bot", active: true },
            { name: "Backend", icon: "Server", active: false },
            { name: "Analysis", icon: "Terminal", active: true }
          ],
          description: "Experto en ciencia de datos y machine learning, especializado en análisis predictivo y modelos de IA."
        },
        {
          id: 2,
          name: "NIKOLAS BARROSO",
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
        {
          id: 3,
          name: "GABRIEL VALDEZ",
          codename: "BOBWHITE",
          image:"Gabriel.png",
          role: "Data Engineer",
          stats: [
            { name: "SKILL", value: 92 },
            { name: "EXP", value: 82 },
            { name: "TECH", value: 88 }
          ],
          skills: [
            { name: "AI", icon: "Brain", active: true },
            { name: "Data", icon: "Database", active: true },
            { name: "Python", icon: "Code", active: true },
            { name: "Cloud", icon: "Globe", active: true },
            { name: "ML", icon: "Bot", active: true },
            { name: "Backend", icon: "Server", active: false },
            { name: "Analysis", icon: "Terminal", active: true }
          ],
          description: "Experto en ciencia de datos y machine learning, especializado en análisis predictivo y modelos de IA."
        },{
          id: 4,
          name: "KEVIN BARROSO",
          codename: "CYBER_SENTINEL",
          image:"Kevin.png",
          role: "Cloud Arq / Intel Specialist",
          stats: [
            { name: "SKILL", value: 92 },
            { name: "EXP", value: 82 },
            { name: "TECH", value: 88 }
          ],
          skills: [
            { name: "AI", icon: "Brain", active: true },
            { name: "Data", icon: "Database", active: true },
            { name: "Python", icon: "Code", active: true },
            { name: "Cloud", icon: "Globe", active: true },
            { name: "ML", icon: "Bot", active: true },
            { name: "Backend", icon: "Server", active: false },
            { name: "Analysis", icon: "Terminal", active: true }
          ],
          description: "Experto en ciencia de datos y machine learning, especializado en análisis predictivo y modelos de IA."
        },
        {
          id: 5,
          name: "FERNANDO BARROSO",
          codename: "CYBER_SENTINEL",
          image:"Fernando.png",
          role: "Data Scientist / Fullstack / Analysis",
          stats: [
            { name: "SKILL", value: 92 },
            { name: "EXP", value: 82 },
            { name: "TECH", value: 88 }
          ],
          skills: [
            { name: "AI", icon: "Brain", active: true },
            { name: "Data", icon: "Database", active: true },
            { name: "Python", icon: "Code", active: true },
            { name: "Cloud", icon: "Globe", active: true },
            { name: "ML", icon: "Bot", active: true },
            { name: "Backend", icon: "Server", active: false },
            { name: "Analysis", icon: "Terminal", active: true }
          ],
          description: "Experto en ciencia de datos y machine learning, especializado en análisis predictivo y modelos de IA."
        },
        
        // Puedes agregar más miembros aquí...
      ]
  
      return {
        selectedMember,
        teamMembers
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