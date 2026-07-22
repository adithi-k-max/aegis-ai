import { useState, useRef, useEffect } from 'react';
import { PlantState } from '../types';
import { Button } from '../components/ui/button';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

export default function AICopilot({ state }: { state: PlantState }) {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'AEGIS AI Copilot initialized. I have access to live plant telemetry, permit states, and worker locations. How can I assist you?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: '**Error**: Could not connect to AEGIS reasoning engine.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full max-w-5xl mx-auto px-4 md:px-8 relative">
      <div className="flex items-center justify-between border-b border-[#141414]/10 pb-6 md:pb-8 pt-6 md:pt-10 mb-4 md:mb-8 shrink-0">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#141414] tracking-tighter uppercase italic">Executive Copilot</h1>
          <p className="text-[#141414]/50 text-[10px] md:text-xs mt-2 md:mt-3 uppercase tracking-widest font-bold">Multi-agent industrial safety reasoning</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col pb-6">
        <div className="flex-1 space-y-8 md:space-y-10 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex space-x-4 md:space-x-6 max-w-[95%] md:max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : "")}>
              <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-none flex items-center justify-center shrink-0", 
                msg.role === 'user' ? "bg-[#141414]" : "bg-transparent border border-[#141414]/10")}>
                {msg.role === 'user' ? <User className="w-4 h-4 md:w-4 md:h-4 text-white" /> : <Bot className="w-4 h-4 md:w-4 md:h-4 text-[#141414]" />}
              </div>
              <div className={cn(
                "px-5 md:px-6 py-4 md:py-5 text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-[#141414]/5 border border-[#141414]/10 text-[#141414] font-medium" 
                  : "bg-transparent border border-[#141414]/10 text-[#141414] prose prose-p:leading-relaxed prose-pre:bg-[#141414] prose-pre:border-[#141414] max-w-none prose-headings:font-serif prose-headings:font-black prose-headings:italic text-sm md:text-base break-words"
              )}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div className="markdown-body">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex space-x-4 md:space-x-6 max-w-[85%]">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-none bg-transparent border border-[#141414]/10 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#141414]" />
              </div>
              <div className="px-5 md:px-6 py-4 md:py-5 bg-transparent border border-[#141414]/10 flex items-center space-x-3">
                <Loader2 className="w-4 h-4 text-[#141414]/50 animate-spin" />
                <span className="text-[10px] text-[#141414]/50 font-bold tracking-widest uppercase">Synthesizing intelligence...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} className="h-4" />
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 md:-mx-8 px-4 md:px-8 py-4 md:py-8 border-t border-[#141414]/10 bg-[#fdfdfb]">
        <div className="flex space-x-3 md:space-x-4 mb-4 overflow-x-auto custom-scrollbar pb-2">
          {["Explain today's highest risk", "Generate executive summary", "Analyze active permits in Boiler Room"].map(prompt => (
            <button 
              key={prompt}
              onClick={() => setInput(prompt)}
              className="whitespace-nowrap shrink-0 px-3 md:px-4 py-2 border border-[#141414]/20 bg-transparent hover:bg-[#141414]/5 text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-[#141414] transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="ASK AEGIS AI..."
            className="flex-1 bg-transparent border border-[#141414]/20 rounded-none pl-4 md:pl-6 pr-12 md:pr-14 py-3 md:py-4 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#141414] placeholder:text-[#141414]/30 focus:outline-none focus:border-[#141414] transition-colors"
          />
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 h-8 w-8 md:h-10 md:w-10 text-[#141414] hover:bg-[#141414]/5 rounded-none"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
