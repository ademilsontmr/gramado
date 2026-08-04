export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://cassinodegramado.com.br";

export const SITE_NAME = "Cassino de Gramado — Domínio Premium à Venda";

export const CONTACT_EMAIL = "contato@cassinodegramado.com.br";

export const FORM_URL = "https://forms.gle/aCxqHaa7pMHu83HH7";

/** Domínio principal do site (canônico) */
export const DOMAIN = "cassinodegramado.com.br";

/** Domínio à venda */
export const DOMAINS_FOR_SALE = ["cassinodegramado.com.br"] as const;

/** Sites irmãos do portfólio premium (cross-link) */
export const OTHER_PREMIUM_DOMAINS = [
  { url: "https://cassinodegramado.com.br/", label: "cassinodegramado.com.br" },
  { url: "https://cassinocamposdojordao.com.br/", label: "cassinocamposdojordao.com.br" },
  { url: "https://cassinocopacabana.com/", label: "cassinocopacabana.com" },
  { url: "https://cassinodesaopaulo.com.br/", label: "cassinodesaopaulo.com.br" },
  { url: "https://cassinodebrasilia.com.br/", label: "cassinodebrasilia.com.br" },
  { url: "https://cassinodesalinas.com.br/", label: "cassinodesalinas.com.br" },
  { url: "https://cassinobh.com.br/", label: "cassinobh.com.br" },
  { url: "https://cassinoportoalegre.com/", label: "cassinoportoalegre.com" },
] as const;

function normalizeHostname(host: string): string {
  return host.replace(/^www\./i, "").toLowerCase();
}

/** Domínios irmãos, excluindo o site atual */
export function getOtherPremiumDomains() {
  const currentHosts = new Set(
    [DOMAIN, ...DOMAINS_FOR_SALE, new URL(SITE_URL).hostname].map(normalizeHostname),
  );

  return OTHER_PREMIUM_DOMAINS.filter(({ label, url }) => {
    const hosts = [label, new URL(url).hostname].map(normalizeHostname);
    return !hosts.some((host) => currentHosts.has(host));
  });
}

/** Lista em português: "a, b e c" */
export function formatDomainsListPt(
  domains: readonly string[] = DOMAINS_FOR_SALE,
): string {
  if (domains.length === 0) return "";
  if (domains.length === 1) return domains[0];
  if (domains.length === 2) return `${domains[0]} e ${domains[1]}`;
  return `${domains.slice(0, -1).join(", ")} e ${domains[domains.length - 1]}`;
}

export const OG_IMAGE_PATH = "/og-image.png";

export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
