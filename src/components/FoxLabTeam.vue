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

      <!-- Desktop Grid (md and up) -->
      <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div v-for="member in teamMembers" :key="member.id" class="relative">
          <div class="border border-orange-500/20 rounded-lg overflow-hidden backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
            <div class="p-4">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-lg overflow-hidden border-2 border-orange-500/20">
                  <img :src="member.image" :alt="member.codename" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 class="font-mono text-lg text-orange-500">{{ member.name }}</h3>
                  <p class="text-sm text-gray-400">{{ member.role }}</p>
                </div>
              </div>
              <p class="text-sm text-gray-600 pt-2">
                {{ member.description }}
              </p>
              <div class="flex gap-4 pt-4">
                <a v-for="social in member.social" 
                  :key="social.name"
                  :href="social.url"
                  :title="social.name"
                  class="text-gray-400 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-500/5">
                  <component :is="social.icon" class="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Carousel (sm and down) -->
      <div class="md:hidden relative">
        <!-- Navigation Buttons -->
        <button 
          @click="scrollToPrev"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-zinc-800/80 p-2 rounded-full text-orange-500 hover:bg-zinc-700/80 transition-colors"
          :disabled="currentIndex === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
        >
          <ChevronLeft class="h-6 w-6" />
        </button>
        
        <button 
          @click="scrollToNext"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-zinc-800/80 p-2 rounded-full text-orange-500 hover:bg-zinc-700/80 transition-colors"
          :disabled="currentIndex === teamMembers.length - 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === teamMembers.length - 1 }"
        >
          <ChevronRight class="h-6 w-6" />
        </button>

        <!-- Carousel -->
        <div 
          ref="carouselRef"
          class="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
        >
          <div 
            v-for="member in teamMembers"
            :key="member.id"
            class="min-w-full snap-center px-4"
          >
            <div class="border border-orange-500/20 rounded-lg overflow-hidden backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
              <div class="p-6">
                <div class="flex items-center gap-6">
                  <div class="w-20 h-20 rounded-lg overflow-hidden border-2 border-orange-500/20">
                    <img :src="member.image" :alt="member.codename" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 class="font-mono text-xl text-orange-500">{{ member.name }}</h3>
                    <p class="text-sm text-gray-400">{{ member.role }}</p>
                  </div>
                </div>
                <p class="text-gray-400 mt-4 text-sm">
                  {{ member.description }}
                </p>
                <div class="flex gap-4 mt-4">
                  <a
                    v-for="social in member.social"
                    :key="social.name"
                    :href="social.url"
                    :title="social.name"
                    class="text-gray-400 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-500/5"
                  >
                    <component :is="social.icon" class="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="flex justify-center gap-2 mt-6">
          <div
            v-for="(_, index) in teamMembers"
            :key="index"
            class="h-2 w-2 rounded-full transition-colors"
            :class="index === currentIndex ? 'bg-orange-500' : 'bg-orange-500/20'"
          />
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
  Brain,
  Github,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight
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
    Github,
    Linkedin,
    Mail,
    ChevronLeft,
    ChevronRight
  },
  setup() {
    const currentIndex = ref(0)
    const carouselRef = ref(null)

    const teamMembers = [
      {
        id: 1,
        name: "CYNTHIA MILOSZ",
        codename: "FUR_SEAL",
        image: "Cynthia.png",
        role: "Data Analytics / Marketing Intelligence",
        social: [
          { name: 'GitHub', url: 'https://github.com/Cynthiamilosz', icon: Github },
          { name: 'Linkedin', url: 'https://www.linkedin.com/in/cynthia-milosz/', icon: Linkedin },
          { name: 'Email', url: 'mailto:cynthia.milosz@gmail.com', icon: Mail }
        ],
        description: "Especialista en Data Analytics, Business Intelligence  y Marketing Intelligence, con experiencia en desarrollo Frontend."
      },
      {
        id: 2,
        name: "NIKOLAS BARROSO",
        codename: "PHANTOM_CODER",
        image: "Nikolas.png",
        role: "Frontend Developer",
        social: [
          { name: 'GitHub', url: 'https://github.com/Nikolash4480', icon: Github },
          { name: 'Linkedin', url: 'https://www.linkedin.com/in/nikolas-hernan-barroso-ouharriet-2766bb197/', icon: Linkedin },
        ],
        description: "Desarrollo web y visualización de datos, con enfoque en la creación de interfaces intuitivas y análisis de datos visualmente impactantes."
      },
      {
        id: 3,
        name: "GABRIEL VALDEZ",
        codename: "BOBWHITE",
        image: "Gabriel.png",
        role: "Data Analytics",
        social: [
          { name: 'GitHub', url: 'https://github.com/GabooV2', icon: Github },
          { name: 'Linkedin', url: 'https://www.linkedin.com/in/gabdez/', icon: Linkedin },
          { name: 'Email', url: 'mailto:leirbag.valdez@gmail.com', icon: Mail }
        ],
        description: "Analista de Datos y Consultor BI, especializado en visualización de datos, con experiencia en Python, SQL y Google Cloud Platform."
      },
      {
        id: 4,
        name: "KEVIN BARROSO",
        codename: "CYBER_SENTINEL",
        image: "Kevin.png",
        role: "Cloud Arq / Intel Specialist",
        social: [
          { name: 'GitHub', url: 'https://github.com/kobogithub', icon: Github },
          { name: 'Linkedin', url: 'https://www.linkedin.com/in/kobouharriet/', icon: Linkedin },
          { name: 'Email', url: 'mailto:kobouharriet@gmail.com', icon: Mail }
        ],
        description: "Arquitecto de Soluciones experto en contenedores y cloud, con foco en arquitecturas escalables en ECS y Kubernetes."
      },
      {
        id: 5,
        name: "FERNANDO BARROSO",
        codename: "CYBER_SENTINEL",
        image: "Fernando.png",
        role: "Data Scientist / Fullstack / Analysis",
        social: [
          { name: 'GitHub', url: 'https://github.com/Ferjapolis', icon: Github },
          { name: 'Linkedin', url: 'https://www.linkedin.com/in/fernando-barroso-35331a169/', icon: Linkedin },
          { name: 'Email', url: 'mailto:barroso.ouharriet@gmail.com', icon: Mail }
        ],
        description: "Desarrollador Python con experiencia en análisis y visualización de datos, desarrollo fullstack, gestión en AWS y GCP."
      }
    ]

    const scrollToNext = () => {
      if (carouselRef.value) {
        const newIndex = Math.min(currentIndex.value + 1, teamMembers.length - 1)
        currentIndex.value = newIndex
        carouselRef.value.scrollTo({
          left: newIndex * carouselRef.value.offsetWidth,
          behavior: 'smooth'
        })
      }
    }

    const scrollToPrev = () => {
      if (carouselRef.value) {
        const newIndex = Math.max(currentIndex.value - 1, 0)
        currentIndex.value = newIndex
        carouselRef.value.scrollTo({
          left: newIndex * carouselRef.value.offsetWidth,
          behavior: 'smooth'
        })
      }
    }

    return {
      currentIndex,
      carouselRef,
      teamMembers,
      scrollToNext,
      scrollToPrev
    }
  }
}
</script>