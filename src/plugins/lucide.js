// src/plugins/lucide.js
import { Terminal, Database, Cpu } from 'lucide-vue-next'

// Configuración global de los íconos
Terminal.defaultProps = {
  size: 24,
  color: '#ff4500'
}

export const icons = {
  Terminal,
  Database,
  Cpu
}