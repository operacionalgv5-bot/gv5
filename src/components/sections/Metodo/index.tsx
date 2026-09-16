"use client";
import { useState } from "react";
import Image from "next/image";
import { 
  Radio, 
  TrendingUp, 
  Droplet, 
  RotateCw, 
  Send,
  ArrowRight
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

interface EtapaInfo {
  id: string;
  rotulo: string;
  icone: any;
  descricao: string;
}

const ETAPAS: EtapaInfo[] = [
  {
    id: "engajamento",
    rotulo: "Engajamento",
    icone: Radio,
    descricao: "Criamos materiais visuais profissionais de alta atração para reter a atenção qualificada do seu público no raio de atendimento.",
  },
  {
    id: "aquisicao",
    rotulo: "Aquisição",
    icone: TrendingUp,
    descricao: "Atraímos novos clientes com campanhas pagas e orgânicas otimizadas exclusivamente para o perfil comprador da sua região.",
  },
  {
    id: "monetizacao",
    rotulo: "Monetização",
    icone: Droplet,
    descricao: "Otimizamos cardápios e esteiras de ofertas para elevar o ticket médio e rentabilizar o cliente logo no primeiro pedido.",
  },
  {
    id: "retencao",
    rotulo: "Retenção",
    icone: RotateCw,
    descricao: "Garantimos compras contínuas e menor custo de aquisição mantendo seus clientes sempre ativos e fiéis.",
  },
  {
    id: "ativacao",
    rotulo: "Ativação",
    icone: Send,
    descricao: "Reativamos clientes inativos e aceleramos vendas nos dias de menor movimento com automações inteligentes no WhatsApp.",
  },
];

export default function Metodo() {
  const containerRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 38,
    atrasoStagger: 150,
    duracao: 1400,
  });

  const [etapaAtiva, setEtapaAtiva] = useState<string>("aquisicao");

  const etapaSelecionada = ETAPAS.find((e) => e.id === etapaAtiva) || ETAPAS[1];

  return (
    <section className={styles.secaoMetodo} id="metodo">
      <div className="container">
        <div ref={containerRef}>
          <div className={styles.cabecalhoSecao}>
            <div className={styles.etiquetaSecao}>O Método GV5</div>
            <h2 className={styles.tituloSecao}>
              EXISTE UM <span>MÉTODO COMPROVADO</span> PARA QUE SUA EMPRESA{" "}
              <span>NUNCA PARE</span> DE CRESCER
            </h2>
            <p className={styles.subtituloSecao}>
              Se você seguir, irá manter seu negócio <strong>gerando resultados todos os dias</strong>.
            </p>
          </div>

          <div className={styles.diagramaContainer}>
            <div className={styles.colunaLinhasEsquerda}>
              <div 
                className={`${styles.itemLinha} ${etapaAtiva === "engajamento" ? styles.ativo : ""}`}
                onClick={() => setEtapaAtiva("engajamento")}
              >
                <span className={styles.textoEtapa}>Engajamento</span>
                <span className={styles.tracoConexao}></span>
                <span className={styles.pontoBolinha}></span>
              </div>
              <div 
                className={`${styles.itemLinha} ${etapaAtiva === "ativacao" ? styles.ativo : ""}`}
                onClick={() => setEtapaAtiva("ativacao")}
              >
                <span className={styles.textoEtapa}>Ativação</span>
                <span className={styles.tracoConexao}></span>
                <span className={styles.pontoBolinha}></span>
              </div>
            </div>

            <div className={styles.centroLogoGlow}>
              <Image
                src="/logo.png"
                alt="GV5 Logo"
                width={140}
                height={100}
                className={styles.imagemLogoCentro}
              />
            </div>

            <div className={styles.colunaLinhasDireita}>
              <div 
                className={`${styles.itemLinha} ${etapaAtiva === "retencao" ? styles.ativo : ""}`}
                onClick={() => setEtapaAtiva("retencao")}
              >
                <span className={styles.pontoBolinha}></span>
                <span className={styles.tracoConexao}></span>
                <span className={styles.textoEtapa}>Retenção</span>
              </div>
              <div 
                className={`${styles.itemLinha} ${etapaAtiva === "aquisicao" ? styles.ativo : ""}`}
                onClick={() => setEtapaAtiva("aquisicao")}
              >
                <span className={styles.pontoBolinha}></span>
                <span className={styles.tracoConexao}></span>
                <span className={styles.textoEtapa}>Aquisição</span>
              </div>
              <div 
                className={`${styles.itemLinha} ${etapaAtiva === "monetizacao" ? styles.ativo : ""}`}
                onClick={() => setEtapaAtiva("monetizacao")}
              >
                <span className={styles.pontoBolinha}></span>
                <span className={styles.tracoConexao}></span>
                <span className={styles.textoEtapa}>Monetização</span>
              </div>
            </div>
          </div>

          <div className={styles.gradePills}>
            {ETAPAS.map((etapa) => {
              const Icone = etapa.icone;
              const ativa = etapaAtiva === etapa.id;
              return (
                <button 
                  key={etapa.id}
                  type="button" 
                  className={`${styles.botaoPill} ${ativa ? styles.pillAtiva : ""}`}
                  onClick={() => setEtapaAtiva(etapa.id)}
                >
                  <Icone size={15} />
                  <span>{etapa.rotulo}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.caixaDescricao}>
            <span className={styles.iconeSeta}>
              <ArrowRight size={18} />
            </span>
            <p className={styles.textoDescricaoAba}>{etapaSelecionada.descricao}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
