export const missions = [
    {
        id: 'MSN_003',
        title: 'Ferreteando - Ordenando tus ventas en dos clicks',
        type: 'APP',
        image: "628_1x_shots_so.webp",
        description: 'Simplifica la gestión de ventas y presupuestos en ferreterías y pequeños comercios, permitiendo actualizar precios en tiempo real y generar presupuestos rápidamente.',
        objectives: [
          'Actualización de precios en tiempo real',
          'Generación rápida de presupuestos',
          'Optimización del flujo de trabajo',
          'Interfaz intuitiva'
        ],
        skills: ['HTML', 'CSS', 'Vuetify', 'Vue', 'Python'],
        status: 'COMPLETED',
        elapsedTime: '1400:00',
        repository: null,
        demo: null
      },
      {
        id: 'MSN_004',
        title: 'PoroIA - ML para League of Legends',
        type: 'DATA',
        image: "LoL.webp",
        description: 'Análisis de partidas clasificatorias de League of Legends en nivel Diamante, enfocándose en los primeros 10 minutos de juego.',
        objectives: [
          'Análisis de 10,000 partidas de alto nivel',
          'Optimización de rendimiento y estrategias',
          'Visualización de datos con Plotly'
        ],
        skills: ['Python', 'Plotly', 'ML'],
        status: 'COMPLETED',
        elapsedTime: '960:00',
        repository: 'https://github.com/Ferjapolis/Coderhouser-DS-TP0002',
        demo: 'https://ferjapolis.github.io/Coderhouser-DS-TP0002/Resumen.html'
      },
      {
        id: 'MSN_005',
        title: 'Sistema de Vivero Automatizado con Raspberry Pi',
        type: 'APP',
        image: "342shots_so.webp",
        description: 'Automatización del riego y monitoreo de un vivero con sensores de humedad, temperatura, presión y pH, gestionado desde una web en Flask.',
        objectives: [
          'Automatización del riego',
          'Monitoreo de condiciones ambientales del vivero',
          'Registro de datos para análisis predictivos',
          'Sistema gestionado vía web'
        ],
        skills: ['Python', 'Plotly', 'RPIO'],
        status: 'COMPLETED',
        elapsedTime: '1280:00',
        repository: null,
        demo: null
      },
      {
        id: 'MSN_006',
        title: 'Generador de Metadata a partir de tablas Excel',
        type: 'DATA',
        description: 'Lectura de archivos Excel para procesar datos y generar un archivo de salida en formato Parquet con información sobre las relaciones de datos entre las tablas.',
        objectives: [
          'Lectura automatizada de archivos Excel',
          'Procesamiento de datos de múltiples hojas',
          'Generación de archivo Parquet de salida'
        ],
        skills: ['Python'],
        status: 'COMPLETED',
        elapsedTime: '0080:00',
        repository: 'https://github.com/Ferjapolis/Metadata_creator',
        demo: null
      }
  ]