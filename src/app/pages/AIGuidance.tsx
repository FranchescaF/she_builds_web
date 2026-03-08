import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Lightbulb, Map, BookOpen, Target } from "lucide-react";

export function AIGuidance() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "¡Hola! Soy tu guía profesional de IA. Estoy aquí para ayudarte a descubrir el mejor camino tecnológico para tus habilidades e intereses. Para empezar, ¿en qué trabajas actualmente y qué es lo que más disfrutas de ello?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: "user", text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      let aiResponseText = "¡Eso es interesante! Basado en lo que compartiste, roles como Gestión de Producto o Investigación UX podrían encajar muy bien. Requieren una fuerte comunicación y empatía. ¿Cuánto tiempo puedes dedicar a aprender cada semana?";
      
      if (messages.length > 2) {
        aiResponseText = "¡Genial! Con 5-10 horas a la semana, definitivamente puedes hacer un progreso constante. Recomiendo comenzar con nuestra mini-lección 'Intro al Diseño UX'. ¡Solo toma 15 minutos! ¿Te gustaría que la agregue a tu panel?";
      }

      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, sender: "ai", text: aiResponseText }
      ]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "Soy maestra y quiero cambiar de carrera.",
    "Me gusta organizar cosas y planificar.",
    "No tengo ninguna experiencia técnica.",
    "Soy ama de casa y busco volver a trabajar."
  ];

  return (
    <div className="flex-grow flex flex-col bg-slate-50 h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="bg-white rounded-t-3xl p-6 border-b border-slate-100 shadow-sm flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Guía Profesional IA</h1>
              <p className="text-sm text-slate-500">Te ayudo a descubrir tu camino, no prometo empleos.</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Lightbulb className="w-4 h-4 text-amber-500" /> Consejos: Sé honesta sobre tu tiempo
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow bg-white overflow-y-auto p-6 space-y-6 shadow-sm border-x border-slate-100 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  msg.sender === "user" ? "bg-slate-200" : "bg-purple-100"
                }`}>
                  {msg.sender === "user" ? (
                    <User className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-slate-900 text-white rounded-tr-sm" 
                    : "bg-purple-50 text-slate-800 rounded-tl-sm border border-purple-100 shadow-sm"
                }`}>
                  {msg.text}
                  
                  {/* Optional AI Add-ons (Mocked for context) */}
                  {msg.sender === "ai" && messages.length > 2 && msg.id === messages[messages.length-1].id && (
                     <div className="mt-4 bg-white p-3 rounded-xl border border-purple-100 flex items-center gap-3 shadow-sm">
                       <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                         <Map className="w-5 h-5 text-pink-600" />
                       </div>
                       <div>
                         <p className="font-bold text-xs">Ruta Sugerida: Diseño UX</p>
                         <button className="text-xs text-purple-600 font-semibold mt-0.5 hover:underline">Ver detalles</button>
                       </div>
                     </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Typing Indicator Placeholder could go here */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-3xl p-4 border-t border-slate-100 shadow-sm">
          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {suggestions.map((suggestion, idx) => (
                <button 
                  key={idx}
                  onClick={() => setInputValue(suggestion)}
                  className="whitespace-nowrap px-4 py-2 bg-slate-50 hover:bg-purple-50 hover:text-purple-700 text-slate-600 text-xs font-medium rounded-full border border-slate-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-12 py-3.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none min-h-[52px] max-h-32 scrollbar-hide"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-2 bottom-2 p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white rounded-xl transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            La IA proporciona orientación basada en tu información, no garantiza resultados profesionales.
          </p>
        </div>

      </div>
    </div>
  );
}
