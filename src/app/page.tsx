import Cabecalho from "@/components/layout/Cabecalho";
import Rodape from "@/components/layout/Rodape";
import Faiscas from "@/components/effects/Faiscas";
import FormularioInicial from "@/components/sections/FormularioInicial";
import Hero from "@/components/sections/Hero";
import Clientes from "@/components/sections/Clientes";
import QuemSomos from "@/components/sections/QuemSomos";
import Metodo from "@/components/sections/Metodo";
import Servicos from "@/components/sections/Servicos";
import Planos from "@/components/sections/Planos";
import TimeExclusivo from "@/components/sections/TimeExclusivo";
import BlogDestaque from "@/components/sections/BlogDestaque";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Faiscas />
      <Cabecalho />
      <main>
        <FormularioInicial />
        <Hero />
        <Clientes />
        <QuemSomos />
        <Metodo />
        <Servicos />
        <Planos />
        <TimeExclusivo />
        <BlogDestaque />
        <Faq />
      </main>
      <Rodape />
    </>
  );
}
