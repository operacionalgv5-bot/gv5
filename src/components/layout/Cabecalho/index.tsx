"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./style.module.css";

export default function Cabecalho() {
  const [visivel, setVisivel] = useState(true);
  const ultimoScrollY = useRef(0);

  useEffect(() => {
    const controlarScroll = () => {
      const scrollAtual = window.scrollY;

      if (scrollAtual < 40) {
        setVisivel(true);
      } else if (scrollAtual > ultimoScrollY.current && scrollAtual > 120) {
        setVisivel(false);
      } else if (scrollAtual < ultimoScrollY.current) {
        setVisivel(true);
      }

      ultimoScrollY.current = scrollAtual;
    };

    window.addEventListener("scroll", controlarScroll, { passive: true });
    return () => window.removeEventListener("scroll", controlarScroll);
  }, []);

  return (
    <div className={[styles.envolturaFixa, !visivel ? styles.escondido : ""].filter(Boolean).join(" ")}>
      <header className={styles.cabecalhoFlutuante}>
        <div className={styles.conteudoInterno}>
          <Link href="/" className={styles.logoArea}>
            <Image
              src="/logo.png"
              alt="GV5 Assessoria"
              width={105}
              height={34}
              priority
              className={styles.imagemLogo}
            />
          </Link>

          <nav className={styles.navegacaoDesktop}>
            <Link href="/" className={styles.linkNavegacao}>Início</Link>
            <a href="/#clientes" className={styles.linkNavegacao}>Clientes</a>
            <a href="/#metodo" className={styles.linkNavegacao}>Método</a>
            <a href="/#servicos" className={styles.linkNavegacao}>Serviços</a>
            <Link href="/blog" className={styles.linkNavegacao}>Blog</Link>
            <a href="/#faq" className={styles.linkNavegacao}>FAQ</a>
          </nav>

          <div className={styles.areaAcao}>
            <a href="/#inicio" className={styles.botaoFaleConosco}>
              <span>Fale conosco</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
