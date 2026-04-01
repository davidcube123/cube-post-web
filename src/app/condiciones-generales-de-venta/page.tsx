"use client";

export default function CondicionesPage() {
  return (
    <div className="min-h-screen py-20 grid-background">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Condiciones Generales de Venta
          </h1>
          <p className="text-muted-foreground">
            Última actualización: Febrero 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#00ff88]">
              1. Objeto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Las presentes Condiciones Generales de Venta regulan la relación
              comercial entre Cube Post y sus clientes en relación con los
              servicios de postproducción de imagen ofrecidos, incluyendo pero
              no limitado a: diseño de workflow, backup de rodaje, grading,
              conformado online, mastering y deliveries.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#ffff00]">
              2. Presupuestos y contratación
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Los presupuestos emitidos por Cube Post tendrán una validez de 30
              días desde su emisión. La aceptación del presupuesto por parte del
              cliente supone la aceptación íntegra de estas condiciones
              generales. Cualquier modificación del alcance del proyecto deberá
              ser acordada por escrito.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#ff00aa]">
              3. Precios y forma de pago
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Los precios indicados en los presupuestos no incluyen IVA, salvo
              indicación expresa. Las condiciones de pago serán las siguientes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>50% al inicio del proyecto</li>
              <li>50% restante a la entrega del proyecto</li>
              <li>
                Para proyectos de larga duración, se podrán acordar pagos
                fraccionados
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#00aaff]">
              4. Plazos de entrega
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Los plazos de entrega se acordarán con el cliente en función de la
              complejidad del proyecto. Cube Post hará todo lo posible por
              cumplir los plazos acordados, aunque no se responsabiliza de
              retrasos causados por terceros o por circunstancias ajenas a su
              control.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#00ff88]">
              5. Propiedad intelectual
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              El cliente será responsable de disponer de todos los derechos
              necesarios sobre el material entregado para su postproducción.
              Cube Post se reserva el derecho de utilizar fragmentos de los
              trabajos realizados con fines promocionales, salvo acuerdo expreso
              en contrario.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#ffff00]">
              6. Confidencialidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cube Post se compromete a mantener la confidencialidad de todos
              los materiales y datos del cliente. Todos los archivos son
              transmitidos con encriptación AES de 256 bits y almacenados en
              sistemas seguros con acceso restringido.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#ff00aa]">
              7. Cancelaciones
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En caso de cancelación del proyecto por parte del cliente:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>
                Si la cancelación se produce antes del inicio: devolución del
                80% del anticipo
              </li>
              <li>
                Si la cancelación se produce durante el proyecto: facturación
                del trabajo realizado
              </li>
              <li>
                Si la cancelación es por causas imputables a Cube Post:
                devolución íntegra
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-xl border border-border/50 bg-card/30">
            <h2 className="text-2xl font-semibold mb-4 text-[#00aaff]">
              8. Jurisdicción
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Para cualquier controversia derivada de estas condiciones, las
              partes se someten expresamente a los Juzgados y Tribunales de
              Barcelona, con renuncia a cualquier otro fuero que pudiera
              corresponderles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
