import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Cube Post para tu proyecto de postproduccion. Estamos en Barcelona: Carrer Consell de Cent, 68B, 08015.",
  openGraph: {
    title: "Contacto | Cube Post",
    description:
      "Ponte en contacto con nosotros para tu proyecto de postproduccion de imagen en Barcelona.",
    url: "https://cube-post.com/contacto",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
