"use client";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

const BANNER_CARDS = [
  "/cards/oque-fazemos-01.png",
  "/cards/oque-fazemos-02.png",
  "/cards/oque-fazemos-03.png",
  "/cards/oque-fazemos-04.png",
  "/cards/oque-fazemos-05.png",
  "/cards/oque-fazemos-06.png",
  "/cards/oque-fazemos-07.png",
];

const CARDS_LOOP = [...BANNER_CARDS, ...BANNER_CARDS];

export default function Servicos() {
  const cabecalhoRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 32,
    atrasoStagger: 130,
    duracao: 1350,
  });

  return (
    <section className={styles.secaoServicos} id="servicos">
      <div className="container">
        <div className={styles.cabecalhoSecao} ref={cabecalhoRef}>
          <div className={styles.etiquetaSecao}>O Que Fazemos?</div>
          <h2 className={styles.tituloSecao}>
            A GV5 Assessoria estrutura o marketing da sua empresa com base na sua necessidade
          </h2>
        </div>
      </div>

      <div className={styles.containerCarrossel}>
        <div className={styles.trilhoCarrossel}>
          {CARDS_LOOP.map((caminhoImagem, index) => (
            <div key={index} className={styles.cardItem}>
              <Image
                src={caminhoImagem}
                alt="Solução GV5 Assessoria"
                width={700}
                height={460}
                className={styles.imagemBanner}
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
