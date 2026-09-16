"use client";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

export default function QuemSomos() {
  const secaoRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 42,
    atrasoStagger: 170,
    duracao: 1450,
  });

  return (
    <section className={styles.secaoQuemSomos} id="sobre">
      <div className="container">
        <div className={styles.gradeConteudo} ref={secaoRef}>
          <div className={styles.colunaCartoes}>
            <Image
              src="/img-quem-somos.png"
              alt="Estratégia, Execução e Conversão"
              width={460}
              height={520}
              className={styles.imagemComposta}
            />
          </div>

          <div className={styles.colunaTexto}>
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
