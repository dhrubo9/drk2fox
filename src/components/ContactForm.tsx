import React, { useState, useEffect } from 'react';
import { Send, Terminal, Shield, Inbox, CheckCircle2, Cpu, AlertCircle, RefreshCw, FolderClosed } from 'lucide-react';
import { ContactRequest } from '../types';

interface ContactFormProps {
  appliedSpecText: string;
}

export default function ContactForm({ appliedSpecText }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('landing');
  const [description, setDescription] = useState('');

  // Form submission / simulation states
  const [submitPhase, setSubmitPhase] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [activeRequest, setActiveRequest] = useState<ContactRequest | null>(null);
  const [requestHistory, setRequestHistory] = useState<ContactRequest[]>([]);

  // Sync with applied specifications
  useEffect(() => {
    if (appliedSpecText) {
      setDescription(appliedSpecText);
    }
  }, [appliedSpecText]);

  // Load existing records from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('drk2fok_requests');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ContactRequest[];
        setRequestHistory(parsed);
        if (parsed.length > 0) {
          // Default to showing the latest one in portal tracker
          setActiveRequest(parsed[parsed.length - 1]);
        }
      } catch (e) {
        console.error('Error parsing requests', e);
      }
    }
  }, []);

  const saveRequest = (req: ContactRequest) => {
    const updated = [...requestHistory.filter((r) => r.id !== req.id), req];
    setRequestHistory(updated);
    setActiveRequest(req);
    localStorage.setItem('drk2fok_requests', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    localStorage.removeItem('drk2fok_requests');
    setRequestHistory([]);
    setActiveRequest(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) return;

    setSubmitPhase('analyzing');
    setLogMessages([]);

    const messages = [
      '⚡ Connecting to DRK2FOK Secure Ingress Gate...',
      '🔍 Parsing form parameters & contact schema...',
      '🤖 Instantiating AI specifications compiler...',
      '📋 Standardizing build objectives (Page scale & features)...',
      '📦 Validating $560 USD flat budget ledger...',
      '💾 Persisting custom blueprint data to browser sandbox...',
      '✨ Project Workspace registered successfully!'
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < messages.length) {
        setLogMessages((prev) => [...prev, messages[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Generate actual request record
          const newRequest: ContactRequest = {
            id: 'req-' + Date.now(),
            name,
            email,
            companyName: company || 'Bespoke Startup',
            projectType,
            description,
            date: new Date().toLocaleDateString(),
            status: 'Received'
          };
          saveRequest(newRequest);
          setSubmitPhase('completed');
          // Clear inputs
          setName('');
          setEmail('');
          setCompany('');
          setDescription('');
        }, 600);
      }
    }, 450);
  };

  // Simulate updates in the client portal tracker
  const handleSimulateStatusUpdate = () => {
    if (!activeRequest) return;
    const statuses: ContactRequest['status'][] = [
      'Received',
      'AI Analyzing',
      'Drafting Schema',
      'Building',
      'Review Ready'
    ];
    const curIdx = statuses.indexOf(activeRequest.status);
    const nextIdx = (curIdx + 1) % statuses.length;
    const updated: ContactRequest = {
      ...activeRequest,
      status: statuses[nextIdx]
    };
    saveRequest(updated);
  };

  return (
    <section id="contact" className="py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Workspace Portal - Left Side */}
          <div className="lg:col-span-7">
            {submitPhase === 'idle' && (
              <div className="bg-cyber-card border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-2">
                    Start Your Build
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans">
                    Lock in your custom React deployment for exactly $560. Complete the form parameters to boot the compiler.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-cyber-dark/60 border border-white/15 focus:border-cyber-teal rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-cyber-dark/60 border border-white/15 focus:border-cyber-teal rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="My Business LLC"
                        className="w-full bg-cyber-dark/60 border border-white/15 focus:border-cyber-teal rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                        Project Category
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-cyber-dark border border-white/15 focus:border-cyber-teal rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      >
                        <option value="landing">Premium Landing Page</option>
                        <option value="saas">SaaS Dashboard UI</option>
                        <option value="ecommerce">E-Commerce Storefront</option>
                        <option value="custom">Custom Web Portal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 flex justify-between">
                      <span>Project Details & Brief *</span>
                      <span className="text-cyber-teal lowercase font-normal">use spec sheet above for automatic load</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detail the screens, features, or integrations you require. (e.g. Include custom Stripe portal, dynamic cart layout, contact hooks...)"
                      className="w-full bg-cyber-dark/60 border border-white/15 focus:border-cyber-teal rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none font-sans"
                    ></textarea>
                  </div>

                  {/* Pricing locked Badge */}
                  <div className="bg-white/2 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-cyber-teal" />
                      <div>
                        <p className="text-xs font-bold text-white">Flat Pricing Locked</p>
                        <p className="text-[10px] text-gray-500">Includes complete responsive development, assets, and 3-day delivery.</p>
                      </div>
                    </div>
                    <div className="font-display font-black text-xl text-cyber-teal">$560</div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-dark font-display font-bold rounded-xl shadow-lg hover:shadow-cyber-teal/15 hover:opacity-95 cursor-pointer transition-all flex items-center justify-center gap-2 group"
                  >
                    Transmit Project Brief <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </div>
            )}

            {/* Submission Log Simulator */}
            {submitPhase === 'analyzing' && (
              <div className="bg-cyber-card border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl min-h-[460px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Cpu className="w-5 h-5 text-cyber-teal animate-spin" />
                    <span className="text-xs font-mono text-gray-400">Spec compilation terminal</span>
                  </div>
                  <div className="space-y-3 font-mono text-xs sm:text-sm text-gray-300">
                    {logMessages.map((msg, i) => (
                      <p key={i} className="animate-fade-in text-cyber-teal">
                        {msg}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="text-center text-xs text-gray-500 font-mono">
                  DO NOT CLOSE THIS TAB • AI COMPILES CODES...
                </div>
              </div>
            )}

            {/* Successful Submission & Live Client Portal */}
            {submitPhase === 'completed' && activeRequest && (
              <div className="bg-cyber-card border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase mb-2">
                      <CheckCircle2 className="w-3 h-3" /> Live Client Portal Active
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white">
                      Project Tracker
                    </h3>
                  </div>
                  <button
                    onClick={() => setSubmitPhase('idle')}
                    className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </div>

                {/* Pipeline visualizer */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                    <span>BUILD STATUS: <strong className="text-cyber-teal uppercase">{activeRequest.status}</strong></span>
                    <span>FLAT PRICE: $560</span>
                  </div>

                  {/* Progress Line */}
                  <div className="grid grid-cols-5 gap-1 pt-2">
                    {['Received', 'AI Analyzing', 'Drafting Schema', 'Building', 'Review Ready'].map((step, idx) => {
                      const statuses = ['Received', 'AI Analyzing', 'Drafting Schema', 'Building', 'Review Ready'];
                      const curIdx = statuses.indexOf(activeRequest.status);
                      const isComplete = idx <= curIdx;
                      return (
                        <div key={step} className="flex flex-col gap-1.5">
                          <div
                            className={`h-2 rounded transition-all duration-300 ${
                              isComplete ? 'bg-cyber-teal shadow-sm shadow-cyber-teal/30' : 'bg-white/5'
                            }`}
                          ></div>
                          <span
                            className={`text-[9px] font-mono leading-none truncate ${
                              isComplete ? 'text-white font-semibold' : 'text-gray-500'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Milestone trigger */}
                <div className="p-4 bg-cyber-dark/60 rounded-xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white mb-1 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-cyber-teal" /> Simulated Developer Pipeline Controls
                    </h4>
                    <p className="text-[10px] text-gray-400">
                      As an AI Website Developer, DRK2FOK publishes live progression loops. Click the button to advance milestones.
                    </p>
                  </div>
                  <button
                    onClick={handleSimulateStatusUpdate}
                    className="w-full sm:w-auto shrink-0 px-4 py-2 bg-cyber-teal/10 hover:bg-cyber-teal/20 text-cyber-teal border border-cyber-teal/20 text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Advance Status
                  </button>
                </div>

                {/* Spec details card */}
                <div className="p-5 bg-white/2 rounded-xl border border-white/5 space-y-4 font-sans text-sm text-gray-300">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-b border-white/5 pb-2">
                    <span>CONTRACT RECORD: {activeRequest.id}</span>
                    <span>SUBMITTED: {activeRequest.date}</span>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Company / Project name</p>
                    <p className="font-bold text-white">{activeRequest.companyName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Project Brief parameters</p>
                    <pre className="text-xs font-mono bg-cyber-dark/40 p-3 rounded-lg border border-white/5 text-gray-300 overflow-x-auto whitespace-pre-wrap">
                      {activeRequest.description}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Portfolio FAQ & Sidebar Cards - Right Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-cyber-card border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="font-display font-semibold text-lg text-white mb-2 flex items-center gap-2">
                <FolderClosed className="w-5 h-5 text-cyber-teal" /> Your Briefing History
              </h3>

              {requestHistory.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-white/10 rounded-xl text-gray-500">
                  <p className="text-xs font-mono">No briefs synchronized in this browser.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {requestHistory.map((req) => (
                    <button
                      key={req.id}
                      onClick={() => {
                        setActiveRequest(req);
                        setSubmitPhase('completed');
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        activeRequest?.id === req.id
                          ? 'bg-cyber-teal/5 border-cyber-teal'
                          : 'bg-white/2 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white truncate max-w-48">{req.companyName || 'Custom Project'}</span>
                        <span className="text-[9px] font-mono bg-cyber-teal/10 text-cyber-teal px-1.5 py-0.5 rounded">
                          {req.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                        <span>{req.date}</span>
                        <span>$560 LOCKED</span>
                      </div>
                    </button>
                  ))}

                  <div className="pt-2 text-right">
                    <button
                      onClick={handleClearHistory}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                    >
                      Clear Portal Cache
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Contact Info */}
            <div className="bg-cyber-card border border-white/5 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyber-blue">
                <AlertCircle className="w-4 h-4" />
                <span>DIRECT CHANNELS:</span>
              </div>
              <div className="p-3 bg-cyber-dark/40 rounded-lg space-y-1">
                <p className="text-gray-500">DEVELOPER INBOX:</p>
                <p className="text-white font-medium">dhruboroy3429@gmail.com</p>
              </div>
              <div className="p-3 bg-cyber-dark/40 rounded-lg space-y-1">
                <p className="text-gray-500">AVAILABILITY ENGINE:</p>
                <p className="text-emerald-400 font-medium">ONLINE • BOOKING NOW</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
