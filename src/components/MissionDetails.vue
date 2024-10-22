<template>
  <div class="bg-zinc-900 text-gray-100 py-16">
    <div class="container mx-auto px-4">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="text-sm font-mono text-orange-500/60 mb-2">iDROID VER 3.02</div>
        <h2 class="text-4xl font-bold tracking-tighter mb-2">
          FOXLAB<span class="text-orange-500">_</span>MISSIONS
        </h2>
      </div>

      <!-- Missions Interface -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Mission List -->
        <div class="border-l-2 border-orange-500/20 pl-4">
          <div class="text-sm font-mono text-orange-500/60 mb-4">MOTHER BASE</div>
          <div
            v-for="mission in missions"
            :key="mission.id"
            class="mb-4 cursor-pointer transition-all"
            :class="{
              'text-orange-500': selectedMission?.id === mission.id,
              'text-gray-400 hover:text-orange-500/60': selectedMission?.id !== mission.id
            }"
            @click="selectMission(mission)"
          >
            <div class="flex items-center gap-3">
              <component
                :is="getMissionIcon(mission.type)"
                class="h-5 w-5"
                :stroke-width="1"
              />
              <span class="font-mono">{{ mission.title }}</span>
            </div>
          </div>
        </div>

        <!-- Mission Details -->
        <div v-if="selectedMission" class="relative border-l-2 border-orange-500/20 pl-4">
          <div class="absolute -top-2 -left-4 pl-8 text-orange-500/20 text-xs">
            [{{ selectedMission.id }}]
          </div>
          
          <div class="text-sm font-mono text-orange-500/60 mb-4">
            {{ selectedMission.type }}
          </div>
          
          <h3 class="text-xl font-bold mb-4">{{ selectedMission.description }}</h3>
          
          <div class="mb-6">
            <div class="text-sm text-orange-500/60 mb-2">Elapsed Time</div>
            <div class="font-mono">{{ selectedMission.elapsedTime }}</div>
          </div>
          
          <div class="mb-6">
            <div class="text-sm text-orange-500/60 mb-2">Obtainable Skills/Blueprints</div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in selectedMission.skills"
                :key="skill"
                class="px-2 py-1 bg-orange-500/10 text-orange-500 text-sm rounded"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <div class="mb-6">
            <div class="text-sm text-orange-500/60 mb-2">Mission Tasks</div>
            <div 
              v-for="(objective, index) in selectedMission.objectives"
              :key="index"
              class="flex items-center gap-2 mb-2"
            >
              <ChevronRight class="h-4 w-4 text-orange-500" />
              <span>{{ objective }}</span>
            </div>
          </div>
          
          <div class="mt-6 flex items-center gap-4 text-xs text-orange-500/40">
            <Radio class="h-4 w-4" />
            <span>Mission Status: {{ selectedMission.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importamos Vue y los componentes necesarios
import { ref, onMounted } from 'vue'  // Añadimos onMounted aquí
import { ChevronRight, Monitor, Database, Radio } from 'lucide-vue-next'

export default {
  name: 'FoxLabMissions',
  components: {
    ChevronRight,
    Monitor,
    Database,
    Radio
  },
  setup() {
    const selectedMission = ref(null)
    const missions = ref([
      {
        id: 'MSN_001',
        title: 'E-Commerce Intelligence System',
        type: 'EXTRAORDINARY',
        description: 'Desarrollo de sistema de comercio electrónico con análisis predictivo de ventas',
        objectives: [
          'Sistema de gestión de inventario implementado',
          'Dashboard de análisis en tiempo real',
          'API REST completamente documentada',
          'Sistema de machine learning para predicción de ventas'
        ],
        skills: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
        status: 'COMPLETED',
        elapsedTime: '2160:00'
      },
      {
        id: 'MSN_002',
        title: 'Data Extraction Protocol',
        type: 'TACTICAL',
        description: 'Sistema automatizado de extracción y procesamiento de datos financieros',
        objectives: [
          'Automatización de scraping implementada',
          'Pipeline de datos establecido',
          'Sistema de alertas configurado',
          'Dashboard de monitoreo activo'
        ],
        skills: ['Python', 'Airflow', 'MongoDB', 'Grafana'],
        status: 'IN_PROGRESS',
        elapsedTime: '720:00'
      }
    ])

    const missionIcons = {
      'EXTRAORDINARY': Monitor,
      'TACTICAL': Database
    }

    const getMissionIcon = (type) => {
      return missionIcons[type]
    }

    const selectMission = (mission) => {
      console.log('Mission selected:', mission)
      selectedMission.value = mission
    }

    onMounted(() => {
      console.log('Component mounted')
      // Seleccionar la primera misión por defecto si quieres
      // selectedMission.value = missions.value[0]
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
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-pulse {
  animation: cursor-blink 1.5s steps(2) infinite;
}
</style>