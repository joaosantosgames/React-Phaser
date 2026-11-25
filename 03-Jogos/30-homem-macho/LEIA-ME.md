# Pacote de Direção de Arte Comercial — Homem Macho

> Gerado em 2026-11-25. Estes arquivos são **novos** — nenhum documento existente do repositório foi alterado. O pacote fecha a lacuna da camada comercial (logo, capa, menu, cutscenes) e cria o pipeline de QA de imagens geradas por IA.

## Conteúdo do pacote

| Arquivo | O que é |
|---|---|
| `00-analise-do-github.md` | Análise completa do repositório: estrutura, direção de arte existente, estado atual da arte e lacunas |
| `docs/design-patterns/09-identidade-comercial.md` | **O design pattern comercial**: logo/sinete, key art/capa, arte de menu em parallax, 5 cutscenes, paleta aplicada e fichas de asset |
| `docs/prompts/biblioteca-de-prompts.md` | Prompts mestres para gerar cada asset comercial (logo, capa, menu, cutscenes) + prompt negativo universal |
| `agents-ia/09-analista-de-deformacoes.md` | **AGT-09** — detecta deformações e violações da bíblia em imagens geradas por IA |
| `agents-ia/10-corretor-de-imagens.md` | **AGT-10** — corrige imagens reprovadas com o mínimo de mudança |
| `agents-ia/11-guardiao-de-consistencia.md` | **AGT-11** — garante que todas as imagens pareçam do mesmo jogo |

## Como integrar no repositório `homem-macho`

Copie cada pasta para o lugar correspondente na raiz do repo:

```
homem-macho/
├── docs/
│   ├── design-patterns/
│   │   └── 09-identidade-comercial.md   → cole em docs/design-patterns/
│   └── prompts/
│       └── biblioteca-de-prompts.md     → cole em docs/prompts/ (pasta nova)
├── agents-ia/
│   ├── 09-analista-de-deformacoes.md    → cole em agents-ia/
│   ├── 10-corretor-de-imagens.md        → cole em agents-ia/
│   └── 11-guardiao-de-consistencia.md   → cole em agents-ia/
└── 00-analise-do-github.md              → cole na raiz (ou em docs/)
```

## Patches sugeridos

### Em `docs/design-patterns/README.md` (índice)

Adicione à tabela do índice:

```markdown
| 09 | [Identidade Comercial e Imagens de Divulgação](09-identidade-comercial.md) | Logo/sinete, capa, menu em parallax, cutscenes e paleta comercial | `LOGO-###`, `CAPA-###`, `MENU-###`, `CUT-###` |
```

### Em `agents-ia/README.md` (pipeline)

Adicione os três agentes ao pipeline, após o `AGT-01` Diretor de Arte:

```markdown
| `AGT-09` | Analista de Deformações | `09-analista-de-deformacoes.md` | QA de imagens geradas por IA (6 eixos + 3 testes) |
| `AGT-10` | Corretor de Imagens | `10-corretor-de-imagens.md` | Correção mínima a partir do relatório do AGT-09 |
| `AGT-11` | Guardião de Consistência | `11-guardiao-de-consistencia.md` | Coerência do lote (personagem, paleta, luz, lore, traço) |
```

### Para usar os agentes como *subagents* de ferramenta de código

```bash
mkdir -p .claude/agents && cp agents-ia/09-*.md agents-ia/10-*.md agents-ia/11-*.md .claude/agents/
```

## Pipeline de produção de imagens (resumo)

```
prompt (biblioteca) → geração → AGT-09 (análise de deformações)
  → AGT-10 (correção/regeneração) → AGT-11 (consistência entre imagens)
  → AGT-01 (aprovação final + ficha + licença)
```

Nenhum asset comercial entra no repo sem passar pelas 4 etapas. O registro de licença (autor, ferramenta, licença, data) é obrigatório pela anti-regra 10 — criar `docs/arte/LICENCAS.md` na primeira produção.

## Ordem de produção recomendada

1. **Logo** (`LOGO-001/002/003`) — trava a identidade
2. **Capa** (`CAPA-001`, arte-mãe 16:9)
3. **Menu** (`MENU-001/2/3`, parallax 1280×720)
4. **Cutscenes** (`CUT-001…005`, 704×640)
5. Só então: sprites e tilesets (`AST-001`…)

## Regra de ouro (da bíblia, vale para tudo)

> Prioridade: **(1) leitura** a 64 px → **(2) atitude** → **(3) sucata**. Se uma escolha melhora 2 e 3 mas piora 1, ela está errada. E nada "no estilo de" obra existente — a inspiração é a gramática, nunca o desenho.
