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

      <!-- Missions Interface -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Mission List -->
        <div class="border-l-2 border-orange-500/20 pl-4">
          <div class="text-sm font-mono text-orange-500/60 mb-4">[LIST PROJECTS]</div>
          <div class="h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar pr-2">
          <div v-for="mission in missions" :key="mission.id" class="mb-4 cursor-pointer transition-all" :class="{
            'text-orange-500': selectedMission?.id === mission.id,
            'text-gray-400 hover:text-orange-500/60': selectedMission?.id !== mission.id
          }" v-on:click="selectMission(mission)">
            <div class="flex items-center gap-3 group">
              <ChevronRight class="h-4 w-4 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
              <span class="text-orange-300">{{ mission.title }}</span>
            </div>
          </div>
        </div>
        </div>

        <!-- Mission Details -->
        <div v-if="selectedMission" class="relative border-l-2 border-orange-700/20 pl-4 " :class="{ 'animate-fade-in': animate }">
          <div class="absolute -top-2 mb-4 -left-4 pl-8 text-orange-500/20 text-xs">
            [{{ selectedMission.id }}]
          </div>

          <div class="text-sm font-mono text-orange-500/60 mb-2 pt-4 flex items-center gap-3">
            <component
                :is="getMissionIcon(selectedMission.type)"
                class="h-5 w-5"
                :stroke-width="1"
              />
              <span class="font-mono">{{ selectedMission.type }}</span>
          </div>

          <h3 class="text-xl font-bold mb-4">{{ selectedMission.description }}</h3>

          <div class="mb-6">
            <div class="text-sm text-orange-500/60 mb-2">Obtainable Skills/Blueprints</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in selectedMission.skills" :key="skill"
                class="px-2 py-1 bg-orange-500/10 text-orange-500 text-sm rounded">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="mb-6">
            <div class="text-sm text-orange-500/60 mb-2">Mission Tasks</div>
            <div v-for="(objective, index) in selectedMission.objectives" :key="index"
              class="flex items-center gap-2 mb-2">
              <ChevronRight class="h-4 w-4 text-orange-500" />
              <span>{{ objective }}</span>
            </div>
          </div>

          <div class="mt-6 flex items-center gap-4 text-xs text-orange-500/40">
            <Radio class="h-4 w-4" />
            <span>Mission Status: {{ selectedMission.status }}</span>
          </div>
        </div>

        <!-- Image Column -->
        <div class="col-span-1 flex flex-col items-center justify-start">
            <div class="relative w-full aspect-[4/3]  rounded-lg overflow-hidden border-2 border-orange-500/20">
              <template v-if="selectedMission && selectedMission.image">
                <img
                  :src="selectedMission.image"
                  :alt="`Mission ${selectedMission.id}`"
                  class="w-full h-full object-cover"
                />
              </template>
              <template v-else>
                <div class="w-full h-full flex flex-col items-center justify-center  p-4">
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <div class="text-orange-500 font-mono text-xl mb-2 animate-pulse">
                      [CLASSIFIED]
                    </div>
                    <div class="text-orange-500/40 font-mono text-sm">
                      CLEARANCE REQUIRED
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import {
  Map,
  Code,
  Database,
  Globe,
  Terminal,
  Server,
  Bot,
  Brain,
  ChevronRight,
  Monitor,
  Radio
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
    Brain,
    ChevronRight,
    Monitor,
    Radio
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


    const missionIcons = {
      'APP': Monitor,
      'DATA': Database
    }

    const getMissionIcon = (type) => {
      return missionIcons[type]
    }

    const selectMission = (mission) => {
      console.log('Mission selected:', mission)
      selectedMission.value = mission
    }

    // Podemos agregar onMounted para verificar que el componente se hidrata correctamente
    onMounted(() => {
      selectedMission.value = missions.value[0]
    })

    return {
      selectedMission,
      missions,
      getMissionIcon,
      selectMission
    }
  }
}
</script>

<style scoped>
/* Cursor blink animation */
@keyframes cursor-blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.animate-pulse {
  animation: cursor-blink 1.5s steps(2) infinite;
}

/* Hover effects */
.mission-item:hover {
  color: rgba(249, 115, 22, 0.6);
  transition: color 0.3s ease;
}



/* Scrollbar Styling */
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

/* Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(249, 115, 22, 0.3) rgba(249, 115, 22, 0.1);
}

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
  animation: fadeIn 0.5s ease-in;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects */
.mission-item:hover {
  color: rgba(249, 115, 22, 0.6);
  transition: color 0.3s ease;
}

</style>
