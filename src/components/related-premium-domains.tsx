import { ExternalLink } from "lucide-react";

import { getOtherPremiumDomains } from "@/lib/site";

export function RelatedPremiumDomainsSection() {
  const domains = getOtherPremiumDomains();
  if (domains.length === 0) return null;

  return (
    <section
      id="outros-dominios"
      aria-labelledby="outros-dominios-heading"
      className="py-20 border-t border-border/40 bg-card/20"
    >
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <h2 id="outros-dominios-heading" className="font-serif text-3xl md:text-4xl text-foreground">
          Outros domínios premium à venda
        </h2>
        <p className="mt-3 text-muted-foreground text-lg">
          Estes sites também estão disponíveis para aquisição
        </p>
        <ul
          className="mt-10 flex flex-wrap justify-center gap-3 list-none p-0 m-0"
          aria-label="Portfólio de domínios"
        >
          {domains.map(({ url, label }) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2.5 text-sm text-foreground hover:border-gold/50 hover:text-primary transition"
              >
                {label}
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
