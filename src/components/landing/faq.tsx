// Estilos CSS holográficos integrados
const faqStyles = `
  /* Contenedor interior glass */
  .faq-item > .faq-head,
  .faq-item > .faq-body {
    background: rgba(255,255,255,.10);
  }

  /* Cabecera del accordion (resalta, clickable) */
  .faq-head {
    list-style: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .75rem;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,.20);
    position: relative;
    color: #fff;
    font-weight: 700;
  }

  /* Icono circular con brillo holográfico */
  .faq-dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background: conic-gradient(from 180deg, #fff4, #EC489980, #3B82F680, #7C3AED80, #fff4);
    box-shadow: 0 0 12px #ffffff44, inset 0 0 8px #ffffff22;
  }

  /* Flecha */
  .faq-caret {
    transition: transform .25s ease;
    opacity: .9;
  }

  /* Cuerpo */
  .faq-body {
    margin-top: .5rem;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,.18);
    color: rgba(255,255,255,.92);
    line-height: 1.6;
    position: relative;
    overflow: hidden;
  }

  /* Brillo diagonal holográfico (shimmer) */
  .faq-body::after,
  .faq-head::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.12) 50%, transparent 70%);
    transform: translateX(-120%);
    animation: shimmer 6s linear infinite;
    pointer-events: none;
  }

  @keyframes shimmer {
    0% { transform: translateX(-120%); }
    100% { transform: translateX(120%); }
  }

  /* Hover/Focus states */
  .faq-item:hover .faq-head {
    box-shadow: 0 0 24px rgba(236,72,153,.25), 0 0 48px rgba(59,130,246,.20);
  }

  /* Rotar caret cuando está abierto */
  .faq-item[open] .faq-caret {
    transform: rotate(180deg);
  }

  /* Tipografía más legible dentro */
  .faq-body p {
    margin: 0;
  }

  /* Opcional: animación de apertura */
  .faq-item[open] .faq-body {
    animation: fadeIn .25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export function Faq() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: faqStyles }} />
      <section className="max-w-4xl mx-auto px-6 py-14 text-white" id="faq">
        <header className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#3B82F6] bg-clip-text text-transparent">
            Preguntas Frecuentes ✦
          </h2>
          <p className="mt-2 text-white/80">¿Tienes dudas? Aquí están las respuestas (cosmicamente claras).</p>
        </header>

        {/* FAQ ITEM 1 */}
        <details className="faq-item group mb-4 rounded-2xl p-[1px] bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#3B82F6]">
          <summary className="faq-head">
            <span className="faq-dot">🚀</span>
            ¿Qué es KallpaIA y por qué es diferente?
            <span className="faq-caret">▾</span>
          </summary>
          <div className="faq-body">
            KallpaIA es una plataforma STEAM con lecciones interactivas y desafíos gamificados.
            Mezcla narrativa + práctica para que aprender sea divertido y memorable.
          </div>
        </details>

        {/* FAQ ITEM 2 */}
        <details className="faq-item group mb-4 rounded-2xl p-[1px] bg-gradient-to-r from-[#3B82F6] via-[#22D3EE] to-[#7C3AED]">
          <summary className="faq-head">
            <span className="faq-dot">🧑‍🎓</span>
            ¿Quién puede usar KallpaIA?
            <span className="faq-caret">▾</span>
          </summary>
          <div className="faq-body">
             Estudiantes de 12–17 años, familias y docentes que quieran reforzar STEAM con actividades guiadas.
           </div>
        </details>

        {/* FAQ ITEM 3 */}
        <details className="faq-item group mb-4 rounded-2xl p-[1px] bg-gradient-to-r from-[#EC4899] via-[#7C3AED] to-[#3B82F6]">
          <summary className="faq-head">
            <span className="faq-dot">🧪</span>
            ¿Qué temas cubren?
            <span className="faq-caret">▾</span>
          </summary>
          <div className="faq-body">
            Ciencia, Tecnología, Ingeniería, Arte y Matemáticas, con módulos de IA, ciberseguridad y pensamiento crítico.
          </div>
        </details>

        {/* FAQ ITEM 4 */}
        <details className="faq-item group mb-4 rounded-2xl p-[1px] bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#7C3AED]">
          <summary className="faq-head">
            <span className="faq-dot">💰</span>
            ¿Tiene costo?
            <span className="faq-caret">▾</span>
          </summary>
          <div className="faq-body">
            Un plan gratuito para empezar y planes premium con retos avanzados, badges y reportes para familias/docentes.
          </div>
        </details>

        {/* FAQ ITEM 5 */}
        <details className="faq-item group mb-4 rounded-2xl p-[1px] bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#22D3EE]">
          <summary className="faq-head">
            <span className="faq-dot">🎮</span>
            ¿Cómo hacemos que aprender sea divertido?
            <span className="faq-caret">▾</span>
          </summary>
          <div className="faq-body">
            Historias + misiones + recompensas digitales. Aprendes construyendo proyectos y resolviendo retos reales.
          </div>
        </details>
      </section>
    </>
  );
}
