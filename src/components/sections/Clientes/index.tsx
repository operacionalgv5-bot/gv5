"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import styles from "./style.module.css";

const CASOS_BASE = [
  {
    nome: "Fresh Sandwich",
    imagem: "/clientes/fresh.png",
    investido: "R$ 4.872,30",
    retornado: "R$ 52.133,61",
    roi: "ROI 10.7x",
  },
  {
    nome: "La Voitura",
    imagem: "/clientes/lavoitura.png",
    investido: "R$ 2.450,00",
    retornado: "R$ 21.340,00",
    roi: "ROI 8.7x",
  },
  {
    nome: "Lig-Lig",
    imagem: "/clientes/lig-lig.png",
    investido: "R$ 3.742,90",
    retornado: "R$ 25.451,72",
    roi: "ROI 6.8x",
  },
  {
    nome: "Press Metrologia",
    imagem: "/clientes/press-metrologia.png",
    investido: "R$ 3.120,00",
    retornado: "R$ 29.800,00",
    roi: "ROI 9.5x",
  },
  {
    nome: "Real Motos",
    imagem: "/clientes/real-motos.png",
    investido: "R$ 4.315,60",
    retornado: "R$ 40.135,08",
    roi: "ROI 9.3x",
  },
  {
    nome: "Vivazhen",
    imagem: "/clientes/vivazhen.png",
    investido: "R$ 5.890,00",
    retornado: "R$ 100.420,00",
    roi: "ROI 10.8x",
  },
];

const CASOS_LOOP = [...CASOS_BASE, ...CASOS_BASE];

export default function Clientes() {
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
                delay: stagger(100),
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
    <section className={styles.secaoClientes} id="clientes" ref={secaoRef}>
      <div className="container">
        <div className={styles.cabecalhoSecao} ref={cabecalhoRef}>
          <div className={styles.etiquetaSecao}>Resultados Reais Auditados</div>
          <h2 className={styles.tituloSecao}>
            Métricas que comprovam a solidez da metodologia GV5
          </h2>
          <p className={styles.descricaoSecao}>
            Investimento estratégico gera faturamento previsível. Acompanhe a performance de parceiros que confiam em nossa gestão:
          </p>
        </div>
      </div>

      <div className={styles.containerCarrossel}>
        <div className={styles.trilhoCarrossel}>
          {CASOS_LOOP.map((item, index) => (
            <div key={index} className={styles.cardCase}>
              <div className={styles.molduraLogo}>
                <Image
                  src={item.imagem}
                  alt={item.nome}
                  width={100}
                  height={100}
                  className={styles.imagemLogoCliente}
                />
              </div>
              <h3 className={styles.nomeCliente}>{item.nome}</h3>
              <div className={styles.dadosMetricas}>
                <div className={styles.linhaMetrica}>
                  <span>Investimento:</span>
                  <strong className={styles.valorMetrica}>{item.investido}</strong>
                </div>
                <div className={styles.linhaMetrica}>
                  <span>Faturamento:</span>
                  <strong className={styles.valorMetrica}>{item.retornado}</strong>
                </div>
              </div>
              <div className={styles.badgeRoi}>
                <TrendingUp size={14} />
                <span>{item.roi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
