import React, { useState } from 'react';
import { X, Sparkles, Sliders, Type, Maximize, Palette } from 'lucide-react';

export default function PreviewGeneratorModal({ isOpen, onClose }) {
  const [text, setText] = useState('PRINTAGE');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(4);
  const [signType, setSignType] = useState('neon');
  const [color, setColor] = useState('#00d2ff');
  const [customFont, setCustomFont] = useState('default');
  const [textColor, setTextColor] = useState('#ffffff');

  if (!isOpen) return null;

  const fontOptions = [
    { value: 'default', label: 'Default for Material' },
    { value: '"Dancing Script", cursive, sans-serif', label: 'Cursive (Dancing Script)' },
    { value: '"Montserrat", sans-serif', label: 'Modern Bold (Montserrat)' },
    { value: '"Cinzel", serif', label: 'Elegant Serif (Cinzel)' },
    { value: '"Inter", sans-serif', label: 'Clean Sans (Inter)' },
    { value: '"Outfit", sans-serif', label: 'Rounded Sans (Outfit)' }
  ];

  const handleRequestQuote = () => {
    const phoneNumber = "919819221376";
    const getFontLabel = () => fontOptions.find(f => f.value === customFont)?.label || 'Default';
    
    let typeLabel = signType;
    if (signType === 'neon') typeLabel = 'Neon Flex Script';
    if (signType === 'led') typeLabel = '3D LED Letters';
    if (signType === 'metal') typeLabel = 'Brushed Gold Metal';
    if (signType === 'acrylic') typeLabel = 'Clear Acrylic Block';

    const message = `Hello PRINTAGE! I just generated a 3D Preview on your website and would like a quote for it:\n\n*Signage Text:* ${text}\n*Size:* ${width}ft (Width) x ${height}ft (Height)\n*Material:* ${typeLabel}\n*Font Style:* ${getFontLabel()}\n*Face Color:* ${textColor}\n*Glow/Backlight Color:* ${color}\n\nPlease let me know the estimated cost!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  // Generate CSS styles based on sign type
  const getPreviewStyle = () => {
    let baseStyle = {};
    
    switch (signType) {
      case 'neon':
        baseStyle = {
          fontFamily: customFont === 'default' ? '"Dancing Script", cursive, sans-serif' : customFont,
          color: textColor,
          textShadow: `0 0 5px ${textColor}, 0 0 10px ${textColor}, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
        };
        break;
      case 'led':
        baseStyle = {
          fontFamily: customFont === 'default' ? '"Montserrat", sans-serif' : customFont,
          fontWeight: 900,
          color: textColor,
          textShadow: `0 0 10px rgba(255,255,255,0.8), 0 0 20px ${color}, 0 0 30px ${color}`,
          WebkitTextStroke: '1px #dddddd'
        };
        break;
      case 'metal':
        baseStyle = {
          fontFamily: customFont === 'default' ? '"Cinzel", serif' : customFont,
          fontWeight: 800,
          background: textColor !== '#ffffff' ? textColor : 'linear-gradient(to bottom, #d4af37 0%, #aa7700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.8)) drop-shadow(0px 0px 10px rgba(212,175,55,0.4))'
        };
        break;
      case 'acrylic':
        baseStyle = {
          fontFamily: customFont === 'default' ? '"Inter", sans-serif' : customFont,
          fontWeight: 800,
          color: textColor,
          textShadow: '0 1px 1px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.1)',
          WebkitTextStroke: '2px rgba(255,255,255,0.5)',
          backdropFilter: 'blur(4px)'
        };
        break;
      default:
        baseStyle = {};
    }
    
    return baseStyle;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-5xl relative z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[650px] border border-slate-200">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Controls */}
        <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 sm:p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center space-x-2 mb-6 text-brand-600">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-black tracking-tight">3D Sign Preview</h2>
          </div>

          <div className="space-y-5">
            {/* Text Input */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                <Type className="w-4 h-4 text-slate-400" />
                <span>Signage Text</span>
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>

            {/* Font Family Selection */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                <Type className="w-4 h-4 text-slate-400" />
                <span>Font Style</span>
              </label>
              <select
                value={customFont}
                onChange={(e) => setCustomFont(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>{font.label}</option>
                ))}
              </select>
            </div>

            {/* Size Input (Volume System X and Y) */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                <Maximize className="w-4 h-4 text-slate-400" />
                <span>Estimated Size (Feet)</span>
              </label>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Width (X)</span>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Height (Y)</span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Type Selection */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                <Sliders className="w-4 h-4 text-slate-400" />
                <span>Signage Material</span>
              </label>
              <select
                value={signType}
                onChange={(e) => setSignType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              >
                <option value="neon">Neon Flex Script</option>
                <option value="led">3D LED Letters</option>
                <option value="metal">Brushed Gold Metal</option>
                <option value="acrylic">Clear Acrylic Block</option>
              </select>
            </div>

            {/* Color Pickers */}
            <div className="space-y-3">
              {/* Text Color Picker */}
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-sm font-bold text-slate-700">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-slate-400" />
                    <span>Text / Face Color</span>
                  </div>
                </label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="color" 
                    value={textColor} 
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-10 w-full rounded-xl cursor-pointer border border-slate-300"
                  />
                  <button 
                    onClick={() => setTextColor('#ffffff')}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-xs font-bold text-slate-700 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Glow Color Picker for Neon/LED */}
              {(signType === 'neon' || signType === 'led') && (
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 block">Backlight / Glow Color</label>
                  <div className="flex flex-wrap gap-2">
                    {/* Presets: White, Warm White/Golden, Red (R), Green (G), Blue (B) */}
                    {[
                      { color: '#ffffff', name: 'White' },
                      { color: '#ffc759', name: 'Golden / Warm' },
                      { color: '#ff0000', name: 'Red' },
                      { color: '#00ff00', name: 'Green' },
                      { color: '#0000ff', name: 'Blue' }
                    ].map(preset => (
                      <button
                        key={preset.color}
                        title={preset.name}
                        onClick={() => setColor(preset.color)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${color === preset.color ? 'scale-110 border-slate-900' : 'border-slate-200 hover:scale-105 shadow-sm'}`}
                        style={{ backgroundColor: preset.color }}
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full border border-slate-300 overflow-hidden shadow-sm relative ml-1">
                       <input 
                         type="color" 
                         value={color}
                         title="Custom Color"
                         onChange={(e) => setColor(e.target.value)}
                         className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
                       />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Generate / Quote Button */}
            <div className="pt-4 border-t border-slate-200">
              <button 
                onClick={handleRequestQuote}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center space-x-2"
              >
                <span>Request Detailed Quote</span>
                <Sparkles className="w-4 h-4" />
              </button>
              <p className="text-xs text-center text-slate-500 mt-2">
                Approximation only. Actual product may vary based on exact fonts and mounting.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Output / HTML Image Generate */}
        <div className="w-full md:w-2/3 bg-[#111] relative overflow-hidden flex items-center justify-center p-8 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px]">
          {/* Subtle background lighting based on color */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-[100px] opacity-20 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: color }}
          />
          
          <div className="relative z-10 text-center w-full max-w-2xl break-words">
            <p 
              className="transition-all duration-300 w-full"
              style={{
                ...getPreviewStyle(),
                fontSize: text.length > 10 ? '4rem' : '6rem',
                lineHeight: '1.2'
              }}
            >
              {text || 'Signage'}
            </p>
            
            {/* Size Scale Reference */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-slate-500 text-xs font-mono border-t border-slate-700 pt-2 w-full max-w-sm flex justify-between px-4">
              <span>◄</span>
              <span>{width} ft Width &times; {height} ft Height</span>
              <span>►</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
