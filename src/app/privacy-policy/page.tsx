"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-20 grid-background">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Política de Privacidad
          </h1>
          <p className="text-muted-foreground">
            Última actualización: Febrero 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#00ff88]">
              1. Información que recopilamos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En Cube Post, recopilamos información que nos proporcionas
              directamente cuando utilizas nuestros servicios de postproducción,
              incluyendo nombre, dirección de correo electrónico, número de
              teléfono y cualquier otra información que decidas compartir con
              nosotros.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#ffff00]">
              2. Uso de la información
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Proporcionar, mantener y mejorar nuestros servicios</li>
              <li>Comunicarnos contigo sobre proyectos y servicios</li>
              <li>Enviar información técnica y actualizaciones</li>
              <li>Responder a tus comentarios y preguntas</li>
              <li>Proteger los derechos de Cube Post y de terceros</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#ff00aa]">
              3. Compartir información
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              No vendemos, intercambiamos ni transferimos tu información
              personal a terceros sin tu consentimiento, excepto cuando sea
              necesario para proporcionar los servicios solicitados o cuando la
              ley lo requiera.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#00aaff]">
              4. Seguridad de datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para
              proteger tu información personal. Utilizamos encriptación AES de
              256 bits para la transmisión de datos sensibles y mantenemos
              controles de acceso estrictos.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#00ff88]">
              5. Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Este sitio web utiliza cookies para proporcionar las funciones del
              sitio necesarias y mejorar tu experiencia. Al utilizar este sitio
              web, aceptas nuestro uso de cookies. Puedes configurar tu
              navegador para rechazar cookies, aunque esto puede afectar la
              funcionalidad del sitio.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#ffff00]">
              6. Derechos del usuario
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              De acuerdo con el RGPD, tienes derecho a acceder, rectificar,
              eliminar y portar tus datos personales. Para ejercer estos
              derechos, contacta con nosotros en info@cube-post.com.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#ff00aa]">
              7. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes preguntas sobre esta Política de Privacidad, puedes
              contactarnos en:
            </p>
            <div className="mt-4 text-white">
              <p>Email: info@cube-post.com</p>
              <p>Teléfono: +34 932 91 24 33</p>
              <p>Ubicación: Barcelona, España</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
