import { Car, CheckSquare, UserCheck, Monitor, HelpCircle, Wrench } from "lucide-react";

export const navItems = [
  { label: "Inicio", href: "inicio" },
  { label: "Servicios", href: "servicios" },
  { label: "Contacto", href: "contacto" }
];

export const features = [
  {
    icon: <Car />,
    text: "Vehículos en Óptimas Condiciones",
    description:
      "Invertaxi se encarga de mantener los vehículos en las mejores condiciones posibles, realizando mantenimiento preventivo y correctivo, incluyendo tapicería, latonería, pintura, llantas, alineación, balanceo, cambio de aceite y más.",
  },
  {
    icon: <Wrench />,
    text: "Mantenimiento Preventivo y Correctivo",
    description:
      "Nuestro taller está preparado para cualquier eventualidad que pueda presentarse con los vehículos, asegurando que siempre estén listos para operar de manera eficiente.",
  },
  {
    icon: <CheckSquare />,
    text: "Beneficios por Cumplimiento",
    description:
      "Los conductores que cumplen con sus cuotas reciben beneficios adicionales en la empresa, incentivando la puntualidad y el compromiso.",
  },
  {
    icon: <UserCheck />,
    text: "Proceso de Selección de Conductores",
    description:
      "Invertaxi realiza pruebas de conocimiento del área de Bogotá y de conducción para asegurar que los conductores estén bien preparados. Los postulantes deben presentar una hoja de vida, fotocopia del pase de conducción y otros documentos requeridos.",
  },
  {
    icon: <Monitor />,
    text: "Monitorización 24/7",
    description:
      "Nuestros vehículos están equipados con sistemas de monitoreo en tiempo real para garantizar la seguridad y el seguimiento constante de las operaciones.",
  },
  {
    icon: <HelpCircle />,
    text: "Soporte al Conductor",
    description:
      "Invertaxi ofrece soporte continuo a sus conductores, asegurando que siempre tengan acceso a ayuda y asistencia cuando lo necesiten.",
  },
];

export const checklistItems = [
  {
    title: "Descuentos del 35%",
    description: "Obtén un 35% de descuento en domingos y festivos.",
  },
  {
    title: "1er Domingo del Mes Gratis",
    description: "Disfruta de un primer domingo del mes sin costo.",
  },
  {
    title: "Premios por Cumplimiento",
    description: "Gana premios adicionales por cumplir con las cuotas establecidas.",
  },
  {
    title: "Servicio de Taller y Mantenimiento",
    description: "Accede a nuestro servicio de taller para el mantenimiento preventivo y correctivo de tu vehículo.",
  },
  {
    title: "Mototaller",
    description: "Contamos con un mototaller para reparaciones rápidas y eficientes.",
  },
  {
    title: "Planilla de Viaje 24 Horas",
    description: "Benefíciate de una planilla de viaje disponible las 24 horas.",
  },
  {
    title: "Comunidad",
    description: "Forma parte de nuestra comunidad de conductores y aprovecha los beneficios y apoyo continuo.",
  },
];