"use client";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import styles from "./style.module.css";

interface DadosPlano {
  id: string;
  titulo: string;
  roas: string;
  cpl: string;
  conversoes: string;
  pontos: string;
}

const DADOS_PLANOS: Record<string, DadosPlano> = {
  trafego: {
    id: "trafego",
    titulo: "Tráfego",
    roas: "8.2x",
    cpl: "R$ 4,80",
    conversoes: "+61%",
    pontos: "M 0 110 Q 70 95, 140 75 T 280 50 T 420 20",
  },
  conteudo: {
    id: "conteudo",
    titulo: "Conteúdo",
    roas: "5.4x",
    cpl: "R$ 6,20",
    conversoes: "+42%",
    pontos: "M 0 110 Q 70 85, 140 60 T 280 40 T 420 30",
  },
  performance: {
    id: "performance",
    titulo: "Performance",
    roas: "9.8x",
    cpl: "R$ 3,90",
    conversoes: "+84%",
    pontos: "M 0 120 Q 70 100, 140 60 T 280 30 T 420 10",
  },
  full: {
    id: "full",
    titulo: "Full Service",
    roas: "12.5x",
    cpl: "R$ 3,10",
    conversoes: "+120%",
    pontos: "M 0 130 Q 70 90, 140 45 T 280 20 T 420 5",
  },
};

export default function Planos() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const textosRef = useRef<HTMLDivElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const metricasRef = useRef<HTMLDivElement>(null);

  const [abaSelecionada, setAbaSelecionada] = useState<string>("trafego");

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            if (textosRef.current?.children) {
              animate(textosRef.current.children, {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(100),
                duration: 800,
                ease: "outQuad",
              });
            }

            if (painelRef.current) {
              animate(painelRef.current, {
                opacity: [0, 1],
                translateY: [28, 0],
                duration: 900,
                delay: 200,
                ease: "outQuad",
              });
            }

            observador.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (secaoRef.current) observador.observe(secaoRef.current);
    return () => observador.disconnect();
  }, []);

  const trocarPlano = (id: string) => {
    setAbaSelecionada(id);
    if (metricasRef.current) {
      animate(metricasRef.current, {
        opacity: [0.3, 1],
        scale: [0.97, 1],
        duration: 350,
        ease: "outQuad",
      });
    }
  };

  const dadosAtuais = DADOS_PLANOS[abaSelecionada];

  return (
    <section className={styles.secaoPlanos} ref={secaoRef}>
      <div className="container">
        <div className={styles.gradePrincipal}>
          <div className={styles.colunaTextos} ref={textosRef}>
            <div className={styles.etiquetaSecao}>Planos Personalizados</div>
            <h2 className={styles.tituloSecao}>
              Nós te ajudamos a escolher a solução certa para a fase que sua empresa vive hoje!
            </h2>
            <p className={styles.descricaoSecao}>
              Oferecemos nossos serviços pela <span className={styles.destaqueBranco}>necessidade atual do cliente</span>. O mais importante é continuar investindo em estratégias que trazem resultado real.
            </p>
          </div>

          <div className={styles.painelGrafico} ref={painelRef}>
            <div className={styles.cabecalhoAbas}>
              {Object.values(DADOS_PLANOS).map((plano) => (
                <button
                  key={plano.id}
                  type="button"
                  className={`${styles.botaoAbaPlano} ${abaSelecionada === plano.id ? styles.abaPlanoAtiva : ""}`}
                  onClick={() => trocarPlano(plano.id)}
                >
                  {plano.titulo}
                </button>
              ))}
            </div>

            <div className={styles.areaCurva}>
              <svg viewBox="0 0 420 140" className={styles.svgCurva} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="degradeCurva" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d42020" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#d42020" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${dadosAtuais.pontos} L 420 140 L 0 140 Z`}
                  className={styles.gradienteArea}
                />
                <path
                  d={dadosAtuais.pontos}
                  className={styles.linhaGrafico}
                />
              </svg>
            </div>

            <div className={styles.gradeMetricas} ref={metricasRef}>
              <div className={styles.cardMetrica}>
                <div className={styles.valorMetrica}>{dadosAtuais.roas}</div>
                <div className={styles.rotuloMetrica}>ROAS Médio</div>
              </div>
              <div className={styles.cardMetrica}>
                <div className={styles.valorMetrica}>{dadosAtuais.cpl}</div>
                <div className={styles.rotuloMetrica}>CPL Médio</div>
              </div>
              <div className={styles.cardMetrica}>
                <div className={styles.valorMetrica}>{dadosAtuais.conversoes}</div>
                <div className={styles.rotuloMetrica}>Conversões</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
