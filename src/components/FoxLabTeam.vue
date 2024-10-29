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

      <!-- Team Grid -->

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div v-for="member in teamMembers" :key="member.id" class="relative" >

          <!-- Card Container -->
          <div :class="[
,            'transition-all duration-300 ease-in-out',
            'border border-orange-500/20 rounded-lg overflow-hidden',
            'backdrop-blur-sm hover:border-orange-500/40',
            selectedMember === member.id ? 'scale-105 shadow-lg shadow-orange-500/10' : ''
          ]">

            <!-- Basic Info (Always Visible) -->
            <div class="p-4 ">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-lg overflow-hidden border-2 border-orange-500/20">
                  <img :src="`/` + member.image" :alt="member.codename" class="w-full h-full object-cover" />
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
  Twitter,
  Linkedin,
  Github,
  Mail
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
    Linkedin,
    Github,
    Mail
  },
  setup() {
    const selectedMember = ref(null)

    const teamMembers = [
      {
        id: 1,
        name: "CYNTHIA MILOSZ",
        codename: "FUR_SEAL",
        image: "Cynthia.png",
        role: "Data Analytics / Marketing Intelligence",
        skills: [
          { name: "AI", icon: "Brain", active: true },
          { name: "Data", icon: "Database", active: true },
          { name: "Python", icon: "Code", active: true },
          { name: "Cloud", icon: "Globe", active: true },
          { name: "ML", icon: "Bot", active: true },
          { name: "Backend", icon: "Server", active: false },
          { name: "Analysis", icon: "Terminal", active: true }
        ],
        social: [
          { name: 'GitHub', url: 'https://github.com/Cynthiamilosz', icon: Github },
          { name: 'Linkedin', url: 'https://www.linkedin.com/in/cynthia-milosz/', icon: Linkedin },
          { name: 'Email', url: 'mailto:cynthia.milosz@gmail.com', icon: Mail }
        ],
        description: "Especialista en Data Analytics, Business Intelligence y Machine Knowledge Integration, con sólida experiencia en desarrollo Front End."
      },
      {
        id: 2,
        name: "NIKOLAS BARROSO",
        codename: "PHANTOM_CODER",
        image: "Nikolas.png",
        role: "Frontend Developer",
        skills: [
          { name: "Frontend", icon: "Code", active: true },
          { name: "Backend", icon: "Server", active: true },
          { name: "Database", icon: "Database", active: true },
          { name: "AI", icon: "Brain", active: false },
          { name: "DevOps", icon: "Terminal", active: true },
          { name: "Security", icon: "Shield", active: false },
          { name: "Architecture", icon: "Globe", active: true }
        ],
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
        skills: [
          { name: "AI", icon: "Brain", active: true },
          { name: "Data", icon: "Database", active: true },
          { name: "Python", icon: "Code", active: true },
          { name: "Cloud", icon: "Globe", active: true },
          { name: "ML", icon: "Bot", active: true },
          { name: "Backend", icon: "Server", active: false },
          { name: "Analysis", icon: "Terminal", active: true }
        ],
        social: [
          { name: 'GitHub', url: 'https://github.com/GabooV2', icon: Github },
          { name: 'Linkedin', url: 'https://www.linkedin.com/in/gabdez/', icon: Linkedin },
          { name: 'Email', url: 'mailto:leirbag.valdez@gmail.com', icon: Mail }
        ],
        description: "Analista de Datos y Consultor BI, especializado en visualización de datos, con experiencia en Python, SQL y Google Cloud Platform."
      }, {
        id: 4,
        name: "KEVIN BARROSO",
        codename: "CYBER_SENTINEL",
        image: "Kevin.png",
        role: "Cloud Arq / Intel Specialist",
        skills: [
          { name: "AI", icon: "Brain", active: true },
          { name: "Data", icon: "Database", active: true },
          { name: "Python", icon: "Code", active: true },
          { name: "Cloud", icon: "Globe", active: true },
          { name: "ML", icon: "Bot", active: true },
          { name: "Backend", icon: "Server", active: false },
          { name: "Analysis", icon: "Terminal", active: true }
        ],
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
        skills: [
          { name: "AI", icon: "Brain", active: true },
          { name: "Data", icon: "Database", active: true },
          { name: "Python", icon: "Code", active: true },
          { name: "Cloud", icon: "Globe", active: true },
          { name: "ML", icon: "Bot", active: true },
          { name: "Backend", icon: "Server", active: false },
          { name: "Analysis", icon: "Terminal", active: true }
        ],
        social: [
          { name: 'GitHub', url: 'https://github.com/Ferjapolis', icon: Github },
          { name: 'Linkedin', url: 'https://www.linkedin.com/in/fernando-barroso-35331a169/', icon: Linkedin },
          { name: 'Email', url: 'mailto:barroso.ouharriet@gmail.com', icon: Mail }
        ],
        description: "Desarrollador Python con experiencia en análisis y visualización de datos, desarrollo fullstack, gestión en AWS y GCP."
      }
    ]

    return {
      selectedMember,
      teamMembers
    }
  }
}
</script>
