"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./style.module.css";

export default function Hero() {
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
                translateY: [28, 0],
                delay: stagger(120),
                duration: 850,
                ease: "outQuad",
              });
            }

            if (imagemRef.current) {
              animate(imagemRef.current, {
                opacity: [0, 1],
                scale: [0.96, 1],
                duration: 1000,
                delay: 200,
                ease: "outQuad",
              });
            }

            observador.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    if (secaoRef.current) observador.observe(secaoRef.current);
    return () => observador.disconnect();
  }, []);

  return (
    <section className={styles.secaoHero} ref={secaoRef}>
      <div className="container">
        <div className={styles.gradeConteudo}>
          <div className={styles.colunaTexto} ref={textosRef}>
            <div className={styles.blocoLogo}>
              <Image
                src="/logo.png"
                alt="GV5 Assessoria"
                width={54}
                height={40}
                className={styles.iconeLogo}
              />
            </div>
            <h2 className={styles.tituloAutoridade}>
              Sua empresa precisa da{" "}
              <span className={styles.destaqueVermelho}>
                maior assessoria de marketing digital
              </span>{" "}
              do ABC!
            </h2>
            <p className={styles.subtitulo}>
              Somos a engrenagem invisível das empresas que mais crescem no ABC.
            </p>
            <a href="#contato" className={styles.botaoAcao}>
              <span>Quero mais informações</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className={styles.colunaImagem} ref={imagemRef}>
            <div className={styles.envolturaImagemFundida}>
              <Image
                src="/hero.png"
                alt="Fundadores da GV5 Assessoria"
                width={720}
                height={520}
                priority
                className={styles.imagemHero}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Faixas Cruzadas (Overlap) */}
      <div className={styles.areaFaixasCruzadas}>
        <div className={styles.faixaBranca}>
          <div className={styles.trilhoMetricas}>
            <span className={styles.itemMetrica}>+4 ANOS DE EXPERIÊNCIA</span>
            <span className={styles.separadorPontoPreto}></span>
            <span className={styles.itemMetrica}>MAIOR ASSESSORIA DE MARKETING DIGITAL DO ABC</span>
            <span className={styles.separadorPontoPreto}></span>
            <span className={styles.itemMetrica}>+100 EMPRESAS COM RESULTADOS</span>
            <span className={styles.separadorPontoPreto}></span>
            <span className={styles.itemMetrica}>+4 ANOS DE EXPERIÊNCIA</span>
            <span className={styles.separadorPontoPreto}></span>
            <span className={styles.itemMetrica}>MAIOR ASSESSORIA DE MARKETING DIGITAL DO ABC</span>
            <span className={styles.separadorPontoPreto}></span>
            <span className={styles.itemMetrica}>+100 EMPRESAS COM RESULTADOS</span>
          </div>
        </div>

        <div className={styles.faixaVermelha}>
          <div className={styles.trilhoMetricas}>
            <span className={styles.itemMetrica}>+100M EM VENDAS PARA OS NOSSOS CLIENTES</span>
            <span className={styles.separadorPontoVermelho}></span>
            <span className={styles.itemMetrica}>+4 ANOS DE EXPERIÊNCIA</span>
            <span className={styles.separadorPontoVermelho}></span>
            <span className={styles.itemMetrica}>+100 EMPRESAS COM RESULTADOS</span>
            <span className={styles.separadorPontoVermelho}></span>
            <span className={styles.itemMetrica}>+100M EM VENDAS PARA OS NOSSOS CLIENTES</span>
            <span className={styles.separadorPontoVermelho}></span>
            <span className={styles.itemMetrica}>+4 ANOS DE EXPERIÊNCIA</span>
            <span className={styles.separadorPontoVermelho}></span>
            <span className={styles.itemMetrica}>+100 EMPRESAS COM RESULTADOS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
