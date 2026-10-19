export const authority = [
  { stat: '+26%', text: 'de ingresos anuales en empresas que invierten en consultoría.', source: 'Harvard Business Review' },
  { stat: '−20%', text: 'de costos operativos en el primer año de implementación.', source: 'McKinsey & Company' },
  { stat: '65%', text: 'adopta nuevas tecnologías más rápido con acompañamiento consultivo.', source: 'Deloitte' },
  { stat: '+18%', text: 'de cuota de mercado frente a empresas sin orientación externa.', source: 'Bain & Company' },
  { stat: '+30%', text: 'de retención de clientes con estrategia centrada en el cliente.', source: 'Accenture' },
  { stat: '90%', text: 'reporta decisiones más rápidas y eficientes tras la consultoría.', source: 'PwC' },
  { stat: '80%', text: 'logra alinear estrategia con objetivos de largo plazo.', source: 'KPMG' },
  { stat: '×1.5', text: 'más probabilidad de adaptarse al cambio de mercado.', source: 'BCG' },
]

export const pillars = [
  {
    kicker: '01',
    label: 'Pensamiento estratégico',
    title: 'Claridad de dirección y objetivos de largo plazo.',
    body: 'Definimos el rumbo. Clarificamos dónde está hoy la organización y hacia dónde debe navegar en los próximos cinco años. Sin dirección, el esfuerzo no suma.',
    image: '/assets/img/cultura.jpg',
    caption: 'Trabajo con comités directivos',
  },
  {
    kicker: '02',
    label: 'Prospectiva e innovación',
    title: 'Anticipación de escenarios y oportunidades.',
    body: 'Metodologías de futuros, no de pronósticos. Convertimos las señales débiles del mercado en decisiones concretas de corto plazo.',
    image: '/assets/img/innovacion.jpg',
    caption: 'Innovación como disciplina',
  },
  {
    kicker: '03',
    label: 'Toma de decisiones',
    title: 'Metodologías basadas en datos y análisis sistémico.',
    body: 'Las decisiones importantes no se toman con intuición: se toman con evidencia estructurada. Modelos cuantitativos y lectura de contexto.',
    image: '/assets/img/propuesta-valor.jpg',
    caption: 'Modelos y análisis sistémico',
  },
]

export const servicesEmpresarial = [
  { title: 'Estrategia de crecimiento y expansión', body: 'Diseño de estrategias para abrir nuevos mercados y acelerar la curva de ingresos.' },
  { title: 'Transformación digital e innovación', body: 'De operación manual a infraestructura digital. Datos, software y automatización al servicio del negocio.' },
  { title: 'Optimización de procesos y eficiencia operacional', body: 'Mapeo, análisis y rediseño de procesos para reducir fricción y costo operativo.' },
  { title: 'Marketing digital y experiencia del cliente', body: 'Estrategia de marca, posicionamiento, captación y fidelización desde la métrica.' },
  { title: 'Gestión del talento y desarrollo organizacional', body: 'Cultura, liderazgo y arquitectura organizacional para equipos de alto desempeño.' },
  { title: 'Sostenibilidad y RSC/ESG', body: 'Integración de criterios ambientales, sociales y de gobierno con la estrategia del negocio.' },
]

export const servicesPublico = [
  { title: 'Planes regionales de competitividad', body: 'Formulación de hojas de ruta territoriales. Experiencia directa en el Plan Regional de Competitividad de Casanare.' },
  { title: 'Formulación y evaluación de políticas públicas', body: 'Diseño, implementación y evaluación de política pública con rigor técnico.' },
  { title: 'Modernización y gestión gubernamental', body: 'Rediseño de la operación institucional, digitalización y gestión por resultados.' },
  { title: 'Desarrollo local y urbano', body: 'Diseño e implementación de proyectos de desarrollo con enfoque territorial.' },
  { title: 'Transparencia y lucha contra la corrupción', body: 'Rendición de cuentas, control social y sistemas anti-corrupción institucionales.' },
  { title: 'Gestión de riesgos y resiliencia', body: 'Preparación institucional para crisis, desastres y entornos de alta incertidumbre.' },
]

export const team = [
  {
    kicker: '01',
    role: 'La Mente Estratégica',
    bio: 'Economista, especialista en Gerencia de Proyectos, maestrante en Pensamiento Estratégico, Prospectiva e Innovación. Más de 14 años liderando proyectos como el Plan Regional de Competitividad de Casanare.',
  },
  {
    kicker: '02',
    role: 'La Visión Financiera',
    bio: 'Economista especialista en finanzas con más de una década en el mundo financiero. Traduce ideas innovadoras en modelos de negocio rentables y sostenibles.',
  },
  {
    kicker: '03',
    role: 'La Brújula Humana',
    bio: 'Psicólogo experto en docencia universitaria y maestrante en educación. Entiende la cultura de las organizaciones y garantiza que el cambio sea adoptado, no impuesto.',
  },
  {
    kicker: '04',
    role: 'El Artífice de la Comunicación',
    bio: 'Experto en marketing, generación de contenidos y comunicación visual. 12 años trabajando con grandes empresas en comunicación de alto impacto.',
  },
  {
    kicker: '05',
    role: 'El Visionario Digital',
    bio: 'Experto en inteligencia artificial y ciencia de datos. Desarrolla modelos predictivos, automatización de procesos y análisis avanzado para anticipar tendencias.',
  },
  {
    kicker: '06',
    role: 'El Impulsor del Emprendimiento',
    bio: 'Especialista en creación y aceleración de empresas. Procesos de incubación, escalamiento e innovación empresarial para startups y pymes.',
  },
]

export type ClientEntry = { name: string; logo: string | null; url: string | null }

export const clients: ClientEntry[] = [
  { name: 'VECTOR Campaign Intelligence', logo: '/assets/logos/vector.webp', url: 'https://campañainteligente.com' },
  { name: 'HayCancha', logo: '/assets/logos/haycancha.png', url: 'https://haycancha.app' },
  { name: 'Convergente', logo: '/assets/logos/convergente.webp', url: 'https://convergente.app' },
  { name: 'Corporación Marakanai', logo: '/assets/logos/marakanai.png', url: 'https://corporacionmarakanai.com' },
  { name: 'Castillo Real Hefziba', logo: '/assets/logos/castillo.png', url: 'https://castillorealhefziba.com' },
  { name: 'Jeimy Silva Contadora', logo: null, url: 'https://jeimysilvacontadora.com' },
  { name: 'Wisirare Lodge', logo: '/assets/logos/wisirare.jpg', url: null },
  { name: 'Finanservices', logo: '/assets/logos/finanservices.png', url: null },
  { name: 'Dra. Antiage', logo: '/assets/logos/dra-antiage.webp', url: null },
  { name: 'Dreamers Audiovisual', logo: '/assets/logos/dreamers.png', url: null },
]

export const portfolio = [
  {
    name: 'VECTOR',
    kind: 'SaaS propio',
    sector: 'Campaign Intelligence · Política',
    body: 'Plataforma multi-tenant para campañas políticas: directorio de votantes, agenda, equipo territorial y analítica — desde el celular o el computador.',
    status: 'En producción · Casanare',
    image: '/assets/portfolio/vector.jpg',
    url: 'https://campañainteligente.com',
    accent: 'from-blue-500/40',
  },
  {
    name: 'HayCancha',
    kind: 'SaaS propio',
    sector: 'Marketplace · Deporte',
    body: 'Marketplace nacional de reservas de canchas sintéticas con 2.297 clubes y canchas en toda Latinoamérica. Pagos, chat, notificaciones iOS/Android y panel de dueños.',
    status: 'En producción · Latam',
    image: '/assets/portfolio/haycancha.jpg',
    url: 'https://haycancha.app',
    accent: 'from-emerald-500/40',
  },
  {
    name: 'Convergente',
    kind: 'SaaS a medida',
    sector: 'Gestión territorial · Gobierno',
    body: 'Gestión para gobierno subnacional: usuarios por rama, compromisos por vereda, mapa drill-down con datos DANE oficiales de 675 veredas y 384 barrios.',
    status: 'Gobernación Casanare, Aguazul, Hato Corozal',
    image: '/assets/img/transformacion.jpg',
    url: 'https://convergente.app',
    accent: 'from-cyan-500/40',
  },
  {
    name: 'Jeimy Silva Contadora',
    kind: 'Sitio web + SEO',
    sector: 'Servicios profesionales',
    body: 'Sitio corporativo con SEO técnico, Google Search Console verificado, branding editorial y una propuesta de valor clara para contadora pública.',
    status: 'Live · jeimysilvacontadora.com',
    image: '/assets/portfolio/jeimy.jpg',
    url: 'https://jeimysilvacontadora.com',
    accent: 'from-amber-500/40',
  },
  {
    name: 'Castillo Real Hefziba',
    kind: 'Sitio institucional',
    sector: 'Eventos · Hospitalidad',
    body: 'Portal de salón de eventos en Yopal — bodas, quinceaños y celebraciones. Hero con video, galería y canal de reservas directo.',
    status: 'Live · castillorealhefziba.com',
    image: '/assets/portfolio/castillo.jpg',
    url: 'https://castillorealhefziba.com',
    accent: 'from-rose-500/40',
  },
  {
    name: 'Corporación Marakanai',
    kind: 'Sitio institucional',
    sector: 'Deporte y ONG',
    body: 'Organización de escuelas deportivas en Yopal, con módulos de inclusión, formación, responsabilidad social y canal activo de donaciones y patrocinios.',
    status: 'Live · corporacionmarakanai.com',
    image: '/assets/portfolio/marakanai.jpg',
    url: 'https://corporacionmarakanai.com',
    accent: 'from-green-500/40',
  },
]
