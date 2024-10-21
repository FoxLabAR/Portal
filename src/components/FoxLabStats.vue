<template>
  <div class="container mx-auto px-4 py-20">

    <!-- Stats Section -->
    <div class="mt-20 grid grid-cols-3 gap-8 font-mono">
      <div v-for="(stat, index) in stats" :key="index" class="border-l-2 border-orange-500/20 pl-4">
        <div class="text-3xl font-bold">{{ stat.value }}</div>
        <div class="text-gray-400">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FoxLabStats',
  data() {
    return {
      stats: [
        {
          value: '5+',
          label: 'Años Activos'
        },
        {
          value: '10+',
          label: 'Sitio Web Completos'
        },
        {
          value: '15+',
          label: 'Analisis Concretados'
        }
      ]
    }
  }
}
</script>