import { Phone, Mail, Award, MessageCircle, MapPin, ShoppingBag } from 'lucide-react';

export default function TopBar({ onOpenQuoteModal, onSwitchToLanding }) {
  const whatsappMessage = encodeURIComponent(
    "Hello PRINTAGE! I would like to get a quote and consultation for business signage."
  );

  return (
    <div className="bg-black text-slate-300 text-xs py-2 px-4 border-b border-neutral-800 hidden md:block overflow-hidden whitespace-nowrap">
      <div className="max-w-7xl mx-auto flex flex-nowrap items-center justify-between gap-3 xl:gap-6">
        
        {/* Left: Contact info matching screenshot */}
        <div className="flex items-center space-x-4 shrink-0 text-slate-300 font-medium">
          <a 
            href={`https://wa.me/919819221376?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-white hover:text-emerald-400 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-current shrink-0" />
            <span>WhatsApp - 098192 21376</span>
          </a>

          <span className="text-neutral-700">|</span>

          <a 
            href="mailto:printage01@gmail.com" 
            className="flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span>printage01@gmail.com</span>
          </a>

          <span className="text-neutral-700 hidden lg:inline">|</span>

          <a
            href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwj4yJSQ9oyXAxUAAAAAHQAAAAAQCA..i&hl=en-IN&sca_esv=69f18be9691a8a30&udm&fvr=1&pvq=Cg0vZy8xMWg3NmxxdG13Ig4KCFByaW50YWdlEAIYAw&lqi=CghQcmludGFnZUj7zK3pnK-AgAhaDhAAGAAiCHByaW50YWdlkgEKcHJpbnRfc2hvcA&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3be7b14ccc83eda5:0x9ba9967d6d8f5047"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center space-x-1.5 text-slate-400 hover:text-brand-400 transition-colors"
            title="Open Shop No. 8 on Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span>Shop No. 8, Raghuleela Bldg, Bhayandar West</span>
          </a>
        </div>

        {/* Right: 0 Items Cart (from screenshot) & Ad Switcher */}
        <div className="flex items-center space-x-4 shrink-0">
          {onSwitchToLanding && (
            <button
              onClick={onSwitchToLanding}
              className="text-amber-300 hover:text-amber-200 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all"
            >
              ⚡ Ad Landing Mode
            </button>
          )}

          <button
            onClick={onOpenQuoteModal}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="View Quote Estimation Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
            <span>0 Items</span>
          </button>
        </div>
      </div>
    </div>
  );
}
