<template>
    <div class="bg-zinc-800/50 border border-orange-500/20 p-6">
      <h2 class="text-2xl text-orange-500 mb-4">MISSION LOADOUT</h2>
      
      <div class="space-y-6">
        <!-- Tech Stack Section -->
        <div class="mission-section">
          <h3 class="text-sm text-orange-500/60 mb-2">TECH STACK</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="tech in techStack" :key="tech.name" 
                 class="flex items-center gap-2 text-gray-300">
              <ChevronRight class="h-4 w-4 text-orange-500" />
              <span>{{ tech.name }}</span>
            </div>
          </div>
        </div>
  
        <!-- Active Projects -->
        <div class="mission-section">
          <h3 class="text-sm text-orange-500/60 mb-2">ACTIVE PROJECTS</h3>
          <div class="space-y-3">
            <div v-for="project in activeProjects" :key="project.id"
                 class="border border-orange-500/20 p-3 hover:bg-zinc-700/50 
                        transition-colors cursor-pointer">
              <div class="flex justify-between items-start">
                <div>
                  <div class="text-orange-500">{{ project.name }}</div>
                  <div class="text-sm text-gray-400">{{ project.description }}</div>
                </div>
                <div class="text-xs text-orange-500/40">
                  {{ project.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Team Skills -->
        <div class="mission-section">
          <h3 class="text-sm text-orange-500/60 mb-2">TEAM SPECIALIZATIONS</h3>
          <div class="space-y-2">
            <div v-for="skill in teamSkills" :key="skill.name"
                 class="flex items-center gap-2">
              <div class="w-32 text-gray-400">{{ skill.name }}</div>
              <div class="flex-1 h-2 bg-zinc-700">
                <div class="h-full bg-orange-500/60"
                     :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ChevronRight } from 'lucide-vue-next'
  
  const techStack = ref([
    { name: 'Vue.js/React' },
    { name: 'Node.js' },
    { name: 'Python' },
    { name: 'AWS/Azure' },
    { name: 'Docker' },
    { name: 'GraphQL' }
  ])
  
  const activeProjects = ref([
    {
      id: 1,
      name: 'Project NEXUS',
      description: 'AI-powered data analysis platform',
      status: 'IN PROGRESS'
    },
    {
      id: 2,
      name: 'Operation CloudGuard',
      description: 'Security infrastructure deployment',
      status: 'PLANNING'
    },
    {
      id: 3,
      name: 'CodeName: SWIFT',
      description: 'High-performance trading system',
      status: 'TESTING'
    }
  ])
  
  const teamSkills = ref([
    { name: 'Frontend Dev', level: 90 },
    { name: 'Backend Dev', level: 85 },
    { name: 'DevOps', level: 75 },
    { name: 'Data Science', level: 80 }
  ])
  </script>
  