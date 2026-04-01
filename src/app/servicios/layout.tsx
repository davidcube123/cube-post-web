import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Descubre nuestros servicios de postproduccion: diseno de workflow, ingenieria del color, QC y backup, salas de montaje, color grading HDR/SDR, conformado online, grading remoto y mastering DCP/Dolby Vision.",
  openGraph: {
    title: "Servicios | Cube Post",
    description:
      "Servicios profesionales de postproduccion de imagen. Color grading, conformado online, mastering y mas.",
    url: "https://cube-post.com/servicios",
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
