export interface JobCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: "ventas-comercial",
    name: "Ventas y Comercial",
    description: "Asesores de ventas, promotores, ejecutivos de cuenta, cajeros y atención en tienda.",
    iconName: "TrendingUp"
  },
  {
    id: "atencion-cliente",
    name: "Atención al Cliente y Call Center",
    description: "Soporte, recepcionistas, operadores telefónicos y orientación al usuario.",
    iconName: "Headphones"
  },
  {
    id: "administracion-contabilidad",
    name: "Administración y Contabilidad",
    description: "Auxiliares contables, secretariado, gestión documental y analistas administrativos.",
    iconName: "Briefcase"
  },
  {
    id: "gastronomia-hoteleria",
    name: "Gastronomía y Hotelería",
    description: "Cocineros, meseros, baristas, ayudantes de cocina y personal de salón.",
    iconName: "UtensilsCrossed"
  },
  {
    id: "sistemas-tecnologia",
    name: "Sistemas y Tecnología",
    description: "Desarrollo web, soporte técnico de redes, mantenimiento de equipos y diseño digital.",
    iconName: "Laptop"
  },
  {
    id: "marketing-digital",
    name: "Marketing y Redes Sociales",
    description: "Community managers, creadores de contenido, diseño gráfico y publicidad.",
    iconName: "Share2"
  },
  {
    id: "salud-farmacia",
    name: "Salud y Farmacia",
    description: "Auxiliares de enfermería, regentes de farmacia, bioquímicos y odontología.",
    iconName: "HeartPulse"
  },
  {
    id: "educacion-capacitacion",
    name: "Educación y Capacitación",
    description: "Profesores, tutores, auxiliares de aula e instructores de academias.",
    iconName: "GraduationCap"
  },
  {
    id: "logistica-transporte",
    name: "Logística y Almacén",
    description: "Choferes, repartidores, estibadores, encargados de inventario y despacho.",
    iconName: "Truck"
  },
  {
    id: "oficios-produccion",
    name: "Oficios Técnicos y Manufactura",
    description: "Electricistas, técnicos de mantenimiento, confección textil, carpintería y mecánica.",
    iconName: "Wrench"
  }
];
