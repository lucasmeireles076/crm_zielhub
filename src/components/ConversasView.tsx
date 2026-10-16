import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Send, 
  MessageSquare, 
  Bot, 
  Sparkles,
  QrCode,
  RotateCcw,
  Zap,
  CheckCheck
} from 'lucide-react';
import { INITIAL_CONVERSATIONS } from '../data/mockData';
import type { ConversationItem, ChatMessage } from '../types';
import { WhatsAppConnectModal } from './WhatsAppConnectModal';

export const ConversasView: React.FC = () => {
  // Conversa Pessoal e Verdadeira com a Sofia (IA Open Source)
  const sofiaDefaultConversation: ConversationItem = {
    id: 'sofia-ai-direct',
    contactName: 'Sofia • Especialista Vitgold (IA Open Source)',
    phone: '+55 11 98844-2026',
    channel: 'whatsapp',
    status: 'abertas',
    lastMessage: 'Olá, Lucas! Sou a Sofia, especialista em suplementação e nutrição preventiva. Como posso te ajudar hoje?',
    timestamp: 'Agora',
    unreadCount: 0,
    agentActive: true,
    assignedTo: 'Sofia IA (Local)',
    messages: [
      {
        id: 'msg-sofia-welcome',
        sender: 'agent',
        text: `Olá, Lucas! Seja muito bem-vindo à Vitgold Brasil 🌿✨\n\nEu sou a **Sofia**, sua inteligência artificial e consultora nutricional. Fui programada com conhecimento em bioquímica e suplementação preventiva.\n\nEstou pronta para conversar com você! Você pode me perguntar sobre:\n1️⃣ Benefícios e posologia da **Vitamina K2 MK-7 + D3**;\n2️⃣ Absorção e imunidade com o **Zinco Quelato 29.5mg**;\n3️⃣ Prevenção urinária com o **Cranberry 500mg Softgel**;\n4️⃣ Suporte muscular com **Magnésio Dimalato** e **Ômega 3**;\n5️⃣ Cupons promocionais ativos para compras.\n\nComo posso cuidar da sua saúde, energia ou rotina hoje?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };

  const [conversations, setConversations] = useState<ConversationItem[]>([
    sofiaDefaultConversation,
    ...INITIAL_CONVERSATIONS
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('sofia-ai-direct');
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'todas' | 'abertas' | 'aguardando'>('todas');
  const [isTyping, setIsTyping] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  // Auto-scroll para o fim das mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConv?.messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || newMessage).trim();
    if (!textToSend || !activeConv) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Atualiza estado local imediatamente com a mensagem do usuário
    const updatedMessages = [...activeConv.messages, userMessage];

    setConversations(prev => prev.map(c => {
      if (c.id === activeConv.id) {
        return {
          ...c,
          messages: updatedMessages,
          lastMessage: textToSend,
          timestamp: userMessage.timestamp
        };
      }
      return c;
    }));

    setNewMessage('');

    // Se for conversa com a Sofia ou se o agente de IA estiver ativo
    if (activeConv.id === 'sofia-ai-direct' || activeConv.agentActive) {
      setIsTyping(true);

      try {
        const historyPayload = updatedMessages.slice(-6).map(m => ({
          sender: m.sender,
          text: m.text
        }));

        const response = await fetch('http://localhost:3001/api/conversations/sofia-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            history: historyPayload,
            senderName: 'Lucas'
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiMessage: ChatMessage = {
            id: `reply-${Date.now()}`,
            sender: 'agent',
            text: data.text,
            timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setConversations(prev => prev.map(c => {
            if (c.id === activeConv.id) {
              return {
                ...c,
                messages: [...updatedMessages, aiMessage],
                lastMessage: aiMessage.text,
                timestamp: aiMessage.timestamp
              };
            }
            return c;
          }));
        } else {
          // Fallback caso a API tenha algum erro momentâneo
          const fallbackMsg: ChatMessage = {
            id: `reply-${Date.now()}`,
            sender: 'agent',
            text: 'Recebi sua mensagem perfeitamente! Como posso te ajudar com a dosagem e compra dos suplementos Vitgold?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setConversations(prev => prev.map(c => c.id === activeConv.id ? { ...c, messages: [...updatedMessages, fallbackMsg] } : c));
        }
      } catch (err) {
        console.error('Erro na resposta da IA Sofia:', err);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const clearCurrentChat = () => {
    if (activeConv.id === 'sofia-ai-direct') {
      setConversations(prev => prev.map(c => {
        if (c.id === 'sofia-ai-direct') {
          return {
            ...c,
            messages: sofiaDefaultConversation.messages,
            lastMessage: sofiaDefaultConversation.lastMessage
          };
        }
        return c;
      }));
    } else {
      setConversations(prev => prev.map(c => c.id === activeConv.id ? { ...c, messages: [] } : c));
    }
  };

  const toggleAgent = (id: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, agentActive: !c.agentActive };
      }
      return c;
    }));
  };

  // Sugestões de perguntas rápidas para conversa instantânea
  const quickChips = [
    { label: '🌿 K2 + D3 2000 UI', prompt: 'Sofia, me explica detalhadamente os benefícios de tomar Vitamina K2 junto com a D3?' },
    { label: '🛡️ Zinco Quelato', prompt: 'Por que o Zinco Quelato é melhor para imunidade que os outros?' },
    { label: '🌸 Prevenção Cranberry', prompt: 'Como o Cranberry ajuda na prevenção de infecção urinária de repetição?' },
    { label: '🎁 Cupom de Desconto', prompt: 'Tem algum cupom de desconto ou condição especial disponível hoje?' },
    { label: '⚡ Cansaço & Sono', prompt: 'Tenho sentido muito cansaço físico e sono leve, o que você me recomenda?' }
  ];

  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'todas' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      {/* 1. Header do Módulo de Atendimento */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#4EC5E8]/10 border border-[#4EC5E8]/30 flex items-center justify-center text-[#2E86D0] shadow-sm">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-[#0F172A] flex items-center space-x-2">
              <span>Central de Atendimento Omnichannel & IA Viva</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>IA Open Source Conectada</span>
              </span>
            </h1>
            <p className="text-xs text-[#64748B]">
              Converse em tempo real com a atendente virtual <strong className="text-[#0F172A]">Sofia (Vitgold)</strong> ou integre seu WhatsApp pessoal.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Conectar WhatsApp Real</span>
          </button>
        </div>
      </div>

      {/* 2. Grid Principal: Lista de Conversas (4 col) + Janela de Chat Viva (8 col) */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[660px]">
        {/* Painel Esquerdo: Lista de Conversas */}
        <div className="md:col-span-4 border-r border-[#E2E8F0] flex flex-col bg-[#F8FAFC]">
          {/* Busca e Filtros */}
          <div className="p-3.5 border-b border-[#E2E8F0] bg-white space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar conversa ou telefone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#1E293B] focus:outline-none focus:border-[#4EC5E8]"
              />
            </div>

            <div className="flex items-center space-x-1 text-xs">
              {(['todas', 'abertas', 'aguardando'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-center capitalize transition-colors ${
                    filter === f 
                      ? 'bg-[#03111C] text-white shadow-sm' 
                      : 'text-[#64748B] hover:bg-[#F1F5F9]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Contatos */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E2E8F0]/60">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConvId;
              const isSofia = conv.id === 'sofia-ai-direct';

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-3.5 cursor-pointer transition-all flex items-start space-x-3 select-none ${
                    isSelected 
                      ? 'bg-[#E0F7FA]/50 border-l-4 border-l-[#2E86D0]' 
                      : 'hover:bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0 ${
                    isSofia 
                      ? 'bg-gradient-to-tr from-[#2E86D0] to-[#4EC5E8] text-white ring-2 ring-[#4EC5E8]/40' 
                      : 'bg-[#07192C] text-white'
                  }`}>
                    {isSofia ? '🌿' : conv.contactName.substring(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-[#0F172A] truncate flex items-center space-x-1">
                        <span>{conv.contactName}</span>
                        {isSofia && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{conv.timestamp}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate leading-snug">
                      {conv.lastMessage}
                    </p>

                    <div className="flex items-center space-x-2 mt-1.5">
                      {isSofia ? (
                        <span className="text-[9px] bg-[#4EC5E8]/20 text-[#07192C] font-extrabold px-2 py-0.5 rounded-full border border-[#4EC5E8]/30 flex items-center space-x-1">
                          <Zap className="w-2.5 h-2.5 text-[#2E86D0]" />
                          <span>IA Interativa Ativa</span>
                        </span>
                      ) : (
                        <span className="text-[9px] bg-slate-100 text-slate-600 font-semibold px-1.5 py-0.2 rounded">
                          {conv.channel === 'whatsapp' ? 'WhatsApp' : 'Instagram'}
                        </span>
                      )}

                      {conv.agentActive && !isSofia && (
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded flex items-center space-x-0.5">
                          <Bot className="w-2.5 h-2.5" />
                          <span>Robô Ativo</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Painel Direito: Janela de Chat Viva e Interativa */}
        <div className="md:col-span-8 flex flex-col bg-white">
          {/* Header da Conversa Ativa */}
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shadow-sm ${
                activeConv.id === 'sofia-ai-direct' 
                  ? 'bg-gradient-to-tr from-[#2E86D0] to-[#4EC5E8] text-white ring-2 ring-[#4EC5E8]/30' 
                  : 'bg-[#0F172A] text-white'
              }`}>
                {activeConv.id === 'sofia-ai-direct' ? '🌿' : activeConv.contactName.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {activeConv.contactName}
                  </h3>
                  {activeConv.id === 'sofia-ai-direct' && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Online • IA Open Source</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {activeConv.phone} • {activeConv.id === 'sofia-ai-direct' ? 'Canal Oficial de Atendimento Nutricional Vitgold' : 'Atendente: ' + activeConv.assignedTo}
                </p>
              </div>
            </div>

            {/* Ações do Header */}
            <div className="flex items-center space-x-2">
              <button
                onClick={clearCurrentChat}
                title="Reiniciar esta conversa"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors text-xs flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold hidden sm:inline">Reiniciar Chat</span>
              </button>

              {activeConv.id !== 'sofia-ai-direct' && (
                <button
                  onClick={() => toggleAgent(activeConv.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeConv.agentActive 
                      ? 'bg-[#E0F7FA] text-[#007791] border border-[#B2EBF2]' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>{activeConv.agentActive ? 'Agente IA Ligado' : 'Agente IA Pausado'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Área de Mensagens (Scrollável) */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#F8FAFC]">
            {activeConv.messages.map((msg) => {
              const isMe = msg.sender === 'user' || msg.sender === 'human';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1 animate-in fade-in duration-200`}
                >
                  <div className="flex items-end space-x-2 max-w-[85%]">
                    {!isMe && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#2E86D0] to-[#4EC5E8] flex items-center justify-center text-white text-[11px] font-bold shrink-0 mb-1 shadow-sm">
                        🌿
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs shadow-sm leading-relaxed whitespace-pre-line ${
                        isMe
                          ? 'bg-[#03111C] text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-[#E2E8F0] rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  <div className={`flex items-center space-x-1 text-[10px] text-slate-400 px-1 ${isMe ? 'pr-1' : 'pl-9'}`}>
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#4EC5E8]" />}
                  </div>
                </div>
              );
            })}

            {/* Indicador de Digitação da Sofia IA */}
            {isTyping && (
              <div className="flex items-center space-x-2 pl-2 animate-in fade-in">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#2E86D0] to-[#4EC5E8] flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm">
                  🌿
                </div>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
                  <span className="text-xs text-slate-500 font-semibold">Sofia está formulando resposta clínica</span>
                  <div className="flex space-x-1 pl-1">
                    <span className="w-1.5 h-1.5 bg-[#4EC5E8] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#4EC5E8] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#4EC5E8] rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sugestões de Perguntas Rápidas (Chips com 1 Clique) */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-[#4EC5E8]" />
              <span>Perguntas Rápidas:</span>
            </span>

            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(undefined, chip.prompt)}
                disabled={isTyping}
                className="px-2.5 py-1 bg-slate-50 hover:bg-[#E0F7FA] hover:text-[#007791] border border-slate-200 hover:border-[#4EC5E8] rounded-lg text-[11px] font-semibold text-slate-700 transition-all shrink-0 whitespace-nowrap active:scale-95 disabled:opacity-50"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Barra de Entrada de Mensagem */}
          <div className="p-3.5 border-t border-[#E2E8F0] bg-white">
            <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={isTyping ? "Sofia está respondendo..." : "Digite sua mensagem para a atendente Sofia (ex: 'Me explica sobre o K2+D3?')..."}
                value={newMessage}
                disabled={isTyping}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#4EC5E8] disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!newMessage.trim() || isTyping}
                className="px-4 py-2.5 bg-[#03111C] hover:bg-[#0B2A4A] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm disabled:opacity-40 active:scale-95 shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-[#4EC5E8]" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Conexão WhatsApp Real */}
      <WhatsAppConnectModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </div>
  );
};
