const fs = require('fs');
const path = require('path');

function criarArquivo(caminhoRelativo, conteudo) {
  const caminhoAbsoluto = path.join(process.cwd(), caminhoRelativo);
  const diretorio = path.dirname(caminhoAbsoluto);

  if (!fs.existsSync(diretorio)) {
    fs.mkdirSync(diretorio, { recursive: true });
  }

  fs.writeFileSync(caminhoAbsoluto, conteudo.trimStart(), 'utf-8');
  console.log(`[CORRIGIDO] ${caminhoRelativo}`);
}

// 1. useScrollAnimation.ts corrigido com import de cubicBezier oficial do Anime.js v4
criarArquivo('src/hooks/useScrollAnimation.ts', `
"use client";
import { useEffect, useRef } from "react";
import { animate, stagger, cubicBezier } from "animejs";

interface OpcoesAnimacao {
  distanciaY?: number;
  atrasoStagger?: number;
  duracao?: number;
  escalaInicial?: number;
  offsetThreshold?: number;
}

export function useScrollAnimation<T extends HTMLElement>(opcoes: OpcoesAnimacao = {}) {
  const elementoRef = useRef<T>(null);

  const {
    distanciaY = 32,
    atrasoStagger = 120,
    duracao = 1200,
    escalaInicial = 0.96,
    offsetThreshold = 0.08,
  } = opcoes;

  useEffect(() => {
    const el = elementoRef.current;
    if (!el) return;

    // Curva cúbica oficial da v4 via função
    const curvaSuave = cubicBezier(0.22, 1, 0.36, 1);

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            const alvos = el.children.length > 0 ? el.children : el;

            animate(alvos, {
              opacity: [0, 1],
              translateY: [distanciaY, 0],
              scale: [escalaInicial, 1],
              delay: stagger(atrasoStagger),
              duration: duracao,
              ease: curvaSuave,
            });

            observador.disconnect();
          }
        });
      },
      { threshold: offsetThreshold }
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, [distanciaY, atrasoStagger, duracao, escalaInicial, offsetThreshold]);

  return elementoRef;
}
`);

console.log("\n[OK] Erro de cubicBezier corrigido e elementos restaurados na tela!");