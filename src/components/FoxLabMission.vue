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
  import { MisionDetail } from './MissionDetails.vue';
  import { MissionHeader } from './MissionHeader.vue';
  import { ProjectMap } from './ProjectMap.vue';
  
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

        const PROJECTS = [
        {
        title: "Ferreteando - Ordenando tus venta en dos click",
        description: `simplifica la gestión de ventas y presupuestos en ferreterías y pequeños comercios. Permite actualizar precios en tiempo real y generar presupuestos rápidamente. Su interfaz intuitiva y automatización optimizan el flujo de trabajo.`,
        image: "/628_1x_shots_so.webp",
        tags: [TAGS.HTML, TAGS.CSS, TAGS.VUETIFY, TAGS.VUE, TAGS.PYTHON],
        },
        {
        title: "PoroIA - ML para el Éxito en el Mundo de League of Legends",
        description: `PoroIA analiza partidas clasificatorias de League of Legends en nivel Diamante, centradas en los primeros 10 minutos. Con 10,000 partidas, ofrece información para mejorar rendimiento y estrategias. Es ideal para equipos que buscan optimización.`,
        link: "https://ferjapolis.github.io/Coderhouser-DS-TP0002/Resumen.html",
        github: "https://github.com/Ferjapolis/Coderhouser-DS-TP0002",
        image: "/LoL.webp",
        tags: [TAGS.PYTHON, TAGS.PLOTLY],
        },
        {
        title: "Sistema de Vivero Automatizado con Raspberry Pi",
        description: `El proyecto automatiza el riego y monitoreo de un vivero con sensores de humedad, temperatura, presión y pH, gestionado desde una web en Flask. Los datos se registran para análisis predictivos que optimizan el cuidado de las plantas.`,
        image: "/342shots_so.webp",
        tags: [TAGS.PYTHON, TAGS.PLOTLY, TAGS.RPIO],
        },
        {
        title: "Generador de Metadata a partir de tablas exceles",
        description: `El script original se encarga de leer un archivo de Excel de entrada, procesar los datos de los distintos sheets (o "tablas") del archivo y generar un archivo de salida en formato Parquet con información sobre las relaciones de datos entre las tablas.`,
        image: "/342shots_so.webp",
        tags: [TAGS.PYTHON ],
        },
        // Puedes agregar más missiones aquí...
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