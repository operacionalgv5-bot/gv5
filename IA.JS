const fs = require('fs');
const path = require('path');

const files = {
  // 1. Lógica interativa de rotação de deck por toque e swipe
  'src/components/sections/Clientes/index.tsx': `"use client";
import { useEffect, useRef, useState, TouchEvent } from "react";
import Image from "next/image";
import { animate } from "animejs";
import { ChevronLeft, ChevronRight, Hand } from "lucide-react";
import styles from "./style.module.css";

interface CasoCliente {
  tipo: "cliente";
  nome: string;
  imagem: string;
  investido: string;
  retornado: string;
  roi: string;
}

interface CasoCTA {
  tipo: "cta";
  linha1: string;
  linha2: string;
  subtitulo: string;
  whatsappUrl: string;
}

type CardLeque = CasoCliente | CasoCTA;

const CARDS_INICIAIS: CardLeque[] = [
  {
    tipo: "cliente",
    nome: "Fresh Sandwich",
    imagem: "/clientes/fresh.png",
    investido: "R$ 3.742,90",
    retornado: "R$ 25.451,72",
    roi: "ROI: 6,8",
  },
  {
    tipo: "cliente",
    nome: "Real Motos",
    imagem: "/clientes/real-motos.png",
    investido: "R$ 4.315,60",
    retornado: "R$ 40.135,08",
    roi: "ROI: 9,3",
  },
  {
    tipo: "cta",
    linha1: "seja você o",
    linha2: "próximo case",
    subtitulo: "Sua empresa pode estar aqui. Vamos conversar?",
    whatsappUrl:
      "https://wa.me/5511989437638?text=Quero%20ser%20o%20pr%C3%B3ximo%20case%20GV5",
  },
  {
    tipo: "cliente",
    nome: "LarShop+",
    imagem: "/clientes/LarShop.png",
    investido: "R$ 267,85",
    retornado: "R$ 2.495,60",
    roi: "ROI: 9,3",
  },
  {
    tipo: "cliente",
    nome: "Marques Araújo",
    imagem: "/clientes/marques-araujo.png",
    investido: "R$ 3.158,75",
    retornado: "R$ 24.006,50",
    roi: "ROI: 7,6",
  },
];

export default function Clientes() {
  const secaoRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const [indiceAtivo, setIndiceAtivo] = useState(2); // Card CTA começa no meio
  const [jaInteragiu, setJaInteragiu] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Recalcula posições do leque em relação ao card ativo
  const renderizarTransforms = (novoAtivo: number) => {
    const elDeck = deckRef.current;
    if (!elDeck) return;

    const cards = Array.from(
      elDeck.querySelectorAll<HTMLElement>("." + styles.cardLeque)
    );
    if (cards.length === 0) return;

    const isMobile = window.innerWidth < 768;
    const cardW = isMobile ? 158 : 235;
    const spacing = isMobile ? 54 : cardW * 0.85;
    const rotBase = isMobile ? 6.5 : 9;
    const transYBase = isMobile ? 8 : 18;
    const escalaLateral = isMobile ? 0.9 : 0.93;

    cards.forEach((card, index) => {
      const diff = index - novoAtivo;
      const absDiff = Math.abs(diff);

      const zIndex = 20 - absDiff;
      card.style.zIndex = String(zIndex);

      const finalX = diff * spacing;
      const finalY = absDiff * transYBase;
      const finalRot = diff * rotBase;
      const finalScale = diff === 0 ? 1.05 : Math.max(0.82, escalaLateral - absDiff * 0.03);

      animate(card, {
        translateX: finalX,
        translateY: finalY,
        rotate: finalRot,
        scale: finalScale,
        duration: 550,
        ease: "outCubic",
      });
    });
  };

  const selecionarCard = (index: number) => {
    setJaInteragiu(true);
    setIndiceAtivo(index);
    renderizarTransforms(index);
  };

  const proximoCard = () => {
    setJaInteragiu(true);
    const prox = Math.min(CARDS_INICIAIS.length - 1, indiceAtivo + 1);
    setIndiceAtivo(prox);
    renderizarTransforms(prox);
  };

  const anteriorCard = () => {
    setJaInteragiu(true);
    const ant = Math.max(0, indiceAtivo - 1);
    setIndiceAtivo(ant);
    renderizarTransforms(ant);
  };

  // Suporte a gestos touch (arrastar o dedo)
  const lidarTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const lidarTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const lidarTouchEnd = () => {
    const diferenca = touchStartX.current - touchEndX.current;
    if (Math.abs(diferenca) > 40) {
      if (diferenca > 0) {
        proximoCard();
      } else {
        anteriorCard();
      }
    }
  };

  useEffect(() => {
    renderizarTransforms(indiceAtivo);
  }, []);

  return (
    <section className={styles.secaoClientes} id="clientes" ref={secaoRef}>
      <div className="container">
        <div className={styles.cabecalhoSecao}>
          <div className={styles.etiquetaSecao}>Resultados Reais Auditados</div>
          <h2 className={styles.tituloSecao}>
            Métricas que comprovam a solidez da metodologia GV5
          </h2>
          <p className={styles.descricaoSecao}>
            Investimento estratégico gera faturamento previsível. Acompanhe a
            performance de parceiros que confiam em nossa gestão:
          </p>
        </div>

        {/* Dica visual de interação no mobile */}
        {!jaInteragiu && (
          <div className={styles.dicaInteracao}>
            <Hand size={14} className={styles.iconeMaoDica} />
            <span>Toque ou deslize nas cartas para folhear os cases</span>
          </div>
        )}

        <div className={styles.palco3D}>
          <div
            className={styles.deckCentral}
            ref={deckRef}
            onTouchStart={lidarTouchStart}
            onTouchMove={lidarTouchMove}
            onTouchEnd={lidarTouchEnd}
          >
            {CARDS_INICIAIS.map((card, index) => {
              const isAtivo = index === indiceAtivo;

              return (
                <article
                  key={index}
                  className={[
                    styles.cardLeque,
                    isAtivo ? styles.cardDestaque : "",
                    card.tipo === "cta" ? styles.cardCTA : "",
                  ].filter(Boolean).join(" ")}
                  onClick={() => selecionarCard(index)}
                >
                  {card.tipo === "cliente" ? (
                    <>
                      <div className={styles.molduraCirculo}>
                        <Image
                          src={card.imagem}
                          alt={card.nome}
                          width={58}
                          height={58}
                          className={styles.imagemLogo}
                        />
                      </div>
                      <h3 className={styles.nomeCliente}>{card.nome}</h3>
                      <div className={styles.blocoMetricas}>
                        <div className={styles.linhaMetrica}>
                          <span className={styles.rotuloMetrica}>INVESTIDO:</span>
                          <strong className={styles.valorMetrica}>{card.investido}</strong>
                        </div>
                        <div className={styles.linhaMetrica}>
                          <span className={styles.rotuloMetrica}>RETORNADO:</span>
                          <strong className={styles.valorMetrica}>{card.retornado}</strong>
                        </div>
                      </div>
                      <div className={isAtivo ? styles.badgeRoiDestaque : styles.badgeRoi}>
                        <span>{card.roi}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.glowAtras} aria-hidden="true" />
                      <div className={styles.ctaConteudo}>
                        <h3 className={styles.ctaTitulo}>
                          <span className={styles.linhaMascara}>
                            <span className={styles.linhaTexto}>{card.linha1}</span>
                          </span>
                          <span className={styles.linhaMascara}>
                            <span className={styles.linhaTexto}>{card.linha2}</span>
                          </span>
                        </h3>

                        <p className={styles.ctaSubtitulo}>{card.subtitulo}</p>

                        <a
                          href={card.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.botaoWhatsApp}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          <span>Falar no WhatsApp</span>
                        </a>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* Controles de Navegação Rápida (Dots + Setinhas) */}
        <div className={styles.barraControlesMobile}>
          <button
            type="button"
            className={styles.botaoNavegacao}
            onClick={anteriorCard}
            disabled={indiceAtivo === 0}
            aria-label="Case anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <div className={styles.trilhoDots}>
            {CARDS_INICIAIS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={[styles.dotItem, i === indiceAtivo ? styles.dotAtivo : ""].filter(Boolean).join(" ")}
                onClick={() => selecionarCard(i)}
                aria-label={"Ir para o case " + (i + 1)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.botaoNavegacao}
            onClick={proximoCard}
            disabled={indiceAtivo === CARDS_INICIAIS.length - 1}
            aria-label="Próximo case"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
`,

  // 2. Estilos atualizados com suporte a controles, dica e transições
  'src/components/sections/Clientes/style.module.css': `.secaoClientes {
  padding: var(--espacamento-secao) 0;
  background: transparent;
  position: relative;
  z-index: 2;
  overflow-x: clip;
}

.cabecalhoSecao {
  text-align: center;
  margin-bottom: 20px;
}

.etiquetaSecao {
  color: var(--red);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.tituloSecao {
  font-size: clamp(1.3rem, 5vw, 2.6rem);
  font-weight: 900;
  color: var(--white);
  line-height: 1.18;
  margin-bottom: 8px;
}

.descricaoSecao {
  color: var(--gray-light);
  font-size: 0.84rem;
  line-height: 1.45;
  max-width: 660px;
  margin: 0 auto;
}

.dicaInteracao {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 12px;
  color: #ff6b6b;
  font-size: 0.74rem;
  font-weight: 700;
  animation: pulsarDica 2s ease-in-out infinite;
}

.iconeMaoDica {
  animation: balancarMao 1.5s ease-in-out infinite;
}

@keyframes pulsarDica {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes balancarMao {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-3px) rotate(-8deg); }
}

.palco3D {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 0 32px;
  position: relative;
  perspective: 1400px;
  overflow: visible;
}

.deckCentral {
  position: relative;
  width: 235px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cardLeque {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 235px;
  height: 350px;
  margin-top: -175px;
  margin-left: -117.5px;

  background: radial-gradient(130% 130% at 50% 10%, #152238 0%, #09101c 100%);
  border: 1px solid rgba(229, 40, 40, 0.45);
  border-radius: 20px;
  padding: 24px 14px 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.75),
              0 0 16px rgba(212, 32, 32, 0.12);

  transform-origin: 50% 100%;
  will-change: transform;
  backface-visibility: hidden;

  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  user-select: none;
  -webkit-user-select: none;
}

.cardDestaque {
  border-color: rgba(229, 40, 40, 0.95);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.9),
              0 0 26px rgba(212, 32, 32, 0.45);
  background: radial-gradient(130% 130% at 50% 10%, #1e304e 0%, #0a1322 100%);
}

.cardCTA {
  overflow: visible;
}

.glowAtras {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 170%;
  height: 170%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    ellipse at center,
    rgba(229, 40, 40, 0.32) 0%,
    rgba(229, 40, 40, 0.15) 30%,
    transparent 75%
  );
  filter: blur(26px);
  pointer-events: none;
  z-index: -1;
  animation: respirarGlow 4s ease-in-out infinite;
}

@keyframes respirarGlow {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.97);
  }
  50% {
    opacity: 0.85;
    transform: translate(-50%, -50%) scale(1.03);
  }
}

.ctaConteudo {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 24px 14px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
}

.ctaTitulo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin: 0;
  line-height: 1;
  width: 100%;
}

.linhaMascara {
  display: block;
  overflow: hidden;
  padding: 1px 0;
  line-height: 1.05;
}

.linhaTexto {
  display: block;
  font-size: 1.55rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.02em;
  line-height: 1.05;
  text-shadow: 0 0 16px rgba(229, 40, 40, 0.55);
  text-transform: uppercase;
}

.ctaSubtitulo {
  font-size: 0.72rem;
  color: #9ca3af;
  line-height: 1.35;
  margin: 2px 0;
  max-width: 90%;
}

.botaoWhatsApp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 4px;
  padding: 9px 14px;
  background: #25d366;
  color: #062b13;
  font-weight: 800;
  font-size: 0.76rem;
  border-radius: 8px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
}

.botaoWhatsApp svg {
  width: 15px;
  height: 15px;
}

.molduraCirculo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #0d1a2e;
  border: 2px solid rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.imagemLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nomeCliente {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--white);
  margin-bottom: 10px;
  line-height: 1.25;
}

.blocoMetricas {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-bottom: 14px;
}

.linhaMetrica {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.7rem;
}

.rotuloMetrica {
  color: var(--gray-light);
  font-weight: 600;
}

.valorMetrica {
  color: var(--white);
  font-weight: 800;
}

.badgeRoi,
.badgeRoiDestaque {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  border-radius: 6px;
  margin-top: auto;
}

.badgeRoi {
  background: rgba(212, 32, 32, 0.15);
  border: 1px solid rgba(212, 32, 32, 0.4);
  color: #ff4747;
  font-size: 0.8rem;
  padding: 6px 14px;
  min-width: 70px;
}

.badgeRoiDestaque {
  background: linear-gradient(135deg, rgba(212, 32, 32, 0.4), rgba(212, 32, 32, 0.18));
  border: 1px solid var(--red);
  color: var(--white);
  font-size: 0.85rem;
  padding: 6px 16px;
  min-width: 80px;
}

/* ============================================================
   BARRA DE NAVEGAÇÃO MOBILE (DOTS + SETINHAS)
   ============================================================ */
.barraControlesMobile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 10px;
}

.botaoNavegacao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--white);
  cursor: pointer;
  transition: all 0.2s ease;
}

.botaoNavegacao:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.trilhoDots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dotItem {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
}

.dotAtivo {
  background: var(--red);
  width: 22px;
  border-radius: 9999px;
  box-shadow: 0 0 10px var(--red);
}

@media (max-width: 767px) {
  .deckCentral {
    width: 158px;
    height: 250px;
  }

  .cardLeque {
    width: 158px;
    height: 250px;
    margin-top: -125px;
    margin-left: -79px;
    padding: 14px 8px 12px;
    border-radius: 14px;
  }

  .ctaConteudo {
    padding: 12px 6px 10px;
    gap: 8px;
  }

  .linhaTexto {
    font-size: 1.15rem;
  }

  .ctaSubtitulo {
    font-size: 0.62rem;
  }

  .botaoWhatsApp {
    font-size: 0.68rem;
    padding: 7px 10px;
    white-space: nowrap;
  }

  .molduraCirculo {
    width: 44px;
    height: 44px;
    margin-bottom: 8px;
  }

  .nomeCliente {
    font-size: 0.82rem;
    margin-bottom: 6px;
  }

  .linhaMetrica {
    font-size: 0.58rem;
    gap: 3px;
  }

  .badgeRoi,
  .badgeRoiDestaque {
    font-size: 0.68rem;
    padding: 3px 8px;
    min-width: 50px;
  }
}
`
};

let count = 0;
for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`[OK] Deck interativo atualizado em: ${relPath}`);
  count++;
}

console.log(`\nPronto! O leque agora pode ser tocado e folheado no mobile.`);