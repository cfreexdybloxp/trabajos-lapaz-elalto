export interface ZoneOption {
  id: string;
  name: string;
  city: "La Paz" | "El Alto";
  telefericoNear?: string;
}

export const CITIES = ["La Paz", "El Alto"] as const;

export const BOLIVIA_ZONES: ZoneOption[] = [
  // La Paz
  { id: "centro", name: "Centro / San Pedro", city: "La Paz", telefericoNear: "Línea Morada / Celeste" },
  { id: "sopocachi", name: "Sopocachi / San Jorge", city: "La Paz", telefericoNear: "Línea Amarilla / Blanca" },
  { id: "miraflores", name: "Miraflores", city: "La Paz", telefericoNear: "Línea Blanca / Naranja" },
  { id: "calacoto", name: "Zona Sur (Calacoto / San Miguel)", city: "La Paz", telefericoNear: "Línea Verde" },
  { id: "obrajes", name: "Zona Sur (Obrajes)", city: "La Paz", telefericoNear: "Línea Verde" },
  { id: "achumani", name: "Zona Sur (Achumani / Cota Cota)", city: "La Paz" },
  { id: "villa-fatima", name: "Villa Fátima / El Carmen", city: "La Paz", telefericoNear: "Línea Naranja" },
  { id: "cementerio", name: "Max Paredes / Cementerio", city: "La Paz", telefericoNear: "Línea Roja" },
  
  // El Alto
  { id: "ceja", name: "El Alto Ceja", city: "El Alto", telefericoNear: "Línea Roja / Amarilla / Morada" },
  { id: "ciudad-satelite", name: "Ciudad Satélite", city: "El Alto", telefericoNear: "Línea Amarilla" },
  { id: "16-de-julio", name: "Zona 16 de Julio", city: "El Alto", telefericoNear: "Línea Roja / Azul" },
  { id: "rio-seco", name: "Río Seco", city: "El Alto", telefericoNear: "Línea Azul" },
  { id: "villa-adela", name: "Villa Adela", city: "El Alto", telefericoNear: "Línea Plateada" },
  { id: "villa-dolores", name: "Villa Dolores", city: "El Alto", telefericoNear: "Línea Morada" },
  { id: "senkata", name: "Senkata", city: "El Alto" },
  { id: "cruce-viacha", name: "Cruce Viacha / Ballivián", city: "El Alto" },
];

export const WORK_SCHEDULES = [
  "Tiempo Completo",
  "Medio Tiempo",
  "Por Horas",
  "Fines de Semana"
] as const;

export const MODALITIES = [
  "Presencial",
  "Híbrido",
  "Remoto"
] as const;

export const EXPERIENCE_LEVELS = [
  "Sin experiencia",
  "Pasantía / Prácticas",
  "1 a 2 años",
  "Más de 2 años"
] as const;
