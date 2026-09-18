"use client";
import { useState } from "react";
import Image from "next/image";
import { Radio, TrendingUp, Droplet, RotateCw, Send, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

interface EtapaInfo {
  id: string;
  rotulo: string;
  icone: any;
  descricao: string;
}

const ETAPAS: EtapaInfo[] = [
  { id: "engajamento", rotulo: "Engajamento", icone: Radio, descricao: "Materiais visuais profissionais que prendem a atenção do seu público na região certa." },
  { id: "aquisicao", rotulo: "Aquisição", icone: TrendingUp, descricao: "Campanhas pagas e orgânicas otimizadas para atrair o perfil comprador da sua região." },
  { id: "monetizacao", rotulo: "Monetização", icone: Droplet, descricao: "Otimizamos cardápio e ofertas para elevar ticket médio e rentabilizar no primeiro pedido." },
  { id: "retencao", rotulo: "Retenção", icone: RotateCw, descricao: "Compras contínuas com menor custo de aquisição. Seus clientes sempre ativos e fiéis." },
  { id: "ativacao", rotulo: "Ativação", icone: Send, descricao: "Reativamos clientes inativos e aceleramos vendas nos dias fracos com automação no WhatsApp." },
];

export default function Metodo() {
  const containerRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 30,
    atrasoStagger: 120,
    duracao: 1000,
    triggerRatio: 0.40,
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
              Um método comprovado para sua empresa <span>nunca parar de crescer</span>
            </h2>
            <p className={styles.subtituloSecao}>
              Siga o passo a passo e veja seu negócio <strong>gerando resultado todos os dias</strong>.
            </p>
          </div>

          <div className={styles.diagramaContainer}>
            <div className={styles.colunaLinhasEsquerda}>
              <div
                className={styles.itemLinha + " " + (etapaAtiva === "engajamento" ? styles.ativo : "")}
                onClick={() => setEtapaAtiva("engajamento")}
              >
                <span className={styles.textoEtapa}>Engajamento</span>
                <span className={styles.tracoConexao}></span>
                <span className={styles.pontoBolinha}></span>
              </div>
              <div
                className={styles.itemLinha + " " + (etapaAtiva === "ativacao" ? styles.ativo : "")}
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
                className={styles.itemLinha + " " + (etapaAtiva === "retencao" ? styles.ativo : "")}
                onClick={() => setEtapaAtiva("retencao")}
              >
                <span className={styles.pontoBolinha}></span>
                <span className={styles.tracoConexao}></span>
                <span className={styles.textoEtapa}>Retenção</span>
              </div>
              <div
                className={styles.itemLinha + " " + (etapaAtiva === "aquisicao" ? styles.ativo : "")}
                onClick={() => setEtapaAtiva("aquisicao")}
              >
                <span className={styles.pontoBolinha}></span>
                <span className={styles.tracoConexao}></span>
                <span className={styles.textoEtapa}>Aquisição</span>
              </div>
              <div
                className={styles.itemLinha + " " + (etapaAtiva === "monetizacao" ? styles.ativo : "")}
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
                  className={styles.botaoPill + " " + (ativa ? styles.pillAtiva : "")}
                  onClick={() => setEtapaAtiva(etapa.id)}
                >
                  <Icone size={16} />
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
