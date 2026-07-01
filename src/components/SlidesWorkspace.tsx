import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Presentation, 
  Plus, 
  Sparkles, 
  Search, 
  Layers, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  LogOut, 
  FileCheck, 
  FileText, 
  Calendar,
  Grid,
  ChevronRight,
  RefreshCw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/firebase';
import { User } from 'firebase/auth';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  webViewLink?: string;
}

export default function SlidesWorkspace() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'generate' | 'browse'>('generate');

  // Generator states
  const [deckTemplate, setDeckTemplate] = useState('saas');
  const [customGoals, setCustomGoals] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedDeckUrl, setGeneratedDeckUrl] = useState<string | null>(null);
  const [generatedDeckId, setGeneratedDeckId] = useState<string | null>(null);

  // Browser states
  const [presentations, setPresentations] = useState<DriveFile[]>([]);
  const [isLoadingBrowse, setIsLoadingBrowse] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPresentationId, setSelectedPresentationId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (userRecord, accessToken) => {
        setUser(userRecord);
        setToken(accessToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch presentations once authenticated
  useEffect(() => {
    if (token && user) {
      fetchPresentations();
    }
  }, [token, user]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setNeedsAuth(false);
        showNotification('success', `Signed in successfully as ${res.user.displayName}`);
      }
    } catch (err: any) {
      console.error(err);
      showNotification('error', err.message || 'Authentication failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setPresentations([]);
      setSelectedPresentationId(null);
      setGeneratedDeckUrl(null);
      showNotification('success', 'Logged out successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchPresentations = async () => {
    if (!token) return;
    setIsLoadingBrowse(true);
    try {
      // Fetch files of mimeType Google Slides from Google Drive API
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.presentation' and trashed=false&fields=files(id,name,mimeType,modifiedTime,webViewLink)&orderBy=modifiedTime desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'Failed to list presentations');
      }
      const data = await response.json();
      setPresentations(data.files || []);
    } catch (err: any) {
      console.error(err);
      showNotification('error', err.message || 'Error loading presentations');
    } finally {
      setIsLoadingBrowse(false);
    }
  };

  // Generate complete pitch deck slides
  const handleGenerateDeck = async () => {
    if (!token) return;
    setIsGenerating(true);
    setGenerationLogs([]);
    setGeneratedDeckUrl(null);
    setGeneratedDeckId(null);

    const log = (msg: string) => {
      setGenerationLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    try {
      log('📡 Initializing Slides generator pipeline...');
      let title = 'Project Proposal';
      let slide1_title = 'The Vision';
      let slide1_text = 'Next-gen high-fidelity web app structured with speed.';
      let slide2_title = 'Scope Breakdown';
      let slide2_text = 'React 19 Frontend + Tailwind v4 CSS UI elements.';
      let slide3_title = 'Cost & Timelines';
      let slide3_text = 'Flat $560 USD budget. 100% Client-Owned source repository.';

      if (deckTemplate === 'saas') {
        title = 'Nova SaaS Interface Proposal';
        slide1_title = 'SaaS Dashboard Vision';
        slide1_text = 'An advanced analytics hub leveraging responsive glassmorphic card grids, fluid data graphs, and state managers.';
        slide2_title = 'Key Integrations';
        slide2_text = '• Interactive metrics charts (Recharts/D3)\n• Standard client caching (localStorage)\n• Auth workflows and account setup forms';
        slide3_title = 'Flat Budget & Timeline';
        slide3_text = '• Investment: Flat $560 USD\n• Delivery Target: 3 Days Max\n• Client Ownership: 100% full source control';
      } else if (deckTemplate === 'ecommerce') {
        title = 'Genesis E-Commerce Blueprint';
        slide1_title = 'E-Commerce Storefront';
        slide1_text = 'A premium digital storefront featuring dynamic cart triggers, fluid product listings, and streamlined checkout pathways.';
        slide2_title = 'Technical Stack';
        slide2_text = '• Custom Stripe Payment checkout portals\n• Mobile-first responsive grid frameworks\n• Dynamic item search filters & tags';
        slide3_title = '3-Day Delivery Promise';
        slide3_text = '• Full development & launch: $560\n• Hosting setup: Free cloud tier (Vercel/Netlify)\n• Direct payment routing structure';
      } else {
        title = 'Custom Web App Spec Pitch';
        slide1_title = 'Bespoke AI Architecture';
        slide1_text = customGoals || 'Custom web portal or single-page React solution optimized for speed, performance, and responsive layout guidelines.';
        slide2_title = 'Engineered Highlights';
        slide2_text = '• Custom client-side controllers and states\n• Micro-interactions & framer motion timelines\n• Intake validation forms and dashboards';
        slide3_title = 'The $560 Guarantee';
        slide3_text = '• Zero overhead cost overruns\n• Completed testing and compilation\n• Fully production-ready deployment';
      }

      // Step 1: Create presentation
      log('Creating new Google Slides presentation file...');
      const createRes = await fetch('https://www.googleapis.com/slides/v1/presentations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `DRK2FOK: ${title}`,
        }),
      });

      if (!createRes.ok) {
        throw new Error('Failed to create base presentation.');
      }
      const presentationObj = await createRes.json();
      const presentationId = presentationObj.presentationId;
      log(`Presentation created successfully with ID: ${presentationId}`);

      // Step 2: Inject slides and build layout
      log('Orchestrating slides and compiling layout designs...');
      
      const requests = [
        // Slide 1 - Title slide text
        {
          createSlide: {
            objectId: 'slide_vision',
            insertionIndex: 1,
            slideLayoutReference: { predefinedLayout: 'BLANK' }
          }
        },
        {
          createShape: {
            objectId: 'vision_title_box',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: 'slide_vision',
              size: { height: { magnitude: 120, unit: 'PT' }, width: { magnitude: 600, unit: 'PT' } },
              transform: { scaleX: 1, scaleY: 1, translateX: 50, translateY: 60, unit: 'PT' }
            }
          }
        },
        {
          insertText: {
            objectId: 'vision_title_box',
            text: slide1_title,
            insertionIndex: 0
          }
        },
        {
          createShape: {
            objectId: 'vision_body_box',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: 'slide_vision',
              size: { height: { magnitude: 200, unit: 'PT' }, width: { magnitude: 600, unit: 'PT' } },
              transform: { scaleX: 1, scaleY: 1, translateX: 50, translateY: 180, unit: 'PT' }
            }
          }
        },
        {
          insertText: {
            objectId: 'vision_body_box',
            text: slide1_text,
            insertionIndex: 0
          }
        },

        // Slide 2 - Scope
        {
          createSlide: {
            objectId: 'slide_scope',
            insertionIndex: 2,
            slideLayoutReference: { predefinedLayout: 'BLANK' }
          }
        },
        {
          createShape: {
            objectId: 'scope_title_box',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: 'slide_scope',
              size: { height: { magnitude: 100, unit: 'PT' }, width: { magnitude: 600, unit: 'PT' } },
              transform: { scaleX: 1, scaleY: 1, translateX: 50, translateY: 60, unit: 'PT' }
            }
          }
        },
        {
          insertText: {
            objectId: 'scope_title_box',
            text: slide2_title,
            insertionIndex: 0
          }
        },
        {
          createShape: {
            objectId: 'scope_body_box',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: 'slide_scope',
              size: { height: { magnitude: 220, unit: 'PT' }, width: { magnitude: 600, unit: 'PT' } },
              transform: { scaleX: 1, scaleY: 1, translateX: 50, translateY: 160, unit: 'PT' }
            }
          }
        },
        {
          insertText: {
            objectId: 'scope_body_box',
            text: slide2_text,
            insertionIndex: 0
          }
        },

        // Slide 3 - Budget & Contract details
        {
          createSlide: {
            objectId: 'slide_budget',
            insertionIndex: 3,
            slideLayoutReference: { predefinedLayout: 'BLANK' }
          }
        },
        {
          createShape: {
            objectId: 'budget_title_box',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: 'slide_budget',
              size: { height: { magnitude: 100, unit: 'PT' }, width: { magnitude: 600, unit: 'PT' } },
              transform: { scaleX: 1, scaleY: 1, translateX: 50, translateY: 60, unit: 'PT' }
            }
          }
        },
        {
          insertText: {
            objectId: 'budget_title_box',
            text: slide3_title,
            insertionIndex: 0
          }
        },
        {
          createShape: {
            objectId: 'budget_body_box',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: 'slide_budget',
              size: { height: { magnitude: 220, unit: 'PT' }, width: { magnitude: 600, unit: 'PT' } },
              transform: { scaleX: 1, scaleY: 1, translateX: 50, translateY: 160, unit: 'PT' }
            }
          }
        },
        {
          insertText: {
            objectId: 'budget_body_box',
            text: slide3_text,
            insertionIndex: 0
          }
        },
      ];

      // Send batch update
      log('Compiling slide shape components and styling typography elements...');
      const batchUpdateRes = await fetch(
        `https://www.googleapis.com/slides/v1/presentations/${presentationId}:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requests }),
        }
      );

      if (!batchUpdateRes.ok) {
        throw new Error('Failed to update slides contents.');
      }

      log('Applying theme aesthetics & final asset parameters...');
      
      const fileLink = `https://docs.google.com/presentation/d/${presentationId}/edit`;
      setGeneratedDeckUrl(fileLink);
      setGeneratedDeckId(presentationId);
      log('✨ Presentation generated successfully in Google Drive!');
      showNotification('success', 'Slide presentation successfully compiled!');
      
      // Refresh browse list
      fetchPresentations();
    } catch (err: any) {
      console.error(err);
      log(`❌ Error: ${err.message || 'Generation aborted.'}`);
      showNotification('error', err.message || 'Failed to compile slides');
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredPresentations = presentations.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="slides-section" className="py-20 md:py-24 relative bg-cyber-card/10 border-y border-white/5">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyber-blue/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1 bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase mb-4 tracking-wider">
              <Presentation className="w-3.5 h-3.5" /> Workspace Integration
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Pitch Deck Compiler
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-sans">
              Create and preview custom startup pitch decks directly inside your client portal. Authenticate with Google to dynamically orchestrate live presentations in your Google Drive.
            </p>
          </div>

          {/* User profile controls */}
          <div>
            {needsAuth ? (
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="gsi-material-button relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium text-white rounded-xl group bg-gradient-to-br from-cyber-teal to-cyber-blue hover:text-cyber-dark focus:ring-4 focus:outline-none focus:ring-cyber-teal/30 cursor-pointer disabled:opacity-50"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyber-dark rounded-lg group-hover:bg-opacity-0 flex items-center gap-2">
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin text-cyber-teal" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  )}
                  Authenticate with Google Slides
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-4 bg-cyber-card/60 border border-white/10 p-2 pr-4 rounded-xl">
                <img
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                  alt={user?.displayName || 'User profile'}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg border border-white/10"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white">{user?.displayName}</span>
                  <span className="text-[10px] text-gray-400 truncate max-w-44">{user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Global Notification */}
        {notification && (
          <div className={`p-4 mb-8 rounded-xl border flex items-center gap-3 animate-fade-in ${
            notification.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-xs font-medium">{notification.message}</span>
          </div>
        )}

        {needsAuth ? (
          /* Authentication Required Splash */
          <div className="bg-cyber-card border border-white/5 rounded-2xl p-12 text-center max-w-3xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-white/3 rounded-full flex items-center justify-center mx-auto text-cyber-blue">
              <Presentation className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-white">Google Slides Auth Required</h3>
              <p className="text-sm text-gray-400 max-w-lg mx-auto">
                Sign in with Google to enable presentation automation. Once authenticated, DRK2FOK can compile custom interactive pitch decks directly into your Google Drive folder for review.
              </p>
            </div>
            <button
              onClick={handleLogin}
              className="py-3 px-6 bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-dark font-display font-bold text-xs rounded-xl shadow-lg hover:shadow-cyber-teal/15 hover:opacity-95 transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              Sign In with Google Account
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Workspace Interface */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Sidebar - Left 5 Columns */}
            <div className="lg:col-span-5 space-y-6">
              {/* Tab selector */}
              <div className="flex bg-white/2 border border-white/5 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('generate')}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'generate'
                      ? 'bg-cyber-teal text-cyber-dark font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  AI Deck Compiler
                </button>
                <button
                  onClick={() => {
                    setActiveTab('browse');
                    fetchPresentations();
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'browse'
                      ? 'bg-cyber-teal text-cyber-dark font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  My Drive Decks ({presentations.length})
                </button>
              </div>

              {/* Tab contents */}
              <div className="bg-cyber-card border border-white/5 rounded-2xl p-6 shadow-xl space-y-6 text-left">
                {activeTab === 'generate' ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white mb-1">
                        Build Google Pitch Deck
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Design professional slide assets based on your $560 project specification.
                      </p>
                    </div>

                    {/* Template selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                        Select Deck Theme Blueprint
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'saas', name: 'SaaS Nova' },
                          { id: 'ecommerce', name: 'E-com Genesis' },
                          { id: 'custom', name: 'Custom App' }
                        ].map((tpl) => (
                          <button
                            key={tpl.id}
                            onClick={() => setDeckTemplate(tpl.id)}
                            className={`py-2 px-1 border rounded-lg text-xs font-mono transition-all text-center truncate cursor-pointer ${
                              deckTemplate === tpl.id
                                ? 'bg-cyber-teal/10 border-cyber-teal text-cyber-teal'
                                : 'bg-cyber-dark border-white/5 text-gray-400 hover:border-white/10'
                            }`}
                          >
                            {tpl.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom guidelines for custom template */}
                    {deckTemplate === 'custom' && (
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                          Custom Slide Deck Instructions
                        </label>
                        <textarea
                          rows={4}
                          value={customGoals}
                          onChange={(e) => setCustomGoals(e.target.value)}
                          placeholder="Provide the startup vision or custom specifications. Our compiler will automatically translate these into bullet points."
                          className="w-full bg-cyber-dark/60 border border-white/15 focus:border-cyber-teal rounded-xl p-3 text-xs text-white focus:outline-none transition-colors resize-none"
                        ></textarea>
                      </div>
                    )}

                    {/* Price banner */}
                    <div className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-cyber-teal" />
                        <span className="text-gray-300">Generated file saved in Google Drive</span>
                      </div>
                      <span className="font-mono text-emerald-400">FREE API</span>
                    </div>

                    {/* Generate trigger */}
                    <button
                      onClick={handleGenerateDeck}
                      disabled={isGenerating}
                      className="w-full py-3 bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-dark font-display font-bold text-xs rounded-xl shadow-lg hover:shadow-cyber-teal/15 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-cyber-dark" />
                          Orchestrating Slide Shapes...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Compile Slides Presentation
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-base text-white">
                        Presentations Explorer
                      </h3>
                      <button
                        onClick={fetchPresentations}
                        disabled={isLoadingBrowse}
                        className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/5 cursor-pointer"
                        title="Reload list"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingBrowse ? 'animate-spin text-cyber-teal' : ''}`} />
                      </button>
                    </div>

                    {/* Search box */}
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search presentations..."
                        className="w-full bg-cyber-dark/60 border border-white/10 focus:border-cyber-teal rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    {/* List */}
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {isLoadingBrowse ? (
                        <div className="flex flex-col items-center py-8 text-gray-500 space-y-2">
                          <Loader2 className="w-6 h-6 animate-spin text-cyber-teal" />
                          <span className="text-[10px] font-mono">Fetching Drive Index...</span>
                        </div>
                      ) : filteredPresentations.length === 0 ? (
                        <div className="text-center py-8 border border-dashed border-white/10 rounded-xl text-gray-500">
                          <p className="text-xs font-mono">No presentations found in Drive.</p>
                        </div>
                      ) : (
                        filteredPresentations.map((pres) => (
                          <button
                            key={pres.id}
                            onClick={() => setSelectedPresentationId(pres.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              selectedPresentationId === pres.id
                                ? 'bg-cyber-teal/5 border-cyber-teal'
                                : 'bg-cyber-dark/40 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="min-w-0 flex-1 flex items-center gap-2.5">
                              <Presentation className="w-4 h-4 text-cyber-blue shrink-0 animate-pulse" />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate">{pres.name}</p>
                                <p className="text-[9px] text-gray-500 font-mono">Modified: {new Date(pres.modifiedTime).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Display / Review Panel - Right 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              {/* Terminal Logs for active compilation */}
              {isGenerating && (
                <div className="bg-cyber-dark/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-white/3 px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-cyber-teal" />
                      <span className="text-xs font-mono font-medium text-gray-300">google_slides_compiler.sh</span>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                      <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
                      <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                    </div>
                  </div>
                  <div className="p-4 font-mono text-[10px] sm:text-xs leading-relaxed text-gray-300 min-h-[160px] max-h-[220px] overflow-y-auto space-y-1.5 text-left bg-cyber-dark">
                    {generationLogs.map((logLine, idx) => (
                      <p key={idx} className="text-cyber-teal truncate">
                        {logLine}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Presentation Preview IFrame */}
              <div className="bg-cyber-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[400px]">
                {/* Panel Header */}
                <div className="px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/2 text-left">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyber-teal" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Live Presentation Portal</h3>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {selectedPresentationId || generatedDeckId ? 'Active Slide Frame' : 'Select or compile a presentation to preview'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action link */}
                  {(selectedPresentationId || generatedDeckId) && (
                    <a
                      href={`https://docs.google.com/presentation/d/${selectedPresentationId || generatedDeckId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-cyber-teal hover:text-white flex items-center gap-1.5 cursor-pointer bg-cyber-teal/10 border border-cyber-teal/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Open in Slides <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Preview Frame Area */}
                <div className="flex-1 bg-cyber-dark/40 flex items-center justify-center p-4 relative min-h-[300px]">
                  {selectedPresentationId || generatedDeckId ? (
                    <div className="w-full h-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-cyber-dark">
                      <iframe
                        src={`https://docs.google.com/presentation/d/${selectedPresentationId || generatedDeckId}/embed?start=false&loop=false&delayms=3000`}
                        width="100%"
                        height="100%"
                        allowFullScreen
                        title="Google Slides Viewer"
                        className="border-0 w-full h-full min-h-[300px] sm:min-h-[380px]"
                      ></iframe>
                    </div>
                  ) : (
                    /* Blank Placeholder State */
                    <div className="text-center space-y-4 max-w-sm p-6">
                      <div className="w-12 h-12 rounded-full bg-white/3 flex items-center justify-center mx-auto text-gray-500">
                        <Presentation className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white">No slide deck selected</p>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Either use the AI Compiler to assemble a project presentation automatically, or browse presentations in your connected Google Drive folder.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
