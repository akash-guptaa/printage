import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Phone, MessageCircle, Home, ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 selection:bg-brand-500 selection:text-white">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top decorative accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-amber-500 to-emerald-500" />

            {/* Header with Logo & Alert badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/printage-logo.png" 
                  alt="PRINTAGE Signage Hub" 
                  className="h-10 w-auto object-contain bg-white/10 rounded-lg p-1"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div>
                  <span className="text-lg font-black tracking-wider text-white uppercase">PRINTAGE</span>
                  <p className="text-xs text-slate-400">Signage & Neon Works • Bhayandar West</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-3 mb-6">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-red-950/60 border border-red-800/40 rounded-full text-xs font-semibold text-red-300">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Application Recovery Shield</span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Oops! Something went unexpected
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                A rendering issue occurred. Don't worry—our team at PRINTAGE is ready to assist you right now via direct phone or WhatsApp.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>

            {/* Direct Connect Options */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Immediate Assistance & Free Signage Estimates
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:09819221376"
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-700 text-sm font-semibold transition-all"
                >
                  <Phone className="w-4 h-4 text-brand-400" />
                  <span>Call 098192 21376 / 74004 22742</span>
                </a>
                <a
                  href="https://wa.me/919819221376?text=Hi%20Printage,%20I%20am%20on%20your%20website%20and%20need%20a%20quote%20for%20signage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 text-center">
                Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West
              </p>
            </div>

            {/* Technical diagnostics */}
            {this.state.error && (
              <details className="group border border-slate-800 rounded-lg p-3 bg-slate-950/40 text-left">
                <summary className="text-xs font-mono text-slate-400 cursor-pointer hover:text-slate-300 select-none flex items-center justify-between">
                  <span>Technical Diagnostics</span>
                  <span className="text-[10px] text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-red-300/80 overflow-x-auto max-h-32">
                  <p className="font-bold">{this.state.error.toString()}</p>
                  {this.state.errorInfo && (
                    <pre className="mt-1 text-[10px] text-slate-500 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
