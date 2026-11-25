# Análise Completa do Repositório — Homem Macho

> Data da análise: 2026-11-25 · Repositório: `DavidEngGames/homem-macho` (público, 8 commits, ~9,6 MB, ~300 arquivos)
> Método: clone completo + leitura integral dos documentos de design, código de UI e manifesto de arte.

---

## 1. O que é o jogo

**Homem Macho** é um metroidvania de ação/plataforma 2D para navegador (React + Phaser 3 + TypeScript + Vite). O jogador é um soldado raso da **Vigília** — a última instituição que tenta manter ordem num mundo que "quebrou e continuou funcionando". Tom: **dark fantasy sério no mundo, humor de bravata no personagem** (Pilar P4). Classificação-alvo: 12 anos.

- **Campanha completa:** 16 setores conectados em serpentina, 4 atos (O Turno → A Ronda → A Falha → O Trono).
- **MVP:** recorte LVL-01 → LVL-03 (Ruínas da Vigília, Galeria Partida, Portão do Guardião).
- **Progressão:** 7 habilidades de acesso (`HAB-01` salto duplo → `HAB-07` planar), permanentes e que nunca caem na morte.
- **Inimigos:** `ENT-002` Sentinela (comum), `ENT-003` Guardião (chefe MVP), `ENT-004` Alferes, `ENT-005` Forjador, `ENT-006` Comandante, `ENT-007` Guardião Duplo, `ENT-008` Plantonista (final — vence-se por **baixa assinada**, não por HP).

## 2. Estrutura do repositório

| Pasta | Conteúdo |
|---|---|
| `core/` | Regras puras de gameplay (combate, movimento, bolsa, chefes) + testes Vitest |
| `game/` | Phaser: cenas, entidades, sistemas, dados (`palette.ts`, `arte.json`, 16 níveis) |
| `ui/` | React: menu, HUD, personagem, história, mapa, overlays |
| `services/` | Save, personagem, história, configurações |
| `docs/` | GDD (13 seções), `design-patterns/` (8 docs), `niveis/` (LVL-01–16), decisões e pendências |
| `agents-ia/` | 9 agentes de IA com prompts operacionais e templates |
| `ferramentas/` | Validador de medidas de arte, geradores de modelos, comparador de salto |
| `public/assets/` | `modelos/` (27 folhas com guias), `images/`, `tilemaps/` |

## 3. Direção de arte **já definida** (a base que não pode ser quebrada)

O projeto já possui uma bíblia visual madura em `docs/design-patterns/`. Resumo do que ela manda:

**Estilo (`01-estilo-e-identidade-visual.md`):**
- Frase de estilo: *"Cartoon 2D old school com gramática de mangá dramático, num mundo de fantasia sombria que se leva a sério — até não se levar."*
- **Não é pixel art.** Old school = animação limitada (8–12 fps com *holds*), sombra chapada de 2 tons, traço de tinta de 2–3 px, cor por camada.
- Prioridade: **(1) leitura** a 64 px → **(2) atitude** (pose dramática, bravata) → **(3) sucata** (ruína, ferrugem, osso).
- **10 anti-regras** com reprovação automática (copiar obra existente, gradiente suave em personagem, contorno no fundo, 2+ acentos por sala, texto em sprite, gore, asset sem licença…).
- **3 testes de leitura obrigatórios:** silhueta a 64 px em preto puro; contraste ≥ 3:1 sobre `#15131F` e `#464052`; um único acento saturado por sala.

**Paleta (`02-paleta-tipografia-e-ui.md`, implementada em `game/data/palette.ts`):**

| Token | Hex | Significado fixo |
|---|---|---|
| `--ink` | `#0B0910` | Contorno, V0 |
| `--bg` | `#15131F` | Fundo, V1 |
| `--mass` | `#2A2433` | Volume escuro, V2 |
| `--stone` | `#464052` | Pedra, V3 |
| `--bone` | `#E6DFD2` | Luz, destaque, V4 |
| `--threat` | `#D95555` | **Só** ameaça/dano |
| `--gold` | `#F2C66D` | **Só** progresso/recompensa |
| `--text` | `#F8F7F2` | UI |

Cada um dos 16 setores tem **um** acento (`PAL-01`…`PAL-16`). Escala de valores V0–V4 fixa. Referência visual aprovada: `docs/design-patterns/assets/prancha-de-estilo.png` (guerreiro de espada/escudo em ruínas roxas, vermelho só no escudo e nos olhos).

**Técnico (`05-arte-e-direcao-visual.md` + `game/data/arte.json`):**
- Resolução lógica 1280×720 · tiles 64×64 · herói 96×128 · chefes 192×192 · atlas ≤ 2048².
- Manifesto `arte.json` com **40+ peças** (`AST-001`…`AST-026`): spritesheets, tilesets, fundos parallax, quadros de introdução, 15 folhas de personalização do herói.
- `ferramentas/validar-arte.mjs` (`npm run arte`) mede cada PNG contra o manifesto.

## 4. Estado atual da arte — o que existe e o que falta

**Existe:**
- `public/assets/modelos/` — 27 folhas-placeholder com grelha, linha dos pés e eixo (esqueleto de trabalho, **não** arte final).
- `public/assets/images/` — as mesmas figuras sem guias (fallback de escala).
- `prancha-de-estilo.png` — prancha de direção aprovada como calibração de tom.

**NÃO existe nenhuma imagem comercial:**
- **Logo:** o menu declara explicitamente *"Sem marca, sem logo"* (`ui/components/MainMenu.tsx`). Não há identidade de marca.
- **Arte de abertura/menu:** `MainMenu.tsx` reserva a área inteira com a etiqueta `ARTE DE ABERTURA · RESERVADA (PARALLAX)` — vazia.
- **Cutscenes:** `ui/components/Historia.tsx` reserva área idêntica nos 5 quadros (`veu`, `queda`, `trevas`, `soldados`, `comeco`) — vazios. Os arquivos `bg_intro_*.png` estão no manifesto (`AST-011a–e`, 704×640) e pendentes.
- **Capas/key art:** nenhuma.
- **Fundos parallax:** `bg_abertura_1/2/3.png` (`AST-007a–c`) e `bg_setor.png` (`AST-008`) pendentes.

## 5. Pipeline de agentes existente

`agents-ia/` tem 9 agentes (`AGT-00` orquestrador → `AGT-08` guardião da documentação). O `AGT-01` Diretor de Arte **especifica e revisa** assets, mas **não há agente especializado em analisar deformações de imagens geradas por IA** nem em corrigi-las — essa é a lacuna que este trabalho fecha (AGT-09, AGT-10, AGT-11).

## 6. Lacunas e riscos identificados

1. **Sem identidade comercial** — logo, capa e materiais de divulgação não existem; o menu abre sem marca.
2. **Pipeline de arte com IA não travada** — o próprio doc (`01-estilo` §1.8) marca como `[PENDENTE]` e `[RISCO]`: ~120 frames de sprite sem pipeline = retrabalho garantido. A camada comercial precisa ser travada **antes** dos sprites.
3. **Sem QA de imagem gerada** — nenhuma verificação de deformação anatômica, deriva de estilo ou violação de paleta.
4. **Sem registro de licença** — anti-regra 10 exige autor/ferramenta/licença/data por asset; ainda não há `docs/arte/LICENCAS.md`.
5. **Risco de PI** — `RSK-07`: direitos de assets/IA e nome incertos; o guardrail de PI (nada "no estilo de" obra existente) precisa estar embutido em todo prompt.

## 7. Plano de trabalho da camada comercial (esta entrega)

| # | Entregável | Arquivo |
|---|---|---|
| 1 | Este relatório de análise | `00-analise-do-github.md` |
| 2 | **Design pattern comercial** — logo, capa, menu, cutscenes, paleta aplicada, fichas de asset | `docs/design-patterns/09-identidade-comercial.md` |
| 3 | **AGT-09** Analista de Deformações (detecta erros de IA) | `agents-ia/09-analista-de-deformacoes.md` |
| 4 | **AGT-10** Corretor de Imagens (corrige e regenera) | `agents-ia/10-corretor-de-imagens.md` |
| 5 | **AGT-11** Guardião de Consistência (identidade entre imagens) | `agents-ia/11-guardiao-de-consistencia.md` |
| 6 | Biblioteca de prompts mestres por tipo de asset | `docs/prompts/biblioteca-de-prompts.md` |
| 7 | Primeiras imagens: logo, capa, fundo de menu | `assets/{logo,capa,menu}/` |

**Ordem de produção recomendada:** logo → capa (key art) → menu (3 camadas) → 5 cutscenes → fichas `AST-###` comerciais → só então sprites/tilesets.
