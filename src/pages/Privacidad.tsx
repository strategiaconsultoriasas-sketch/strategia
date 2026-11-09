import { motion } from 'framer-motion'
import { PageHero } from '../components/PageHero'

export default function Privacidad() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Política de tratamiento de datos personales"
        sub="En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia."
      />

      <section className="surface-paper py-20 md:py-28">
        <div className="container-narrow">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-none [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-ink [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:font-semibold [&_strong]:text-ink"
          >
            <div className="text-xs text-fg-on-light-mute mb-10">
              Última actualización: noviembre de 2026
            </div>

            <Section n="01" title="Responsable del tratamiento">
              <p>
                <strong>Strategia Consultoría e Innovación S.A.S.</strong> (en adelante,
                &ldquo;Strategia&rdquo;), con domicilio en Yopal, Casanare, Colombia, es el
                responsable del tratamiento de los datos personales que recoge a través de
                este sitio web <em>www.strategiaconsultoria.co</em> y sus formularios.
              </p>
              <ul>
                <li>Correo: <a href="mailto:strategiaconsultoriasas@gmail.com">strategiaconsultoriasas@gmail.com</a></li>
                <li>Teléfono / WhatsApp: <a href="tel:+573203047445">+57 320 304 7445</a></li>
                <li>Dirección: Yopal, Casanare, Colombia</li>
              </ul>
            </Section>

            <Section n="02" title="Datos personales que recolectamos">
              <p>Strategia recolecta los siguientes datos cuando usted los suministra voluntariamente al diligenciar el Diagnóstico 360°, el formulario de contacto o al escribirnos por WhatsApp o correo electrónico:</p>
              <ul>
                <li>Nombre completo</li>
                <li>Empresa u organización</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono / WhatsApp</li>
                <li>Respuestas al diagnóstico empresarial y comentarios que usted ingrese</li>
              </ul>
              <p>
                No recolectamos datos sensibles (salud, orientación sexual, convicciones religiosas, pertenencia a sindicatos, datos biométricos ni de menores de edad) y no utilizamos cookies de rastreo publicitario de terceros.
              </p>
            </Section>

            <Section n="03" title="Finalidades del tratamiento">
              <p>Los datos personales que usted suministra son tratados con las siguientes finalidades:</p>
              <ul>
                <li>Enviarle el reporte PDF resultado del Diagnóstico 360°.</li>
                <li>Contactarle para dar seguimiento comercial y agendar una conversación de consultoría.</li>
                <li>Enviarle información institucional, contenidos propios y oportunidades de nuestros servicios de consultoría.</li>
                <li>Cumplir con obligaciones legales, contables y tributarias de Strategia.</li>
              </ul>
              <p>
                Sus datos <strong>no se venden ni se ceden</strong> a terceros con fines comerciales. Solo se comparten con proveedores de infraestructura que nos permiten operar el sitio (hosting, correo) bajo acuerdos de confidencialidad.
              </p>
            </Section>

            <Section n="04" title="Derechos del titular">
              <p>Como titular de sus datos personales usted tiene derecho, en todo momento, a:</p>
              <ul>
                <li><strong>Conocer</strong> qué datos suyos tenemos.</li>
                <li><strong>Actualizar y rectificar</strong> sus datos cuando sean inexactos o incompletos.</li>
                <li><strong>Solicitar prueba</strong> de la autorización otorgada a Strategia.</li>
                <li><strong>Revocar la autorización</strong> y/o <strong>solicitar la supresión</strong> de sus datos, siempre que no exista un deber legal o contractual que obligue a conservarlos.</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
              </ul>
            </Section>

            <Section n="05" title="Cómo ejercer sus derechos">
              <p>
                Para consultar, actualizar, rectificar o solicitar la supresión de sus datos, o para revocar la autorización que nos otorgó, envíe una comunicación a:
              </p>
              <ul>
                <li>
                  Correo: <a href="mailto:strategiaconsultoriasas@gmail.com">strategiaconsultoriasas@gmail.com</a>, con el asunto <em>&ldquo;Habeas Data&rdquo;</em>.
                </li>
                <li>
                  WhatsApp: <a href="https://wa.me/573203047445" target="_blank" rel="noopener noreferrer">+57 320 304 7445</a>.
                </li>
              </ul>
              <p>
                Strategia dará respuesta a su solicitud dentro de los términos previstos en la Ley 1581 de 2012 (quince días hábiles para consultas y quince días hábiles prorrogables para reclamos).
              </p>
            </Section>

            <Section n="06" title="Vigencia y conservación">
              <p>
                Sus datos personales serán conservados durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables. Una vez agotada esta finalidad, sus datos serán suprimidos salvo que exista un deber legal de conservarlos por un tiempo mayor.
              </p>
              <p>
                Esta política podrá ser actualizada en cualquier momento. Las versiones actualizadas se publicarán en esta misma URL. Para consultas sobre esta política puede escribirnos a <a href="mailto:strategiaconsultoriasas@gmail.com">strategiaconsultoriasas@gmail.com</a>.
              </p>
            </Section>

            <div className="mt-16 pt-8 border-t border-paper-rule text-sm text-fg-on-light-mute">
              Esta política se rige por la Ley Estatutaria 1581 de 2012, el Decreto Reglamentario 1377 de 2013 y demás normas concordantes de la República de Colombia.
            </div>
          </motion.article>
        </div>
      </section>
    </>
  )
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <div className="kicker text-teal mb-3 flex items-center gap-3">
        <span className="h-px w-8 bg-teal" />
        {n}
      </div>
      <h2 className="text-2xl md:text-3xl font-medium text-ink tracking-[-0.025em] leading-tight mb-5">
        {title}
      </h2>
      <div className="space-y-4 text-base text-ink/90 leading-relaxed">{children}</div>
    </section>
  )
}
