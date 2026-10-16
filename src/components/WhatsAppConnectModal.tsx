import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  RefreshCw, 
  Smartphone, 
  Send, 
  Bot, 
  AlertCircle,
  Wifi,
  WifiOff,
  LogOut
} from 'lucide-react';

interface WhatsAppStatus {
  status: 'disconnected' | 'connecting' | 'connected';
  qrCodeDataUrl: string | null;
  connectedUser: {
    id: string;
    name: string;
    phone: string;
  } | null;
  uptime: number;
}

interface MessageItem {
  id: string;
  from: string;
  senderName: string;
  text: string;
  fromMe: boolean;
  timestamp: string;
}

interface WhatsAppConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppConnectModal: React.FC<WhatsAppConnectModalProps> = ({ isOpen, onClose }) => {
  const [statusData, setStatusData] = useState<WhatsAppStatus | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Olá! Gostaria de saber mais sobre a Vitamina K2+D3 da Vitgold.');
  const [sendingTest, setSendingTest] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);

  // Polling para checar status e mensagens
  useEffect(() => {
    if (!isOpen) return;

    const checkStatus = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/whatsapp/status');
        if (res.ok) {
          const data = await res.json();
          setStatusData(data);
        }
      } catch (err) {
        setStatusData({
          status: 'disconnected',
          qrCodeDataUrl: null,
          connectedUser: null,
          uptime: 0
        });
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/whatsapp/messages');
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
        }
      } catch (e) {
        // Silencioso em caso de erro de rede
      }
    };

    checkStatus();
    fetchMessages();

    const interval = setInterval(() => {
      checkStatus();
      fetchMessages();
    }, 2500);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone || !testMessage) return;

    setSendingTest(true);
    setSendFeedback(null);
    try {
      const res = await fetch('http://localhost:3001/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: testPhone, message: testMessage })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSendFeedback('Mensagem enviada com sucesso ao WhatsApp!');
        setTimeout(() => setSendFeedback(null), 4000);
      } else {
        setSendFeedback(`Erro: ${data.error || 'Falha ao enviar'}`);
      }
    } catch (err: any) {
      setSendFeedback(`Erro de conexão com o servidor local: ${err.message}`);
    } finally {
      setSendingTest(false);
    }
  };

  const handleDisconnect = async () => {
    if (!window.confirm('Deseja realmente desconectar a sessão do WhatsApp e gerar novo QR Code?')) return;
    setDisconnecting(true);
    try {
      await fetch('http://localhost:3001/api/whatsapp/disconnect', { method: 'POST' });
      setStatusData(prev => prev ? { ...prev, status: 'connecting', connectedUser: null } : null);
    } catch (e) {
      console.error(e);
    } finally {
      setDisconnecting(false);
    }
  };

  if (!isOpen) return null;

  const isConnected = statusData?.status === 'connected';

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#030711] text-white border border-[#1E293B] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in duration-200">
        {/* Header do Modal */}
        <div className="px-6 py-4 border-b border-[#1E293B] flex items-center justify-between bg-[#0A1322]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#4EC5E8]/10 border border-[#4EC5E8]/30 flex items-center justify-center text-[#4EC5E8]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">Integração WhatsApp Real (Baileys)</h2>
                {isConnected ? (
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                    <Wifi className="w-2.5 h-2.5" />
                    <span>Conectado</span>
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center space-x-1">
                    <WifiOff className="w-2.5 h-2.5" />
                    <span>Aguardando Leitura</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Conecte seu WhatsApp pessoal ou empresarial para testar a IA Sofia ao vivo
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1E293B] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isConnected ? (
            /* Estado 1: CONECTADO COM SUCESSO */
            <div className="space-y-6">
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>WhatsApp Conectado ao Servidor</span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Número: <strong className="text-emerald-400">+{statusData?.connectedUser?.phone || 'WhatsApp'}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      O robô <strong className="text-[#4EC5E8]">Sofia (Vitgold)</strong> está escutando mensagens e respondendo automaticamente!
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-red-500/30 flex items-center space-x-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{disconnecting ? 'Desconectando...' : 'Desconectar WhatsApp'}</span>
                </button>
              </div>

              {/* Seção de Teste de Envio Rápido */}
              <div className="bg-[#0A1322] border border-[#1E293B] rounded-xl p-5 space-y-4">
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4 text-[#4EC5E8]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Disparo de Teste do CRM para WhatsApp
                  </h4>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400">Telefone com DDD:</label>
                      <input
                        type="text"
                        placeholder="Ex: 11988887777"
                        value={testPhone}
                        onChange={(e) => setTestPhone(e.target.value)}
                        className="w-full bg-[#030711] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#4EC5E8]"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400">Mensagem:</label>
                      <input
                        type="text"
                        value={testMessage}
                        onChange={(e) => setTestMessage(e.target.value)}
                        className="w-full bg-[#030711] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#4EC5E8]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-slate-500">
                      Dica: você também pode enviar uma mensagem do seu próprio celular para o número conectado e a Sofia responderá!
                    </p>
                    <button
                      type="submit"
                      disabled={sendingTest || !testPhone}
                      className="px-4 py-2 bg-[#4EC5E8] hover:bg-[#6DD3F5] text-[#03111C] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(78,197,232,0.3)] transition-all flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{sendingTest ? 'Enviando...' : 'Enviar Teste'}</span>
                    </button>
                  </div>

                  {sendFeedback && (
                    <div className={`p-2.5 rounded-lg text-xs font-semibold ${
                      sendFeedback.includes('sucesso') ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' : 'bg-red-950/60 text-red-300 border border-red-500/40'
                    }`}>
                      {sendFeedback}
                    </div>
                  )}
                </form>
              </div>

              {/* Log de Mensagens em Tempo Real */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#4EC5E8]" />
                    <span>Últimas Mensagens do Bot (Tempo Real)</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">{messages.length} mensagens no buffer</span>
                </div>

                <div className="bg-[#0A1322] border border-[#1E293B] rounded-xl p-4 max-h-56 overflow-y-auto space-y-2.5">
                  {messages.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      Nenhuma mensagem trocada ainda. Envie um "Olá" para o WhatsApp conectado!
                    </div>
                  ) : (
                    messages.map((m, idx) => (
                      <div 
                        key={idx}
                        className={`p-2.5 rounded-lg text-xs ${
                          m.fromMe ? 'bg-[#0E1A2D] border border-[#4EC5E8]/20 ml-6' : 'bg-[#1E293B]/60 border border-[#334155] mr-6'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold ${m.fromMe ? 'text-[#4EC5E8]' : 'text-emerald-400'}`}>
                            {m.senderName}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(m.timestamp).toLocaleTimeString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-slate-200 whitespace-pre-line leading-relaxed">{m.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Estado 2: AGUARDANDO LEITURA DO QR CODE */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center p-6 bg-[#0A1322] border border-[#1E293B] rounded-2xl relative">
                {statusData?.qrCodeDataUrl ? (
                  <div className="relative group">
                    <div className="p-3 bg-white rounded-2xl shadow-[0_0_25px_rgba(78,197,232,0.2)]">
                      <img 
                        src={statusData.qrCodeDataUrl} 
                        alt="QR Code WhatsApp" 
                        className="w-64 h-64 object-contain rounded-lg"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>QR Code Ativo • Pronto para leitura</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-64 h-64 flex flex-col items-center justify-center space-y-3 bg-[#030711] rounded-2xl border border-dashed border-[#1E293B]">
                    <RefreshCw className="w-8 h-8 text-[#4EC5E8] animate-spin" />
                    <p className="text-xs text-slate-400 text-center px-4">
                      Iniciando serviço Baileys e gerando QR Code oficial...
                    </p>
                  </div>
                )}
              </div>

              {/* Instruções de Escaneamento */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-[#4EC5E8]" />
                    <span>Como conectar em 30 segundos:</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Siga o passo a passo direto no aplicativo do WhatsApp no seu smartphone:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-[#0A1322] border border-[#1E293B] rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#4EC5E8]/20 text-[#4EC5E8] font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <p className="text-xs text-slate-300">
                      Abra o <strong>WhatsApp</strong> no seu aparelho celular.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-[#0A1322] border border-[#1E293B] rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#4EC5E8]/20 text-[#4EC5E8] font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <p className="text-xs text-slate-300">
                      Toque em <strong>Mais opções (⋮)</strong> no Android ou <strong>Configurações (⚙️)</strong> no iPhone.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-[#0A1322] border border-[#1E293B] rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#4EC5E8]/20 text-[#4EC5E8] font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <p className="text-xs text-slate-300">
                      Selecione <strong>Aparelhos conectados</strong> e toque em <strong>Conectar um aparelho</strong>.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-[#0A1322] border border-[#1E293B] rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#4EC5E8]/20 text-[#4EC5E8] font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </div>
                    <p className="text-xs text-slate-300">
                      Aponte a câmera para o <strong>QR Code</strong> ao lado. A conexão ocorrerá instantaneamente!
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl flex items-center space-x-2 text-[11px] text-amber-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>
                    Conexão local 100% segura usando o Baileys oficial. Suas mensagens são tratadas em sua própria máquina.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer do Modal */}
        <div className="px-6 py-3 border-t border-[#1E293B] bg-[#0A1322] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#4EC5E8]"></span>
            <span>API Local: <code className="text-slate-300 font-mono">http://localhost:3001</code></span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1E293B] hover:bg-[#334155] text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
