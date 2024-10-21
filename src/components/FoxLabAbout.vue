<template>
    <div class="container mx-auto px-4 py-20">
        <!-- Header Section -->
        <div class="relative mb-16">
            <div class="absolute -top-8 left-0 text-orange-500/20 font-mono text-sm">
                TOP SECRET - CLASSIFIED INFORMATION
            </div>
            <h2 class="text-4xl font-bold mb-4 flex items-center gap-3">
                <Shield class="text-orange-500 h-8 w-8" />
                <span class="text-orange-500">FOX</span>LAB_INTEL
            </h2>
        </div>

        <!-- About Us Section -->
        <div class="grid gap-6">
            <div class="border border-orange-500/20 p-6 rounded-lg backdrop-blur-sm">
                <h3 class="font-mono text-2xl mb-4 text-orange-500 flex items-center gap-2">
                    <Users class="h-6 w-6" />
                    QUIÉNES SOMOS
                </h3>
                <div class="space-y-4 text-gray-300">
                    <p>Somos FoxLab, un equipo de desarrolladores freelance unidos por una pasión compartida: la
                        tecnología, el conocimiento y nuestra admiración por Metal Gear. Al igual que el legendario
                        equipo FOXHOUND, nos caracteriza la combinación de habilidades diversas y especializadas, que
                        aplicamos estratégicamente para superar cualquier reto.</p>
                    <p class="border-l-2 border-orange-500/20 pl-4">Nuestra historia comienza como una comunidad de
                        profesionales deseosos de compartir conocimientos y facilitar el camino a quienes quieren
                        adentrarse en el vasto mundo de la programación.</p>
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
                        <p>En FoxLab, nuestra misión es transformar las ideas en realidades digitales que no solo
                            solucionen problemas, sino que impulsen a nuestros clientes a alcanzar nuevas metas.</p>
                        <ul class="mt-4 space-y-2">
                            <li class="flex items-start gap-2">
                                <ChevronRight class="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span>Desarrollo de soluciones innovadoras</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <ChevronRight class="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span>Compromiso con la educación en programación</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <ChevronRight class="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span>Soluciones personalizadas de alto impacto</span>
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
                        <p>Ser reconocidos como un equipo de desarrollo de élite, que no solo resuelve desafíos
                            tecnológicos, sino que deja una huella en cada proyecto en el que participa.</p>
                        <div class="mt-4 border-t border-orange-500/20 pt-4 font-mono text-sm">
                            <div class="flex items-center gap-2">
                                <span class="text-orange-500">[OBJETIVO_01]</span> Referencia en soluciones tecnológicas
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-orange-500">[OBJETIVO_02]</span> Inspiración para futuros
                                desarrolladores
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-orange-500">[OBJETIVO_03]</span> Excelencia en cada proyecto
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
}
</style>