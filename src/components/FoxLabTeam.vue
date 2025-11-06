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

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="text-orange-500 font-mono text-sm animate-pulse">
          [LOADING OPERATIVES...]
        </div>
      </div>

      <!-- Content -->
      <div v-else>
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
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-zinc-800/80 p-2 rounded-full text-orange-500 hover:bg-zinc-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentIndex === 0"
        >
          <ChevronLeft class="h-6 w-6" />
        </button>
        
        <button 
          @click="scrollToNext"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-zinc-800/80 p-2 rounded-full text-orange-500 hover:bg-zinc-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentIndex === teamMembers.length - 1"
        >
          <ChevronRight class="h-6 w-6" />
        </button>

        <!-- Carousel -->
        <div class="relative overflow-hidden">
          <div 
            ref="carouselRef"
            class="flex transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div 
              v-for="member in teamMembers"
              :key="member.id"
              class="w-full flex-shrink-0 px-4"
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
        </div>

        <!-- Pagination Dots -->
        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(_, index) in teamMembers"
            :key="index"
            @click="goToSlide(index)"
            class="h-2 w-2 rounded-full transition-colors focus:outline-none"
            :class="index === currentIndex ? 'bg-orange-500' : 'bg-orange-500/20'"
          />
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
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
  ChevronRight,
  BriefcaseBusiness 
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
    ChevronRight,
    BriefcaseBusiness 
  },

  setup() {
    const currentIndex = ref(0)
    const carouselRef = ref(null)
    const teamMembers = ref([])
    const isLoading = ref(true)
    let touchStartX = 0
    let touchEndX = 0

    // Importar funciones de Supabase
    const loadTeamMembers = async () => {
      try {
        console.log('[TEAM] Cargando miembros del equipo desde Supabase...')

        // Importar dinámicamente para evitar problemas de SSR
        const { getActiveTeamMembers, getAvatarUrl } = await import('../lib/supabase')

        console.log('[TEAM] Funciones importadas correctamente')

        const members = await getActiveTeamMembers()
        console.log('[TEAM] Miembros cargados:', members.length)
        console.log('[TEAM] Datos de miembros:', members)

        if (!members || members.length === 0) {
          console.warn('[TEAM] No se encontraron miembros en la base de datos')
          isLoading.value = false
          return
        }

        // Mapear datos de Supabase al formato del componente
        teamMembers.value = members.map(member => {
          const social = []

          // Agregar redes sociales si existen
          if (member.github_url) {
            social.push({ name: 'GitHub', url: member.github_url, icon: Github })
          }
          if (member.linkedin_url) {
            social.push({ name: 'LinkedIn', url: member.linkedin_url, icon: Linkedin })
          }
          if (member.email) {
            social.push({ name: 'Email', url: `mailto:${member.email}`, icon: Mail })
          }
          if (member.twitter_url) {
            social.push({ name: 'Twitter', url: member.twitter_url, icon: BriefcaseBusiness })
          }

          const mappedMember = {
            id: member.id,
            name: member.name,
            codename: member.name.split(' ').join('_').toUpperCase(),
            image: getAvatarUrl(member.avatar_url || ''),
            role: member.role,
            social,
            description: member.bio || ''
          }

          console.log('[TEAM] Miembro mapeado:', mappedMember.name, 'imagen:', mappedMember.image)
          return mappedMember
        })

        console.log('[TEAM] Total de miembros mapeados:', teamMembers.value.length)
        isLoading.value = false
      } catch (error) {
        console.error('[TEAM] Error al cargar miembros:', error)
        console.error('[TEAM] Stack trace:', error.stack)
        isLoading.value = false
        // En caso de error, usar datos de fallback vacíos
        teamMembers.value = []
      }
    }

    const scrollToNext = () => {
      if (currentIndex.value < teamMembers.length - 1) {
        currentIndex.value++
      }
    }

    const scrollToPrev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--
      }
    }

    const goToSlide = (index) => {
      currentIndex.value = index
    }

    // Touch handlers
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
    }

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX
    }

    const handleTouchEnd   
 = () => {
      const diff = touchStartX - touchEndX
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          scrollToNext()
        } else {
          scrollToPrev()
        }
      }
    }

    // Keyboard navigation
    const handleKeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        scrollToPrev()
      } else if (e.key === 'ArrowRight') {
        scrollToNext()
      }
    }

    onMounted(() => {
      // Cargar miembros del equipo desde Supabase
      loadTeamMembers()

      if (carouselRef.value) {
        carouselRef.value.addEventListener('touchstart', handleTouchStart)
        carouselRef.value.addEventListener('touchmove', handleTouchMove)
        carouselRef.value.addEventListener('touchend', handleTouchEnd)
        window.addEventListener('keydown', handleKeydown)
      }
    })

    onUnmounted(() => {
      if (carouselRef.value) {
        carouselRef.value.removeEventListener('touchstart', handleTouchStart)
        carouselRef.value.removeEventListener('touchmove', handleTouchMove)
        carouselRef.value.removeEventListener('touchend', handleTouchEnd)
        window.removeEventListener('keydown', handleKeydown)
      }
    })

    return {
      currentIndex,
      carouselRef,
      teamMembers,
      isLoading,
      scrollToNext,
      scrollToPrev,
      goToSlide
    }
  }
}
</script>