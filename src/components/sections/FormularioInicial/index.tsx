"use client";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Check, ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import styles from "./style.module.css";

export default function FormularioInicial() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const conteudoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [segmento, setSegmento] = useState("");
  const [faturamento, setFaturamento] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            if (conteudoRef.current?.children) {
              animate(conteudoRef.current.children, {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(100),
                duration: 800,
                ease: "outQuad",
              });
            }

            if (formRef.current) {
              animate(formRef.current, {
                opacity: [0, 1],
                translateY: [32, 0],
                duration: 900,
                delay: 200,
                ease: "outQuad",
              });
            }

            observador.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    if (secaoRef.current) observador.observe(secaoRef.current);
    return () => observador.disconnect();
  }, []);

  const lidarComEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensagemErro("");

    try {
      // Inserção direta na tabela 'leads' conforme schema oficial
      const { error } = await supabase.from("leads").insert([
        {
          name: nome.trim(),
          company_name: empresa.trim(),
          phone: telefone.trim(),
          segment: segmento || "Não informado",
          revenue: faturamento || "Não informado",
        },
      ]);

      if (error) {
        throw error;
      }

      setSucesso(true);
      setNome("");
      setTelefone("");
      setEmpresa("");
      setSegmento("");
      setFaturamento("");
    } catch (err: any) {
      console.error("Erro ao salvar lead na tabela leads:", err);
      setMensagemErro("Ocorreu um erro ao enviar. Tente novamente ou chame no WhatsApp.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className={styles.secao} id="inicio" ref={secaoRef}>
      <div className="container">
        <div className={styles.gradePrincipal}>
          <div className={styles.colunaTextos} ref={conteudoRef}>
            <h1 className={styles.tituloDestaque}>
              FAZEMOS O SEU RESTAURANTE VENDER{" "}
              <span className={styles.textoVermelho}>R$ 15 A CADA R$ 1 INVESTIDO</span>{" "}
              EM TRÁFEGO PAGO
            </h1>
            <p className={styles.descricao}>
              Agende uma chamada gratuita e descubra como podemos transformar seu marketing em uma máquina de vendas e novos pedidos.
            </p>
            <ul className={styles.listaBeneficios}>
              <li className={styles.itemBeneficio}>
                <span className={styles.molduraIcone}><Check size={14} strokeWidth={3} /></span>
                <span>Marketing focado em VENDAS</span>
              </li>
              <li className={styles.itemBeneficio}>
                <span className={styles.molduraIcone}><Check size={14} strokeWidth={3} /></span>
                <span>Especialistas no ramo de food</span>
              </li>
            </ul>

            <a href="#clientes" className={styles.botaoResultados}>
              <span>Quero resultados como esse</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className={styles.colunaFormulario} ref={formRef}>
            {sucesso ? (
              <div className={styles.caixaSucesso}>
                <CheckCircle2 size={54} className={styles.iconeSucesso} />
                <h3 className={styles.tituloSucesso}>Solicitação Recebida!</h3>
                <p className={styles.textoSucesso}>
                  Em instantes um assessor executivo da GV5 entrará em contato pelo seu WhatsApp para dar início ao diagnóstico.
                </p>
                <button
                  type="button"
                  className={styles.botaoNovoEnvio}
                  onClick={() => setSucesso(false)}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className={styles.formulario} onSubmit={lidarComEnvio}>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className={styles.campoTexto}
                />
                <input
                  type="tel"
                  placeholder="(DDD) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                  className={styles.campoTexto}
                />
                <input
                  type="text"
                  placeholder="Nome do seu restaurante / delivery"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  required
                  className={styles.campoTexto}
                />
                <select
                  value={segmento}
                  onChange={(e) => setSegmento(e.target.value)}
                  className={styles.campoSelecao}
                  required
                >
                  <option value="" disabled>Selecionar segmento</option>
                  <option value="Restaurante Tradicional">Restaurante Tradicional</option>
                  <option value="Delivery / Dark Kitchen">Delivery / Dark Kitchen</option>
                  <option value="Hamburgueria / Pizzaria">Hamburgueria / Pizzaria</option>
                  <option value="Outro segmento de food">Outro segmento de food</option>
                </select>
                <select
                  value={faturamento}
                  onChange={(e) => setFaturamento(e.target.value)}
                  className={styles.campoSelecao}
                  required
                >
                  <option value="" disabled>Faturamento médio mensal</option>
                  <option value="Até R$ 30.000 / mês">Até R$ 30.000 / mês</option>
                  <option value="R$ 30.000 a R$ 80.000 / mês">R$ 30.000 a R$ 80.000 / mês</option>
                  <option value="R$ 80.000 a R$ 200.000 / mês">R$ 80.000 a R$ 200.000 / mês</option>
                  <option value="Acima de R$ 200.000 / mês">Acima de R$ 200.000 / mês</option>
                </select>

                {mensagemErro && (
                  <span className={styles.textoErro}>{mensagemErro}</span>
                )}

                <button
                  type="submit"
                  disabled={enviando}
                  className={styles.botaoSubmissao}
                >
                  {enviando ? (
                    <span className={styles.spinnnerBotao}>
                      <Loader2 size={20} className={styles.iconeGirando} />
                      Enviando...
                    </span>
                  ) : (
                    "Quero vender mais investindo menos"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
