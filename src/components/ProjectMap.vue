<template>
    <div class="bg-zinc-800/50 border border-orange-500/20 p-6">
      <h2 class="text-2xl text-orange-500 mb-4">DEPLOYMENT MAP</h2>
      
      <div class="relative bg-zinc-900 aspect-square">
        <!-- Project Nodes -->
        <div v-for="node in projectNodes" :key="node.id"
             :style="{ left: `${node.x}%`, top: `${node.y}%` }"
             class="absolute w-3 h-3 cursor-pointer"
             @mouseenter="activeNode = node"
             @mouseleave="activeNode = null">
          <div class="w-full h-full bg-orange-500 rounded-full 
                      animate-pulse"></div>
          
          <!-- Connection Lines -->
          <div v-for="connection in node.connections" :key="connection"
               class="absolute w-px bg-orange-500/20"
               :style="getConnectionStyle(node, connection)"></div>
        </div>
  
        <!-- Node Info Tooltip -->
        <div v-if="activeNode"
             :style="{ left: `${activeNode.x}%`, top: `${activeNode.y + 5}%` }"
             class="absolute z-10 bg-zinc-800 border border-orange-500/20 p-3
                    text-sm min-w-[200px] transform translate-x-4">
          <div class="text-orange-500">{{ activeNode.name }}</div>
          <div class="text-gray-400 text-xs mt-1">{{ activeNode.description }}</div>
          <div class="text-orange-500/40 text-xs mt-2">
            Status: {{ activeNode.status }}
          </div>
        </div>
      </div>
  
      <!-- Map Legend -->
      <div class="mt-4 text-xs text-orange-500/60 space-y-1">
        <div>● Active Development</div>
        <div>○ Planning Phase</div>
        <div>⊕ Completed</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activeNode = ref(null)
  
  const projectNodes = ref([
    {
      id: 1,
      name: 'Frontend Platform',
      description: 'User interface and experience layer',
      status: 'ACTIVE',
      x: 25,
      y: 30,
      connections: [2, 3]
    },
    {
      id: 2,
      name: 'Backend Services',
      description: 'Core business logic and API layer',
      status: 'ACTIVE',
      x: 65,
      y: 35,
      connections: [3, 4]
    },
    {
      id: 3,
      name: 'Data Processing',
      description: 'Real-time data analysis system',
      status: 'DEVELOPMENT',
      x: 45,
      y: 65,
      connections: [4]
    },
    {
      id: 4,
      name: 'Security Layer',
      description: 'Authentication and encryption systems',
      status: 'PLANNING',
      x: 75,
      y: 70,
      connections: []
    }
  ])
  
  const getConnectionStyle = (node, targetId) => {
    const target = projectNodes.value.find(n => n.id === targetId)
    if (!target) return {}
  
    const dx = target.x - node.x
    const dy = target.y - node.y
    const angle = Math.atan2(dy, dx) * 180 / Math.PI
    const length = Math.sqrt(dx * dx + dy * dy)
  
    return {
      width: `${length}%`,
      transform: `rotate(${angle}deg)`,
      transformOrigin: '0 0'
    }
  }
  </script>