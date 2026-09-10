<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CLAUDE.md

Questo file fornisce contesto a Claude Code (e a Claude in generale) ogni volta che lavora su questo progetto. Va tenuto aggiornato man mano che il progetto evolve.

## Panoramica del progetto

Sito portfolio per agenzia di comunicazione. Obiettivo: front-end elegante, moderno, veloce, a livello da poter essere candidato su piattaforme come Awwwards. Architettura headless.

## Stack tecnico

- **Frontend**: React.js + Next.js (App Router)
- **Backend/CMS**: Payload CMS (integrato nativamente dentro il progetto Next.js, non come servizio separato)
- **Database**: PostgreSQL via Neon (adapter `@payloadcms/db-postgres`)
- **Styling**: Tailwind CSS (utility-first). Evitare Bootstrap o altri framework CSS a componenti predefiniti.
- **Animazioni**: GSAP + custom JS, con `@gsap/react` (hook `useGSAP`) per la gestione del cleanup
- **Deploy**: GitHub → Vercel (collegati, deploy automatico)
- **Design**: Figma, collegato a Claude Code via MCP

## Convenzioni Git / Branch

- `main` = produzione. **Non fare mai push diretto su main.**
- `dev` = sviluppo. Tutte le feature partono da qui.
- Naming branch: `feature/nome-sezione` (es. `feature/pagina-storie`), `fix/nome-bug`
- Ogni modifica passa da una Pull Request prima di essere unita
- Commit chiari e in italiano o inglese, coerenti nello stile (es. `feat: aggiunge template singola storia`, `fix: corregge z-index header mobile`)

## Struttura cartelle Frontend

```
app/
  (site)/
    page.tsx                    → Home
    storie/
      page.tsx                  → Pagina Storie (archivio)
      [slug]/page.tsx           → Singola storia (template dinamico)
    soluzioni/
      page.tsx                  → Pagina Soluzioni (archivio, diviso per categoria)
      [slug]/page.tsx           → Singola soluzione (template dinamico)
    faq/page.tsx                → Pagina FAQ (divisa per categoria)
    news/
      page.tsx                  → Pagina News (archivio, diviso per categoria)
      [slug]/page.tsx           → Singola news
    [slug]/page.tsx             → Pagine statiche/landing generiche
lib/
  payload/                      → client fetch, tipizzazione dati Payload
  templates/                    → registry dei template (mapping campo "template" → componente)
components/
  animations/                   → wrapper GSAP riutilizzabili
  ui/                            → componenti base (bottoni, card, nav, footer)
```

## Struttura contenuti Payload (Collections)

- **Pages**: pagine statiche. Campo `pageTemplate` (select) per scegliere il template da usare in front-end. Include gruppo `seo`.
- **Landing Pages**: come Pages ma con `pageTemplate` dedicato a layout più flessibili/campagna. Include gruppo `seo`.
- **Stories** (Storie/Portfolio): relazione a Taxonomy **Story Categories**. Include `template`, `seo`.
- **Solutions** (Soluzioni): relazione a Taxonomy **Solution Macro-Categories** (es. "Design" → post "Logo Design", "Visual Identity"). Include `template`, `seo`.
- **FAQ**: relazione a Taxonomy **FAQ Categories** (es. macrocategoria "FAQ su Cr3ative Consulting"). Campo `order` per ordinamento manuale.
- **News**: relazione a Taxonomy **News Categories** (es. "Premi"). Include `seo`.
- Ogni Taxonomy (Story Categories, Solution Macro-Categories, FAQ Categories, News Categories) è una Collection separata con `title`, `slug`, `description`.
- Le pagine archivio (Pagina Storie, Pagina Soluzioni, Pagina FAQ, Pagina News) sono **Globals** in Payload: contengono solo i contenuti editoriali "di contorno" (hero, intro), mentre il listato dei post viene interrogato lato Next.js filtrando per categoria.

## Sistema Template

- Ogni Page/Story/Solution ha un campo `template` (select) in Payload
- In Next.js, un **template registry** (`lib/templates/`) mappa la stringa del template al componente React corrispondente
- Per aggiungere un nuovo template: creare il componente in `lib/templates/`, registrarlo nel mapping, aggiungere l'opzione nel campo select di Payload

## SEO

- Tutte le Collection principali (Pages, Landing Pages, Stories, Solutions, FAQ, News) hanno un gruppo `seo` riutilizzabile: `metaTitle`, `metaDescription`, `metaImage`, `canonicalUrl`, `noIndex`, `ogTitle`, `ogDescription`, `ogImage`
- Il gruppo va definito come funzione condivisa (es. `seoFields()`) e importato in ogni Collection, per evitare duplicazione
- In Next.js, questi campi alimentano `generateMetadata()` per ogni pagina

## Animazioni GSAP — regole

- Usare sempre `useGSAP` (da `@gsap/react`) per garantire il cleanup automatico dei trigger, specialmente con `ScrollTrigger`, per evitare memory leak nelle transizioni tra pagine dell'App Router
- Animare preferibilmente `transform` e `opacity` (performance), evitare animazioni pesanti su proprietà che causano reflow
- Rispettare sempre `prefers-reduced-motion`
- Le page transition vanno gestite con attenzione al ciclo di vita dei componenti Next.js (cleanup dei trigger al cambio route)

## Revalidation

- Usare ISR + revalidation on-demand: hook `afterChange` in Payload che chiama una API route Next.js per invalidare la cache (`revalidatePath`) al publish di un contenuto
- Non affidarsi a rebuild completi per ogni modifica contenuti

## Cosa NON fare

- Non usare Bootstrap o altri framework CSS a componenti predefiniti
- Non hardcodare colori/spacing nei componenti: usare sempre le variabili Tailwind allineate ai design token di Figma
- Non generare intere pagine in un solo passaggio: costruire sezione per sezione, verificando ogni componente prima di procedere
- Non usare `localStorage`/`sessionStorage` in eventuali componenti interattivi lato client destinati a demo o artifact
- Non pushare mai direttamente su `main`

## Riferimenti design

- Palette colori, tipografia e spacing system: vedi file Figma del progetto (sezione "Design Tokens")
- I componenti Figma sono nominati in modo semantico (es. `Button/Primary`) e usano Auto Layout — Claude Code può leggerli via MCP per generare il codice corrispondente con fedeltà

## Scope attuale del progetto

**In produzione ora**: Pages statiche, Storie, Soluzioni, FAQ, template registry, SEO base, animazioni GSAP.
**Rimandato a fase successiva**: News, template Landing Page dedicato, audit approfondito performance/accessibilità.

Aggiornare questa sezione man mano che lo scope evolve.

