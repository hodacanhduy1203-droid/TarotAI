import React, { useState, useEffect, useRef } from 'react';
import { FULL_DECK, SPREAD_INFO } from './constants';
import { SpreadType, DrawnCard, TarotCardData } from './types';
import { Card } from './components/Card';
import { interpretReading } from './services/geminiService';
import { soundService } from './services/soundService';
import { Sparkles, RefreshCcw, Loader2, ArrowLeft, ScrollText, Download, X, MoreVertical, Share, ArrowUpRight, Globe, Copy, Check, Smartphone, Monitor, LogIn, Volume2, VolumeX, Key } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'shuffling' | 'reading'>('home');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>(SpreadType.ONE_CARD);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [interpretation, setInterpretation] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // PWA State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isMobileUserAgent, setIsMobileUserAgent] = useState(false);
  const [hasSelectedKey, setHasSelectedKey] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  // Track the most recently revealed card to show its meaning immediately
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  const interpretationRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Detect iOS safely
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIosDevice);

    // Detect generic mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobileUserAgent(isMobile);

    // Check if already installed/standalone
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(isStandaloneMode);

    const checkKeyStatus = async () => {
      // 1. Check logic for AI Studio Applet
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        if (selected) {
          setHasSelectedKey(true);
          return;
        }
      }

      // 2. Check logic for Custom Domains (Vercel, etc)
      const manualKey = localStorage.getItem('MANUAL_GEMINI_API_KEY');
      if (manualKey) {
        setHasSelectedKey(true);
      }
    };
    checkKeyStatus();

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("Install prompt ready");
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    // If browser supports native install prompt, use it
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    } else {
      // Otherwise show manual instructions
      setShowInstallModal(true);
    }
  };

  const handleConnectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // Guidance: proceed as if successful
      setHasSelectedKey(true);
    } else {
      // Fallback for direct browser / custom domain (Vercel)
      setShowApiKeyModal(true);
    }
  };

  const ApiKeyModal = () => {
    const [keyInput, setKeyInput] = useState(localStorage.getItem('MANUAL_GEMINI_API_KEY') || '');
    
    const handleSaveKey = () => {
      if (keyInput.trim()) {
        localStorage.setItem('MANUAL_GEMINI_API_KEY', keyInput.trim());
        setHasSelectedKey(true);
        setShowApiKeyModal(false);
      } else {
        localStorage.removeItem('MANUAL_GEMINI_API_KEY');
        setHasSelectedKey(false);
        setShowApiKeyModal(false);
      }
    };

    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 animate-fadeIn backdrop-blur-md">
        <div className="bg-mystic-900 border border-mystic-700 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
          <button 
            onClick={() => setShowApiKeyModal(false)}
            className="absolute top-4 right-4 text-mystic-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          
          <h3 className="text-xl font-serif font-bold text-mystic-accent mb-4 flex items-center gap-2">
            <Key className="w-5 h-5" /> Kết nối Gemini cá nhân
          </h3>
          
          <p className="text-sm text-mystic-300 mb-4 leading-relaxed">
            Vì bạn đang dùng ứng dụng ngoài AI Studio, bạn cần nhập <strong>Gemini API Key</strong> của riêng mình để sử dụng AI.
          </p>

          <div className="bg-mystic-800 p-4 rounded-xl border border-mystic-700 mb-6 space-y-3">
             <ol className="list-decimal ml-4 text-xs text-mystic-200 space-y-2">
                <li>Truy cập <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className="text-mystic-accent underline font-bold">tại đây</a> để nhận Key miễn phí.</li>
                <li>Dán mã Key vào ô bên dưới.</li>
                <li>Nhấn "Lưu & Bắt đầu" để trải nghiệm.</li>
             </ol>
          </div>

          <input 
            type="password"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            placeholder="Dán API Key vào đây..."
            className="w-full bg-black/40 border border-mystic-600 rounded-lg p-3 text-white placeholder:text-mystic-700 focus:border-mystic-accent outline-none mb-6 font-mono text-sm"
          />

          <div className="flex gap-3">
            <button 
              onClick={() => setShowApiKeyModal(false)}
              className="flex-1 py-3 border border-mystic-600 rounded-xl text-mystic-400 hover:bg-mystic-800 transition-all font-bold"
            >
              Hủy
            </button>
            <button 
              onClick={handleSaveKey}
              className="flex-[2] py-3 bg-mystic-accent text-mystic-900 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg"
            >
              Lưu & Bắt đầu
            </button>
          </div>
        </div>
      </div>
    );
  };

  const toggleMute = () => {
    const newState = soundService.toggleMute();
    setIsMuted(newState);
  };

  // Shuffle and Draw Logic
  const startReading = () => {
    // Initialize audio context on user gesture
    soundService.resumeContext();
    soundService.playShuffle();
    
    setView('shuffling');
    setDrawnCards([]);
    setRevealedCount(0);
    setInterpretation('');
    setActiveCardIndex(null);

    setTimeout(() => {
      drawCards();
      setView('reading');
    }, 2000);
  };

  const drawCards = () => {
    const spreadDetails = SPREAD_INFO[selectedSpread];
    const deck = [...FULL_DECK];
    const newDrawnCards: DrawnCard[] = [];

    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    for (let i = 0; i < spreadDetails.count; i++) {
      newDrawnCards.push({
        card: deck[i],
        position: i,
        positionName: spreadDetails.positions[i],
        isReversed: false // No reversed cards per request
      });
    }
    setDrawnCards(newDrawnCards);
  };

  const revealCard = (index: number) => {
    if (index === revealedCount) {
      soundService.playReveal(); // Play sound
      setRevealedCount(prev => prev + 1);
      setActiveCardIndex(index);
    } else if (index < revealedCount) {
      setActiveCardIndex(index);
    }
  };

  useEffect(() => {
    if (drawnCards.length > 0 && revealedCount === drawnCards.length && !isInterpreting && !interpretation) {
      fetchInterpretation();
    }
    return () => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [revealedCount, drawnCards]);

  const fetchInterpretation = async () => {
    setIsInterpreting(true);
    abortControllerRef.current = new AbortController();
    let hasPlayedChime = false;

    try {
      const stream = await interpretReading(question, drawnCards);
      const reader = stream.getReader();
      
      while (true) {
        if (abortControllerRef.current?.signal.aborted) {
            reader.cancel();
            break;
        }
        const { done, value } = await reader.read();
        
        // Play chime when first chunk arrives
        if (!done && !hasPlayedChime) {
          soundService.playChime();
          hasPlayedChime = true;
        }

        if (done) break;
        setInterpretation(prev => prev + value);
      }
    } catch (error) {
      console.error("Error interpretation:", error);
      setInterpretation("Xin lỗi, vũ trụ đang bận rộn. Vui lòng xem ý nghĩa từng lá bài bên dưới.");
    } finally {
      setIsInterpreting(false);
      abortControllerRef.current = null;
    }
  };

  // --- COMPONENTS ---

  const InstallModal = () => {
    const [copied, setCopied] = useState(false);
    const currentUrl = window.location.href;
    const isBlobUrl = currentUrl.startsWith('blob:');

    const handleCopy = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 animate-fadeIn backdrop-blur-sm">
      {/* Visual Hint Arrow for Android - Only show if on Mobile */}
      {isMobileUserAgent && !isIOS && (
        <div className="fixed top-2 right-2 md:top-4 md:right-4 z-[110] animate-bounce">
            <div className="bg-mystic-accent text-mystic-900 px-3 py-1 rounded-lg font-bold text-sm shadow-xl flex items-center gap-1">
                Bấm vào đây <ArrowUpRight className="w-5 h-5" />
            </div>
        </div>
      )}

      <div className="bg-mystic-900 border border-mystic-700 rounded-2xl w-full max-w-sm p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button 
          onClick={() => setShowInstallModal(false)}
          className="absolute top-4 right-4 text-mystic-400 hover:text-white p-2"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="text-xl font-serif font-bold text-mystic-accent mb-4 text-center">
          Hướng dẫn Cài đặt
        </h3>
        
        {/* Scenario 1: User is on Computer/Laptop (Blob URL or not) */}
        {!isMobileUserAgent ? (
             <div className="bg-mystic-800 p-4 rounded-xl border border-mystic-600 mb-4 space-y-3">
                <div className="flex items-center gap-3 text-yellow-400 font-bold border-b border-mystic-700 pb-2">
                    <Monitor className="w-5 h-5" />
                    <span>Bạn đang dùng Máy tính?</span>
                </div>
                <p className="text-sm text-mystic-200">
                    Ứng dụng này đang chạy nội bộ. Bạn <strong>không thể gửi link này</strong> sang điện thoại được.
                </p>
                <div className="bg-mystic-900 p-3 rounded border border-dashed border-mystic-500">
                    <p className="text-sm text-white font-bold mb-2 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-mystic-accent" />
                        Để dùng trên điện thoại:
                    </p>
                    <ol className="list-decimal ml-4 text-xs text-mystic-300 space-y-2">
                        <li>Cầm điện thoại lên và mở trình duyệt (Chrome/Safari).</li>
                        <li>
                            Truy cập vào trang web AI bạn đang dùng (ví dụ: <span className="text-white font-mono">aistudio.google.com</span>).
                        </li>
                        <li>Đăng nhập tài khoản Google của bạn.</li>
                        <li>Tìm lại <strong>đoạn chat này</strong> trong lịch sử.</li>
                        <li>Lúc đó nút "Cài App" sẽ hoạt động trên điện thoại.</li>
                    </ol>
                </div>
            </div>
        ) : (
            /* Scenario 2: User is on Mobile Phone */
            <div className="space-y-4">
                 <div className="bg-green-900/30 border border-green-700/50 p-3 rounded-lg flex gap-3 items-start">
                    <Smartphone className="w-6 h-6 text-green-500 shrink-0" />
                    <p className="text-sm text-green-100">
                        Tuyệt vời! Bạn đang ở trên điện thoại. Hãy làm theo bước dưới đây để ghim App ra màn hình chính.
                    </p>
                </div>

                {isIOS ? (
                  <div className="space-y-3 text-mystic-200">
                    <p className="text-sm font-bold text-center text-mystic-accent">Dành cho iPhone (Safari):</p>
                    <div className="flex items-start gap-3 bg-mystic-800 p-3 rounded-lg">
                        <span className="bg-mystic-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">1</span>
                        <p className="text-sm">Bấm nút <strong>Chia sẻ</strong> <Share className="w-4 h-4 inline mx-1" /> ở dưới giữa màn hình.</p>
                    </div>
                     <div className="flex items-start gap-3 bg-mystic-800 p-3 rounded-lg">
                        <span className="bg-mystic-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">2</span>
                        <p className="text-sm">Kéo xuống chọn <strong>"Thêm vào MH chính"</strong> (Add to Home Screen).</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-mystic-200">
                     <p className="text-sm font-bold text-center text-mystic-accent">Dành cho Android (Chrome):</p>
                     <div className="flex items-start gap-3 bg-mystic-800 p-3 rounded-lg border border-mystic-700">
                        <span className="bg-mystic-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">1</span>
                        <p className="text-sm">Bấm vào dấu <strong>3 chấm</strong> <MoreVertical className="w-4 h-4 inline" /> ở góc phải trên cùng màn hình.</p>
                    </div>
                     <div className="flex items-start gap-3 bg-mystic-800 p-3 rounded-lg border border-mystic-700">
                        <span className="bg-mystic-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">2</span>
                        <p className="text-sm">Tìm và chọn dòng <strong>"Cài đặt ứng dụng"</strong> hoặc <strong>"Thêm vào màn hình chính"</strong>.</p>
                    </div>
                     <div className="flex items-start gap-3 bg-mystic-800 p-3 rounded-lg border border-mystic-700">
                        <span className="bg-mystic-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">3</span>
                        <p className="text-sm">Bấm <strong>"Thêm"</strong> (Add) để hoàn tất.</p>
                    </div>
                  </div>
                )}
            </div>
        )}

        {!isBlobUrl && !isMobileUserAgent && (
             <div className="mt-4 pt-4 border-t border-mystic-700">
                <p className="text-xs text-center text-mystic-400 mb-2">Hoặc copy link nếu bạn muốn gửi cho người khác (chỉ khi đã deploy):</p>
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded border border-mystic-700">
                    <input 
                        readOnly 
                        value={currentUrl} 
                        className="bg-transparent border-none text-mystic-300 text-xs w-full focus:outline-none truncate"
                    />
                    <button 
                        onClick={handleCopy}
                        className={`shrink-0 px-2 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${copied ? 'bg-green-600 text-white' : 'bg-mystic-600 text-white hover:bg-mystic-500'}`}
                    >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Đã chép' : 'Copy'}
                    </button>
                </div>
            </div>
        )}

        <div className="mt-6 pt-4 border-t border-mystic-800">
          <div className="bg-mystic-800/50 p-3 rounded-lg border border-mystic-700">
            <h4 className="text-xs font-bold text-mystic-accent flex items-center gap-2 mb-1">
              <Key className="w-3 h-3" /> Tài khoản cá nhân
            </h4>
            <p className="text-[10px] text-mystic-300 leading-tight">
              Bấm nút <strong>"Kết nối TK Gmail (Gemini)"</strong> trên màn hình chính sau khi cài đặt để dùng AI của riêng bạn (miễn phí), giúp ứng dụng hoạt động ổn định và bảo mật hơn. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-mystic-accent underline">Tìm hiểu thêm</a>.
            </p>
          </div>
        </div>

        <button 
          onClick={() => setShowInstallModal(false)}
          className="mt-6 w-full py-3 bg-gradient-to-r from-mystic-600 to-mystic-700 hover:from-mystic-500 hover:to-mystic-600 rounded-lg text-white font-bold transition-all shadow-lg"
        >
          Đã hiểu
        </button>
      </div>
    </div>
  );
  };

  return (
    <div className="min-h-screen bg-mystic-900 text-gray-200 font-sans selection:bg-mystic-accent selection:text-mystic-900">
      {showInstallModal && <InstallModal />}
      {showApiKeyModal && <ApiKeyModal />}
      
      {/* Sound Toggle Button (Fixed Position) */}
      <button 
        onClick={toggleMute}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-mystic-800/80 border border-mystic-600 text-mystic-300 hover:text-mystic-accent hover:bg-mystic-700 transition-all shadow-lg"
        title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>

      {view === 'home' && (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 animate-fadeIn text-center p-4 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-mystic-600/20 rounded-full blur-3xl"></div>
             <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-mystic-800/30 rounded-full blur-3xl"></div>
          </div>

          <div className="z-10 flex flex-col items-center w-full max-w-4xl px-4">
            <div className="flex gap-2 mb-4">
               {/* Install Button */}
               <button 
                  onClick={handleInstallClick}
                  className="px-4 py-2 bg-mystic-800/80 border border-mystic-600 rounded-full text-xs font-bold text-mystic-accent hover:bg-mystic-700 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Tải App (APK/PWA)
                </button>
                
                {/* API Key / Account Button */}
                <button 
                  onClick={handleConnectKey}
                  className={`px-4 py-2 border rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-lg
                    ${hasSelectedKey 
                      ? 'bg-green-900/30 border-green-600 text-green-400' 
                      : 'bg-mystic-800/80 border-mystic-600 text-mystic-300 hover:bg-mystic-700'
                    }`}
                >
                  <Key className="w-4 h-4" />
                  {hasSelectedKey ? 'Đã kết nối Gmail' : 'Kết nối TK Gmail (Gemini)'}
                </button>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-mystic-accent mb-2 animate-float drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              Mystic Tarot
            </h1>
            <p className="text-mystic-300 italic mb-8">Khám phá thông điệp từ vũ trụ</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
              {Object.entries(SPREAD_INFO).map(([key, info]) => (
                <button 
                  key={key} 
                  onClick={() => setSelectedSpread(key as SpreadType)}
                  className={`p-6 rounded-xl border transition-all duration-300 flex flex-col gap-2 text-left group
                    ${selectedSpread === key 
                      ? 'bg-mystic-800/80 border-mystic-accent shadow-[0_0_15px_rgba(251,191,36,0.15)] transform scale-105' 
                      : 'bg-mystic-900/50 border-mystic-700 hover:border-mystic-500 hover:bg-mystic-800/50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-serif font-bold ${selectedSpread === key ? 'text-mystic-accent' : 'text-gray-300'}`}>
                      {info.name}
                    </h3>
                    {selectedSpread === key && <Sparkles className="w-5 h-5 text-mystic-accent" />}
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {info.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="w-full max-w-md relative mb-8">
              <input 
                value={question} 
                onChange={e => setQuestion(e.target.value)} 
                placeholder="Câu hỏi của bạn... (hoặc để trống)" 
                className="w-full bg-transparent border-b-2 border-mystic-600 p-4 text-center text-lg focus:outline-none focus:border-mystic-accent transition-colors placeholder:text-mystic-600"
              />
            </div>

            <button 
              onClick={startReading} 
              className="px-12 py-4 bg-gradient-to-r from-mystic-600 to-mystic-800 rounded-full font-bold text-lg tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-[0_0_20px_rgba(114,75,150,0.5)] border border-mystic-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              RÚT BÀI
            </button>
          </div>
        </div>
      )}

      {view === 'shuffling' && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black/40">
          <RefreshCcw className="w-20 h-20 text-mystic-accent animate-spin duration-[3000ms]" />
          <p className="mt-6 text-2xl font-serif text-mystic-200 animate-pulse">Đang xào bài...</p>
          <p className="mt-2 text-sm text-mystic-500">Hãy tập trung vào câu hỏi của bạn</p>
        </div>
      )}

      {view === 'reading' && (
        <div className="max-w-7xl mx-auto min-h-screen p-4 pb-20 animate-fadeIn flex flex-col">
          <header className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setView('home')} 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-mystic-800 transition-colors text-mystic-300 hover:text-white"
            >
              <ArrowLeft size={20}/> <span>Trở về</span>
            </button>
            <h2 className="text-2xl font-serif text-mystic-accent hidden md:block">
               {question || "Thông điệp Vũ trụ"}
            </h2>
            <div className="w-24"></div> {/* Spacer for centering */}
          </header>

          <div className="flex-grow flex flex-col items-center">
            {/* Cards Display Area */}
            <div className="flex flex-wrap justify-center items-start gap-4 md:gap-8 mb-12 perspective-1000">
              {drawnCards.map((drawn, index) => (
                <div key={index} className="flex flex-col items-center gap-3 animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                   <span className="text-xs font-bold uppercase tracking-wider text-mystic-400 bg-mystic-900/50 px-2 py-1 rounded border border-mystic-800">
                     {drawn.positionName}
                   </span>
                   <Card 
                     data={drawn.card} 
                     isRevealed={index < revealedCount} 
                     isReversed={drawn.isReversed}
                     index={index} 
                     onClick={() => revealCard(index)} 
                   />
                </div>
              ))}
            </div>

            {/* Interpretation Section */}
            <div className="w-full max-w-4xl space-y-6">
               {/* Individual Card Meanings (Show as they are revealed) */}
               {activeCardIndex !== null && activeCardIndex < revealedCount && (
                  <div className="bg-mystic-800/80 backdrop-blur-md p-6 rounded-2xl border border-mystic-600/50 shadow-xl animate-fadeIn transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🃏</span>
                        <h3 className="text-xl font-serif font-bold text-mystic-accent">
                          {drawnCards[activeCardIndex].card.name_vi}
                        </h3>
                        <span className="text-sm text-mystic-400">
                          ({drawnCards[activeCardIndex].card.name_en})
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                         {drawnCards[activeCardIndex].isReversed 
                            ? drawnCards[activeCardIndex].card.meaning_reversed 
                            : drawnCards[activeCardIndex].card.meaning_upright}
                      </p>
                  </div>
               )}

               {/* AI Interpretation */}
               {revealedCount === drawnCards.length && (
                 <div ref={interpretationRef} className="bg-gradient-to-br from-mystic-800 to-mystic-900 p-6 md:p-8 rounded-2xl border border-mystic-accent/30 shadow-2xl relative overflow-hidden animate-fadeIn">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <Sparkles className="w-32 h-32" />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6 border-b border-mystic-700/50 pb-4">
                       <div className="p-2 bg-mystic-accent/10 rounded-lg">
                          <ScrollText className="w-6 h-6 text-mystic-accent" />
                       </div>
                       <h3 className="text-2xl font-serif font-bold text-gray-100">Lời khuyên từ Vũ trụ</h3>
                       {isInterpreting && <Loader2 className="w-5 h-5 animate-spin text-mystic-accent ml-auto" />}
                    </div>

                    {!hasSelectedKey && !isInterpreting && (
                      <div className="mb-6 p-3 bg-mystic-800/50 border border-dashed border-mystic-600 rounded-lg flex items-center justify-between gap-4">
                         <p className="text-[10px] text-mystic-400 italic">
                            Bạn đang dùng kết nối chung. <button onClick={handleConnectKey} className="text-mystic-accent underline">Kết nối TK Google cá nhân</button> để nhận luận giải nhanh và riêng tư hơn.
                         </p>
                      </div>
                    )}

                    <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-mystic-accent max-w-none">
                       {interpretation ? (
                          <div className="whitespace-pre-line leading-relaxed text-lg">
                            {interpretation}
                          </div>
                       ) : (
                          <div className="flex flex-col items-center py-8 text-mystic-400">
                             <Loader2 className="w-8 h-8 animate-spin mb-2" />
                             <p>Đang kết nối năng lượng...</p>
                          </div>
                       )}
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;