import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabajos",
  description:
    "Portfolio de proyectos de Cube Post. Peliculas, series y producciones audiovisuales con nuestro trabajo de postproduccion de imagen.",
  openGraph: {
    title: "Trabajos | Cube Post",
    description:
      "Descubre los proyectos de cine y television donde hemos participado en la postproduccion de imagen.",
    url: "https://cube-post.com/trabajos",
  },
};

export default function TrabajosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
