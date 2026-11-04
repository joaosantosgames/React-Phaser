# GDD — Fortaleza Horizonte

> **Documento de trabalho · v0.1 · Discovery parcial**  
> **Estado:** não é o GDD completo. Reúne as decisões coletadas e um Game Brief preliminar para retomada.  
> **Fluxo:** Phase 2 exige validação explícita do Game Brief antes de redigir o GDD completo.  
> **Idioma:** Português (Brasil) · **Modelo de referência:** GDD-MODEL-IA v1.0.0

## Nota sobre o nome

O nome informado no histórico foi **“Fortaleza Horizante”**, para uso como codinome enquanto se busca um título comercial diferente. O nome de arquivo solicitado agora foi **`GDD-FortalezaHorizonte`** (com “o”). Mantive esse nome de arquivo, mas a grafia oficial do codinome permanece **pendente de confirmação**. O título comercial também permanece pendente; a avaliação anterior apontou risco marcário e de descoberta para uso comercial do codinome.

## Estado do processo

- **Fase 0/8 — Enquadramento:** concluída. Perfil avançado; modo guiado.
- **Fase 1/8 — Discovery:** parcial. Blocos A e D coletados; Bloco C coletado; Bloco B parcialmente resolvido; Bloco E iniciado, mas incompleto; Bloco F ainda não iniciado.
- **Fase 2/8 — Game Brief:** este documento contém uma síntese preliminar, **ainda não aprovada**.
- **Fases 3–8:** não iniciadas. Não redigir o GDD completo até aprovação explícita do Game Brief.

### Legenda de confiança

- **[CONFIRMADO]** informado ou escolhido diretamente pelo usuário.
- **[SUPOSIÇÃO]** sugestão ainda não aceita; não deve ser tratada como requisito.
- **[PENDENTE]** informação necessária ainda não fornecida ou decisão a validar.

---

# Game Brief preliminar — para validação na retomada

## Conceito

**[CONFIRMADO]** Jogo de corrida arcade 2D com combate veicular, em que um piloto profissional de carros esportivos compete pelo primeiro lugar para honrar o nome da família. O diferencial de gameplay é combinar corrida, drift, nitro e investida lateral para desestabilizar rivais, fazê-los capotar e/ou tirá-los da pista. A apresentação desejada combina gameplay em pixel art nostálgico com cenas narrativas em estilo história em quadrinhos.

## Experiência pretendida

- **[CONFIRMADO]** Tom nostálgico e divertido.
- **[CONFIRMADO]** Vitória de corrida exige terminar em primeiro lugar, inclusive contra chefes.
- **[CONFIRMADO]** O jogador recebe respawn rápido ao capotar ou sair da pista.
- **[CONFIRMADO]** Rivais controlados por IA no modo single-player.
- **[PENDENTE]** Público-alvo, faixa etária/classificação indicativa, duração e estrutura da campanha.

## Plataforma e tecnologia

- **[CONFIRMADO]** Web Desktop, orientação paisagem 16:9.
- **[CONFIRMADO]** Controle principal por teclado, com WASD para dirigir.
- **[CONFIRMADO]** Stack pretendida: React + Phaser; sem bibliotecas adicionais escolhidas para estado/estilização.
- **[PENDENTE]** Versões e ferramentas de build: TypeScript strict e Vite constam no escopo de referência do projeto, mas precisam de validação explícita como decisões técnicas.
- **[CONFIRMADO]** O jogo deve funcionar online e ter salvamento em nuvem.
- **[PENDENTE]** Provedor de backend/autenticação, estratégia de sincronização e funcionamento quando a conexão cair. Não foi escolhido Supabase, Firebase ou outro serviço.
- **[CONFIRMADO]** Single-player contra IA; multiplayer PvP não faz parte do escopo confirmado.

## Loop e sistemas confirmados

1. Escolher corrida/carro e entrar na pista.
2. Acelerar e controlar o veículo com WASD; usar drift, nitro e investida lateral.
3. Disputar posições, evitar obstáculos e atacar rivais.
4. Reduzir a estabilidade dos rivais até provocar takedown/capotagem.
5. Buscar o primeiro lugar; receber dinheiro e reputação por colocação e bônus por takedown.
6. Usar dinheiro e reputação para comprar carros e upgrades, sujeitos também a travas de progresso narrativo.
7. Avançar na história e enfrentar chefes em corridas; vencer exige chegar em primeiro.

- **[CONFIRMADO]** Existe barra de estabilidade/dano para os rivais.
- **[CONFIRMADO]** Há obstáculos nas pistas.
- **[CONFIRMADO]** A dificuldade será selecionável.
- **[PENDENTE]** Quantidade e nomes de níveis de dificuldade, elenco de carros, lista de upgrades, valores da economia e regras exatas de respawn/takedown.
- **[PENDENTE]** Mapeamento de teclas para drift e nitro. A tecla Espaço foi indicada para a investida lateral; combinação/direção e possibilidade de remapeamento precisam ser definidas.

## Narrativa e direção audiovisual

- **[CONFIRMADO]** Premissa: piloto profissional de carros esportivos quer conquistar o primeiro lugar para honrar o nome da família.
- **[CONFIRMADO]** Nome de família iniciado pelo usuário como “Victo...”; mensagem interrompida. Grafia e história familiar estão **pendentes**.
- **[CONFIRMADO]** Pixel art no gameplay e cutscenes em estilo HQ.
- **[PENDENTE]** Resolução-base, paleta, design dos personagens e carros, trilha, efeitos sonoros, presença de dublagem e origem/licença dos assets.
- **[PENDENTE]** Número de capítulos e chefes, passado da família, antagonistas e arco narrativo.

## Monetização

- **[CONFIRMADO]** O jogo será gratuito.
- **[PENDENTE]** Se “gratuito” significa sem anúncios/compras/donativos, ou se algum apoio voluntário opcional poderá ser oferecido. Não há monetização paga confirmada.

## Pilares de design propostos — aguardam confirmação

1. **Velocidade de Contato** — corrida arcade e combate veicular legível, responsivo e divertido.
2. **Fusão Pixel + HQ** — gameplay em pixel art e narrativa em linguagem de quadrinhos.
3. **Legado em Jogo** — rivalidade, reputação e progressão conectadas à honra da família.

**[PENDENTE]** Confirmar, editar ou substituir estes três pilares.

## Escopo ainda não fechado

**[PENDENTE]** O usuário ainda não confirmou o objetivo do projeto (portfólio, hobby, game jam ou lançamento), público-alvo, classificação indicativa, dimensão do MVP, quantidade de pistas/corridas/carros, plano de produção, equipe/prazos, requisitos de acessibilidade, interface, estratégia de testes e lançamento.

## Decisões e questões para a próxima sessão

1. Confirmar se o codinome é **Fortaleza Horizante** ou **Fortaleza Horizonte**; manter o título comercial como uma decisão futura.
2. Confirmar/ajustar os pilares de design.
3. Completar Bloco B: objetivo do projeto, público-alvo e classificação indicativa. Monetização gratuita já confirmada.
4. Completar Bloco E: nome e história da família, capítulos/chefes, especificação visual e áudio, origem dos assets.
5. Fazer Bloco F: escopo de MVP, conteúdo, equipe, prazo, riscos e critérios de sucesso.
6. Validar o Game Brief explicitamente. Só depois da aprovação seguir para ADRs técnicos e GDD completo.

---

# Registro de Discovery

## Bloco A — Visão e conceito

| Campo | Estado | Registro |
|---|---|---|
| Premissa | Confirmado | Piloto profissional de carros esportivos compete pelo primeiro lugar para honrar o nome da família. |
| Gênero | Confirmado | Corrida arcade 2D com combate veicular. |
| Diferencial | Confirmado | Drift, nitro, investida lateral, takedowns por capotagem/saída de pista e rivalidade narrativa. |
| Tom e arte | Confirmado | Nostálgico e divertido; pixel art no gameplay e cutscenes em estilo HQ. |
| Codinome | Pendente | “Fortaleza Horizante” foi proposto como codinome; o arquivo solicitado usa “FortalezaHorizonte”. Grafia a confirmar. |
| Pilares | Pendente | Velocidade de Contato; Fusão Pixel + HQ; Legado em Jogo. |

## Bloco B — Público e mercado

| Campo | Estado | Registro |
|---|---|---|
| Monetização | Confirmado | Gratuito. |
| Objetivo do projeto | Pendente | Não confirmado. |
| Público-alvo | Pendente | Sugestão anterior de fãs de corrida arcade/retrô, 16–35 anos, não aceita pelo usuário. |
| Classificação indicativa | Pendente | Sugestão anterior de 12 anos, não aceita pelo usuário. |
| Título comercial | Pendente | Será escolhido posteriormente; codinome não deve ser tratado como marca comercial aprovada. |

## Bloco C — Plataforma e técnica

| Campo | Estado | Registro |
|---|---|---|
| Plataforma | Confirmado | Web Desktop. |
| Orientação | Confirmado | Paisagem, proporção 16:9. |
| Controles | Confirmado | Teclado; WASD controla o carro. |
| Combate | Confirmado | Single-player contra IAs. |
| Cloud save | Confirmado | Salvamento em nuvem requerido. Serviço/protocolo pendentes. |
| Stack | Confirmado | React + Phaser; sem bibliotecas adicionais escolhidas. |
| Tecnologias de suporte | Pendente | TypeScript strict e Vite constam no escopo padrão de referência, mas devem ser validados na fase técnica. |

## Bloco D — Gameplay

| Campo | Estado | Registro |
|---|---|---|
| Câmera | Confirmado | Opção A: vista traseira pseudo-3D. |
| Drift e nitro | Confirmado | Ambos presentes. |
| Investida lateral | Confirmado | Presente; Espaço indicado para acioná-la. Detalhes de direção/combinação pendentes. |
| Estabilidade dos rivais | Confirmado | Barra de estabilidade/dano. |
| Condição de vitória | Confirmado | 1º lugar obrigatório, inclusive em corridas contra chefes. |
| Recuperação do jogador | Confirmado | Respawn rápido. Penalidades e invulnerabilidade não definidas. |
| Recompensas | Confirmado | Dinheiro/reputação pela posição e bônus por takedown. |
| Garagem/progressão | Confirmado | Compra de carros e upgrades com dinheiro e reputação; alguns itens bloqueados até avançar na história. |
| Obstáculos | Confirmado | As pistas terão obstáculos. Tipos e frequência pendentes. |
| Chefes | Confirmado | Haverá chefes; vitória exige ganhar a corrida em primeiro lugar. |
| Dificuldade | Confirmado | Selecionável; níveis e efeitos pendentes. |

## Bloco E — Narrativa, arte e áudio

| Campo | Estado | Registro |
|---|---|---|
| Família | Pendente | Usuário começou “A família Victo...”; nome completo e detalhes não recebidos. |
| História/capítulos | Pendente | Não definidos. |
| Pixel art e paleta | Pendente | Ainda sem resolução-base ou paleta escolhida. |
| Áudio | Pendente | Estilo musical, SFX e vozes não definidos. |
| Licenças/assets | Pendente | Origem e licenças ainda não definidas. |

## Bloco F — Escopo e produção

**Pendente — ainda não iniciado.**

---

# Análise preliminar do codinome (não é parecer jurídico)

A busca preliminar não encontrou correspondência exata de jogo para “Fortaleza Horizante”. Entretanto, o nome foi considerado de **risco moderado a alto para lançamento comercial**, pela semelhança estrutural/fonética com marcas conhecidas de corrida que usam “Forza”/“Horizon”, além de colisão de busca em português com resultados de futebol envolvendo Fortaleza e Horizonte. A recomendação de processo é manter o codinome apenas internamente e fazer busca profissional de marca e disponibilidade de título quando houver nome comercial candidato. Essa análise não substitui consulta ao INPI nem aconselhamento jurídico.

---

# Requisitos rastreáveis preliminares

> IDs provisórios para manter rastreabilidade. Devem ser revisados e ampliados na fase de requisitos do GDD completo.

| ID | Requisito | Origem/estado |
|---|---|---|
| REQ-F-001 | O jogo deve permitir uma corrida arcade com combate veicular contra rivais controlados por IA. | Blocos A/C · Confirmado |
| REQ-F-002 | O jogador deve controlar o carro com WASD e poder usar drift, nitro e investida lateral. | Bloco D · Confirmado; bindings incompletos |
| REQ-F-003 | O sistema deve representar estabilidade/dano dos rivais e permitir takedowns por combate veicular. | Bloco D · Confirmado |
| REQ-F-004 | O jogador deve vencer uma corrida de campanha ficando em primeiro lugar, inclusive contra chefes. | Bloco D · Confirmado |
| REQ-F-005 | O jogo deve oferecer respawn rápido após capotagem ou saída de pista do jogador. | Bloco D · Confirmado; parâmetros pendentes |
| REQ-F-006 | Posição final e takedowns devem conceder dinheiro e/ou reputação. | Bloco D · Confirmado; fórmula pendente |
| REQ-F-007 | O jogador deve poder comprar carros e upgrades; alguns devem depender de progresso narrativo. | Bloco D · Confirmado |
| REQ-F-008 | A dificuldade das corridas deve ser selecionável. | Bloco D · Confirmado; opções pendentes |
| REQ-F-009 | O jogo deve salvar o progresso em nuvem. | Bloco C · Confirmado; serviço e requisitos de conta pendentes |
| REQ-NF-001 | O jogo deve ser executável em navegador Web Desktop com apresentação em paisagem 16:9. | Bloco C · Confirmado |
| REQ-NF-002 | A implementação deve usar React + Phaser, sem bibliotecas adicionais escolhidas pelo usuário. | Bloco C · Confirmado |
| REQ-NF-003 | O jogo deve ser gratuito para jogar. | Bloco B · Confirmado; modelo de apoio/ads não definido |

---

# Histórico de versões

| Versão | Alteração |
|---|---|
| 0.1 | Consolidação das informações confirmadas e pendentes da Discovery; Game Brief preliminar criado, aguardando validação. |
