// Datos del Diagnóstico Empresarial Strategia 360°
// 9 temas × 2 preguntas × 5 opciones Likert = 18 preguntas totales.

export type Tier = 'critico' | 'medio' | 'solido'

export type Option = {
  value: 1 | 2 | 3 | 4 | 5
  label: string
}

export type Question = {
  id: string
  text: string
  options: Option[]
}

export type Theme = {
  id: string
  label: string
  icon: string
  description: string
  weight: number // peso relativo en el puntaje general (suma de todos = 100)
  questions: Question[]
  recommendations: Record<Tier, string[]>
}

const likertAgree: Option[] = [
  { value: 1, label: 'Totalmente en desacuerdo' },
  { value: 2, label: 'En desacuerdo' },
  { value: 3, label: 'Ni de acuerdo ni en desacuerdo' },
  { value: 4, label: 'De acuerdo' },
  { value: 5, label: 'Totalmente de acuerdo' },
]

export const themes: Theme[] = [
  {
    id: 'estrategia',
    label: 'Estrategia',
    icon: 'Target',
    description: 'Claridad del rumbo y los objetivos de largo plazo.',
    weight: 15,
    questions: [
      {
        id: 'estrategia-1',
        text: 'Tenemos un plan estratégico documentado para los próximos 3-5 años.',
        options: likertAgree,
      },
      {
        id: 'estrategia-2',
        text: '¿Cómo tomamos las decisiones estratégicas importantes?',
        options: [
          { value: 1, label: 'Reaccionamos a lo que surge, sin método.' },
          { value: 2, label: 'Depende del dueño o fundador.' },
          { value: 3, label: 'Discutimos en equipo pero sin indicadores claros.' },
          { value: 4, label: 'Tenemos un comité directivo con información recurrente.' },
          { value: 5, label: 'Modelo formal con datos, escenarios y revisión trimestral.' },
        ],
      },
    ],
    recommendations: {
      critico: [
        'Prioridad 1: formular un plan estratégico simple a 3 años (visión, 3 objetivos, 5 KPIs).',
        'Agendar un taller de dirección estratégica con un consultor externo.',
      ],
      medio: [
        'Documentar explícitamente el plan y comunicarlo a toda la organización.',
        'Instaurar comité directivo mensual con tablero de indicadores.',
      ],
      solido: [
        'Elevar la madurez con metodologías de prospectiva y análisis de escenarios.',
        'Considerar revisión externa anual del plan por parte de consultores.',
      ],
    },
  },
  {
    id: 'finanzas',
    label: 'Finanzas',
    icon: 'LineChart',
    description: 'Rentabilidad, flujo de caja y disciplina financiera.',
    weight: 15,
    questions: [
      {
        id: 'finanzas-1',
        text: '¿Qué tan al día están los estados financieros y los indicadores (EBITDA, flujo de caja)?',
        options: [
          { value: 1, label: 'No tenemos información financiera confiable.' },
          { value: 2, label: 'Solo contabilidad para impuestos, sin indicadores de gestión.' },
          { value: 3, label: 'Reportes mensuales pero sin análisis.' },
          { value: 4, label: 'Reportes mensuales con análisis y acciones.' },
          { value: 5, label: 'Dashboard financiero en tiempo real con alertas tempranas.' },
        ],
      },
      {
        id: 'finanzas-2',
        text: 'Conocemos con precisión el costo de adquisición de nuestros clientes y el valor en el tiempo.',
        options: likertAgree,
      },
    ],
    recommendations: {
      critico: [
        'Urgente: implementar un sistema contable y de reporting mensual (EBITDA, flujo, utilidad).',
        'Capacitación básica financiera para el equipo directivo.',
      ],
      medio: [
        'Diseñar KPIs financieros clave (CAC, LTV, margen por línea) y seguirlos semanalmente.',
        'Automatizar la generación de reportes con integración ERP/contabilidad.',
      ],
      solido: [
        'Modelos predictivos de flujo de caja a 6-12 meses.',
        'Estructuración financiera (deuda, inversión) para acelerar crecimiento.',
      ],
    },
  },
  {
    id: 'mercadeo',
    label: 'Mercadeo y clientes',
    icon: 'Megaphone',
    description: 'Posicionamiento, captación y relación con el cliente.',
    weight: 12,
    questions: [
      {
        id: 'mercadeo-1',
        text: 'Nuestra propuesta de valor es clara, diferenciada y conocida por el equipo comercial.',
        options: likertAgree,
      },
      {
        id: 'mercadeo-2',
        text: '¿Cómo medimos la satisfacción y lealtad de nuestros clientes?',
        options: [
          { value: 1, label: 'No la medimos.' },
          { value: 2, label: 'Preguntamos informalmente a algunos.' },
          { value: 3, label: 'Encuestas puntuales 1-2 veces al año.' },
          { value: 4, label: 'Sistema de NPS/CSAT recurrente.' },
          { value: 5, label: 'NPS + análisis de churn + acciones correctivas automatizadas.' },
        ],
      },
    ],
    recommendations: {
      critico: [
        'Definir y escribir en una página la propuesta de valor diferencial.',
        'Lanzar encuesta de satisfacción (NPS) a los 20 principales clientes.',
      ],
      medio: [
        'Formalizar un sistema recurrente de medición de satisfacción (NPS mensual).',
        'Crear embudo de ventas con etapas y métricas de conversión.',
      ],
      solido: [
        'Programas de fidelización y cross-sell basados en datos de comportamiento.',
        'Marketing automation con segmentación por valor del cliente.',
      ],
    },
  },
  {
    id: 'tecnologia',
    label: 'Tecnología e innovación',
    icon: 'Cpu',
    description: 'Infraestructura digital, automatización y datos.',
    weight: 12,
    questions: [
      {
        id: 'tecnologia-1',
        text: '¿Dónde vive la mayoría de la operación de la empresa?',
        options: [
          { value: 1, label: 'En hojas de Excel y WhatsApp.' },
          { value: 2, label: 'Mezcla de Excel + algunos sistemas aislados.' },
          { value: 3, label: 'Herramientas digitales pero no integradas.' },
          { value: 4, label: 'ERP/CRM integrado con la mayoría de procesos.' },
          { value: 5, label: 'Infraestructura digital unificada con analítica y automatización.' },
        ],
      },
      {
        id: 'tecnologia-2',
        text: 'Nuestra organización experimenta con nuevas tecnologías (IA, automatización) de forma intencional.',
        options: likertAgree,
      },
    ],
    recommendations: {
      critico: [
        'Mapear los 5 procesos más dolorosos y candidatos a digitalizar.',
        'Seleccionar un CRM o ERP ligero (HubSpot, Zoho, Odoo) para arrancar.',
      ],
      medio: [
        'Integrar sistemas existentes para eliminar re-trabajo manual.',
        'Explorar automatización de tareas repetitivas con herramientas no-code (Zapier, Make).',
      ],
      solido: [
        'Implementar casos de uso de IA aplicada (segmentación, forecasting, chatbots).',
        'Arquitectura de datos y gobierno de información a escala.',
      ],
    },
  },
  {
    id: 'operaciones',
    label: 'Operaciones y procesos',
    icon: 'Settings',
    description: 'Eficiencia operativa y disciplina de procesos.',
    weight: 10,
    questions: [
      {
        id: 'operaciones-1',
        text: 'Tenemos nuestros procesos clave documentados y medidos con indicadores.',
        options: likertAgree,
      },
      {
        id: 'operaciones-2',
        text: '¿Qué tanto depende la operación de personas específicas?',
        options: [
          { value: 1, label: 'Si falta una persona, la operación se cae.' },
          { value: 2, label: 'Muy dependiente de 2-3 personas clave.' },
          { value: 3, label: 'Algunas áreas tienen respaldo, otras no.' },
          { value: 4, label: 'La operación continúa aunque falte alguien.' },
          { value: 5, label: 'Procesos independientes de personas, con manuales activos.' },
        ],
      },
    ],
    recommendations: {
      critico: [
        'Mapear los 10 procesos críticos y asignar responsables.',
        'Documentar los procedimientos operativos estándar (SOPs) de los procesos más dependientes.',
      ],
      medio: [
        'Instaurar indicadores de eficiencia operacional (OTIF, tiempo de ciclo, OEE).',
        'Rediseñar procesos cuello de botella con metodologías lean.',
      ],
      solido: [
        'Automatización de procesos repetitivos (RPA) y mejora continua.',
        'Benchmarking contra industria y expansión del modelo operativo.',
      ],
    },
  },
  {
    id: 'organizacional',
    label: 'Cultura y talento',
    icon: 'Users',
    description: 'Capacidades del equipo, cultura y liderazgo.',
    weight: 10,
    questions: [
      {
        id: 'organizacional-1',
        text: 'Nuestro equipo entiende la estrategia y sabe cómo su trabajo contribuye a ella.',
        options: likertAgree,
      },
      {
        id: 'organizacional-2',
        text: '¿Cómo gestionamos el desempeño y el desarrollo del talento?',
        options: [
          { value: 1, label: 'No hay evaluación ni plan de desarrollo.' },
          { value: 2, label: 'Conversaciones informales ocasionales.' },
          { value: 3, label: 'Evaluación anual sin plan de acción.' },
          { value: 4, label: 'Objetivos individuales y feedback trimestral.' },
          { value: 5, label: 'Sistema integral: objetivos, feedback continuo y plan de carrera.' },
        ],
      },
    ],
    recommendations: {
      critico: [
        'Comunicar la estrategia en cascada con un taller directivo + taller por área.',
        'Definir perfiles, roles y responsabilidades (RACI) de las posiciones clave.',
      ],
      medio: [
        'Instaurar OKRs trimestrales alineados con la estrategia.',
        'Programa de desarrollo de líderes (coaching, formación).',
      ],
      solido: [
        'Encuestas de clima organizacional recurrentes y planes de acción.',
        'Cultura de alto desempeño con rituals (1-on-1s, retrospectivas, recognition).',
      ],
    },
  },
  {
    id: 'planeacion',
    label: 'Planeación y proyectos',
    icon: 'Calendar',
    description: 'Capacidad de ejecutar lo planeado en tiempo y forma.',
    weight: 10,
    questions: [
      {
        id: 'planeacion-1',
        text: 'Los proyectos importantes se entregan en el tiempo y presupuesto planeado.',
        options: likertAgree,
      },
      {
        id: 'planeacion-2',
        text: '¿Cómo priorizamos entre todas las iniciativas posibles?',
        options: [
          { value: 1, label: 'Hacemos lo urgente que llega cada día.' },
          { value: 2, label: 'El dueño decide por intuición.' },
          { value: 3, label: 'Lista de prioridades pero cambia constantemente.' },
          { value: 4, label: 'Marco de priorización por valor/esfuerzo.' },
          { value: 5, label: 'Portafolio formal con revisión periódica y métricas de impacto.' },
        ],
      },
    ],
    recommendations: {
      critico: [
        'Implementar un cuadro de priorización simple (ICE o valor/esfuerzo).',
        'Reunión semanal de alineación de proyectos clave (máximo 15 minutos).',
      ],
      medio: [
        'Metodología de gestión de proyectos (ágil, waterfall o híbrido) con roles claros.',
        'Dashboards de avance de iniciativas estratégicas.',
      ],
      solido: [
        'Gestión de portafolio con criterios de valor estratégico y ROI.',
        'PMO ligera para proyectos transversales de alto impacto.',
      ],
    },
  },
  {
    id: 'legal',
    label: 'Legal y compliance',
    icon: 'ShieldCheck',
    description: 'Riesgos jurídicos, contratos y cumplimiento normativo.',
    weight: 8,
    questions: [
      {
        id: 'legal-1',
        text: 'Tenemos los contratos, licencias y cumplimientos legales al día.',
        options: likertAgree,
      },
      {
        id: 'legal-2',
        text: '¿Qué tan preparados estamos para un riesgo jurídico o auditoría?',
        options: [
          { value: 1, label: 'Nos tomaría por sorpresa, no estamos preparados.' },
          { value: 2, label: 'Reaccionaríamos cuando ocurra.' },
          { value: 3, label: 'Tenemos asesor externo pero sin plan preventivo.' },
          { value: 4, label: 'Plan preventivo con revisión semestral.' },
          { value: 5, label: 'Sistema de gestión de riesgos con auditorías periódicas.' },
        ],
      },
    ],
    recommendations: {
      critico: [
        'Auditoría legal urgente: contratos laborales, comerciales y licencias.',
        'Asesor jurídico externo con revisión mensual mínima.',
      ],
      medio: [
        'Matriz de riesgos legales con priorización y planes de mitigación.',
        'Procedimientos preventivos documentados (protección de datos, propiedad intelectual).',
      ],
      solido: [
        'Sistema integral de compliance con auditorías externas.',
        'Capacitación recurrente al equipo en normativa clave.',
      ],
    },
  },
  {
    id: 'sostenibilidad',
    label: 'Sostenibilidad e impacto',
    icon: 'Sprout',
    description: 'Prácticas sostenibles e impacto social-ambiental.',
    weight: 8,
    questions: [
      {
        id: 'sostenibilidad-1',
        text: 'Tenemos políticas y prácticas formales de sostenibilidad (ESG).',
        options: likertAgree,
      },
      {
        id: 'sostenibilidad-2',
        text: '¿Reportamos nuestro impacto social o ambiental?',
        options: [
          { value: 1, label: 'No lo medimos.' },
          { value: 2, label: 'Acciones puntuales no reportadas.' },
          { value: 3, label: 'Reportes internos ocasionales.' },
          { value: 4, label: 'Reporte anual con indicadores clave.' },
          { value: 5, label: 'Reporte certificado bajo estándares (GRI, SASB, B-Corp).' },
        ],
      },
    ],
    recommendations: {
      critico: [
        'Definir qué significa sostenibilidad para su negocio y sus 3 principales palancas.',
        'Identificar impactos directos (energía, residuos, relación con comunidad) y empezar a medir.',
      ],
      medio: [
        'Política ESG escrita y comunicada a stakeholders.',
        'Primer reporte anual de sostenibilidad con indicadores propios.',
      ],
      solido: [
        'Certificación internacional (ISO 14001, B-Corp) y reporte bajo GRI.',
        'Integración de ESG en la estrategia de crecimiento y acceso a capital verde.',
      ],
    },
  },
]

export function scoreFor(value: number): Tier {
  if (value < 2.5) return 'critico'
  if (value < 3.75) return 'medio'
  return 'solido'
}

export function tierLabel(t: Tier): string {
  if (t === 'critico') return 'Crítico'
  if (t === 'medio') return 'En construcción'
  return 'Sólido'
}

export function tierDescription(t: Tier): string {
  if (t === 'critico')
    return 'Área con riesgos y oportunidades inmediatas. Es el primer frente donde intervenir.'
  if (t === 'medio')
    return 'Hay bases pero falta sistema. Oportunidad de pasar de lo táctico a lo estratégico.'
  return 'Área madura. El siguiente nivel es la mejora continua y la ventaja competitiva.'
}
