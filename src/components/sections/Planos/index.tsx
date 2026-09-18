"use client";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
  trafego: { id: "trafego", titulo: "Tráfego", roas: "8.2x", cpl: "R$ 4,80", conversoes: "+61%", pontos: "M 0 110 Q 70 95, 140 75 T 280 50 T 420 20" },
  conteudo: { id: "conteudo", titulo: "Conteúdo", roas: "5.4x", cpl: "R$ 6,20", conversoes: "+42%", pontos: "M 0 110 Q 70 85, 140 60 T 280 40 T 420 30" },
  performance: { id: "performance", titulo: "Performance", roas: "9.8x", cpl: "R$ 3,90", conversoes: "+84%", pontos: "M 0 120 Q 70 100, 140 60 T 280 30 T 420 10" },
  full: { id: "full", titulo: "Full Service", roas: "12.5x", cpl: "R$ 3,10", conversoes: "+120%", pontos: "M 0 130 Q 70 90, 140 45 T 280 20 T 420 5" },
};

export default function Planos() {
  const gradeRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 34,
    atrasoStagger: 130,
    duracao: 1050,
    triggerRatio: 0.40,
  });

  const [abaSelecionada, setAbaSelecionada] = useState<string>("trafego");
  const dadosAtuais = DADOS_PLANOS[abaSelecionada];

  return (
    <section className={styles.secaoPlanos} id="planos">
      <div className="container">
        <div className={styles.gradePrincipal} ref={gradeRef}>
          <div className={styles.colunaTextos}>
            <div className={styles.etiquetaSecao}>Planos Personalizados</div>
            <h2 className={styles.tituloSecao}>
              Nós te ajudamos a escolher a solução certa para a fase que sua empresa vive hoje!
            </h2>
            <p className={styles.descricaoSecao}>
              Oferecemos nossos serviços pela <span className={styles.destaqueBranco}>necessidade atual do cliente</span>. O mais importante é continuar investindo em estratégias que trazem resultado real.
            </p>
          </div>

          <div className={styles.painelGrafico}>
            <div className={styles.cabecalhoAbas}>
              {Object.values(DADOS_PLANOS).map((plano) => (
                <button
                  key={plano.id}
                  type="button"
                  className={styles.botaoAbaPlano + " " + (abaSelecionada === plano.id ? styles.abaPlanoAtiva : "")}
                  onClick={() => setAbaSelecionada(plano.id)}
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
                <path d={dadosAtuais.pontos + " L 420 140 L 0 140 Z"} className={styles.gradienteArea} />
                <path d={dadosAtuais.pontos} className={styles.linhaGrafico} />
              </svg>
            </div>

            <div className={styles.gradeMetricas}>
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
