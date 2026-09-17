"use client";
import { useEffect, useRef } from "react";
import styles from "./style.module.css";

interface Particula {
  x: number;
  y: number;
  tamanho: number;
  velocidadeY: number;
  velocidadeX: number;
  opacidade: number;
  vida: number;
  vidaMaxima: number;
  cor: string;
  frequenciaOscilacao: number;
}

export default function Faiscas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animacaoId: number;
    let largura = (canvas.width = window.innerWidth);
    let altura = (canvas.height = window.innerHeight);

    const redimensionar = () => {
      largura = canvas.width = window.innerWidth;
      altura = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", redimensionar);

    const totalParticulas = window.innerWidth < 768 ? 36 : 64;
    const particulas: Particula[] = [];

    // Cores incandescentes de alta emissão (ouro, fogo e carmim)
    const paletaCores = [
      "rgba(255, 100, 20, ",
      "rgba(255, 180, 50, ",
      "rgba(255, 230, 130, ",
      "rgba(255, 45, 15, ",
      "rgba(225, 25, 25, ",
    ];

    const criarParticula = (iniciarEmbaixo: boolean = true): Particula => ({
      x: Math.random() * largura,
      y: iniciarEmbaixo ? altura + Math.random() * 40 : Math.random() * altura,
      tamanho: Math.random() * 2.2 + 1.0,
      velocidadeY: Math.random() * 2.0 + 1.1,
      velocidadeX: (Math.random() - 0.5) * 0.9,
      opacidade: Math.random() * 0.4 + 0.6,
      vida: 0,
      vidaMaxima: Math.random() * 240 + 160,
      cor: paletaCores[Math.floor(Math.random() * paletaCores.length)],
      frequenciaOscilacao: Math.random() * 0.035 + 0.015,
    });

    for (let i = 0; i < totalParticulas; i++) {
      particulas.push(criarParticula(false));
    }

    const animar = () => {
      ctx.clearRect(0, 0, largura, altura);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particulas.length; i++) {
        const p = particulas[i];

        p.y -= p.velocidadeY;
        p.x += p.velocidadeX + Math.sin(p.vida * p.frequenciaOscilacao) * 0.35;
        p.vida++;

        const progressoVida = p.vida / p.vidaMaxima;
        const fatorAlfa = Math.max(0, 1 - Math.pow(progressoVida, 1.4));
        const alfaFinal = (p.opacidade * fatorAlfa).toFixed(3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
        ctx.fillStyle = p.cor + alfaFinal + ")";

        // Halo de brilho vívido
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(255, 110, 30, 0.85)";
        ctx.fill();

        if (p.vida >= p.vidaMaxima || p.y < -30) {
          particulas[i] = criarParticula(true);
        }
      }

      ctx.globalCompositeOperation = "source-over";
      animacaoId = requestAnimationFrame(animar);
    };

    animar();

    return () => {
      cancelAnimationFrame(animacaoId);
      window.removeEventListener("resize", redimensionar);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasFaiscas} />;
}
