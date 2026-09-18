"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./style.module.css";

export default function Cabecalho() {
  const [visivel, setVisivel] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // ------------------------------------------------------------
  // 1) MOUNT — decide estado inicial
  // ------------------------------------------------------------
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // DESKTOP: sempre visível
    // MOBILE: começa escondido (está no topo da página)
    setVisivel(!mobile);

    const aoRedimensionar = () => {
      const ehMobile = window.innerWidth < 768;
      setIsMobile(ehMobile);
      if (!ehMobile) setVisivel(true);
      else setVisivel(window.scrollY < 80 ? false : false);
    };

    window.addEventListener("resize", aoRedimensionar);
    return () => window.removeEventListener("resize", aoRedimensionar);
  }, []);

  // ------------------------------------------------------------
  // 2) SCROLL — mostra/esconde por POSIÇÃO (não por direção)
  // ------------------------------------------------------------
  useEffect(() => {
    const controlar = () => {
      const mobile = window.innerWidth < 768;
      const y = window.scrollY;

      // DESKTOP: sempre visível
      if (!mobile) {
        setVisivel(true);
        return;
      }

      // MOBILE:
      // - Se está perto do topo (y < 80): MOSTRA
      // - Se está longe do topo (y >= 80): ESCONDE
      if (y < 80) {
        setVisivel(true);
      } else {
        setVisivel(false);
        setMenuAberto(false);
      }
    };

    window.addEventListener("scroll", controlar, { passive: true });

    // Roda uma vez ao montar, garantindo estado correto
    controlar();

    return () => window.removeEventListener("scroll", controlar);
  }, []);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <div
      className={[
        styles.envolturaFixa,
        !visivel ? styles.escondido : "",
        isMobile ? styles.mobile : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className={styles.cabecalhoFlutuante}>
        <div className={styles.conteudoInterno}>
          <Link href="/" className={styles.logoArea} onClick={fecharMenu}>
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

            <button
              type="button"
              className={styles.botaoHamburguer}
              onClick={() => setMenuAberto((v) => !v)}
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            >
              {menuAberto ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuAberto && (
          <nav className={styles.menuMobile}>
            <Link href="/" className={styles.linkMenuMobile} onClick={fecharMenu}>Início</Link>
            <a href="/#clientes" className={styles.linkMenuMobile} onClick={fecharMenu}>Clientes</a>
            <a href="/#metodo" className={styles.linkMenuMobile} onClick={fecharMenu}>Método</a>
            <a href="/#servicos" className={styles.linkMenuMobile} onClick={fecharMenu}>Serviços</a>
            <a href="/#planos" className={styles.linkMenuMobile} onClick={fecharMenu}>Planos</a>
            <a href="/#sobre" className={styles.linkMenuMobile} onClick={fecharMenu}>Sobre</a>
            <Link href="/blog" className={styles.linkMenuMobile} onClick={fecharMenu}>Blog</Link>
            <a href="/#faq" className={styles.linkMenuMobile} onClick={fecharMenu}>FAQ</a>
            <a href="/#inicio" className={styles.botaoMenuMobile} onClick={fecharMenu}>
              <span>Fale conosco</span>
              <ArrowUpRight size={16} />
            </a>
          </nav>
        )}
      </header>
    </div>
  );
}
