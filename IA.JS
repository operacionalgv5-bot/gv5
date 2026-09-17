const fs = require('fs');
const path = require('path');

const files = {
  // 1. Atualização do Cabeçalho com link direto para o Blog
  'src/components/layout/Cabecalho/index.tsx': `"use client";
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
`,

  // 2. CSS com espaçamento homogêneo entre todos os itens da barra
  'src/components/layout/Cabecalho/style.module.css': `.envolturaFixa {
  position: fixed;
  top: 8px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 990;
  pointer-events: none;
  padding: 0 10px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  transform: translateY(0);
  opacity: 1;
}

.escondido {
  transform: translateY(-130%);
  opacity: 0;
}

.cabecalhoFlutuante {
  pointer-events: auto;
  width: 100%;
  max-width: 1140px;
  background: rgba(10, 18, 30, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  padding: 8px 16px;
  box-shadow: 
    0 14px 30px -8px rgba(0, 0, 0, 0.7),
    0 0 1px 1px rgba(255, 255, 255, 0.06) inset;
}

.conteudoInterno {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}

.logoArea {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.imagemLogo {
  height: 28px;
  width: auto;
  object-fit: contain;
}

.navegacaoDesktop {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 28px;
}

.linkNavegacao {
  color: var(--gray-light);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.linkNavegacao:hover {
  color: var(--white);
}

.areaAcao {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.botaoFaleConosco {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #e52828, #b01818);
  color: var(--white);
  padding: 7px 15px;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 800;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
  min-height: 36px;
  box-shadow: 0 4px 14px rgba(212, 32, 32, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.botaoFaleConosco:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(212, 32, 32, 0.5);
}

@media (min-width: 768px) {
  .envolturaFixa {
    top: 18px;
    padding: 0 24px;
  }
  .cabecalhoFlutuante {
    padding: 10px 24px;
  }
  .imagemLogo {
    height: 38px;
  }
  .navegacaoDesktop {
    display: flex;
  }
  .botaoFaleConosco {
    padding: 9px 20px;
    font-size: 0.8rem;
    min-height: 40px;
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
  console.log(`[OK] Cabeçalho atualizado com Blog: ${relPath}`);
  count++;
}

console.log(`\nPronto! Link do Blog integrado ao cabeçalho com espaçamento padronizado.`);