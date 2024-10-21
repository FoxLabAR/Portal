<template>
    <div class="text-white p-4 rounded-lg shadow-lg max-w-md transition-all duration-300 ease-in-out border border-orange-500/20 rounded-lg overflow-hidden backdrop-blur-sm hover:border-orange-500/40 scale-105 shadow-lg shadow-orange-500/10">
      <!-- Header with Image and Info -->
      <div class="flex items-center space-x-4">
        <!-- Profile Picture -->
        <div class="w-20 h-20 rounded-lg bg-gray-700 overflow-hidden">
          <img :src="soldier.image" alt="Profile Image" class="w-full h-full object-cover" />
        </div>
        <!-- Name and Details -->
        <div>
          <h2 class="text-lg font-bold">{{ soldier.name }}</h2>
          <p class="text-sm text-gray-400">{{ soldier.role }}</p>
          <p class="text-sm text-gray-400">{{ soldier.codename }}</p>
        </div>
      </div>
  
      <!-- Parameters Section -->
      <div class="mt-4">
        <p class="text-xs text-gray-500">PARAMETERS:</p>
        <div class="flex justify-between space-x-1">
          <div v-for="(param, index) in soldier.parameters" :key="index" class="flex flex-col items-center">
            <p :class="ratingColor(param.rating)" class="font-semibold">{{ param.rating }}</p>
            <div class="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
              <p class="text-xs">{{ param.icon }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-2 mb-4">
        <div v-for="stat in soldier.stats" :key="stat.name" class="flex items-center gap-2">
        <span class="text-xs font-mono w-20">{{ stat.name }}</span>
        <div class="flex-grow bg-zinc-700 h-2 rounded-full">
            <div class="h-full bg-orange-500 rounded-full"
                :style="{ width: `${stat.value}%` }">
            </div>
        </div>
        <span class="text-xs font-mono">{{ stat.value }}</span>
        </div>
    </div>
    <div class="progress-bar"></div>
      <!-- Skills Section -->
      <div class="grid grid-cols-7 gap-1 mb-4">
        <div v-for="skill in soldier.skills" 
            :key="skill.name"
            :class="[
                'w-8 h-8 flex items-center justify-center rounded',
                skill.active ? 'bg-orange-500 text-white' : 'bg-zinc-700 text-gray-400'
            ]"
            :title="skill.name">
        <component :is="skill.icon" class="w-4 h-4" />
        </div>
    </div>
  
      <!-- Description Section -->
      <div class="mt-4">
        <p class="text-xs text-gray-500">DESCRIPTION:</p>
        <p class="text-sm text-gray-400">
          {{ soldier.description }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SoldierCard',
    props: {
      soldier: {
        type: Object,
        required: true
      }
    },
    computed: {
      lifePercentage() {
        return (this.soldier.life / 4000) * 100;  // Ajustar según la vida máxima
      },
      psychePercentage() {
        return (this.soldier.psyche / 4000) * 100;  // Ajustar según la psique máxima
      }
    },
    methods: {
      ratingColor(rating) {
        switch (rating) {
          case 'A':
            return 'text-green-500';
          case 'B':
            return 'text-blue-500';
          case 'C':
            return 'text-yellow-500';
          case 'D':
            return 'text-orange-500';
          case 'E':
            return 'text-red-500';
          default:
            return 'text-gray-500';
        }
      }
    }
  }
  </script>
  
  <style scoped>
 .progress-bar {
  width: 50%; /* Ajusta el ancho según el progreso */
  height: 20px;
  background-color: blue;
}
  </style>
  