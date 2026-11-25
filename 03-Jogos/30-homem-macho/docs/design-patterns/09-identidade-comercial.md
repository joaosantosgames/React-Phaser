# 9. Identidade Comercial e Imagens de Divulgação

> [← Índice](README.md) · Status: **Rascunho** · Escopo: logo, capa/key art, arte de menu, cutscenes e aplicação da paleta em materiais comerciais.
> Este documento **estende** `01-estilo-e-identidade-visual.md` e `02-paleta-tipografia-e-ui.md` para a camada comercial. Nenhuma regra aqui contradiz os dois; em conflito, eles ganham.

> **Por que este documento existe:** o jogo já tem bíblia de arte *in-game*, mas **nenhuma identidade comercial** — o menu abre "sem marca, sem logo" e as áreas de arte de abertura e introdução estão reservadas e vazias. Esta camada é produzida **antes** de sprites e tilesets, porque é ela que trava o estilo para todo o resto.

---

## 9.1 Logo e identidade de marca (`LOGO-###`)

### 9.1.1 O nome

**HOMEM MACHO** — duas palavras, maiúsculas, sem acento. É um nome de bravata: soa como título de patente de patente, não como nome de herói escolhido. A identidade visual deve soar **oficial e um pouco ridícula ao mesmo tempo** — é o tom do jogo (`LOR-02`).

### 9.1.2 Wordmark

| Regra | Valor |
|---|---|
| Família | Display condensada, pesada, com talho (*chisel*) — o mesmo papel "Display" de `02-paleta` §2.3 |
| Caixa | Alta, espaçamento apertado, sem serifa decorativa |
| Cor primária | `--bone` `#E6DFD2` sobre `--ink`/`--bg` |
| Cor secundária | `--gold` `#F2C66D` no talho ou no contorno interno |
| Proibido | `--threat` no logo (vermelho = só ameaça, nunca marca); gradiente suave; fonte genérica arredondada; qualquer letra que imite logotipo de franquia |

### 9.1.3 O símbolo — Sinete da Vigília (`LOGO-001`)

O símbolo do jogo é o **sinete da Vigília** (`CEN-003`, `LOR-03a`): um selo circular de guarda, pintado ou gravado, que aparece em todos os setores. É o elemento que liga logo, cenário e lore.

- **Forma:** círculo duplo (anel externo + disco interno), com uma **espada curta vertical** no centro e **quatro marcas de turno** (traços) ao redor — a Vigília é uma instituição de *turno*, e o selo é um carimbo de posto.
- **Tratamento:** traço de tinta de 2–3 px (`VIS-003`), sombra chapada de 2 tons (`VIS-002`), **sem gradiente**.
- **Cores:** `--bone` sobre `--ink`; versão `--gold` para fundos claros e para o menu.
- **Teste obrigatório:** legível a **32 px** (ícone de aba/favicon) e em **preto puro** (silhueta, `VIS` §1.5).

### 9.1.4 Versões e usos

| Versão | Composição | Onde |
|---|---|---|
| Horizontal | Sinete à esquerda + HOMEM MACHO à direita | Menu principal, capa 16:9 |
| Empilhada | Sinete acima + HOMEM MACHO abaixo | Capas 4:5 / 1:1, redes sociais |
| Ícone | Só o sinete | Favicon, avatar, ícone de app |
| Monocromática | Tudo `--bone` ou tudo `--ink` | Documentos, impressão |

**Área de proteção:** altura do sinete em todos os lados. **Tamanho mínimo:** 24 px de altura para o ícone; 120 px de largura para o wordmark. **Nunca** colocar o logo sobre o acento de setor em mais de 15% da área (mesma regra de `02-paleta` §2.6).

### 9.1.5 Tagline (opcional, `[SUPOSIÇÃO]`)

> *"O único que apareceu."* — a frase de tese do jogo (`LOR-04`, Ato IV). Uso: capa, página de divulgação, trailer. Nunca dentro de sprite (`VIS` anti-regra 8).

---

## 9.2 Key art / capa (`CAPA-###`)

A capa é a **primeira impressão** e o teste público da direção de arte. Ela obedece às mesmas regras do jogo, com composição própria.

### 9.2.1 Composição obrigatória

| Elemento | Regra |
|---|---|
| Herói | Pose de atitude (`VIS-006`): linha de ação clara, espada em guarda, olhar para a esquerda. Ocupa o **terço direito**, da base ao topo. |
| Olhar | Para a **esquerda** (para onde o jogador avança). Nunca para a câmera. |
| Fundo | Ruínas da Vigília: arco partido, portão de ferro, silhueta de cidadela, céu roxo (`--bg`/`--mass`). **Sem contorno** no fundo distante (`VIS` anti-regra 2). |
| Acento único | **Um só** elemento saturado: `--threat` no escudo **ou** `--gold` na luz — nunca os dois (`VIS-004`). |
| Espaço do logo | **20% superior livre**, fundo escuro e sem detalhe, para o wordmark. |
| Humor | Zero na capa. A capa é 100% séria (`LOR-02`): o humor mora no personagem em movimento, não na key art. |

### 9.2.2 Formatos de entrega

| ID | Formato | Uso |
|---|---|---|
| `CAPA-001` | 1280×720 (16:9) | Menu, página do jogo, trailer |
| `CAPA-002` | 1080×1350 (4:5) | Redes sociais, loja |
| `CAPA-003` | 1080×1080 (1:1) | Avatar, thumbnail |
| `CAPA-004` | 630×1200 (vertical) | Pôster, banner |

Todas derivam da **mesma arte-mãe** em 16:9; as demais são recortes, nunca redesenhos (consistência, `AGT-11`).

### 9.2.3 Testes da capa

1. **Silhueta:** herói preenchido de preto puro a 64 px — identificável como o Homem Macho.
2. **Miniatura:** a 160 px de largura, ainda se lê herói + ruína + acento.
3. **Acento único:** dessaturar a imagem — só um elemento continua saturado.
4. **Logo:** o wordmark sobre a capa mantém contraste ≥ 4,5:1.

---

## 9.3 Arte de menu — abertura em parallax (`MENU-###`)

O `MainMenu.tsx` reserva a tela inteira para esta arte. São **3 camadas** (`AST-007a–c`), 1280×720 cada, com a regra de atmosfera de `02-paleta` §2.6:

| Camada | Arquivo | Saturação | Contraste | Contorno | Deslocamento | Conteúdo |
|---|---|---|---|---|---|---|
| Fundo | `bg_abertura_1.png` | 70% | muito baixo | não | 0,1× | Céu roxo, lua, silhueta da cidadela, nuvens de tinta |
| Meio | `bg_abertura_2.png` | 85% | baixo | não | 0,35× | Arco partido, portão de ferro, estandartes rasgados |
| Frente | `bg_abertura_3.png` | 100% | médio | sim | 1,0× | Pedras, correntes, vela acesa (`CEN-002`), sinete pintado (`CEN-003`) |

**Regras de composição do menu:**
- **Centro livre:** o terço central é escuro e sem detalhe — é onde ficam o logo e o texto "PRESSIONE QUALQUER BOTÃO".
- **Paleta:** `PAL-01` (dourado poeira `#F2C66D`) como único acento — é o setor de origem do jogador.
- **Sinais de ambientação obrigatórios** (`03-ambientacao` §3.7): sinete da Vigília (1) + vela acesa sem ninguém (2).
- **Sem texto na imagem** (`VIS` anti-regra 8) — o texto é do React.
- **Sem personagem em destaque:** o herói aparece pequeno, de costas, na camada da frente — ele está *entrando* no mundo, não posando. (A pose de atitude é da capa.)

---

## 9.4 Cutscenes — introdução (`CUT-###`)

Os 5 quadros de `services/historia.ts` (`UI-13`), arquivos `bg_intro_*.png` (`AST-011a–e`), **704×640** cada. O texto do React fica no terço inferior; a arte é ilustração estática com a mesma gramática (tinta, 2 tons, sem gradiente suave, sem texto na imagem).

| ID | Quadro | Beat da história | Cena |
|---|---|---|---|
| `CUT-001` | `veu` — O VÉU | A guerra já durava gerações | Campo de batalha antigo, estandartes rasgados, céu sem cor. Silhueta de fronteira ao fundo. |
| `CUT-002` | `queda` — O VÉU ROMPEU | Alguém rompeu a fronteira | Rasgo de luz no céu sobre a cidadela; sombras entrando por ele. O único quadro com `--gold` forte (a ruptura). |
| `CUT-003` | `trevas` — O QUE SOBROU | Trevas e devastação | Cidade em ruína, sem céu, sem colheita. A cena mais escura do jogo — quase só `--ink` e `--mass`. |
| `CUT-004` | `soldados` — OS HOMENS MACHOS | Soldados rasos, o que sobrou de pé | Fileira de soldados de costas, um deles com espada. O herói é **um entre muitos** — não é o escolhido. |
| `CUT-005` | `comeco` — O COMEÇO | Um soldado raso. É aqui que começa. | O portão das Ruínas da Vigília (`LVL-01`), vela acesa, sinete pintado. A primeira sala do jogo, vista de fora. |

**Regras comuns:**
- Terço inferior escuro e de baixo contraste (área do texto) — **nunca** o acento do quadro nessa faixa.
- Paleta: `--ink`/`--bg`/`--mass` dominam; **um** acento por quadro (`--gold` em `CUT-002`, `--threat` em `CUT-003`, `--bone` nos demais).
- Nenhum rosto em close — as cutscenes são de **silhueta e cenário** (o rosto do herói é construído no editor de personagem, `UI-12`).
- Consistência de luz: a mesma direção de luz nos 5 quadros (`AGT-11` verifica).

---

## 9.5 Paleta aplicada aos materiais comerciais

| Material | Paleta | Acento |
|---|---|---|
| Logo | `--bone` + `--gold` sobre `--ink` | `--gold` (sempre) |
| Capa | `PAL-00` completa | `--threat` **ou** `--gold` (um só) |
| Menu | `PAL-00` + `PAL-01` | `--gold` |
| Cutscenes | `PAL-00` | um por quadro (§9.4) |
| Divulgação por setor | `PAL-00` + `PAL-##` do setor | o acento do setor |

**Regra de contraste comercial:** todo texto sobre imagem atinge ≥ 4,5:1; todo elemento informativo ≥ 3:1. `PAL-16` (vinho, 2,04:1 sobre `--bg`) **nunca** carrega informação — vale para materiais comerciais também (`02-paleta` §2.2).

---

## 9.6 Fichas de asset comerciais

Todo asset comercial tem ficha em `docs/arte/fichas/` (mesmo formato do `AGT-01`), com: ID, dimensões, paleta em hex, ferramenta (incl. IA), licença, autor, data e resultado dos 3 testes. Lista inicial:

| ID | Asset | Dimensões | Prioridade |
|---|---|---|---|
| `LOGO-001` | Sinete da Vigília (ícone) | 1024×1024 + 32×32 | Must |
| `LOGO-002` | Wordmark HOMEM MACHO | 2048×512 | Must |
| `LOGO-003` | Lockup horizontal / empilhado | 2048×1024 / 1024×1024 | Must |
| `CAPA-001` | Key art 16:9 (arte-mãe) | 2560×1440 | Must |
| `MENU-001/2/3` | Parallax de abertura (3 camadas) | 1280×720 ×3 | Must |
| `CUT-001…005` | Quadros da introdução | 704×640 ×5 | Must |
| `CAPA-002/3/4` | Recortes da arte-mãe | ver §9.2.2 | Should |

**Pipeline obrigatória de produção com IA:**

```
prompt (biblioteca) → geração → AGT-09 (análise de deformações)
  → AGT-10 (correção/regeneração) → AGT-11 (consistência entre imagens)
  → AGT-01 (aprovação final + ficha + licença)
```

Nenhum asset comercial entra no repo sem passar pelas 4 etapas. O registro de licença é obrigatório (`VIS` anti-regra 10) — ver `docs/arte/LICENCAS.md` a criar.
