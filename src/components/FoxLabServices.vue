<template>
  <!-- Services Section -->
  <div class="container mx-auto px-4 py-20">
    <div class="relative">
       <!-- Header Section -->
    <div class="relative mb-16">
      <div class="absolute -top-8 left-0 text-orange-500/20 font-mono text-sm">
        CONFIDENTIAL - STRATEGIC SOLUTIONS
      </div>
      <h2 class="text-4xl font-bold mb-4 flex items-center gap-3">
        <Command class="text-orange-500 h-8 w-8" />
        <span class="text-orange-500">FOX</span>LAB_SERVICES
      </h2>
      <p class="text-gray-400 max-w-2xl">
        Soluciones tecnológicas personalizadas para impulsar la transformación digital de su empresa
      </p>
    </div>
      
      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(service, index) in services"
          :key="index"
          class="border border-orange-500/20 p-6 rounded-lg backdrop-blur-sm">
          <component :is="service.icon" class="text-orange-500 mb-4 h-8 w-8" />
          <h3 class="font-mono text-lg mb-2">{{ service.title }}</h3>
          <p class="text-gray-400 mb-4">{{ service.description }}</p>
          <ul class="text-sm text-gray-400 space-y-2">
            <li v-for="(feature, fIndex) in service.features" 
              :key="fIndex"
              class="flex items-start">
              <span class="text-orange-500 mr-2">•</span>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Terminal, Database, Cpu } from 'lucide-vue-next'

export default {
  name: 'FoxLabServices',
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
          title: 'Desarrollo Full Stack',
          description: 'Creamos soluciones web empresariales completas y escalables utilizando tecnologías de vanguardia.',
          features: [
            'Arquitectura de aplicaciones modernas',
            'Desarrollo frontend con Vue.js y React',
            'APIs REST y GraphQL optimizadas',
            'Integración de sistemas empresariales'
          ]
        },
        {
          icon: 'Database',
          title: 'Business Intelligence',
          description: 'Transformamos datos en insights accionables para impulsar decisiones estratégicas.',
          features: [
            'Análisis predictivo y prescriptivo',
            'Dashboards interactivos personalizados',
            'ETL y procesamiento de datos',
            'Machine Learning aplicado'
          ]
        },
        {
          icon: 'Cpu',
          title: 'Automatización & DevOps',
          description: 'Optimizamos procesos empresariales mediante automatización inteligente y prácticas DevOps.',
          features: [
            'CI/CD y despliegue automatizado',
            'Monitoreo y observabilidad',
            'Automatización de procesos (RPA)',
            'Infraestructura como código'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.backdrop-blur-sm:hover {
  border-color: rgba(249, 115, 22, 0.4);
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.1);
  transform: translateY(-2px);
}
</style>