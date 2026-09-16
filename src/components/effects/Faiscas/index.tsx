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

    // Menos faíscas no mobile para máxima performance
    const totalParticulas = window.innerWidth < 768 ? 30 : 65;
    const particulas: Particula[] = [];
    const paletaCores = [
      "rgba(255, 69, 0, ",
      "rgba(212, 32, 32, ",
      "rgba(255, 140, 0, ",
      "rgba(255, 200, 50, ",
    ];

    const criarParticula = (): Particula => ({
      x: Math.random() * largura,
      y: altura + Math.random() * 40,
      tamanho: Math.random() * 2.2 + 0.8,
      velocidadeY: Math.random() * 1.8 + 0.9,
      velocidadeX: (Math.random() - 0.5) * 0.9,
      opacidade: Math.random() * 0.7 + 0.3,
      vida: 0,
      vidaMaxima: Math.random() * 180 + 100,
      cor: paletaCores[Math.floor(Math.random() * paletaCores.length)],
    });

    for (let i = 0; i < totalParticulas; i++) {
      const p = criarParticula();
      p.y = Math.random() * altura;
      particulas.push(p);
    }

    const animar = () => {
      ctx.clearRect(0, 0, largura, altura);

      for (let i = 0; i < particulas.length; i++) {
        const p = particulas[i];
        p.y -= p.velocidadeY;
        p.x += p.velocidadeX + Math.sin(p.vida * 0.04) * 0.35;
        p.vida++;

        const fatorVida = 1 - p.vida / p.vidaMaxima;
        const alfa = p.opacidade * Math.max(0, fatorVida);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
        ctx.fillStyle = p.cor + alfa + ")";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(212, 32, 32, 0.8)";
        ctx.fill();

        if (p.vida >= p.vidaMaxima || p.y < -20) {
          particulas[i] = criarParticula();
        }
      }

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
