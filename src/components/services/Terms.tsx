import React from "react";

export default function TermServices() {
  return (
    <section className="bg-ty-0 px-4 py-20 text-ty-1000 md:px-20 lg:px-28 xl:px-64">
      <h2 className="pb-6 text-center font-cormorant text-4xl font-bold">Términos y condiciones</h2>
      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>01</p>
          <p>No transferibles a otra persona</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            Las sesiones adquiridas son exclusivas para el paciente que las compró y no pueden ser
            transferidas a otra persona bajo ninguna circunstancia.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>02</p>
          <p>No reembolsable</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            El costo de las sesiones no es reembolsable, por lo que no se realizarán devoluciones de dinero.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>03</p>
          <p>Tolerancia de llegada a la cita</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            El paciente tiene un margen de 15 minutos de tolerancia a partir de la hora programada para llegar
            a su cita. Si no se presenta dentro de ese tiempo, la sesión será considerada como tomada.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>04</p>
          <p>Llegada tardía después de los 15 minutos</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            Si el paciente llega después de los 15 minutos y el terapeuta puede recibirlo, la consulta se
            llevará a cabo, pero no se repondrá el tiempo perdido.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>05</p>
          <p>Políticas de cancelación o reprogramación</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            El paciente puede cancelar o reagendar su cita un máximo de dos veces durante el paquete de 5
            sesiones, siempre y cuando la cancelación se realice con al menos 6 horas de anticipación. De no
            ser así, la cita será considerada como tomada.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>06</p>
          <p>Cancelaciones por motivos de fuerza mayor</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            En caso de fuerza mayor, como accidentes automovilísticos, caídas, o enfermedades contagiosas
            (COVID, varicela, influenza, gastroenteritis) que afecten al paciente o a familiares dependientes
            (padres, hijos, cónyuge), se podrá reagendar la cita sin costo aunque se cancele con menos de 6
            horas de anticipación. Es necesario presentar evidencia del percance o enfermedad para aplicar
            esta excepción.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>07</p>
          <p>Firma de confirmación de cita</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            Al finalizar cada consulta, se firmará un documento con la fecha en que se realizó la cita como
            evidencia de cumplimiento.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>08</p>
          <p>Aceptación de términos y condiciones</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            El pago de las 5 sesiones implica la aceptación de estos términos y condiciones por parte del
            paciente.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0">
        <div className="w-full text-xl md:w-1/2">
          <p>09</p>
          <p>Cancelaciones por parte del terapeuta</p>
        </div>
        <div className="w-full text-xl md:w-1/2">
          <p>
            Si el terapeuta cancela la cita con menos de 6 horas de anticipación, el paciente recibirá un bono
            de $50 como compensación para una consulta futura. Este bono no es reembolsable en efectivo y
            puede ser utilizado por el paciente o transferido a un referido.
          </p>
        </div>
      </div>
    </section>
  );
}
