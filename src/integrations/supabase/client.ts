import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://altqnqmdfezqfbudgajg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdHFucW1kZmV6cWZidWRnYWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0Mzc1OTcsImV4cCI6MjEwNDAxMzU5N30.CvlFbFtlMygUcm8byGA4tVD84CGCZR-9RCuLU3oXqZc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Post {
  id: string;
  company_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  published_at?: string;
  status: string;
  category?: string;
}

export async function buscarPostsEmpresa(): Promise<Post[]> {
  try {
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("id")
      .eq("slug", "gv5")
      .eq("status", "active")
      .single();

    if (companyError || !company) {
      console.warn("Empresa 'gv5' não encontrada ou inativa.");
      return [];
    }

    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .eq("company_id", company.id)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (postsError || !posts) {
      console.warn("Erro ao buscar posts:", postsError?.message);
      return [];
    }

    return posts as Post[];
  } catch (err) {
    console.error("Falha defensiva ao consultar o Supabase:", err);
    return [];
  }
}

export async function buscarPostPorSlug(slug: string): Promise<Post | null> {
  try {
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("id")
      .eq("slug", "gv5")
      .eq("status", "active")
      .single();

    if (companyError || !company) return null;

    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("*")
      .eq("company_id", company.id)
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (postError || !post) return null;

    return post as Post;
  } catch (err) {
    console.error("Falha defensiva ao buscar post por slug:", err);
    return null;
  }
}
