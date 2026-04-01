import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Conoce al equipo de profesionales de Cube Post. Coloristas y tecnicos con mas de 300 proyectos de cine y television.",
  openGraph: {
    title: "Equipo | Cube Post",
    description:
      "Profesionales con amplia experiencia en la industria audiovisual. Coloristas con mas de 300 proyectos.",
    url: "https://cube-post.com/equipo",
  },
};

export default function EquipoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
