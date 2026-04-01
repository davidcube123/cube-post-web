import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espacios | Cube Post - Instalaciones de Postproduccion",
  description:
    "Descubre nuestras instalaciones de postproduccion en Barcelona. Salas de color grading, proyeccion, edicion y zonas de trabajo equipadas con tecnologia de ultima generacion.",
  keywords: [
    "instalaciones postproduccion",
    "salas color grading barcelona",
    "sala proyeccion cine",
    "estudio postproduccion",
    "cube post espacios",
    "sala DaVinci Resolve",
  ],
  openGraph: {
    title: "Espacios | Cube Post",
    description: "Instalaciones de postproduccion de imagen en Barcelona",
    type: "website",
  },
};

export default function EspaciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
