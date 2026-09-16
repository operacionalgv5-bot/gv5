"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

export default function TimeExclusivo() {
  const gradeRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 42,
    atrasoStagger: 150,
    duracao: 1400,
  });

  return (
    <section className={styles.secaoTime}>
      <div className="container">
        <div className={styles.gradeConteudo} ref={gradeRef}>
          <div className={styles.colunaTextos}>
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

          <div className={styles.colunaImagem}>
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
