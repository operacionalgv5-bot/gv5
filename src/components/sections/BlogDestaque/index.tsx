"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { buscarPostsEmpresa, Post } from "@/integrations/supabase/client";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

export default function BlogDestaque() {
  const [posts, setPosts] = useState<Post[]>([]);

  const gradeRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 26,
    atrasoStagger: 110,
    duracao: 950,
    triggerRatio: 0.40,
  });

  useEffect(() => {
    async function carregar() {
      const dados = await buscarPostsEmpresa();
      if (dados && dados.length > 0) {
        setPosts(dados.slice(0, 3));
      }
    }
    carregar();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className={styles.secaoBlog} id="blog">
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
              ? new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
              : "Recente";

            return (
              <article key={post.id} className={styles.cardDestaque}>
                {post.cover_image && (
                  <Link href={"/blog/" + post.slug} className={styles.capaCard}>
                    <img src={post.cover_image} alt={post.title} className={styles.imagemCapa} loading="lazy" />
                  </Link>
                )}
                <div className={styles.corpoCard}>
                  <div className={styles.dataCard}>
                    <Calendar size={12} />
                    <span>{dataFormatada}</span>
                  </div>
                  <h3 className={styles.tituloCard}>
                    <Link href={"/blog/" + post.slug}>{post.title}</Link>
                  </h3>
                  {post.excerpt && (<p className={styles.resumoCard}>{post.excerpt}</p>)}
                  <Link href={"/blog/" + post.slug} className={styles.linkCard}>
                    <span>Ler artigo</span>
                    <ArrowUpRight size={14} />
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
