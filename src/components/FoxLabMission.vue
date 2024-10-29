<template>
  <div class="bg-zinc-900 text-gray-100 py-16">
    <div class="container mx-auto px-4">
      <!-- Header with Professional Styling -->
      <div class="relative mb-16">
        <div class="absolute -top-8 left-0 text-orange-500/20 font-mono text-sm tracking-wider">
          CONFIDENTIAL - PROJECTS FILES
        </div>
        <div class="flex items-center justify-between">
          <h2 class="text-4xl font-bold mb-4 flex items-center gap-3">
            <Map class="text-orange-500 h-8 w-8" />
              <span class="text-orange-500">FOX</span>LAB_PROJECTS
          </h2>
          <div class="hidden lg:flex items-center gap-4 text-orange-500/60">
            <div class="flex items-center gap-2">
              <Radio class="h-4 w-4" />
              <span class="text-sm">Active Projects: {{missions.filter(m => m.status === 'ACTIVE').length}}</span>
            </div>
            <div class="flex items-center gap-2">
              <Check class="h-4 w-4" />
              <span class="text-sm">Completed: {{missions.filter(m => m.status === 'COMPLETED').length}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Project Interface -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Project List with Categories -->
        <div class="border-l-2 border-orange-500/20 pl-4">
          <div class="flex items-center gap-2 text-sm font-mono text-orange-500/60 mb-6">
            <FolderOpen class="h-4 w-4" />
            <span>PROJECT DIRECTORY</span>
          </div>
          
          <!-- Project Categories -->
          <div class="mb-6 flex gap-2">
            <button 
              v-for="filter in projectFilters" 
              :key="filter.value"
              @click="setActiveFilter(filter.value)"
              class="px-3 py-1 text-xs rounded-full transition-colors"
              :class="[
                activeFilter === filter.value 
                  ? 'bg-orange-500/10 text-orange-500' 
                  : 'bg-zinc-800 text-gray-400 hover:bg-orange-500/10 hover:text-orange-500'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>

          <!-- Project List with Filtering -->
          <div class="h-[calc(100vh-24rem)] overflow-y-auto custom-scrollbar pr-2">
            <div 
              v-for="mission in filteredMissions" 
              :key="mission.id" 
              class="mb-4 p-3 rounded-lg transition-all hover:bg-orange-500/5" 
              :class="{
                'bg-orange-500/10': selectedMission?.id === mission.id,
                'cursor-pointer': selectedMission?.id !== mission.id
              }"
              v-on:click="selectMission(mission)"
            >
            <div class="flex items-center gap-3 group">
                <component
                  :is="getMissionIcon(mission.type)"
                  class="h-5 w-5 text-orange-500"
                  :stroke-width="1.5"
                />
                <div class="flex-1">
                  <div class="text-sm font-medium" :class="{
                    'text-orange-500': selectedMission?.id === mission.id,
                    'text-gray-300': selectedMission?.id !== mission.id
                  }">{{ mission.title }}</div>
                  <div class="text-xs text-orange-500/40 mt-1">Project ID: {{ mission.id }}</div>
                </div>
                <ChevronRight class="h-4 w-4 text-orange-500/40 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
          
        </div>

        <!-- Enhanced Project Details -->
        <div v-if="selectedMission" class="relative border-l-2 border-orange-700/20 pl-6" :class="{ 'animate-fade-in': animate }">
          <div class="absolute -top-2 -left-4 pl-8 text-orange-500/20 text-xs tracking-wider">
            PROJECT DETAILS
          </div>

          <!-- Project Header -->
          <div class="mb-8 pt-4">
            <div class="flex items-center gap-3 mb-2">
              <component
                :is="getMissionIcon(selectedMission.type)"
                class="h-6 w-6 text-orange-500"
                :stroke-width="1.5"
              />
              <span class="text-sm font-mono text-orange-500/60">{{ selectedMission.type }} PROJECT</span>
            </div>
            <h3 class="text-2xl font-bold mb-4">{{ selectedMission.description }}</h3>
            
            <!-- Project Stats -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-3 rounded-lg bg-orange-500/5">
                <div class="text-xs text-orange-500/60 mb-1">Time Invested</div>
                <div class="text-lg font-mono text-orange-500">{{ selectedMission.elapsedTime }}h</div>
              </div>
              <div class="p-3 rounded-lg bg-orange-500/5">
                <div class="text-xs text-orange-500/60 mb-1">Status</div>
                <div class="text-lg font-mono text-orange-500">{{ selectedMission.status }}</div>
              </div>
            </div>
          </div>

          <!-- Technologies & Skills -->
          <div class="mb-8">
            <div class="text-sm text-orange-500/60 mb-3 flex items-center gap-2">
              <Code class="h-4 w-4" />
              Technologies & Skills
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in selectedMission.skills" :key="skill"
                class="px-3 py-1.5 bg-orange-500/10 text-orange-500 text-sm rounded-lg font-medium">
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Project Objectives -->
          <div class="mb-8">
            <div class="text-sm text-orange-500/60 mb-3 flex items-center gap-2">
              <Target class="h-4 w-4" />
              Key Objectives
            </div>
            <div class="space-y-3">
              <div v-for="(objective, index) in selectedMission.objectives" :key="index"
                class="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5">
                <Check class="h-4 w-4 text-orange-500 mt-1" />
                <span class="text-sm">{{ objective }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Image Display -->
        <div class="col-span-1">
          <div class="sticky top-8">
            <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-orange-500/20">
              <template v-if="selectedMission && selectedMission.image">
                <img
                  :src="selectedMission.image"
                  :alt="`Project ${selectedMission.id}`"
                  class="w-full h-full object-cover"
                />
              </template>
              <template v-else>
                <div class="absolute inset-0 flex flex-col items-center justify-center bg-orange-500/5">
                  <Lock class="h-12 w-12 text-orange-500/20 mb-4" />
                  <div class="text-orange-500 font-mono text-xl mb-2">
                    PREVIEW UNAVAILABLE
                  </div>
                  <div class="text-orange-500/40 font-mono text-sm">
                    Contact for access
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import {
  Map,
  Code,
  Database,
  ChevronRight,
  Monitor,
  Radio,
  Check,
  Target,
  FolderOpen,
  Image,
  Lock
} from 'lucide-vue-next'

export default {
  name: 'ProjectPortfolio',
  components: {
    Map,
    Code,
    Database,
    ChevronRight,
    Monitor,
    Radio,
    Check,
    Target,
    FolderOpen,
    Image,
    Lock
  },
  setup() {
    const selectedMission = ref(null)
    const missions = ref([
      {
        id: 'MSN_003',
        title: 'Ferreteando - Ordenando tus ventas en dos clicks',
        type: 'APP',
        description: 'Simplifica la gestión de ventas y presupuestos en ferreterías y pequeños comercios, permitiendo actualizar precios en tiempo real y generar presupuestos rápidamente.',
        objectives: [
          'Actualización de precios en tiempo real',
          'Generación rápida de presupuestos',
          'Optimización del flujo de trabajo',
          'Interfaz intuitiva'
        ],
        skills: ['HTML', 'CSS', 'Vuetify', 'Vue', 'Python'],
        status: 'COMPLETED',
        elapsedTime: '1400:00'
      },
      {
        id: 'MSN_004',
        title: 'PoroIA - ML para League of Legends',
        type: 'DATA',
        description: 'Análisis de partidas clasificatorias de League of Legends en nivel Diamante, enfocándose en los primeros 10 minutos de juego.',
        objectives: [
          'Análisis de 10,000 partidas de alto nivel',
          'Optimización de rendimiento y estrategias',
          'Visualización de datos con Plotly'
        ],
        skills: ['Python', 'Plotly'],
        status: 'COMPLETED',
        elapsedTime: '960:00'
      },
      {
        id: 'MSN_005',
        title: 'Sistema de Vivero Automatizado con Raspberry Pi',
        type: 'APP',
        description: 'Automatización del riego y monitoreo de un vivero con sensores de humedad, temperatura, presión y pH, gestionado desde una web en Flask.',
        objectives: [
          'Automatización del riego',
          'Monitoreo de condiciones ambientales del vivero',
          'Registro de datos para análisis predictivos',
          'Sistema gestionado vía web'
        ],
        skills: ['Python', 'Plotly', 'RPIO'],
        status: 'COMPLETED',
        elapsedTime: '1280:00'
      },
      {
        id: 'MSN_006',
        title: 'Generador de Metadata a partir de tablas Excel',
        type: 'DATA',
        description: 'Lectura de archivos Excel para procesar datos y generar un archivo de salida en formato Parquet con información sobre las relaciones de datos entre las tablas.',
        objectives: [
          'Lectura automatizada de archivos Excel',
          'Procesamiento de datos de múltiples hojas',
          'Generación de archivo Parquet de salida'
        ],
        skills: ['Python'],
        status: 'COMPLETED',
        elapsedTime: '480:00'
      }
    ])

    // Add project filters
    const projectFilters = [
      { label: 'All Projects', value: 'ALL' },
      { label: 'Applications', value: 'APP' },
      { label: 'Data Science', value: 'DATA' }
    ]
    // Active filter state
    const activeFilter = ref('ALL')

    const missionIcons = {
      'APP': Monitor,
      'DATA': Database
    }

    const getMissionIcon = (type) => {
      return missionIcons[type]
    }

    const selectMission = (mission) => {
      selectedMission.value = mission
    }

    onMounted(() => {
      selectedMission.value = missions.value[0]
    })

    // Filter function
    const filteredMissions = computed(() => {
      if (activeFilter.value === 'ALL') {
        return missions.value
      }
      return missions.value.filter(mission => mission.type === activeFilter.value)
    })

    // Filter setter function
    const setActiveFilter = (filter) => {
      activeFilter.value = filter
      // If the currently selected mission is not in the filtered results,
      // select the first mission from the filtered results
      const missionStillVisible = filteredMissions.value.some(
        m => m.id === selectedMission.value?.id
      )
      if (!missionStillVisible && filteredMissions.value.length > 0) {
        selectedMission.value = filteredMissions.value[0]
      }
    }

    // Stats for the header
    const projectStats = computed(() => ({
      total: missions.value.length,
      active: missions.value.filter(m => m.status === 'ACTIVE').length,
      completed: missions.value.filter(m => m.status === 'COMPLETED').length,
      byType: {
        APP: missions.value.filter(m => m.type === 'APP').length,
        DATA: missions.value.filter(m => m.type === 'DATA').length
      }
    }))

    return {
      selectedMission,
      missions,
      projectFilters,
      activeFilter,
      filteredMissions,
      setActiveFilter,
      projectStats,
      getMissionIcon,
      selectMission
    }
  }
}
</script>

<style scoped>
/* Existing animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Enhanced scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(249, 115, 22, 0.1);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(249, 115, 22, 0.3);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(249, 115, 22, 0.5);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(249, 115, 22, 0.3) rgba(249, 115, 22, 0.1);
}

.project-enter-active,
.project-leave-active {
  transition: all 0.3s ease;
}

.project-enter-from,
.project-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.filter-bounce-enter-active {
  animation: bounce-in 0.5s;
}

.filter-bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

</style>