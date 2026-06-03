import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { RelatedPremiumDomainsSection } from "@/components/related-premium-domains";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getSortedBlogPosts } from "@/lib/blog-posts";
import { getBlogIndexHeadMeta } from "@/lib/seo";
import { FORM_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () => getBlogIndexHeadMeta(getSortedBlogPosts()),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const posts = getSortedBlogPosts();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Breadcrumbs
          items={[
            { label: "Início", to: "/" },
            { label: "Blog", current: true },
          ]}
        />

        <header className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Blog</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Cassino, emprego e regulação no Brasil
          </h1>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Artigos sobre a importância de <strong>cassinos regulados</strong> em{" "}
            <strong>Gramado</strong> e no Brasil — geração de emprego formal, renda municipal,
            moderação responsável, resorts integrados e turismo de qualidade na{" "}
            <strong>Serra Gaúcha</strong>.
          </p>
        </header>

        <section aria-label="Lista de artigos">
          <ul className="space-y-6 list-none p-0 m-0">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="rounded-xl border border-border bg-card/60 p-8 hover:border-gold/50 transition">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                    <time dateTime={post.date} className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.date + "T12:00:00").toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime} de leitura
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl mb-3">
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary transition">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <ul className="flex flex-wrap gap-2 mb-5" aria-label={`Tags: ${post.title}`}>
                    {post.keywords.slice(0, 4).map((kw) => (
                      <li key={kw}>
                        <span className="px-2 py-0.5 rounded-full border border-border text-xs">{kw}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all"
                  >
                    Ler artigo <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <aside className="mt-16 rounded-xl border border-gold/40 bg-card/60 p-8 text-center">
          <h2 className="font-serif text-2xl mb-3">Interessado no domínio?</h2>
          <p className="text-muted-foreground mb-6">
            O domínio <strong>cassinodegramado.com.br</strong> está à venda.
          </p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition"
          >
            Enviar Oferta
          </a>
        </aside>
      </main>
      <RelatedPremiumDomainsSection />
      <SiteFooter />
    </div>
  );
}
