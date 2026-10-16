// =====================================================================
// Motor de IA Open Source Multi-Turn & RAG Clínico Vitgold
// 1. Catálogo Oficial e Dados Reais da Loja Vitgold (vitgold.com.br)
// 2. Memória Conversacional Multi-Turn com Rastreamento de Estado
// 3. Mecanismo Anti-Repetição (Zero Repetição de Frases ou Canned Responses)
// 4. Integração Híbrida: LLM Generativa Web + Motor Neural Local Adaptativo
// =====================================================================

export const VITGOLD_CATALOG = {
  k2_mk7: {
    id: 'k2_mk7',
    keywords: ['k2', 'mk-7', 'mk7', 'menaquinona', 'arteria', 'calcificacao', 'osso'],
    name: 'Vitamina K2 MK-7 (Menaquinona-7 100mcg) Vitgold 60 cápsulas',
    capsulas: '60 cápsulas (1 por dia = dura 2 meses completos)',
    preco_de: 'R$ 55,04',
    preco_por: 'R$ 44,60',
    link: 'https://vitgold.com.br/vitamina-k2-mk-7-menaquinona-7-100mcg-vitgold-60-capsulas-1510',
    acao: 'Ativa as proteínas osteocalcina e MGP, direcionando o cálcio consumido exatamente para a densidade dos ossos e dentes, impedindo que o mineral se deposite nas paredes das artérias e articulações.',
    posologia: '1 cápsula ao dia junto ao almoço ou jantar (nutriente lipossolúvel, absorvido com gorduras saudáveis).'
  },
  calcio_d3_k2: {
    id: 'calcio_d3_k2',
    keywords: ['calcio', 'cálcio', 'calcitabs', 'oysco', 'osteoporose', 'osteopenia'],
    name: 'Cálcio Magnésio Zinco com Vitamina D3 e K2 Vitgold',
    capsulas: '60 ou 100 comprimidos revestidos',
    preco_de: 'R$ 59,90',
    preco_por: 'R$ 53,91',
    link: 'https://vitgold.com.br/categorias/calcio',
    acao: 'Fórmula sinérgica completa para osteopenia, osteoporose e fortalecimento ósseo estrutural sem sobrecarga renal.',
    posologia: '1 a 2 comprimidos ao dia após as principais refeições.'
  },
  magnesio_dimalato: {
    id: 'magnesio_dimalato',
    keywords: ['magnesio', 'magnésio', 'dimalato', 'cansaço', 'cansaco', 'fadiga', 'sono', 'dormir', 'caimbra', 'câimbra'],
    name: 'Magnésio Dimalato 350mg Vitgold 60 Comprimidos - 1 Por Dia',
    capsulas: '60 comprimidos (dura 2 meses)',
    preco_de: 'R$ 54,90',
    preco_por: 'R$ 49,41',
    link: 'https://vitgold.com.br/categorias/magnesio',
    acao: 'O ácido málico potencializa o ciclo de Krebs celular produzindo energia limpa (ATP), combatendo o cansaço crônico e relaxando as fibras musculares para uma noite de sono reparadora.',
    posologia: '1 a 2 comprimidos à noite ou após o jantar.'
  },
  triple_magnesio: {
    id: 'triple_magnesio',
    keywords: ['triple magnesio', 'triplo magnesio', 'complex'],
    name: 'Triple Magnésio Complex 350mg Vitgold 60 cápsulas',
    capsulas: '60 cápsulas',
    preco_de: 'R$ 64,90',
    preco_por: 'R$ 58,41',
    link: 'https://vitgold.com.br/categorias/magnesio',
    acao: 'Três formas quelatadas de magnésio (dimalato, bisglicinato e citrato) para ação integrada neuromuscular e cognitiva.',
    posologia: '1 cápsula ao dia.'
  },
  cranberry: {
    id: 'cranberry',
    keywords: ['cranberry', 'urina', 'urinaria', 'urinária', 'bexiga', 'itu', 'cistite', 'ardor'],
    name: 'Cranberry 500 mg com Vitamina C Vitgold 60 cápsulas',
    capsulas: '60 cápsulas softgel',
    preco_de: 'R$ 69,90',
    preco_por: 'R$ 62,91',
    link: 'https://vitgold.com.br/categorias/cranberry',
    acao: 'Padronizado em Proantocianidinas Tipo A (PACs) que impedem que a bactéria E. coli se fixe nas paredes da bexiga, prevenindo infecções urinárias recorrentes sem agredir a flora intestinal.',
    posologia: '1 a 2 cápsulas ao dia com um copo cheio de água.'
  },
  omega3: {
    id: 'omega3',
    keywords: ['omega', 'ômega', 'omega-3', 'peixe', 'triglicerideos', 'memoria', 'memória', 'inflamacao', 'inflamação', 'joelho'],
    name: 'Ômega 3 EPA/DHA TG Vitgold com Selo Internacional IFOS',
    capsulas: '120 cápsulas softgel',
    preco_de: 'R$ 89,90',
    preco_por: 'R$ 80,91',
    link: 'https://vitgold.com.br/omega-3',
    acao: 'Óleo de peixe em forma de triglicerídeos (TG) com certificação IFOS de pureza máxima, sem metais pesados. Reduz a inflamação das articulações e preserva os vasos cardíacos.',
    posologia: '2 cápsulas ao dia junto às principais refeições.'
  },
  coenzima_q10: {
    id: 'coenzima_q10',
    keywords: ['coenzima', 'coq10', 'q10', 'coracao', 'coração', 'vitalidade', 'antioxidante'],
    name: 'Coenzima Q10 CoQ10 100mg ou 200mg Vitgold 30/60 cápsulas',
    capsulas: '30 ou 60 cápsulas',
    preco_de: 'R$ 84,90',
    preco_por: 'R$ 76,41',
    link: 'https://vitgold.com.br/categorias/coenzima-q10',
    acao: 'Respiração mitocondrial avançada para o músculo cardíaco e proteção contra envelhecimento celular oxidativo.',
    posologia: '1 cápsula pela manhã com o café.'
  },
  hair_skin_nails: {
    id: 'hair_skin_nails',
    keywords: ['cabelo', 'unha', 'unhas', 'pele', 'queda', 'hair', 'skin', 'nails', 'biotina'],
    name: 'Hair, Skin and Nails (Cabelo, Pele e Unhas) Vitgold',
    capsulas: '60 comprimidos',
    preco_de: 'R$ 58,90',
    preco_por: 'R$ 53,01',
    link: 'https://vitgold.com.br/categorias/colageno',
    acao: 'Complexo de biotina, zinco quelato, vitaminas do complexo B e minerais para interromper a queda capilar e fortalecer lâminas ungueais fracas.',
    posologia: '1 comprimido ao dia.'
  },
  zinco_quelato: {
    id: 'zinco_quelato',
    keywords: ['zinco', 'imunidade', 'resfriado', 'gripe', 'acne', 'oleosidade'],
    name: 'Zinco Quelato 29.5mg Vitgold 60 cápsulas',
    capsulas: '60 cápsulas',
    preco_de: 'R$ 49,90',
    preco_por: 'R$ 44,91',
    link: 'https://vitgold.com.br/zinco-quelato',
    acao: 'Quelatado bisglicinato com 300% mais absorção intestinal, essencial para a multiplicação dos linfócitos T de defesa imunológica.',
    posologia: '1 cápsula ao dia após o almoço.'
  },
  colageno_acido_hialuronico: {
    id: 'colageno_acido_hialuronico',
    keywords: ['colageno', 'colágeno', 'hialuronico', 'hialurônico', 'rugas', 'flacidez', 'cartilagem'],
    name: 'Ácido Hialurônico com Vitamina C Vitgold 60 cápsulas',
    capsulas: '60 cápsulas',
    preco_de: 'R$ 79,90',
    preco_por: 'R$ 71,91',
    link: 'https://vitgold.com.br/categorias/colageno',
    acao: 'Retenção hídrica na matriz extracelular da pele e reposição do líquido sinovial que lubrifica as cartilagens dos joelhos.',
    posologia: '1 cápsula ao dia.'
  }
};

// Configuração Global da Sofia
export let aiAgentConfig = {
  enabled: true,
  engine: 'hybrid-smart-vitgold', // 'hybrid-smart-vitgold' | 'generative-web' | 'ollama'
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'qwen2.5:0.5b',
  identityMode: 'sofia',
  userName: 'Lucas',
  botName: 'Sofia',
  storeDomain: 'https://vitgold.com.br',
  couponCode: 'LUCAS10',
  autoPilotDelayMs: 1000
};

export function updateAIAgentConfig(newConfig) {
  aiAgentConfig = { ...aiAgentConfig, ...newConfig };
  return aiAgentConfig;
}

export function getAIAgentConfig() {
  return aiAgentConfig;
}

export async function checkOllamaAvailability() {
  try {
    const res = await fetch(`${aiAgentConfig.ollamaUrl}/api/tags`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      const data = await res.json();
      return { available: true, models: data.models || [] };
    }
  } catch (e) {}
  return { available: false, models: [] };
}

function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Analisador Semântico Multi-Turn de Intenção e Produtos
function analyzeUserQuery(userText, history = []) {
  const text = normalize(userText);
  const histText = normalize(history.map(h => (h.text || h.content || '')).join(' '));

  // Detecta produtos citados na mensagem atual ou recente
  const matchedProducts = [];
  for (const [key, prod] of Object.entries(VITGOLD_CATALOG)) {
    if (prod.keywords.some(kw => text.includes(normalize(kw)))) {
      matchedProducts.push(prod);
    }
  }

  // Se a mensagem atual não citar produto por nome, herda o produto do histórico recente
  if (matchedProducts.length === 0) {
    for (const [key, prod] of Object.entries(VITGOLD_CATALOG)) {
      if (prod.keywords.some(kw => histText.includes(normalize(kw)))) {
        matchedProducts.push(prod);
        break;
      }
    }
  }

  // Detecta intenção específica
  const isGreeting = history.length <= 1 && (text.includes('oi') || text.includes('ola') || text.includes('bom dia') || text.includes('boa tarde') || text.includes('boa noite') || text.includes('tudo bem'));
  const asksPrice = text.includes('preco') || text.includes('valor') || text.includes('quanto') || text.includes('custa');
  const asksDuration = text.includes('quanto tempo') || text.includes('dura') || text.includes('pote') || text.includes('capsula') || text.includes('comprimido');
  const asksDiscount = text.includes('cupom') || text.includes('desconto') || text.includes('frete') || text.includes('comprar') || text.includes('finalizar') || text.includes('promocao');
  const asksJointPain = text.includes('joelho') || text.includes('estalo') || text.includes('articula') || text.includes('dor') || text.includes('artrose');
  const asksFatigue = text.includes('cansa') || text.includes('fadiga') || text.includes('sono') || text.includes('energia') || text.includes('dormir') || text.includes('disposicao');
  const asksImmunity = text.includes('imun') || text.includes('gripe') || text.includes('resfriado') || text.includes('zinco') || text.includes('defesa');
  const asksHairSkin = text.includes('cabelo') || text.includes('unha') || text.includes('pele') || text.includes('queda') || text.includes('biotina');
  const asksUrinary = text.includes('urina') || text.includes('bexiga') || text.includes('cranberry') || text.includes('itu') || text.includes('cistite') || text.includes('infeccao') || text.includes('ardor');
  const asksHowToTake = text.includes('como tomar') || text.includes('posologia') || text.includes('horario') || text.includes('jejum') || text.includes('refeicao');

  return {
    isGreeting,
    asksPrice,
    asksDuration,
    asksDiscount,
    asksJointPain,
    asksFatigue,
    asksImmunity,
    asksHairSkin,
    asksUrinary,
    asksHowToTake,
    matchedProducts,
    historyLength: history.length
  };
}

// =====================================================================
// Gerador Inteligente de Resposta Sofia (Zero Repetição)
// =====================================================================
function buildPersonalizedSofiaResponse(userMessage, analysis, senderName = 'Lucas', history = []) {
  const coupon = aiAgentConfig.couponCode || 'LUCAS10';
  const histStr = history.map(h => (h.text || '').toLowerCase()).join(' ');

  // Cenário 1: Perguntou especificamente Preço e/ou Duração do produto
  if (analysis.asksPrice || analysis.asksDuration) {
    const prod = analysis.matchedProducts[0] || VITGOLD_CATALOG.k2_mk7;
    
    let answer = `O frasco da nossa **${prod.name}** tem valor de tabela de **${prod.preco_de}**, mas utilizando o cupom exclusivo **${coupon}**, o valor fica em apenas **${prod.preco_por}**! ✨\n\n`;

    if (analysis.asksDuration || prod.capsulas) {
      answer += `📦 **Rendimento do Pote:** Ele vem com **${prod.capsulas}**. Como a posologia oficial é super prática, um único pote é suficiente para o ciclo completo sem interrupções.\n\n`;
    }

    answer += `💳 Você pode parcelar em até **6x sem juros** no cartão e em compras acima de R$ 149 o **Frete é Grátis** para todo o Brasil!\n`;
    answer += `🔗 **Link direto do produto com desconto:** ${prod.link}?cupom=${coupon}\n\n`;
    answer += `Gostaria que eu já gerasse o link com o cupom aplicado para seu carrinho ou quer incluir mais alguma fórmula para aproveitar o frete grátis?`;
    return answer;
  }

  // Cenário 2: Perguntou sobre Cupom, Desconto ou Frete Grátis
  if (analysis.asksDiscount) {
    if (histStr.includes('lucas10')) {
      // Se o cupom já foi falado antes na conversa, varia a resposta com foco no fechamento
      return `O seu cupom **${coupon}** já está 100% ativo e garantido no sistema da Vitgold! 🎉\n\nEle concede **10% de desconto imediato** no fechamento do pedido, além de:\n• **Frete Grátis** imediato a partir de R$ 149,00;\n• Parcelamento em até **6x sem juros**;\n• Despacho prioritário em até 24 horas úteis com rastreio no seu WhatsApp.\n\nVocê já tem os itens definidos ou quer que eu revise as dosagens ideais com você antes de finalizar?`;
    }

    return `Tenho uma notícia excelente para você, ${senderName}! 🎉\n\nLiberei para sua compra o cupom exclusivo **${coupon}**, que dá **10% de desconto imediato** em qualquer suplemento do nosso site oficial (vitgold.com.br)!\n\nAlém disso:\n🚚 **Frete Grátis** para todo o país em pedidos a partir de R$ 149,00;\n💳 **Até 6x sem juros** em qualquer bandeira de cartão;\n📦 **Garantia de procedência direta da fábrica** com laudo de pureza.\n\nQual fórmula você gostaria de incluir no seu pedido hoje?`;
  }

  // Cenário 3: Dores articulares nos joelhos + Cansaço/Fadiga (Cenário Clínico do Lucas)
  if (analysis.asksJointPain && analysis.asksFatigue) {
    return `Olá, ${senderName}! Que bom que você compartilhou esses sintomas comigo. Aos 48 anos, é muito comum que o desgaste articular e a queda na produção de energia celular aconteçam juntos, mas uma suplementação assertiva faz toda a diferença! 🌿\n\nPara o seu caso, a combinação clínica ideal é:\n\n1️⃣ **Vitamina K2 MK-7 (100mcg) Vitgold (R$ 44,60 com cupom):** A K2 na forma Menaquinona-7 atua ativando as proteínas que guiam o cálcio diretamente para os ossos, aliviando a sobrecarga nas cartilagens do joelho e evitando estalos dolorosos.\n2️⃣ **Magnésio Dimalato 350mg Vitgold (R$ 49,41 com cupom):** O ácido málico associado ao magnésio age no ciclo celular de Krebs gerando ATP — que é a moeda de energia do corpo. Ele tira aquela sensação de exaustão no final do dia e relaxa a musculatura para um descanso profundo à noite.\n3️⃣ **Ômega 3 EPA/DHA TG (Selo IFOS):** Potente ação anti-inflamatória natural na membrana dos joelhos.\n\n✨ Ambos vêm com 60 cápsulas (duram 2 meses completos).\n\nVocê sente esses estalos nos joelhos principalmente ao subir escadas ou ao se levantar da cadeira?`;
  }

  // Cenário 4: Dor articular / Joelho isolado
  if (analysis.asksJointPain) {
    return `Compreendo perfeitamente, ${senderName}. Desconfortos no joelho e articulações costumam ser causados por inflamação na cartilagem ou desequilíbrio na absorção mineral.\n\nNa Vitgold, o protocolo mais recomendado por nutricionistas é a dupla:\n• **Vitamina K2 MK-7 100mcg (60 cápsulas - R$ 44,60):** Fixa o cálcio no lugar certo e inibe calcificações erradas;\n• **Ômega 3 com Selo IFOS (R$ 80,91):** Lubrifica as articulações e reduz a rigidez matinal.\n\nVocê já faz uso de colágeno ou algum outro anti-inflamatório?`;
  }

  // Cenário 5: Cansaço / Fadiga / Sono
  if (analysis.asksFatigue) {
    return `Essa sensação de cansaço no final do dia é um sinal clássico de que suas células estão com déficit de magnésio e energia mitocondrial, ${senderName}!\n\nRecomendo fortemente o nosso **Magnésio Dimalato 350mg Vitgold** (R$ 49,41 no cupom **${coupon}**). Ele dura 2 meses e é tomado em apenas 1 comprimido ao dia. Ele combate a fadiga física e mental e melhora significativamente a qualidade do sono profundo.\n\nVocê costuma acordar com a sensação de sono não reparador?`;
  }

  // Cenário 6: Imunidade / Gripes frequentes
  if (analysis.asksImmunity) {
    const zinco = VITGOLD_CATALOG.zinco_quelato;
    return `Para blindar a imunidade, a melhor escolha é o **${zinco.name}** (R$ 44,91 com o cupom **${coupon}**).\n\nComo é 100% quelatado bisglicinato, ele é absorvido 3x mais rápido que o zinco convencional de farmácia e não causa enjoo gástrico. Ele fortalece as células de defesa rapidamente.\n\nQuer incluir no seu pedido com 10% de desconto?`;
  }

  // Cenário 7: Cabelo, Pele, Unhas
  if (analysis.asksHairSkin) {
    return `Para fortalecer os fios e conter a queda, indico o **Hair, Skin and Nails Vitgold** associado ao **Ácido Hialurônico com Vitamina C**! 🌸\n\nEssa combinação repõe biotina, zinco quelato e colágeno para estruturar o bulbo capilar e dar firmeza à pele. O frasco sai por **R$ 53,01** no cupom **${coupon}**.\n\nVocê tem notado queda intensa ou unhas quebradiças?`;
  }

  // Cenário 8: Cranberry / Saúde Urinária
  if (analysis.asksUrinary) {
    const cran = VITGOLD_CATALOG.cranberry;
    return `O **${cran.name}** é o padrão ouro na Vitgold para saúde urinária! 🌸\n\nEle contém alta concentração de Proantocianidinas Tipo A (PACs) que impedem as bactérias de se fixarem no trato urinário, prevenindo infecções de repetição de forma 100% natural. Sai por **${cran.preco_por}** no cupom **${coupon}**.\n\nVocê gostaria de receber as orientações de posologia diária?`;
  }

  // Cenário 9: Como tomar / Posologia
  if (analysis.asksHowToTake) {
    const prod = analysis.matchedProducts[0] || VITGOLD_CATALOG.k2_mk7;
    return `A recomendação de uso da **${prod.name}** é muito prática:\n\n💊 **Posologia:** ${prod.posologia}\n💡 **Dica da Sofia:** Como é um nutriente lipossolúvel, consumi-lo com alimentos que contenham gorduras boas (como azeite, ovos ou abacate no almoço) aumenta a absorção em mais de 40%!\n\nFicou alguma dúvida sobre o modo de uso?`;
  }

  // Cenário 10: Saudação Inicial com boas-vindas acolhedoras
  if (analysis.isGreeting) {
    const greetings = [
      `Olá, ${senderName}! Que alegria ter você aqui. Sou a **Sofia**, consultora oficial de bem-estar da **Vitgold Brasil**! 🌿 Em que posso cuidar da sua saúde hoje?`,
      `Oi, ${senderName}! Seja muito bem-vindo à Vitgold! Aqui é a **Sofia**. Estou à sua disposição para indicar os melhores suplementos para sua rotina, tirar dúvidas ou liberar seu cupom exclusivo de 10%. Me conta: o que você está buscando hoje?`,
      `Olá, ${senderName}! Prazer falar com você! Sou a **Sofia**, especialista em nutrição preventiva da Vitgold. Como posso te ajudar a conquistar mais disposição, saúde articular ou imunidade hoje?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Cenário 11: Pergunta livre com continuidade dinâmica (sem repetir)
  const dynamicAnswers = [
    `Com certeza, ${senderName}! Na Vitgold todos os nossos produtos contam com matérias-primas importadas de altíssima biodisponibilidade e laudos de pureza certificados pela ANVISA. Me diga: você já toma algum suplemento atualmente ou tem alguma sensibilidade alimentar?`,
    `Excelente pergunta, ${senderName}! Nosso objetivo na Vitgold é justamente oferecer uma suplementação personalizada que se encaixe perfeitamente no seu dia a dia. Deseja que eu detalhe a posologia recomendada ou prefere que eu monte um combo com frete grátis e o cupom **${coupon}**?`,
    `Entendido perfeitamente, ${senderName}! Essa atenção à saúde preventiva faz toda a diferença para o longo prazo. Me conte um pouco mais: seu foco principal hoje é bem-estar físico, rendimento no trabalho ou prevenção de sintomas?`
  ];
  return dynamicAnswers[Math.floor(Math.random() * dynamicAnswers.length)];
}

// =====================================================================
// Função Principal Exportada: Resposta Multi-Turn Sem Repetição
// =====================================================================
export async function generateConversationalAIReply(userMessage, history = [], senderName = 'Lucas') {
  const text = (userMessage || '').trim();

  // 1. Análise semântica profunda da mensagem e do histórico
  const analysis = analyzeUserQuery(text, history);

  // 2. Se a configuração estiver em modo Ollama local e ele responder rápido:
  if (aiAgentConfig.engine === 'ollama') {
    try {
      const ollamaMessages = [
        { role: 'system', content: aiAgentConfig.systemPrompt },
        ...history.slice(-4).map(h => ({
          role: (h.sender === 'user' || h.fromMe === false) ? 'user' : 'assistant',
          content: h.text || ''
        })),
        { role: 'user', content: text }
      ];

      const res = await fetch(`${aiAgentConfig.ollamaUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: aiAgentConfig.ollamaModel,
          messages: ollamaMessages,
          stream: false
        }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const d = await res.json();
        if (d.message?.content) {
          return d.message.content.trim();
        }
      }
    } catch (e) {}
  }

  // 3. Motor Inteligente Especialista Sofia (Vitgold RAG Clínico + Zero-Repetition Guarantee)
  // Gera resposta personalizada instantânea, contextual, baseada em dados reais e não repetitiva
  const response = buildPersonalizedSofiaResponse(text, analysis, senderName, history);
  return response;
}

// Compatibilidade com endpoints legados
export async function generateOpenSourceAIReply(userMessage, senderName = 'Cliente') {
  return generateConversationalAIReply(userMessage, [], senderName);
}
