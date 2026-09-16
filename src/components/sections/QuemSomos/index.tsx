"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Image from "next/image";
import styles from "./style.module.css";

export default function QuemSomos() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const imagemRef = useRef<HTMLDivElement>(null);
  const textoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            if (imagemRef.current) {
              animate(imagemRef.current, {
                opacity: [0, 1],
                scale: [0.94, 1],
                translateY: [25, 0],
                duration: 900,
                ease: "outQuad",
              });
            }

            if (textoRef.current?.children) {
              animate(textoRef.current.children, {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(110),
                duration: 850,
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
    <section className={styles.secaoQuemSomos} id="sobre" ref={secaoRef}>
      <div className="container">
        <div className={styles.gradeConteudo}>
          <div className={styles.colunaCartoes} ref={imagemRef}>
            <Image
              src="/img-quem-somos.png"
              alt="Estratégia, Execução e Conversão"
              width={460}
              height={520}
              className={styles.imagemComposta}
            />
          </div>

          <div className={styles.colunaTexto} ref={textoRef}>
            <div className={styles.etiqueta}>Quem Somos</div>
            <h2 className={styles.tituloPrincipal}>
              Líder em marketing digital e parceira do seu crescimento.
            </h2>
            <p className={styles.paragrafo}>
              Na <span className={styles.destaque}>GV5 Assessoria</span>, não somos apenas uma agência; somos a maior assessoria de marketing digital do ABC. Nascemos da paixão por transformar negócios de todos os nichos, elevando-os a um novo patamar de crescimento e reconhecimento.
            </p>
            <p className={styles.paragrafo}>
              Com uma estrutura <span className={styles.destaque}>100% presencial</span> e uma equipe de <span className={styles.destaque}>mais de 20 profissionais</span> altamente qualificados, a GV5 Assessoria é a parceira estratégica que o seu negócio precisa para crescer de verdade.
            </p>
            <p className={styles.paragrafo}>
              Nosso time multidisciplinar, composto por gestores de tráfego, designers e especialistas em marketing digital, trabalha em sinergia para garantir que cada aspecto da sua presença online e offline seja otimizado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
