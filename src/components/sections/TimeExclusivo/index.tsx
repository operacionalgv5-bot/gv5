"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./style.module.css";

export default function TimeExclusivo() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const textosRef = useRef<HTMLDivElement>(null);
  const imagemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            if (textosRef.current?.children) {
              animate(textosRef.current.children, {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(110),
                duration: 850,
                ease: "outQuad",
              });
            }

            if (imagemRef.current) {
              animate(imagemRef.current, {
                opacity: [0, 1],
                scale: [0.95, 1],
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

  return (
    <section className={styles.secaoTime} ref={secaoRef}>
      <div className="container">
        <div className={styles.gradeConteudo}>
          <div className={styles.colunaTextos} ref={textosRef}>
            <div className={styles.etiquetaDestaque}>
              Receba um time exclusivo para o seu negócio
            </div>
            <h2 className={styles.tituloPrincipal}>
              A GV5 Assessoria estrutura o marketing da sua empresa com base na sua necessidade
            </h2>
            <p className={styles.descricao}>
              Tenha um time de especialistas ao seu lado ou terceirize totalmente seu marketing digital com a GV5. Sem dor de cabeça com contratações, gestão de equipe ou burocracias, você foca no seu negócio, e a gente foca em fazer ele crescer.
            </p>
            <div className={styles.blocoAcao}>
              <a href="#inicio" className={styles.botaoCta}>
                <span>Quero mais informações</span>
                <ArrowUpRight size={17} />
              </a>
              <div className={styles.indicadorOnline}>
                <span className={styles.pontoVerde}></span>
                <span>Especialistas online agora</span>
              </div>
            </div>
          </div>

          <div className={styles.colunaImagem} ref={imagemRef}>
            <div className={styles.molduraImagem}>
              <Image
                src="/receba-um-time-exclusivo.jpg"
                alt="Especialista GV5 trabalhando"
                width={540}
                height={380}
                className={styles.imagemEspecialista}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
