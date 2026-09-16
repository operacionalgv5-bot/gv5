"use client";
import { useState } from "react";
import { Check, ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./style.module.css";

export default function FormularioInicial() {
  const containerRef = useScrollAnimation<HTMLDivElement>({
    distanciaY: 40,
    atrasoStagger: 150,
    duracao: 1400,
  });

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [segmento, setSegmento] = useState("");
  const [faturamento, setFaturamento] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const lidarComEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensagemErro("");

    try {
      const { error } = await supabase.from("leads").insert([
        {
          name: nome.trim(),
          company_name: empresa.trim(),
          phone: telefone.trim(),
          segment: segmento || "Não informado",
          revenue: faturamento || "Não informado",
        },
      ]);

      if (error) throw error;

      setSucesso(true);
      setNome("");
      setTelefone("");
      setEmpresa("");
      setSegmento("");
      setFaturamento("");
    } catch (err: any) {
      console.error("Erro ao salvar lead:", err);
      setMensagemErro("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className={styles.secao} id="inicio">
      <div className="container">
        <div className={styles.gradePrincipal} ref={containerRef}>
          <div className={styles.colunaTextos}>
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

          <div className={styles.colunaFormulario}>
            {sucesso ? (
              <div className={styles.caixaSucesso}>
                <CheckCircle2 size={54} className={styles.iconeSucesso} />
                <h3 className={styles.tituloSucesso}>Solicitação Recebida!</h3>
                <p className={styles.textoSucesso}>
                  Em instantes um assessor executivo da GV5 entrará em contato pelo seu WhatsApp.
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
