<!-- Footer.vue -->
<template>
    <footer class="bg-[#1a1a1a] border-t border-orange-500/20">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Top Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div class="space-y-4">
            <h3 class="text-orange-500 font-mono text-lg">[FOX-LAB]_</h3>
            <p class="text-gray-400 font-mono text-sm">
              TACTICAL DEVELOPMENT UNIT
              <br />
              [CLEARANCE LEVEL: TOP_SECRET]
            </p>
          </div>
          
          <div class="space-y-4">
            <h4 class="text-orange-500 font-mono text-sm">NAVIGATION_</h4>
            <ul class="space-y-2">
              <li><a href="#missions" class="text-gray-400 hover:text-orange-500 font-mono text-sm transition-colors">MISSION</a></li>
              <li><a href="#intel" class="text-gray-400 hover:text-orange-500 font-mono text-sm transition-colors">INTEL</a></li>
              <li><a href="#operatives" class="text-gray-400 hover:text-orange-500 font-mono text-sm transition-colors">OPERATIVES</a></li>
            </ul>
          </div>
          
          <div class="space-y-4">
            <h4 class="text-orange-500 font-mono text-sm">CONTACT_FREQUENCY</h4>
            <ul class="space-y-2">
              <li class="text-gray-400 font-mono text-sm">[ENCRYPTED_CHANNEL]</li>
              <li class="text-gray-400 font-mono text-sm">FREQUENCY: 140.85</li>
            </ul>
          </div>
        </div>
        
        <!-- Bottom Section -->
        <div class="border-t border-orange-500/20 pt-4">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-500 font-mono text-xs">
              [ACCESS_ID: {{ new Date().getFullYear() }}-FOX-{{ Math.random().toString(36).substr(2, 5).toUpperCase() }}]
            </p>
            <div class="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/FoxLabAR" class="text-orange-500 hover:text-orange-400 transition-colors">
                <span class="font-mono text-xs">[GITHUB]</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>