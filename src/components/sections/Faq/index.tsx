"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

interface ItemFaq { pergunta: string; resposta: string; }

const ITENS_FAQ: ItemFaq[] = [
  { pergunta: "Qual é a real diferença entre a GV5 e uma agência de marketing comum?", resposta: "Agências convencionais focam em likes, artes estáticas e posts comemorativos. A GV5 opera como uma assessoria comercial de ponta a ponta: combinamos mídia de performance, testes contínuos de criativos, engenharia de cardápios e reativação via CRM com foco estrito em volume de pedidos e receita líquida." },
  { pergunta: "Em quanto tempo começamos a registrar crescimento consistente?", resposta: "Com a estrutura técnica configurada e os primeiros criativos validados, nossos parceiros começam a captar novos clientes e pedidos já entre a primeira e a segunda semana de operação ativa." },
  { pergunta: "O serviço se aplica tanto a delivery quanto a restaurante com salão?", resposta: "Sim. Criamos esteiras segmentadas de acordo com o modelo de negócio: para salões, desenvolvemos campanhas para atração local e reservas; para delivery, otimizamos o raio de entrega, o ticket médio e as vendas diretas sem comissões excessivas de terceiros." },
  { pergunta: "A produção de vídeos e fotos dos pratos está inclusa?", resposta: "Sim. Acreditamos que a qualidade visual dos pratos define a taxa de clique e de compra. Nossa equipe orienta ou produz criativos profissionais adaptados para as redes sociais que despertam desejo imediato no consumidor." },
];

export default function Faq() {
  const gradeRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 30,
    atrasoStagger: 120,
    duracao: 1050,
    triggerRatio: 0.40,
  });

  const [itemAberto, setItemAberto] = useState<number | null>(0);
  const alternarItem = (indice: number) => setItemAberto(itemAberto === indice ? null : indice);

  return (
    <section className={styles.secaoFaq} id="faq">
      <div className="container">
        <div className={styles.gradeConteudo} ref={gradeRef}>
          <div className={styles.colunaTextos}>
            <div className={styles.etiquetaDestaque}>Transparência e Parceria</div>
            <h2 className={styles.tituloSecao}>Perguntas Frequentes</h2>
            <p className={styles.descricaoSecao}>
              Tudo o que você precisa saber sobre o modelo de atuação e os impactos da GV5 no seu negócio.
            </p>
          </div>

          <div className={styles.listaAcordeao}>
            {ITENS_FAQ.map((item, index) => {
              const aberto = itemAberto === index;
              return (
                <div key={index} className={styles.itemAcordeao}>
                  <button type="button" className={styles.botaoPergunta} onClick={() => alternarItem(index)}>
                    <div className={styles.blocoIconeTexto}>
                      <span className={styles.iconePergunta}><HelpCircle size={15} /></span>
                      <span className={styles.textoPergunta}>{item.pergunta}</span>
                    </div>
                    <span className={styles.setaAcordeao + " " + (aberto ? styles.setaAberta : "")}>
                      <ChevronDown size={17} />
                    </span>
                  </button>
                  {aberto && (<div className={styles.corpoResposta}><p>{item.resposta}</p></div>)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
