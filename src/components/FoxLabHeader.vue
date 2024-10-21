<template>
    <div class="bg-zinc-900 text-gray-100 py-16">
      <div class="container mx-auto px-4">
        <!-- Logo Section -->
        <div class="mb-8">
          <div class="text-sm font-mono text-orange-500/60 mb-2">TACTICAL DEV TEAM</div>
          <h1 class="text-6xl font-bold tracking-tighter mb-2">
            <span class="text-orange-500">FOX</span>LAB<span class="text-orange-500 animate-pulse">_</span>
          </h1>
        </div>
  
        <!-- Description Section -->
        <div class="relative font-mono text-lg max-w-3xl leading-relaxed">
          <!-- Decorative Elements -->
          <div class="absolute -left-4 top-0 bottom-0 border-l-2 border-orange-500/20"></div>
          <div class="absolute -top-2 -left-4 pl-8 text-orange-500/20 text-xs">
            [CLASSIFIED_DOC_0723]
          </div>
  
          <!-- Text with Highlight Effects -->
          <p class="text-gray-400 pl-4 pt-4">
            Unidad de desarrollo 
            <span class="relative inline-block group">
              <span class="text-orange-500">fullstack</span>
              <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500/20 group-hover:bg-orange-500/40 transition-colors"></span>
            </span>
            y 
            <span class="relative inline-block group">
              <span class="text-orange-500">análisis de datos</span>
              <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500/20 group-hover:bg-orange-500/40 transition-colors"></span>
            </span>
            de élite. Especializados en:
          </p>
          
          <div class="mt-4 pl-4 space-y-2">
            <div class="flex items-center gap-2 group">
              <ChevronRight class="h-4 w-4 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
              <span class="relative inline-block">
                <span class="text-orange-500">Desarrollo táctico web</span>
                <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500/20"></span>
              </span>
            </div>
            
            <div class="flex items-center gap-2 group">
              <ChevronRight class="h-4 w-4 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
              <span class="relative inline-block">
                <span class="text-orange-500">Operaciones estratégicas de datos</span>
                <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500/20"></span>
              </span>
            </div>
            
            <div class="flex items-center gap-2 group">
              <ChevronRight class="h-4 w-4 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
              <span class="relative inline-block">
                <span class="text-orange-500">Inteligencia artificial avanzada</span>
                <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500/20"></span>
              </span>
            </div>
            
            <div class="flex items-center gap-2 group">
              <ChevronRight class="h-4 w-4 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
              <span class="relative inline-block">
                <span class="text-orange-500">Seguridad y optimización de sistemas</span>
                <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500/20"></span>
              </span>
            </div>
          </div>
  
          <!-- Bottom Classification -->
          <div class="mt-6 pl-4 flex items-center gap-4 text-xs text-orange-500/40">
            <span>[CLEARANCE_LEVEL: TOP_SECRET]</span>
            <span class="h-px w-8 bg-orange-500/20"></span>
            <span>[ACCESS_RESTRICTED]</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ChevronRight } from 'lucide-vue-next'
  
  export default {
    name: 'FoxLabHeader',
    components: {
      ChevronRight
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
  
  /* Hover effect for classification markers */
  .group:hover .text-orange-500\40 {
    color: rgba(249, 115, 22, 0.6);
    transition: color 0.3s ease;
  }
  </style>