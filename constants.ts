import { ScriptStep } from './types';

// Using a reliable placeholder that fits the "Horizontal Diagram" aspect ratio. 
// In a real deployment, this would be 'image_5.png'.
export const DIAGRAM_IMAGE_URL = "https://images.unsplash.com/photo-1564050866325-c4959420b1c0?q=80&w=2670&auto=format&fit=crop"; 
// Note: Since I cannot upload the specific image_5.png, I am using a placeholder. 
// However, the coordinates below are estimated based on the descriptive script provided.

export const STORY_SCRIPT: ScriptStep[] = [
  {
    id: "INTRODUCAO_CENA",
    title: "Pipeline RAG",
    narration: "Imagine uma máquina capaz não apenas de ler bibliotecas inteiras, mas de entender o que leu e usar esse conhecimento para responder às suas perguntas com precisão. O que você está vendo é o projeto dessa máquina: um \"Pipeline RAG\", desenhado no estilo dos grandes engenheiros do passado. Vamos desmontar essa engenhoca peça por peça para entender como ela transforma dados brutos em respostas inteligentes.",
    visual: { top: 0, left: 0, width: 100, height: 100, fullView: true }
  },
  {
    id: "PASSO_1_INGESTAO_DADOS",
    title: "Ingestão de Dados",
    narration: "Tudo começa aqui, na \"Ingestão de Dados\". Como qualquer estudioso, nossa máquina precisa de matéria-prima. Nós a alimentamos com documentos, PDFs, manuais... todo o conhecimento que queremos que ela absorva. É o combustível da nossa fábrica de sabedoria.",
    visual: { top: 10, left: 2, width: 20, height: 35 } // Funnel/Hopper left
  },
  {
    id: "PASSO_2_PROCESSAMENTO_CHUNKING",
    title: "Processamento & Chunking",
    narration: "Mas livros inteiros são difíceis de digerir de uma só vez. Os documentos descem para esta prensa, a etapa de \"Processamento & Chunking\". Aqui, o texto é limpo e \"triturado\" em pedaços menores e mais gerenciáveis, chamados chunks. Pense nisso como dividir um grande banquete em pequenas mordidas.",
    visual: { top: 45, left: 2, width: 20, height: 35 } // Press below funnel
  },
  {
    id: "PASSO_3_GERACAO_EMBEDDINGS_DOCS",
    title: "Geração de Embeddings",
    narration: "Agora acontece a mágica da tradução. O computador não entende palavras como nós; ele entende números. Nestas engrenagens, a \"Geração de Embeddings\", cada pedaço de texto é analisado através dessa lupa especial e transformado em uma longa lista de números (um vetor). É como transformar um parágrafo em uma coordenada GPS exata no mapa dos significados.",
    visual: { top: 40, left: 22, width: 18, height: 30 } // Gears/Lens middle-left
  },
  {
    id: "PASSO_4_BANCO_VETORIAL_ARMAZENAMENTO",
    title: "Banco de Dados Vetorial",
    narration: "Onde guardamos todas essas \"coordenadas de significado\"? Nesta fortaleza central: o \"Banco de Dados Vetorial\". Diferente de uma biblioteca comum que organiza por ordem alfabética, esta torre organiza o conhecimento por similaridade. Ideias parecidas são armazenadas fisicamente próximas umas das outras nas prateleiras digitais. O conhecimento agora está seguro e organizado.",
    visual: { top: 20, left: 40, width: 20, height: 60 } // Center Tower
  },
  {
    id: "TRANSICAO_CONSULTA",
    title: "Preparando a Consulta",
    narration: "Com a máquina ensinada, ela está pronta para ser usada. Vamos ver o que acontece quando alguém faz uma pergunta.",
    visual: { top: 30, left: 80, width: 15, height: 25 } // Focus shifts to right (megaphone area general)
  },
  {
    id: "PASSO_5_CONSULTA_USUARIO",
    title: "Consulta do Usuário",
    narration: "Um usuário chega e fala sua dúvida neste megafone: a \"Consulta do Usuário\". Pode ser uma pergunta complexa sobre os documentos que inserimos antes.",
    visual: { top: 35, left: 82, width: 15, height: 20 } // Megaphone specifically
  },
  {
    id: "PASSO_6_EMBEDDINGS_CONSULTA",
    title: "Embeddings da Consulta",
    narration: "Lembra da tradução? A pergunta do usuário também precisa ser traduzida. Estas engrenagens geram os \"Embeddings da Consulta\". A pergunta falada é convertida para a mesma linguagem matemática (vetores) que usamos para guardar nossos documentos na torre.",
    visual: { top: 55, left: 80, width: 15, height: 25 } // Gears below megaphone
  },
  {
    id: "PASSO_7_BUSCA_SEMANTICA_RECUPERACAO",
    title: "Busca Semântica",
    narration: "Este é o coração do RAG: a \"Busca Semântica\". O braço mecânico não está procurando por palavras-chave exatas. Ele usa a \"coordenada GPS\" da pergunta para encontrar, dentro da torre-biblioteca, os trechos de informação que estão mais próximos em significado. Ele \"recupera\" apenas os pergaminhos mais relevantes para aquela dúvida específica.",
    visual: { top: 40, left: 60, width: 20, height: 40 } // Robot arm area
  },
  {
    id: "PASSO_8_LLM_GERACAO",
    title: "LLM (O Cérebro)",
    narration: "O braço entrega os trechos recuperados (o contexto) para o cérebro da operação no topo: o \"LLM\" (Grande Modelo de Linguagem). Esta máquina é o escritor. Ela lê a sua pergunta, lê os pergaminhos confiáveis que o braço trouxe, e usa apenas essa informação para escrever uma resposta nova e natural.",
    visual: { top: 5, left: 65, width: 20, height: 30 } // Top right machine
  },
  {
    id: "PASSO_9_RESPOSTA_FINAL",
    title: "Resposta Gerada",
    narration: "E voilà! A máquina produz a \"Resposta Gerada\". Uma resposta precisa, baseada nos seus próprios dados, e fácil de entender.",
    visual: { top: 10, left: 85, width: 15, height: 20 } // Output scroll
  },
  {
    id: "CONCLUSAO_RESUMO",
    title: "Conclusão",
    narration: "E assim funciona o Pipeline RAG. Ingerimos dados brutos, organizamos seu significado matematicamente, e quando uma pergunta é feita, buscamos apenas o necessário para gerar uma resposta confiável. Uma verdadeira máquina de conhecimento para o mundo moderno.",
    visual: { top: 0, left: 0, width: 100, height: 100, fullView: true }
  }
];