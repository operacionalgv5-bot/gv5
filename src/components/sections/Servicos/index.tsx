"use client";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import Image from "next/image";
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

// Duplicação para loop contínuo perfeito sem cortes
const CARDS_LOOP = [...BANNER_CARDS, ...BANNER_CARDS];

export default function Servicos() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const cabecalhoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            if (cabecalhoRef.current?.children) {
              animate(cabecalhoRef.current.children, {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 800,
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

  return (
    <section className={styles.secaoServicos} id="servicos" ref={secaoRef}>
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
