# Biblioteca de Prompts — Homem Macho

> Prompts mestres para geração de imagens comerciais com IA. Todos obedecem à bíblia (`docs/design-patterns/01-estilo-e-identidade-visual.md`) e ao design pattern comercial (`09-identidade-comercial.md`). **Nunca** adicionar "no estilo de [autor/franquia]" — a inspiração é a gramática, nunca o desenho (`VIS-009`, `RSK-07`).

## Bloco de estilo (colar em todo prompt)

```
2D cartoon illustration, old-school limited animation style, dramatic manga action
grammar, visible ink outline 2-3px, flat two-tone cel shading, no gradients,
color-by-layer, dark fantasy ruins, serious atmosphere
```

## Bloco de paleta (colar em todo prompt)

```
color palette: deep ink black #0B0910, dark violet background #15131F, dark mass
#2A2433, stone grey #464052, bone white #E6DFD2, single saturated accent only
```

## Prompt negativo universal

```
no pixel art, no smooth gradients, no airbrush, no photorealism, no 3D render,
no outline on distant background, no text, no watermark, no logo, no extra limbs,
no deformed hands, no extra fingers, no gore, no blood spray, no sexual content,
no japanese onomatopoeia, no existing franchise character, no copyrighted design
```

---

## LOGO-001 — Sinete da Vigília (ícone)

```
Circular guard seal emblem, double ring, short vertical sword in the center,
four small tick marks around the inner ring representing duty shifts, hand-painted
on weathered stone, visible ink outline, flat two-tone cel shading, bone white
#E6DFD2 on deep ink black #0B0910 background, centered, symmetrical, game logo
icon, no text, no letters
```

## LOGO-002 — Wordmark HOMEM MACHO

```
Bold condensed heavy display lettering with chiseled cuts, the words "HOMEM MACHO"
in uppercase, bone white #E6DFD2 letters with gold #F2C66D inner chisel detail,
on deep ink black #0B0910 background, flat two-tone cel shading, no gradients,
video game title logo, centered, no other text
```

## CAPA-001 — Key art (arte-mãe 16:9)

```
[bloco de estilo] + [bloco de paleta] + dramatic key art: a burly veteran soldier
with sword and shield in a bold action pose, right third of frame, looking left,
tattered cloak, scarred armor, ruined stone gate and broken arch behind him,
distant citadel silhouette under a violet sky, single red accent on the shield,
top 20% of frame left dark and empty for title space, serious dark fantasy mood,
no humor, no text
```

## MENU-001/2/3 — Parallax de abertura (3 camadas)

**Camada 1 (fundo):**
```
[bloco de estilo] + [bloco de paleta] + distant background layer: violet night sky,
large pale moon, dark cloud silhouettes, far citadel silhouette, low saturation,
very low contrast, no outlines, empty center, parallax game background layer
```

**Camada 2 (meio):**
```
[bloco de estilo] + [bloco de paleta] + middle background layer: broken stone arch,
iron portcullis gate, torn banners, weathered stone architecture, low contrast,
no outlines, empty center, parallax game background layer
```

**Camada 3 (frente):**
```
[bloco de estilo] + [bloco de paleta] + foreground layer: rubble stones, hanging
chains, a single lit candle with small flame, painted guard seal on a wall,
a small soldier seen from behind walking away, full saturation, ink outlines,
empty center, parallax game background layer
```

## CUT-001…005 — Quadros da introdução (704×640)

**Regras comuns:** bottom third dark and low-contrast for text overlay, no faces in
close-up, silhouettes and scenery, one accent per frame, no text in image.

**CUT-001 (O VÉU):**
```
[bloco de estilo] + [bloco de paleta] + ancient battlefield, torn banners, border
silhouette on the horizon, colorless sky, bottom third dark, silhouette scenery,
no characters in close-up, no text
```

**CUT-002 (O VÉU ROMPEU):**
```
[bloco de estilo] + [bloco de paleta] + a rift of golden light tearing the violet
sky above a citadel, shadows pouring through, single gold accent, bottom third
dark, silhouette scenery, no text
```

**CUT-003 (O QUE SOBROU):**
```
[bloco de estilo] + [bloco de paleta] + ruined city in darkness, no sky, no harvest,
almost only deep ink black and dark mass, single muted red accent, bottom third
dark, silhouette scenery, no text
```

**CUT-004 (OS HOMENS MACHOS):**
```
[bloco de estilo] + [bloco de paleta] + a row of soldiers seen from behind, one
holding a sword, they are ordinary soldiers not chosen heroes, bone white rim
light, bottom third dark, silhouette scenery, no faces, no text
```

**CUT-005 (O COMEÇO):**
```
[bloco de estilo] + [bloco de paleta] + the gate of the Ruins of the Watch, a lit
candle, painted guard seal on the wall, dusty golden light, bottom third dark,
silhouette scenery, no text
```

---

## Como usar (pipeline)

1. Gerar com o prompt mestre do tipo de asset + blocos de estilo/paleta/negativo.
2. Enviar ao **AGT-09** (análise de deformações).
3. Se reprovada, enviar ao **AGT-10** (correção) com o relatório.
4. Lote aprovado → **AGT-11** (consistência) → **AGT-01** (ficha + licença).
5. Registrar autor, ferramenta, licença e data em `docs/arte/LICENCAS.md` (anti-regra 10).
