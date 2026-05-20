
"use client";

import React, { useState } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Code2, Search, Download, Copy, Brain, Loader2, CheckCircle2 } from 'lucide-react';
import { aiSourceCodeAnalyzer, type AiSourceCodeAnalyzerOutput } from '@/ai/flows/ai-source-code-analyzer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function SourceCodeAnalyzer() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AiSourceCodeAnalyzerOutput | null>(null);
  const [rawContent, setRawContent] = useState({ html: '', css: '', js: '' });

  const handleAnalyze = async () => {
    if (!url) return;
    setIsLoading(true);
    
    try {
      // Simulation of fetching content since browser CORS prevents real scraping
      const mockHtml = `<div class="app"><header><h1>${url.split('//')[1]}</h1></header></div>`;
      const mockCss = `body { background: #000; color: #fff; }`;
      const mockJs = `console.log("App initialized for ${url}");`;
      
      setRawContent({ html: mockHtml, css: mockCss, js: mockJs });
      
      const result = await aiSourceCodeAnalyzer({
        url,
        htmlContent: mockHtml,
        cssContent: mockCss,
        jsContent: mockJs
      });
      
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-obsidian overflow-hidden">
      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full flex-1 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
              <Code2 className="w-8 h-8 text-cyber-blue" />
              Source Code Extractor
            </h2>
            <p className="text-foreground/50 mt-1">Deep analysis and architectural decomposition using Riza AI.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">
              <Download className="w-4 h-4 mr-2" />
              Export Bundle
            </Button>
            <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <input
                type="text"
                placeholder="Enter target URL to analyze (e.g. https://github.com)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-cyber-blue/20 transition-all font-medium"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading || !url}
              className="h-auto px-8 rounded-2xl bg-cyber-blue hover:bg-cyber-blue/80 text-white font-bold"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Run AI Analysis'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Analysis Results */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-cyber-purple">
                <Brain className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">AI Intelligence Report</span>
              </div>
              
              {analysis ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest opacity-40">Architectural Summary</h4>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 leading-relaxed text-sm">
                      {analysis.architecturalSummary}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest opacity-40">Code Logic Explanation</h4>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 leading-relaxed text-sm">
                      {analysis.codeLogicExplanation}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl opacity-30">
                  <Brain className="w-12 h-12 mb-4" />
                  <p className="text-sm font-medium">Input a URL to begin analysis</p>
                </div>
              )}
            </div>

            {/* Code Viewers */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-cyber-blue">
                <Code2 className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Raw Asset Streams</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold uppercase opacity-40">HTML Stream</span>
                    {analysis && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                  </div>
                  <div className="bg-obsidian/50 rounded-xl p-4 border border-white/10 font-code text-xs overflow-x-auto whitespace-pre h-32">
                    {rawContent.html || '// Stream pending...'}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold uppercase opacity-40">JS Logic Stream</span>
                    {analysis && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                  </div>
                  <div className="bg-obsidian/50 rounded-xl p-4 border border-white/10 font-code text-xs overflow-x-auto whitespace-pre h-32">
                    {rawContent.js || '// Logic pending...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
