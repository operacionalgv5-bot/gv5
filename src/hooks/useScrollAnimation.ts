"use client";
import { useEffect, useRef } from "react";
import { animate, stagger, cubicBezier } from "animejs";

interface OpcoesAnimacao {
  distanciaY?: number;
  atrasoStagger?: number;
  duracao?: number;
  escalaInicial?: number;
  triggerRatio?: number;
}

export function useScrollAnimation<T extends HTMLElement>(opcoes: OpcoesAnimacao = {}) {
  const elementoRef = useRef<T>(null);
  const animacaoAtiva = useRef<boolean>(false);
  const ticking = useRef<boolean>(false);

  const {
    distanciaY = 30,
    atrasoStagger = 130,
    duracao = 950,
    escalaInicial = 0.98,
    triggerRatio = 0.40,
  } = opcoes;

  useEffect(() => {
    const el = elementoRef.current;
    if (!el) return;

    const curvaSuave = cubicBezier(0.16, 1, 0.3, 1);
    const alvos = el.children.length > 0 ? Array.from(el.children) : [el];

    const aplicarInicial = () => {
      alvos.forEach((alvo) => {
        const node = alvo as HTMLElement;
        node.style.opacity = "0";
        node.style.transform = "translateY(" + distanciaY + "px) scale(" + escalaInicial + ")";
        node.style.willChange = "opacity, transform";
      });
    };
    aplicarInicial();

    const animar = () => {
      if (animacaoAtiva.current) return;
      animacaoAtiva.current = true;
      animate(alvos, {
        opacity: [0, 1],
        translateY: [distanciaY, 0],
        scale: [escalaInicial, 1],
        delay: stagger(atrasoStagger),
        duration: duracao,
        ease: curvaSuave,
      });
    };

    const resetar = () => {
      if (!animacaoAtiva.current) return;
      animacaoAtiva.current = false;
      aplicarInicial();
    };

    const checar = () => {
      ticking.current = false;
      const rect = el.getBoundingClientRect();
      const alturaTela = window.innerHeight;
      const entrou = rect.top < alturaTela * triggerRatio;
      const saiu = rect.bottom < 0 || rect.top > alturaTela;

      if (entrou && !animacaoAtiva.current) {
        animar();
      } else if (saiu && animacaoAtiva.current) {
        resetar();
      }
    };

    const agendar = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(checar);
    };

    checar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });

    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [distanciaY, atrasoStagger, duracao, escalaInicial, triggerRatio]);

  return elementoRef;
}
