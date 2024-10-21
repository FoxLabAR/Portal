<template>
    <header class="border-b border-orange-500/20 pb-4">
      <div class="flex justify-between items-start">
        <div>
          <div class="text-orange-500/60 text-sm">[MISSION STATUS: ACTIVE]</div>
          <h1 class="text-4xl font-bold tracking-tighter mt-2">
            <span class="text-orange-500">FOXLAB</span> DEVELOPMENT INTEL
          </h1>
          <div class="text-gray-400 mt-2">Date: {{ currentDate }}</div>
        </div>
        <div class="text-right">
          <div class="text-orange-500/60">Projects: {{ totalProjects }}</div>
          <div class="text-orange-500/60">Team Members: {{ teamSize }}</div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const totalProjects = ref(8)
  const teamSize = ref(12)
  </script>
  