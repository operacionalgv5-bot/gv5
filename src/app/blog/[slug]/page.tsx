import { notFound } from "next/navigation";
import Link from "next/link";
import { buscarPostPorSlug } from "@/integrations/supabase/client";
import Cabecalho from "@/components/layout/Cabecalho";
import Rodape from "@/components/layout/Rodape";
import Faiscas from "@/components/effects/Faiscas";
import { Calendar, ArrowLeft, ArrowUpRight } from "lucide-react";
import styles from "./style.module.css";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await buscarPostPorSlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado | GV5 Assessoria",
    };
  }

  return {
    title: `${post.title} | GV5 Assessoria`,
    description: post.excerpt || "Leia mais na GV5 Assessoria.",
  };
}

export default async function ArtigoIndividualPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await buscarPostPorSlug(slug);

  if (!post) {
    notFound();
  }

  const dataFormatada = post.published_at
    ? new Date(post.published_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Data recente";

  return (
    <>
      <Faiscas />
      <Cabecalho />
      <main className={styles.paginaArtigo}>
        <div className="container">
          <Link href="/blog" className={styles.botaoVoltar}>
            <ArrowLeft size={16} />
            <span>Voltar para todas as publicações</span>
          </Link>

          <article className={styles.artigoCompleto}>
            <header className={styles.cabecalhoArtigo}>
              <div className={styles.metaSuperior}>
                <span className={styles.itemData}>
                  <Calendar size={14} />
                  <span>{dataFormatada}</span>
                </span>
                {post.category && (
                  <span className={styles.categoriaBadge}>{post.category}</span>
                )}
              </div>

              <h1 className={styles.tituloPrincipal}>{post.title}</h1>

              {post.excerpt && (
                <p className={styles.subtituloArtigo}>{post.excerpt}</p>
              )}
            </header>

            {post.cover_image && (
              <div className={styles.envolturaCapa}>
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className={styles.imagemCapa}
                />
              </div>
            )}

            {/* Renderização de Rich Text preservando links, imagens e formatação estruturada */}
            <div
              className={styles.conteudoRico}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA Final de Conversão do Artigo */}
            <div className={styles.caixaCtaConversao}>
              <div className={styles.textosCta}>
                <h3 className={styles.tituloCta}>
                  Pronto para transformar sua operação gastronômica?
                </h3>
                <p className={styles.descricaoCta}>
                  Agende agora um diagnóstico executivo gratuito com um assessor sênior da GV5 e descubra onde estão as alavancas ocultas de lucro do seu negócio.
                </p>
              </div>
              <a href="/#contato" className={styles.botaoAcaoCta}>
                <span>Solicitar Diagnóstico Comercial</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </article>
        </div>
      </main>
      <Rodape />
    </>
  );
}
