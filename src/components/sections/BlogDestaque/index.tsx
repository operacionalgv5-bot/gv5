"use client";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import Link from "next/link";
import { buscarPostsEmpresa, Post } from "@/integrations/supabase/client";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import styles from "./style.module.css";

export default function BlogDestaque() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const gradeRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarPostsEmpresa();
      if (dados && dados.length > 0) {
        setPosts(dados.slice(0, 3));
      }
    }
    carregar();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            if (gradeRef.current?.children) {
              animate(gradeRef.current.children, {
                opacity: [0, 1],
                translateY: [26, 0],
                delay: stagger(120),
                duration: 850,
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
  }, [posts]);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.secaoBlog} id="blog" ref={secaoRef}>
      <div className="container">
        <div className={styles.cabecalhoSecao}>
          <span className={styles.etiqueta}>Artigos Recentes</span>
          <div className={styles.blocoTituloAcao}>
            <h2 className={styles.tituloSecao}>
              Conteúdos para Acelerar seu Negócio
            </h2>
            <Link href="/blog" className={styles.linkVerTodos}>
              <span>Ver todas as publicações</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className={styles.gradePosts} ref={gradeRef}>
          {posts.map((post) => {
            const dataFormatada = post.published_at
              ? new Date(post.published_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })
              : "Recente";

            return (
              <article key={post.id} className={styles.cardDestaque}>
                {post.cover_image && (
                  <Link href={`/blog/${post.slug}`} className={styles.capaCard}>
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className={styles.imagemCapa}
                      loading="lazy"
                    />
                  </Link>
                )}
                <div className={styles.corpoCard}>
                  <div className={styles.dataCard}>
                    <Calendar size={13} />
                    <span>{dataFormatada}</span>
                  </div>
                  <h3 className={styles.tituloCard}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {post.excerpt && (
                    <p className={styles.resumoCard}>{post.excerpt}</p>
                  )}
                  <Link href={`/blog/${post.slug}`} className={styles.linkCard}>
                    <span>Ler artigo completo</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
