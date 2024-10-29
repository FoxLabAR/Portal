<template>
    <div class="container mx-auto px-4 py-20">
        <!-- Header Section -->
        <div class="relative mb-16">
            <div class="absolute -top-8 left-0 text-orange-500/20 font-mono text-sm">
                TOP SECRET - CLASSIFIED INFORMATION
            </div>
            <h2 class="text-4xl font-bold mb-4 flex items-center gap-3">
                <Shield class="text-orange-500 h-8 w-8" />
                <span class="text-orange-500">FOX</span>LAB_PROFILE
            </h2>
        </div>

        <!-- About Us Section -->
        <div class="grid gap-6">
            <div class="border border-orange-500/20 p-6 rounded-lg backdrop-blur-sm">
                <h3 class="font-mono text-2xl mb-4 text-orange-500 flex items-center gap-2">
                    <Users class="h-6 w-6" />
                    NUESTRA IDENTIDAD
                </h3>
                <div class="space-y-4 text-gray-300">
                    <p>Somos un equipo de profesionales tecnológicos que combina experiencia en desarrollo Fullstack, 
                    Inteligencia de Datos y Automatización de Procesos. Nos distinguimos por nuestra capacidad de abordar 
                    proyectos complejos con soluciones innovadoras y eficientes.</p>
                    <p class="border-l-2 border-orange-500/20 pl-4">Fundada por expertos en tecnología con más de una década 
                    de experiencia en el sector, FoxLab surge como respuesta a la creciente necesidad de soluciones 
                    tecnológicas integrales y personalizadas en el mercado empresarial.</p>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-12 mb-16">
                <!-- Mission Section -->
                <div class="border border-orange-500/20 p-6 rounded-lg backdrop-blur-sm">
                    <h3 class="font-mono text-2xl mb-4 text-orange-500 flex items-center gap-2">
                        <Target class="h-6 w-6" />
                        MISIÓN
                    </h3>
                    <div class="text-gray-300">
                        <p>Potenciar la transformación digital de nuestros clientes mediante soluciones tecnológicas 
                        innovadoras y servicios de consultoría estratégica que generen valor medible y sostenible.</p>
                        <ul class="mt-4 space-y-2">
                            <li class="flex items-start gap-2">
                                <ChevronRight class="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span>Desarrollo de soluciones empresariales escalables</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <ChevronRight class="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span>Implementación de arquitecturas de datos avanzadas</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <ChevronRight class="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span>Optimización continua de procesos empresariales</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Vision Section -->
                <div class="border border-orange-500/20 p-6 rounded-lg backdrop-blur-sm">
                    <h3 class="font-mono text-2xl mb-4 text-orange-500 flex items-center gap-2">
                        <Eye class="h-6 w-6" />
                        VISIÓN
                    </h3>
                    <div class="text-gray-300">
                        <p>Establecernos como referente en innovación tecnológica y excelencia en el desarrollo de 
                        soluciones digitales, siendo el socio estratégico preferido para la transformación digital 
                        empresarial.</p>
                        <div class="mt-4 border-t border-orange-500/20 pt-4 font-mono text-sm">
                            <div class="flex items-center gap-2">
                                <span class="text-orange-500">[OBJETIVO_01]</span> Liderazgo en innovación tecnológica
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-orange-500">[OBJETIVO_02]</span> Expansión global de servicios
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-orange-500">[OBJETIVO_03]</span> Excelencia operativa continua
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Shield, Users, Target, Eye, ChevronRight } from 'lucide-vue-next'

export default {
    name: 'FoxLabAbout',
    components: {
        Shield,
        Users,
        Target,
        Eye,
        ChevronRight
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