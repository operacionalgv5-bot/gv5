"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

export default function Hero() {
  const gradeRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 45,
    atrasoStagger: 160,
    duracao: 1450,
  });

  return (
    <section className={styles.secaoHero}>
      <div className="container">
        <div className={styles.gradeConteudo} ref={gradeRef}>
          <div className={styles.colunaTexto}>
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
            <a href="#inicio" className={styles.botaoAcao}>
              <span>Quero mais informações</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className={styles.colunaImagem}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
