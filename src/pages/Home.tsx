import React, { useState, useEffect } from 'react';
import { 
  Flame, Clock, X, ChevronRight, Trophy, Skull, Shield, 
  ExternalLink, ChevronDown, Check, Send, Info, Lock
} from 'lucide-react';

interface MockPost {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timeRemaining: string;
  lives: number;
  isNew?: boolean;
}

export default function Home() {
  // Waitlist State
  const [email, setEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistError, setWaitlistError] = useState('');
  
  // Litepaper Modal State
  const [litepaperOpen, setLitepaperOpen] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // $67DOGE Lock Timer State
  const [timeLeft, setTimeLeft] = useState({
    years: 5,
    days: 264,
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  // Survival Simulator State
  const [simulatorPosts, setSimulatorPosts] = useState<MockPost[]>([
    {
      id: 'post-1',
      username: 'survivor_alpha',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
      content: 'Just reached 12 days on the survival leaderboard! Traditional feeds reward cheap outrage, but here we actually have to fight to keep our words alive. Every post is a battle. Let\'s keep it going.',
      timeRemaining: '18h 42m',
      lives: 3
    },
    {
      id: 'post-2',
      username: 'artisan_maker',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80',
      content: 'Hot take: Social media is infinitely more fun when there is actual skin in the game. Knowing this post could vanish in hours if I post garbage makes me think twice about what I share.',
      timeRemaining: '04h 15m',
      lives: 2
    },
    {
      id: 'post-3',
      username: 'chaos_enjoyer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      content: 'Here is a totally unhinged thought: If you downvote this, you are proving my point. Come on, try to obliterate me. I dare you. Let the survival games begin!',
      timeRemaining: '11h 59m',
      lives: 1
    }
  ]);
  const [newPostContent, setNewPostContent] = useState('');
  const [simulatorFeedText, setSimulatorFeedText] = useState('');

  // Handle Waitlist Submission
  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setWaitlistError('Please enter a valid email address.');
      return;
    }
    
    // Save to localStorage
    const waitlist = JSON.parse(localStorage.getItem('ripit_waitlist') || '[]');
    waitlist.push({ email, date: new Date().toISOString() });
    localStorage.setItem('ripit_waitlist', JSON.stringify(waitlist));
    
    setWaitlistError('');
    setWaitlistSubmitted(true);
    setEmail('');
  };

  // $67DOGE 6-Year Lock Countdown Timer
  useEffect(() => {
    // Lock start: April 6, 2026.
    // Lock end: April 6, 2032 (6 years later)
    const targetDate = new Date('2032-04-06T17:03:02Z').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const seconds = Math.floor((difference / 1000) % 60);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const daysTotal = Math.floor(difference / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(daysTotal / 365.25);
      const days = Math.floor(daysTotal % 365.25);

      setTimeLeft({ years, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulator downvote trigger
  const handleDownvote = (id: string) => {
    setSimulatorPosts(prev => 
      prev.map(post => {
        if (post.id === id) {
          const nextLives = Math.max(0, post.lives - 1);
          return { ...post, lives: nextLives };
        }
        return post;
      })
    );
  };

  // Simulator post creation
  const handleCreateMockPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: MockPost = {
      id: `post-${Date.now()}`,
      username: 'you_the_creator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      content: newPostContent.trim(),
      timeRemaining: '24h 00m',
      lives: 3,
      isNew: true
    };

    setSimulatorPosts([newPost, ...simulatorPosts]);
    setNewPostContent('');
    setSimulatorFeedText('Post uploaded! Try downvoting it to see the survival system in action.');
    setTimeout(() => setSimulatorFeedText(''), 4000);
  };

  const faqs = [
    {
      q: "What happens when a post is obliterated?",
      a: "When a post loses all 3 lives or fails to survive its 24-hour challenge, it is permanently deleted from the database. Nothing is archived, nothing is recoverable, and it can never be restored by anyone—not even the team."
    },
    {
      q: "Can an entire account be obliterated?",
      a: "Yes. Under Ripit's survival rules, if an account repeatedly breaches survival conditions or fails to maintain minimum platform standards, the account itself enters elimination status. Once permanently obliterated, all posts, history, custom profiles, and credentials are swept out completely."
    },
    {
      q: "What is $67DOGE?",
      a: "$67DOGE is the official long-term utility token of the Ripit ecosystem. While Ripit and the $67DOGE project are separate, independent organizations, they share a permanent strategic partnership to connect their products, share utilities, and build value."
    },
    {
      q: "How is the 91% lock on $67DOGE verified?",
      a: "Over 91% of the total token supply (861,169,396 $67DOGE) is locked inside an on-chain smart contract for six years. The lock is public and completely transparent. Anyone can verify this on StakePoint and Solscan using the official contracts."
    },
    {
      q: "Are there any upvotes or likes?",
      a: "No. Ripit is built differently. Traditional platforms reward mindless attention, whereas Ripit rewards survival. The community does not 'like' your post; they decide whether it deserves to remain. Downvotes are the only feedback mechanism, meaning every post carries real stakes."
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-hidden font-sans">
      
      {/* Background Radial Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-red-100/50 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-yellow-100/30 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-red-100/30 blur-[130px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/header_logo.png" alt="Ripit" className="h-28 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-zinc-500">
            <a href="#what-is-ripit" className="hover:text-red-600 transition-colors">What is it?</a>
            <a href="#why-ripit" className="hover:text-red-600 transition-colors">Why Ripit?</a>
            <a href="#how-it-works" className="hover:text-red-600 transition-colors">How It Works</a>
            <a href="#survival" className="hover:text-red-600 transition-colors">Survival</a>
            <a href="#token" className="hover:text-red-600 transition-colors">$67DOGE</a>
            <a href="#transparency" className="hover:text-red-600 transition-colors">Lock</a>
            <a href="#faq" className="hover:text-red-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="#waitlist" className="transition-all active:scale-95 hover:opacity-80">
              <img src="/rip7.png" alt="Waitlist" className="h-16 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative max-w-7xl mx-auto px-6 pt-12 pb-24 space-y-36">

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center pt-8 md:pt-16 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-6 duration-700">
          
          {/* Logo Brand Graphic */}
          <div className="relative group cursor-default flex flex-row items-center justify-center gap-6 -translate-x-8">
            <img
              src="/ripit2.png"
              alt="Ripit Hydrant"
              className="h-80 md:h-[480px] w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 shrink-0"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
            <img
              src="/ripit.png"
              alt="Ripit"
              className="h-32 md:h-48 w-auto object-contain"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </div>

          <div className="space-y-4">
            <img 
              src="/uio.png" 
              alt="Social Media with Stakes" 
              className="h-16 md:h-28 w-auto object-contain mx-auto"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
            <p className="text-lg md:text-2xl text-zinc-600 font-medium max-w-2xl mx-auto">
              Every downvote matters. Every post has something to lose.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto pt-4">
            <a 
              href="#waitlist"
              className="hover:scale-[1.03] active:scale-[0.98] transition-transform"
            >
              <img src="/gee1.png" alt="Join Waitlist" className="h-28 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            </a>
            
            <button 
              onClick={() => setLitepaperOpen(true)}
              className="hover:scale-[1.03] active:scale-[0.98] transition-transform bg-transparent border-0 p-0"
            >
              <img src="/gee2.png" alt="Read Litepaper" className="h-36 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            </button>
          </div>

          {/* Social Proof Stats Badge */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-zinc-500 text-xs md:text-sm font-semibold">
            <div className="flex items-center space-x-2 bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-200/60">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>100% Obliterative</span>
            </div>
            <div className="flex items-center space-x-2 bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-200/60">
              <span>91%+ Locked Token Supply</span>
            </div>
            <div className="flex items-center space-x-2 bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-200/60">
              <span>No Likes. Zero Upvotes.</span>
            </div>
          </div>
        </section>

        <hr className="border-zinc-100" />

        {/* What is Ripit? & Why Ripit? */}
        <section id="what-is-ripit" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* What is Ripit Card */}
          <div className="relative group flex flex-col justify-between bg-white border border-zinc-200 hover:border-zinc-300 p-8 rounded-[2rem] glow-red transition-all duration-300 shadow-sm">
            <div className="space-y-6">

              <div className="inline-flex items-center justify-center">
                <img src="/ico_skull.png" alt="skull" className="w-20 h-20 object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </div>
              <img src="/rip1.png" alt="What is Ripit?" className="h-12 md:h-16 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              <div className="text-zinc-600 space-y-4 leading-relaxed text-sm md:text-base">
                <p>
                  Ripit is a social platform where every post has something to lose.
                </p>
                <p>
                  Every post begins with <strong className="text-red-600">3 lives</strong> and enters a <strong className="text-zinc-900">24-hour survival challenge</strong>.
                </p>
                <p>
                  Unlike traditional social media, there are no likes or upvotes. The community decides a post's fate through downvotes.
                </p>
                <p>
                  Every downvote brings a post closer to elimination. If a post loses all three lives before the 24-hour survival period ends, it is <strong className="text-red-600">permanently obliterated</strong>.
                </p>
                <p className="border-l-2 border-red-500 pl-4 italic text-zinc-500">
                  Nothing is archived. Nothing is recoverable. Once a post is obliterated, it no longer exists.
                </p>
              </div>
            </div>
            
            <div className="pt-8">
              <img src="/txt_tagline.png" alt="Every vote matters • Every post is a challenge" className="h-8 md:h-10 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            </div>
          </div>

          {/* Why Ripit Card */}
          <div id="why-ripit" className="relative group flex flex-col justify-between bg-white border border-zinc-200 hover:border-zinc-300 p-8 rounded-[2rem] glow-red transition-all duration-300 shadow-sm">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center">
                <img src="/ico_flame.png" alt="flame" className="w-20 h-20 object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </div>
              <img src="/rip2.png" alt="Why Ripit?" className="h-12 md:h-16 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              <div className="text-zinc-600 space-y-4 leading-relaxed text-sm md:text-base">
                <p>
                  Most social media platforms reward attention. Ripit rewards survival.
                </p>
                <p>
                  Every post enters a 24-hour survival challenge where the community decides whether it deserves to remain.
                </p>
                <p>
                  Create something people enjoy, and your post survives. Create something the community rejects, and it moves closer to elimination.
                </p>
                <p>
                  Nothing is guaranteed. Everything must earn its place. Every downvote has consequences, and every post carries real risk.
                </p>
                <p className="text-zinc-900 font-medium">
                  Social media shouldn't just be watched. It should be played.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <img src="/txt_survive.png" alt="Every day is an opportunity to survive" className="h-8 md:h-10 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            </div>
          </div>

        </section>

        <hr className="border-zinc-100" />

        {/* How It Works & Post Simulator */}
        <section id="how-it-works" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
              <img src="/rip4.png" alt="How It Works" className="h-36 md:h-52 w-auto object-contain mx-auto" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            <p className="text-zinc-600">
              Ripit transforms social media into a competitive experience where every decision matters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step List (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-start space-x-4 bg-zinc-50 border border-zinc-200 p-5 rounded-2xl hover:bg-zinc-100/40 transition-all shadow-sm">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0 border border-red-200/50">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-base font-outfit">3 Initial Lives</h3>
                  <p className="text-zinc-600 text-sm mt-1">Every post starts with 3 lives and enters a 24-hour survival challenge.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-zinc-50 border border-zinc-200 p-5 rounded-2xl hover:bg-zinc-100/40 transition-all shadow-sm">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0 border border-red-200/50">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-base font-outfit">Community Downvotes</h3>
                  <p className="text-zinc-600 text-sm mt-1">Community members downvote posts they believe should not survive.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-zinc-50 border border-zinc-200 p-5 rounded-2xl hover:bg-zinc-100/40 transition-all shadow-sm">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0 border border-red-200/50">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-base font-outfit">Deplete Lives</h3>
                  <p className="text-zinc-600 text-sm mt-1">Downvotes reduce a post's remaining lives according to Ripit's survival rules.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-zinc-50 border border-zinc-200 p-5 rounded-2xl hover:bg-zinc-100/40 transition-all shadow-sm">
                <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-sm shrink-0 border border-yellow-200/50">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-base font-outfit">Survival or Obliteration</h3>
                  <p className="text-zinc-600 text-sm mt-1">Posts that survive 24 hours climb the leaderboard. Posts that hit 0 lives are obliterated instantly.</p>
                </div>
              </div>
            </div>

            {/* Downvote Simulator (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-zinc-200 p-6 md:p-8 rounded-[2.5rem] shadow-xl relative glow-red flex flex-col space-y-6">
              
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-black tracking-widest text-zinc-800 uppercase font-outfit">Live Survival Simulator</span>
                </div>
                <span className="text-xs font-semibold text-zinc-400">Try downvoting posts!</span>
              </div>

              {/* Feed simulation */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scrollbar-hide">
                {simulatorPosts.map(post => {
                  const isObliterated = post.lives === 0;

                  return (
                    <div 
                      key={post.id}
                      className={`p-4 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                        isObliterated 
                          ? 'bg-red-50/50 border-red-200/50 opacity-75' 
                          : 'bg-zinc-50/40 border-zinc-100 hover:border-zinc-200'
                      } ${post.isNew ? 'animate-in slide-in-from-top-4 duration-300' : ''}`}
                    >
                      {/* Glitch Overlay for Obliterated */}
                      {isObliterated && (
                        <div className="absolute inset-0 bg-red-50/40 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 text-center animate-in fade-in duration-300">
                          <Skull className="w-8 h-8 text-red-500 animate-bounce mb-2" />
                          <span className="font-black tracking-widest text-red-600 text-xs uppercase glitch-text">
                            OBLITERATED
                          </span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase mt-0.5">
                            Permanently Erased
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={post.avatar} 
                            alt={post.username} 
                            className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                          />
                          <div>
                            <span className="font-bold text-sm text-zinc-800">@{post.username}</span>
                            <div className="flex items-center space-x-2 text-[10px] text-zinc-500">
                              <span>Challenge Ends in {post.timeRemaining}</span>
                            </div>
                          </div>
                        </div>

                        {/* Hearts Status */}
                        <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-xl border border-zinc-200/80 shadow-sm">
                          {[...Array(3)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 transition-all duration-300 ${
                                i < post.lives 
                                  ? 'text-red-500 fill-red-500 scale-100 drop-shadow-[0_0_4px_rgba(239,68,68,0.3)]' 
                                  : 'text-zinc-200 fill-transparent scale-90'
                              }`} 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          ))}
                        </div>
                      </div>

                      <p className="text-zinc-600 text-sm mt-3 leading-relaxed">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between border-t border-zinc-200/50 mt-4 pt-3 text-xs">
                        <span className="text-zinc-500 font-medium">Lives remaining: {post.lives}/3</span>
                        
                        <button
                          onClick={() => handleDownvote(post.id)}
                          disabled={isObliterated}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold border border-red-100 hover:border-red-500 rounded-xl transition-all flex items-center space-x-1 hover:scale-105 active:scale-95 disabled:pointer-events-none shadow-sm"
                        >
                          <ChevronDown className="w-4 h-4" />
                          <span>Downvote</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feed feedback notice */}
              {simulatorFeedText && (
                <div className="text-xs text-center text-yellow-600 font-bold bg-yellow-50 border border-yellow-100 p-2.5 rounded-xl">
                  {simulatorFeedText}
                </div>
              )}

              {/* Mock upload form */}
              <form onSubmit={handleCreateMockPost} className="border-t border-zinc-100 pt-4 flex items-center gap-3">
                <input 
                  type="text" 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Write a mock post to test the system..." 
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
                <button
                  type="submit"
                  className="hover:scale-105 active:scale-95 transition-all flex items-center justify-center shrink-0"
                >
                  <img src="/btn_submit_mock.png" alt="Submit" className="h-14 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                </button>
              </form>

            </div>

          </div>
        </section>

        <hr className="border-zinc-100" />

        {/* Survival System */}
        <section id="survival" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
              <img src="/btn_survival.png" alt="The Survival System" className="h-10 md:h-12 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            <img src="/rip3.png" alt="Survival Isn't Given. It's Earned." className="h-40 md:h-52 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            <div className="text-zinc-600 space-y-4 leading-relaxed text-sm md:text-base">
              <p>
                Ripit is built around permanence. When something is obliterated, it is gone forever.
              </p>
              <p>
                Posts that lose all three lives are permanently removed from the platform and cannot be restored.
              </p>
              <p>
                Under Ripit's survival rules, accounts may also face permanent elimination when the platform's account-elimination conditions are met.
              </p>
              <p className="text-zinc-800">
                When an account is permanently obliterated, all associated platform data—including posts, profile information, history, and account records—is permanently removed and cannot be recovered.
              </p>
              <p className="border-l-2 border-zinc-200 pl-4 italic text-zinc-500 font-bold uppercase tracking-wide text-xs">
                Nothing is archived. Nothing is hidden. Nothing is reversible.
              </p>
            </div>
          </div>

          {/* Graphical Survival Engine Illustration */}
          <div className="relative border border-zinc-200 bg-zinc-50 p-8 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center glow-red shadow-sm">
            <div className="absolute top-0 left-4">
              <img src="/btn_permanence.png" alt="Permanence Registry" className="h-14 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            </div>
            
            <div className="w-full max-w-sm border border-zinc-200 bg-white rounded-2xl p-6 relative z-10 flex flex-col space-y-6 mt-4 shadow-sm">
              
              {/* Graphic item 1: active survival */}
              <div className="border border-zinc-100 bg-zinc-50 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-green-50 text-green-600 flex items-center justify-center font-bold text-[10px] border border-green-200/50">
                    ACTIVE
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800">Post #34091</p>
                    <p className="text-[10px] text-zinc-500">12h 45m left</p>
                  </div>
                </div>
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">3 Lives</span>
              </div>

              {/* Graphic item 2: danger */}
              <div className="border border-zinc-100 bg-zinc-50 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold text-[10px] border border-yellow-200/50">
                    RISK
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800">Post #20948</p>
                    <p className="text-[10px] text-zinc-500">01h 04m left</p>
                  </div>
                </div>
                <span className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider">1 Life</span>
              </div>

              {/* Graphic item 3: obliterated */}
              <div className="border border-red-100 bg-red-50/50 rounded-xl p-3.5 flex items-center justify-between opacity-70 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-50/20 flex items-center justify-center">
                  <span className="text-[10px] font-black tracking-widest text-red-600 uppercase glitch-text">
                    OBLITERATED
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center font-bold text-[10px] border border-red-100/50">
                    FAIL
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800">Post #11824</p>
                    <p className="text-[10px] text-zinc-500">00h 00m left</p>
                  </div>
                </div>
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">0 Lives</span>
              </div>

            </div>

            <div className="mt-6 text-center text-xs text-zinc-500 leading-relaxed max-w-xs">
              Every post is evaluated through continuous decentralised vote audits, protecting the database from retention rot.
            </div>
          </div>

        </section>

        <hr className="border-zinc-100" />

        {/* Leaderboards */}
        <section id="leaderboards" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <img src="/sec_leaderboard.png" alt="Survival Leaderboard" className="h-12 md:h-18 w-auto object-contain mx-auto" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            <p className="text-zinc-600">
              Posts that survive the 24-hour cycle earn recognition, climbing the legacy records.
            </p>
          </div>

          <div className="max-w-3xl mx-auto border border-zinc-200 bg-zinc-50 rounded-[2.5rem] overflow-hidden p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <img src="/ico_trophy.png" alt="trophy" className="w-32 h-32 object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                <span className="text-sm font-black tracking-wider text-zinc-700 uppercase font-outfit">Legacy Survivors (Last 30 Days)</span>
              </div>
              <span className="text-xs font-semibold text-zinc-400">Auto-updated</span>
            </div>

            {/* List */}
            <div className="space-y-3">
              {[
                { rank: 1, user: 'survivor_alpha', days: 28, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80' },
                { rank: 2, user: 'solana_ranger', days: 21, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80' },
                { rank: 3, user: 'artisan_maker', days: 19, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80' },
                { rank: 4, user: 'doge_locked_99', days: 15, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
              ].map(row => (
                <div key={row.rank} className="flex items-center justify-between bg-white hover:bg-zinc-50/50 border border-zinc-200 hover:border-zinc-300 p-4 rounded-2xl transition-all shadow-sm">
                  <div className="flex items-center space-x-4">
                    <img src={row.avatar} alt={row.user} className="w-9 h-9 rounded-full object-cover border border-zinc-200" />
                    <div>
                      <span className="font-bold text-sm text-zinc-800">@{row.user}</span>
                      <p className="text-[10px] text-zinc-500 font-semibold">{row.days} consecutive survival days</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-zinc-100" />

        {/* $67DOGE Token Info */}
        <section id="token" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <img src="/btn_ecosystem_token.png" alt="Ecosystem Token" className="h-12 md:h-16 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            
            <img src="/sec_doge.png" alt="$67DOGE" className="h-12 md:h-16 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            
            <div className="text-zinc-600 space-y-4 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-yellow-600 font-bold">$67DOGE</strong> is the official long-term utility token of the Ripit ecosystem.
              </p>
              <p>
                Ripit and the $67DOGE project are independent organizations united through a permanent strategic partnership. While each organization operates independently, both share a long-term vision of building engaging products that create lasting value for their communities.
              </p>
              <p className="text-zinc-900 font-medium">
                Today, our primary focus is building Ripit. The platform comes first.
              </p>
              <p>
                As the Ripit ecosystem grows, $67DOGE will provide utility across Ripit and future ecosystem products.
              </p>
            </div>

            <div className="border border-zinc-200 bg-zinc-50 p-5 rounded-2xl space-y-4 shadow-sm">
              <h4 className="font-bold text-zinc-800 text-sm font-outfit uppercase tracking-wider">Planned Utility</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-600">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Paying for products and services throughout the ecosystem.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Discounts on subscriptions, premium features, and services.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Unlocking benefits through verified wallet ownership.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Accessing future ecosystem features as new products launch.</span>
                </li>
              </ul>
              <p className="text-[10px] text-zinc-500 italic mt-2">
                For example, if a premium subscription costs $10, verified holders may receive a discounted price or choose to pay using $67DOGE, where supported.
              </p>
            </div>
          </div>

          {/* Token Visual Card */}
          <div className="lg:col-span-5 relative border border-zinc-200 bg-zinc-50 p-8 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center glow-gold min-h-[350px] shadow-sm">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-yellow-500/5 to-transparent blur-md"></div>
            
            <img src="/btn_doge_badge.png" alt="$67DOGE Token" className="w-full max-w-[420px] h-auto object-contain rounded-2xl hover:scale-105 transition-transform duration-500" style={{ imageRendering: '-webkit-optimize-contrast' }} />

            <div className="mt-8 text-center space-y-2 relative z-10">
              <p className="font-bold text-zinc-800 text-base font-outfit">Long-Term Strategic Alignment</p>
              <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                Building products people genuinely enjoy using, with utility tied to sustainable development.
              </p>
            </div>
            <a
              href="https://pump.fun/coin/G59uYtk9rbVroVV5dn4FUsYqDuCZDz8qYNwdTuCupump"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 relative z-10 hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              <img src="/btn_doge_link.png" alt="Link to $67DOGE" className="h-36 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            </a>
          </div>

        </section>

        <hr className="border-zinc-100" />

        {/* Transparency & On-Chain Lock Countdown */}
        <section id="transparency" className="space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <img src="/btn_transparency.png" alt="On-Chain Transparency" className="h-10 md:h-12 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              <img src="/sec_lock.png" alt="861,169,396 $67DOGE Locked for 6 Years" className="h-20 md:h-28 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              <div className="text-zinc-600 space-y-4 leading-relaxed text-sm md:text-base">
                <p>
                  We believe trust is earned through transparency and consistent execution.
                </p>
                <p>
                  To demonstrate the ecosystem's long-term commitment, <strong className="text-zinc-800">861,169,396 $67DOGE</strong>, representing over <strong className="text-yellow-600">91% of the total token supply</strong>, has been locked for six years through an on-chain smart contract.
                </p>
                <p>
                  The lock is enforced by an on-chain smart contract, meaning the locked tokens cannot be accessed before the unlock date—not even by the project team or StakePoint.
                </p>
              </div>

              {/* Verify Links */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a 
                  href="https://stakepoint.app/locks/cmpp4jtrf0000l804b5p48633" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-105 active:scale-95 transition-all flex items-center"
                >
                  <img src="/btn_stakepoint.png" alt="Verify on StakePoint" className="h-24 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                </a>

                <a 
                  href="https://solscan.io/token/G59uYtk9rbVroVV5dn4FUsYqDuCZDz8qYNwdTuCupump" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-105 active:scale-95 transition-all flex items-center"
                >
                  <img src="/btn_solscan.png" alt="Verify on Solscan" className="h-24 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                </a>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-[2.5rem] glow-gold flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
              <img src="/btn_countdown.png" alt="Lock Unlock Countdown" className="h-10 md:h-12 w-auto object-contain mx-auto" style={{ imageRendering: '-webkit-optimize-contrast' }} />

              {/* Countdown Numbers */}
              <div className="grid grid-cols-5 gap-2 md:gap-4 w-full">
                
                <div className="bg-white border border-zinc-200 p-3 md:p-4 rounded-2xl flex flex-col justify-center items-center shadow-sm">
                  <span className="text-xl md:text-3xl font-black text-zinc-900 font-outfit">{timeLeft.years}</span>
                  <span className="text-[9px] md:text-xs text-zinc-400 font-bold uppercase mt-1">Yrs</span>
                </div>

                <div className="bg-white border border-zinc-200 p-3 md:p-4 rounded-2xl flex flex-col justify-center items-center shadow-sm">
                  <span className="text-xl md:text-3xl font-black text-zinc-900 font-outfit">{timeLeft.days}</span>
                  <span className="text-[9px] md:text-xs text-zinc-400 font-bold uppercase mt-1">Days</span>
                </div>

                <div className="bg-white border border-zinc-200 p-3 md:p-4 rounded-2xl flex flex-col justify-center items-center shadow-sm">
                  <span className="text-xl md:text-3xl font-black text-zinc-900 font-outfit">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] md:text-xs text-zinc-400 font-bold uppercase mt-1">Hrs</span>
                </div>

                <div className="bg-white border border-zinc-200 p-3 md:p-4 rounded-2xl flex flex-col justify-center items-center shadow-sm">
                  <span className="text-xl md:text-3xl font-black text-zinc-900 font-outfit">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] md:text-xs text-zinc-400 font-bold uppercase mt-1">Mins</span>
                </div>

                <div className="bg-white border border-zinc-200 p-3 md:p-4 rounded-2xl flex flex-col justify-center items-center shadow-sm">
                  <span className="text-xl md:text-3xl font-black text-red-600 font-outfit animate-pulse">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] md:text-xs text-zinc-400 font-bold uppercase mt-1">Secs</span>
                </div>

              </div>

              <div className="text-xs text-zinc-500 font-medium">
                Locked on-chain until <span className="text-zinc-800 font-bold">April 6, 2032</span>. Tokens cannot be accessed by anyone before this date.
              </div>
            </div>

          </div>

        </section>

        <hr className="border-zinc-100" />

        {/* Roadmap */}
        <section id="roadmap" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <img src="/sec_roadmap.png" alt="Roadmap" className="h-12 md:h-18 w-auto object-contain mx-auto" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            <p className="text-zinc-600">
              Our core release schedule and expansion phases.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* 2026 Phase */}
            <div className="border border-zinc-200 bg-zinc-50 p-8 rounded-[2rem] hover:border-red-300 transition-all relative overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-red-100/30 blur-xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <img src="/sec_2026.png" alt="2026" className="h-8 md:h-10 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                  <img src="/btn_in_progress.png" alt="In Progress" className="h-36 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                </div>
                
                <ul className="space-y-3.5 text-zinc-600 text-sm">
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Complete Ripit development.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Launch the closed alpha.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Launch the public beta.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Build the first Ripit community.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Continue improving the platform through community feedback.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2027 Phase */}
            <div className="border border-zinc-200 bg-zinc-50 p-8 rounded-[2rem] hover:border-yellow-300 transition-all relative overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-yellow-100/20 blur-xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <img src="/sec_2027.png" alt="2027" className="h-8 md:h-10 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                  <img src="/btn_future_phase.png" alt="Future Phase" className="h-36 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                </div>
                
                <ul className="space-y-3.5 text-zinc-600 text-sm">
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-2" />
                    <span>Launch on major app stores.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-2" />
                    <span>Grow the Ripit community worldwide.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-2" />
                    <span>Introduce $67DOGE utility throughout the Ripit ecosystem.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-2" />
                    <span>Launch additional ecosystem products and services.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-2" />
                    <span>Continue expanding the Ripit ecosystem.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        <hr className="border-zinc-100" />

        {/* Mission & Vision & Long-Term Vision */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Mission */}
          <div className="border border-zinc-200 bg-zinc-50 p-6 md:p-8 rounded-[2rem] flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <img src="/vision_mission.png" alt="Our Mission: Meaningful Consequences" className="h-36 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              <p className="text-zinc-600 text-sm leading-relaxed">
                To build a social platform where every post matters and every vote has real consequences.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="border border-zinc-200 bg-zinc-50 p-6 md:p-8 rounded-[2rem] flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <img src="/vision_ecosystem.png" alt="Our Vision: Global Ecosystem" className="h-36 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              <p className="text-zinc-600 text-sm leading-relaxed">
                To build Ripit into a global technology company that creates fun, engaging, and innovative products enjoyed by millions of people around the world.
              </p>
            </div>
          </div>

          {/* Long-Term Vision */}
          <div className="border border-zinc-200 bg-zinc-50 p-6 md:p-8 rounded-[2rem] flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <img src="/vision_alignment.png" alt="Long-Term Vision: Strategic Alignment" className="h-36 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              <p className="text-zinc-600 text-sm leading-relaxed">
                Ripit is only the beginning. Users will experience connected products, shared utility, and exclusive benefits across a growing strategic ecosystem connected with $67DOGE.
              </p>
            </div>
          </div>

        </section>

        <hr className="border-zinc-100" />

        {/* Waitlist Form Section */}
        <section id="waitlist" className="max-w-3xl mx-auto text-center space-y-8 py-8">
          <div className="space-y-4">
            <img src="/rip7.png" alt="Waitlist" className="h-16 md:h-22 w-auto object-contain mx-auto" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            <p className="text-zinc-600 max-w-xl mx-auto">
              Ready to play? Secure your spot for the Ripit private alpha and get early access to the survival economy.
            </p>
          </div>

          {waitlistSubmitted ? (
            <div className="bg-zinc-50 border border-red-100 p-8 rounded-3xl max-w-md mx-auto space-y-4 animate-in zoom-in-95 duration-300 shadow-sm">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 font-outfit">You are on the list!</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Thanks for registering. We will email you once private alpha spaces become available in your region.
              </p>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-4 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                >
                  <img src="/btn_submit.png" alt="Submit" className="h-32 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                </button>
              </div>
              {waitlistError && (
                <p className="text-xs text-red-500 font-medium">{waitlistError}</p>
              )}
            </form>
          )}
        </section>

        <hr className="border-zinc-100" />

        {/* FAQ Section */}
        <section id="faq" className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <img src="/txt_faq.png" alt="Frequently Asked Questions" className="h-16 md:h-20 w-auto object-contain mx-auto" style={{ imageRendering: '-webkit-optimize-contrast' }} />
            <p className="text-zinc-600">
              Clear information about Ripit and the survival ecosystem mechanics.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;

              return (
                <div 
                  key={i} 
                  className="border border-zinc-200 bg-zinc-50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-100/40 transition-colors"
                  >
                    <span className="font-bold text-zinc-900 text-sm md:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : ''}`} />
                  </button>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[200px] border-t border-zinc-200' : 'max-h-0'}`}>
                    <div className="p-6 text-zinc-500 text-sm leading-relaxed bg-white">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 relative z-10 text-center space-y-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <img src="/ripit.png" alt="Ripit" className="h-7 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
          </div>

          <div className="text-xs text-zinc-500 font-semibold space-y-1">
            <p>© {new Date().getFullYear()} Ripit Technologies. All rights reserved.</p>
            <p>Ecosystem strategic partner of $67DOGE.</p>
          </div>

          <img src="/btn_ecosystem_node.png" alt="Ecosystem Mode Online" className="h-10 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
        </div>
      </footer>

      {/* Litepaper Modal */}
      {litepaperOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setLitepaperOpen(false)}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-white border border-zinc-200 rounded-[2.5rem] shadow-2xl flex flex-col z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-zinc-700">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white">
              <div className="flex items-center">
                <img src="/txt_litepaper_title.png" alt="Litepaper v1.0" className="h-6 md:h-7 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </div>
              <button 
                onClick={() => setLitepaperOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8 scrollbar-hide text-zinc-600 text-sm md:text-base leading-relaxed">
              
              <div className="text-center py-6 border-b border-zinc-100 max-w-md mx-auto space-y-3">
                {/* Hydrant + Wordmark */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src="/ripit2.png"
                    alt="Ripit Hydrant"
                    className="h-48 w-auto object-contain drop-shadow-lg"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                  <img
                    src="/ripit.png"
                    alt="Ripit"
                    className="h-28 w-auto object-contain"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>
                <p className="text-xs font-black text-red-600 uppercase tracking-widest">Social Media with Stakes</p>
                <p className="text-xs text-zinc-400">Official Litepaper &amp; Mechanics Protocol Specification</p>
                {/* Scroll indicator */}
                <div className="flex flex-col items-center gap-1 pt-2 animate-bounce text-zinc-400">
                  <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll to read</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-zinc-900 text-lg font-outfit uppercase tracking-wider text-red-500 border-l-2 border-red-500 pl-3">1. Executive Summary</h4>
                <p>
                  Ripit is a next-generation decentralized social network that breaks away from traditional attention-harvesting mechanics. By stripping away likes, upvotes, and passive engagement hooks, Ripit introduces real stakes back into social interactions.
                </p>
                <p>
                  Every user interaction is governed by the Survival Protocol, turning the feed into a competitive sandbox where quality and authenticity dictate permanence.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-zinc-900 text-lg font-outfit uppercase tracking-wider text-red-500 border-l-2 border-red-500 pl-3">2. Core Protocol Mechanics</h4>
                <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl space-y-2 text-xs md:text-sm shadow-sm">
                  <p><strong>Initial Allocation:</strong> Every new post is minted with precisely 3 Life Nodes (represented as lives).</p>
                  <p><strong>Survival Target:</strong> A post must stay active for a continuous 24-hour verification epoch.</p>
                  <p><strong>The Downvote Constraint:</strong> Downvotes are the primary filter. Each downvote reduces active life status. If lives deplete to 0 before the epoch expires, the post is instantly marked for obliteration.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-zinc-900 text-lg font-outfit uppercase tracking-wider text-red-500 border-l-2 border-red-500 pl-3">3. Database Obliteration & Non-Retention</h4>
                <p>
                  Traditional platforms maintain user logs indefinitely under complex shadow-archiving standards. Ripit operates on a strict zero-retention model.
                </p>
                <p>
                  Once a post or account meets obliteration status, it is immediately deleted from all distributed storage systems. No backup states are compiled. The transaction is final, permanent, and completely irreversible.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-zinc-900 text-lg font-outfit uppercase tracking-wider text-red-500 border-l-2 border-red-500 pl-3">4. $67DOGE Token Synergy</h4>
                <p>
                  $67DOGE acts as the unified utility fuel of the Ripit ecosystem. Although both organizations are operationally independent, they share a permanent strategic partnership to align development.
                </p>
                <p>
                  Planned utility features include subscription discounts (e.g. paying for premium features with $67DOGE), exclusive verification status badges, and prioritized wallet checks.
                </p>
                <p>
                  To secure community trust, **861,169,396 $67DOGE** (representing over 91% of total supply) has been locked inside a smart contract for six years, preventing any team liquidations and ensuring permanent strategic alignment.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-100 flex items-center justify-end bg-white">
              <button 
                onClick={() => setLitepaperOpen(false)}
                className="hover:scale-[1.03] active:scale-95 transition-transform bg-transparent border-0 p-0"
              >
                <img src="/gee3.png" alt="Accept Protocol Terms" className="h-36 w-auto object-contain" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
