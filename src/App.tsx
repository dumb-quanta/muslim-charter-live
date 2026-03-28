/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Users, 
  BookOpen, 
  Scale, 
  Shield, 
  Handshake, 
  GraduationCap, 
  Gavel, 
  Heart, 
  PenTool, 
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  Info,
  ShieldCheck,
  Calendar,
  RotateCcw,
  MousePointer2,
  Share2,
  ExternalLink,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import LegalPage from './components/LegalPage';
import CharterForm from './components/CharterForm';

// --- Types ---
interface DonationForm {
  trxId: string;
  senderNumber: string;
}

// --- Components ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [donationForm, setDonationForm] = useState<DonationForm>({
    trxId: '',
    senderNumber: '',
  });
  const [isDonationVerified, setIsDonationVerified] = useState(false);
  const [submittedTrxId, setSubmittedTrxId] = useState('');
  const [activeSection, setActiveSection] = useState('হোম');
  const [showLegalPage, setShowLegalPage] = useState(false);
  const [showSignaturesModal, setShowSignaturesModal] = useState(false);
  const totalSignatures = 54321;

  // Motion values for counters
  const milestoneCount = useMotionValue(0);
  const totalCount = useMotionValue(0);

  // Transformations for Bengali display
  const displayMilestone = useTransform(milestoneCount, (v) => 
    Math.round(v).toLocaleString('bn-BD')
  );
  const displayTotal = useTransform(totalCount, (v) => 
    Math.round(v).toLocaleString('bn-BD')
  );

  // Scrollspy logic
  useEffect(() => {
    const sections = ['হোম', 'কেন-এই-সনদ?', '৮টি-অঙ্গীকার', 'অনুদান'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Animated Counter Logic using motion's animate
  useEffect(() => {
    const milestoneAnimation = animate(milestoneCount, 50000, { 
      duration: 2, 
      ease: "easeOut" 
    });
    const totalAnimation = animate(totalCount, 54507, { 
      duration: 2.5, 
      ease: "easeOut",
      delay: 0.2
    });

    return () => {
      milestoneAnimation.stop();
      totalAnimation.stop();
    };
  }, [milestoneCount, totalCount]);

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedTrxId(donationForm.trxId);
    setIsDonationVerified(true);
    setDonationForm({ trxId: '', senderNumber: '' });
  };

  const pledges = [
    {
      id: 1,
      title: 'ঈমান ও তাওহীদ',
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      text: 'সাক্ষ্য দিচ্ছি যে, একত্ববাদ বা তাওহীদ আমাদের জীবনের মূল ভিত্তি। আমাদের সকল কাজের কেন্দ্রবিন্দু হবে স্রষ্টার প্রতি অবিচল বিশ্বাস এবং তাঁর নির্দেশিত পথ অনুসরণ;'
    },
    {
      id: 2,
      title: 'কুরআন ও সুন্নাহ',
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      text: 'ঘোষণা করছি যে, ব্যক্তিগত, পারিবারিক ও সামাজিক জীবনে কুরআন এবং সুন্নাহর শিক্ষাই হবে আমাদের চূড়ান্ত দিকনির্দেশনা;'
    },
    {
      id: 3,
      title: 'উম্মাহর ঐক্য',
      icon: <Users className="w-6 h-6 text-primary" />,
      text: 'ঘোষণা করছি যে, ভৌগোলিক সীমানা পেরিয়ে মুসলিম উম্মাহ একটি অখণ্ড সত্তা। সব ধরনের মাজহাবি, ভাষাগত ও জাতিগত বিভেদ ভুলে ভ্রাতৃত্ববোধ ও পারস্পরিক শ্রদ্ধার ভিত্তিতে ঐক্যবদ্ধ সমাজ গঠন আমাদের অঙ্গীকার;'
    },
    {
      id: 4,
      title: 'ন্যায়বিচার ও ইনসাফ',
      icon: <Scale className="w-6 h-6 text-primary" />,
      text: 'স্বীকার করি যে, ইসলামে ন্যায়বিচার একটি আপসহীন মূল্যবোধ। ধর্ম, বর্ণ, গোত্র নির্বিশেষে সমাজের প্রতিটি মানুষের প্রতি ইনসাফ প্রতিষ্ঠা এবং সব ধরনের অবিচার ও জুলুমের বিরুদ্ধে আমাদের অবস্থান;'
    },
    {
      id: 5,
      title: 'মানবাধিকার ও মানবিক মর্যাদা',
      icon: <Shield className="w-6 h-6 text-primary" />,
      text: 'ঘোষণা করছি যে, মানবজীবন ও মর্যাদা পরম পবিত্র। ইসলাম প্রদত্ত মানবাধিকার সংরক্ষণ এবং সমাজের দুর্বল, অসহায় ও সংখ্যালঘুদের নিরাপত্তা নিশ্চিত করা আমাদের ধর্মীয় ও নৈতিক দায়িত্ব;'
    },
    {
      id: 6,
      title: 'কল্যাণমুখী সমাজ',
      icon: <Handshake className="w-6 h-6 text-primary" />,
      text: 'স্মরণ করছি যে, জাকাত, সাদাকাহ এবং পারস্পরিক সহযোগিতার মাধ্যমে একটি দারিদ্র্যমুক্ত, শোষণহীন ও কল্যাণমুখী সমাজ প্রতিষ্ঠায় আমরা সচেষ্ট থাকবো;'
    },
    {
      id: 7,
      title: 'জ্ঞান ও বিজ্ঞান',
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      text: 'একাত্ম হচ্ছি যে, জ্ঞান অর্জন প্রতিটি মুসলিমের ওপর ফরজ। ধর্মীয় শিক্ষার পাশাপাশি আধুনিক বিজ্ঞান, প্রযুক্তি ও গবেষণায় উৎকর্ষ সাধনের মাধ্যমে আমরা দেশ ও মানবতার কল্যাণে ভূমিকা রাখবো;'
    },
    {
      id: 8,
      title: 'সুশাসন ও জবাবদিহিতা',
      icon: <Gavel className="w-6 h-6 text-primary" />,
      text: 'এবং সময়ের এই সন্ধিক্ষণে, এই সনদের দিক-নির্দেশনার আলোকে আমরা অঙ্গীকার করছি— আমানতদারি ও জবাবদিহিতার ভিত্তিতে সমাজ ও রাষ্ট্র পরিচালনায় সচেতন, সোচ্চার ও সক্রিয় ভূমিকা পালন করবো।'
    }
  ];

  if (showLegalPage) {
    return <LegalPage onBack={() => setShowLegalPage(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      {/* --- Navbar --- */}
      <nav className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ম
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">মুসলিম সনদ</span>
            </div>
            
            {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                {[
                  { name: 'হোম', id: 'হোম' },
                  { name: 'কেন এই সনদ?', id: 'কেন-এই-সনদ?' },
                  { name: '৮টি অঙ্গীকার', id: '৮টি-অঙ্গীকার' },
                  { name: 'আমাদের যাত্রা', id: 'আমাদের-যাত্রা' },
                  { name: 'অনুদান', id: 'অনুদান' }
                ].map((item) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    className={`font-medium transition-all duration-300 relative py-2 ${
                      activeSection === item.id 
                        ? 'text-primary' 
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {item.name}
                    {activeSection === item.id && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </a>
                ))}
              </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
                className="p-2 text-gray-600 hover:text-primary"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-b border-gray-100"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {['হোম', 'কেন এই সনদ?', '৮টি অঙ্গীকার', 'আমাদের যাত্রা', 'অনুদান'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.replace(' ', '-').toLowerCase()}`}
                    className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section id="হোম" className="relative py-24 lg:py-40 overflow-hidden bg-white islamic-pattern">
          {/* Background Pattern Overlay */}
          <div className="islamic-pattern-overlay"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight">
                <span className="text-gradient">মুসলিম সনদ</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-accent font-semibold mb-10 tracking-wide">
                উম্মাহর ঐক্যের পথে আমাদের অঙ্গীকার
              </p>
              <div className="max-w-3xl mx-auto mb-16">
                <p className="text-xl text-gray-600 leading-relaxed">
                  আমরা, দল-মত নির্বিশেষে, আমাদের মুসলিম উম্মাহর বর্তমান এবং ভবিষ্যৎ প্রজন্মের স্বার্থে একাত্ম হচ্ছি।
                </p>
              </div>

              {/* Counter Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="inline-block bg-white border border-gray-100 rounded-[2.5rem] p-10 lg:p-16 shadow-2xl shadow-primary/5"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center gap-3 text-primary bg-primary/5 px-6 py-2 rounded-full">
                    <Users className="w-6 h-6" />
                    <span className="text-sm font-bold uppercase tracking-widest">ঐতিহাসিক মাইলফলক অর্জন</span>
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900">
                    আমরা এখন <span className="text-primary"><motion.span>{displayMilestone}</motion.span>+</span>
                  </h2>
                  <p className="text-gray-500 text-xl font-medium">
                    এখন পর্যন্ত <span className="text-gray-900 font-bold"><motion.span>{displayTotal}</motion.span></span> জন এই ডিজিটাল সনদে স্বাক্ষর করেছেন।
                  </p>
                  
                  <motion.a 
                    href="#৮টি-অঙ্গীকার"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 flex items-center gap-3"
                  >
                    সনদটি পড়ুন
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Why This Charter Section --- */}
        <section id="কেন-এই-সনদ?" className="py-24 bg-white border-y border-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-primary/5 rounded-3xl flex items-center justify-center p-12">
                  <Info className="w-full h-full text-primary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40">
                      <BookOpen className="w-16 h-16" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">কেন এই সনদ?</h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    মুসলিম উম্মাহর ঐক্য, ভ্রাতৃত্ব এবং নৈতিক পুনর্জাগরণের লক্ষ্যে এই সনদটি তৈরি করা হয়েছে। বর্তমান বিশ্বের চ্যালেঞ্জ মোকাবিলায় আমাদের একটি অভিন্ন প্ল্যাটফর্ম এবং সুনির্দিষ্ট অঙ্গীকার প্রয়োজন।
                  </p>
                  <p>
                    এই সনদটি কেবল একটি দলিল নয়, বরং এটি আমাদের ব্যক্তিগত ও সামাজিক জীবনের একটি পথনির্দেশক। এটি আমাদের শেখায় কীভাবে আমরা আমাদের ঈমানি দায়িত্ব পালনের পাশাপাশি আধুনিক বিশ্বের সাথে তাল মিলিয়ে চলতে পারি।
                  </p>
                  <ul className="space-y-4">
                    {[
                      'উম্মাহর মধ্যে পারস্পরিক ভ্রাতৃত্ব বৃদ্ধি',
                      'ইসলামি মূল্যবোধের প্রচার ও প্রসার',
                      'সামাজিক ন্যায়বিচার প্রতিষ্ঠা',
                      'ভবিষ্যৎ প্রজন্মের জন্য একটি সুন্দর সমাজ গঠন'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- 8 Pledges Section --- */}
        <section id="৮টি-অঙ্গীকার" className="py-32 bg-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
              >
                আমাদের প্রতিশ্রুতি
              </motion.span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">৮টি অঙ্গীকার</h2>
              <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="bento-grid">
              {pledges.map((pledge, idx) => (
                <motion.div
                  key={pledge.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`pledge-card bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col gap-6 group relative shadow-sm ${
                    idx === 0 || idx === 7 ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Tooltip - Triggered on card hover */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full mb-4 w-80 p-6 bg-gray-900 text-white text-sm rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 z-30 shadow-2xl scale-90 group-hover:scale-100 origin-bottom backdrop-blur-md bg-gray-900/95">
                    <div className="flex items-center gap-2 mb-3 text-primary-light">
                      {React.cloneElement(pledge.icon as React.ReactElement, { className: "w-4 h-4" })}
                      <span className="font-black uppercase tracking-[0.2em] text-[10px]">{pledge.title}</span>
                    </div>
                    <p className="leading-relaxed font-medium text-gray-200 text-base">
                      {pledge.text}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-transparent border-t-gray-900/95"></div>
                  </div>

                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
                    {React.cloneElement(pledge.icon as React.ReactElement, { 
                      className: "w-8 h-8 transition-colors duration-500" 
                    })}
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors flex items-center gap-2">
                      <span className="text-primary/20 text-3xl font-black italic">0{pledge.id}</span>
                      {pledge.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg line-clamp-3 group-hover:text-gray-900 transition-colors">
                      {pledge.text}
                    </p>
                    
                    {/* Read More Hint & Share */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-xs font-bold uppercase tracking-widest">বিস্তারিত পড়ুন</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.share) {
                            navigator.share({
                              title: `মুসলিম সনদ - ${pledge.title}`,
                              text: pledge.text,
                              url: window.location.href,
                            });
                          } else {
                            navigator.clipboard.writeText(`${pledge.title}: ${pledge.text}\n${window.location.href}`);
                            alert('লিঙ্কটি কপি করা হয়েছে!');
                          }
                        }}
                        aria-label={`${pledge.title} শেয়ার করুন`}
                        className="p-3 bg-gray-50 text-gray-400 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Our Journey Section --- */}
        <section id="আমাদের-যাত্রা" className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">আমাদের যাত্রা</h2>
                <div className="space-y-8">
                  {[
                    { year: '২০২৪', title: 'পরিকল্পনা ও গবেষণা', desc: 'উম্মাহর বর্তমান পরিস্থিতি বিশ্লেষণ এবং সনদের খসড়া তৈরি।' },
                    { year: '২০২৫', title: 'ডিজিটাল প্ল্যাটফর্ম উন্মোচন', desc: 'অনলাইন স্বাক্ষর গ্রহণ এবং প্রচারণার সূচনা।' },
                    { year: '২০২৬', title: 'মাইলফলক অর্জন', desc: '৫০,০০০+ মানুষের একাত্মতা এবং সামাজিক প্রভাব বিস্তার।' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 relative">
                      {i !== 2 && <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-100"></div>}
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 z-10 shadow-lg shadow-primary/20">
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-primary font-bold text-sm">{step.year}</span>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-bg-alt rounded-[3rem] p-12 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-[3rem]"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 transform -rotate-6">
                      <Users className="w-16 h-16 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">একত্রে আমরা শক্তিশালী</h3>
                    <p className="text-gray-600">প্রতিটি স্বাক্ষর আমাদের লক্ষ্য অর্জনে এক ধাপ এগিয়ে নিয়ে যায়।</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Signature Form Section --- */}
        <section id="স্বাক্ষর" className="py-32 bg-white relative overflow-hidden">
          {/* Background Accents */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Modern Callout for Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-8 border-primary p-8 rounded-r-[2rem] shadow-sm"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-primary/20">
                  <Info className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-3">জরুরী নির্দেশনা</h2>
                  <p className="text-gray-600 text-xl leading-relaxed">
                    উপরোক্ত অঙ্গীকারসমূহের সাথে আপনি একমত হলে, নিচের ফর্মে আপনার নাম ও জেলা প্রদান করে ডিজিটাল স্বাক্ষর সম্পন্ন করুন। আপনার একাত্মতা আমাদের শক্তি।
                  </p>
                </div>
              </div>
            </motion.div>

            <CharterForm />
          </div>

          {/* Signatures Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-24 border-t border-gray-100">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-primary/5 text-primary px-6 py-2 rounded-full mb-6">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">স্বাক্ষরকারীদের তালিকা</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">একাত্মতা প্রকাশ করেছেন</h3>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                এখন পর্যন্ত যারা এই সনদে স্বাক্ষর করে উম্মাহর ঐক্যের পথে শামিল হয়েছেন।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { name: 'আব্দুল্লাহ আল মামুন', location: 'ঢাকা', date: '২৮ মার্চ, ২০২৬' },
                { name: 'ফাতিমা জোহরা', location: 'চট্টগ্রাম', date: '২৭ মার্চ, ২০২৬' },
                { name: 'মো: হাসান আলী', location: 'সিলেট', date: '২৭ মার্চ, ২০২৬' },
                { name: 'সাদিয়া ইসলাম', location: 'রাজশাহী', date: '২৬ মার্চ, ২০২৬' }
              ].map((sig, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary font-bold shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                      {sig.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{sig.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{sig.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {sig.date}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => setShowSignaturesModal(true)}
                className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all group"
              >
                সবগুলো স্বাক্ষর দেখুন
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* --- Signatures Modal --- */}
        <AnimatePresence>
          {showSignaturesModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSignaturesModal(false)}
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              >
                <div className="p-8 lg:p-12 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2">সকল স্বাক্ষরকারী</h3>
                    <p className="text-gray-500 font-medium">মোট {totalSignatures.toLocaleString()} জন একাত্মতা প্রকাশ করেছেন</p>
                  </div>
                  <button 
                    onClick={() => setShowSignaturesModal(false)}
                    className="p-4 hover:bg-white rounded-2xl transition-colors text-gray-400 hover:text-gray-900 shadow-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-8 lg:p-12 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">
                          {['ক', 'খ', 'গ', 'ঘ', 'চ'][i % 5]}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900 text-sm">স্বাক্ষরকারী {i + 1}</h5>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ঢাকা, বাংলাদেশ</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 text-center">
                    <p className="text-gray-400 text-sm font-medium italic">আরও লোড হচ্ছে...</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- Donation Section --- */}
        <section id="অনুদান" className="py-32 bg-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 text-accent rounded-3xl mb-8">
                <Heart className="w-10 h-10" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">কার্যক্রমে অংশ নিন</h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                এই উদ্যোগকে আরও মানুষের কাছে পৌঁছে দিতে আপনার সহযোগিতা কাম্য। আপনার সামান্য অবদান আমাদের বিশাল পথ চলায় সাহস যোগাবে।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Payment Info Card */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 lg:p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50"
              >
                <h3 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-3">
                  <div className="w-2 h-8 bg-accent rounded-full"></div>
                  পেমেন্ট ইন্সট্রাকশন
                </h3>
                
                <div className="space-y-6">
                  {[
                    { name: 'বিকাশ', type: 'পার্সোনাল', color: 'bg-pink-50 text-pink-600', border: 'border-pink-100', label: 'bK' },
                    { name: 'নগদ', type: 'পার্সোনাল', color: 'bg-orange-50 text-orange-600', border: 'border-orange-100', label: 'Ng' },
                    { name: 'রকেট', type: 'পার্সোনাল', color: 'bg-purple-50 text-purple-600', border: 'border-purple-100', label: 'Ro' }
                  ].map((method) => (
                    <div key={method.name} className={`flex items-center justify-between p-6 ${method.color} rounded-3xl border ${method.border} group hover:scale-[1.02] transition-transform cursor-pointer`}>
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
                          {method.label}
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-widest opacity-80">{method.name} ({method.type})</p>
                          <p className="text-2xl font-black text-gray-900">০১৩০৬৯৯০১৫২</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText('01306990152');
                          alert(`${method.name} নম্বরটি কপি করা হয়েছে!`);
                        }}
                        className="p-3 bg-white/50 rounded-xl hover:bg-white transition-colors"
                        aria-label={`${method.name} কপি করুন`}
                      >
                        <PenTool className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-blue-50 rounded-[2rem] flex gap-4 border border-blue-100">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-base text-blue-800 leading-relaxed font-medium">
                    অনুগ্রহ করে সেন্ড মানি করার পর ডানদিকের ফর্মে ট্রানজেকশন আইডি প্রদান করে ভেরিফাই করুন।
                  </p>
                </div>
              </motion.div>

              {/* Verification Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 lg:p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50"
              >
                <h3 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  অনুদান ভেরিফাই করুন
                </h3>
                
                {isDonationVerified ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-14 h-14" />
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-2">অনুরোধ গ্রহণ করা হয়েছে!</h4>
                    <div className="bg-gray-50 inline-block px-6 py-2 rounded-full border border-gray-100 mb-8">
                      <p className="text-sm text-gray-500 font-bold">
                        ট্রানজেকশন আইডি: <span className="text-primary">{submittedTrxId}</span>
                      </p>
                    </div>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-sm mx-auto">
                      আমরা শীঘ্রই আপনার ট্রানজেকশনটি যাচাই করে নিশ্চিত করবো। <br />
                      <span className="font-bold text-primary">জাযাকাল্লাহু খাইরান।</span>
                    </p>
                    <button 
                      onClick={() => setIsDonationVerified(false)}
                      className="mt-12 bg-gray-100 text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all shadow-sm"
                    >
                      আরেকটি ভেরিফিকেশন করুন
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDonationSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 ml-1">ট্রানজেকশন আইডি (TrxID)</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg"
                        placeholder="উদা: 8N7K5L2M"
                        value={donationForm.trxId}
                        onChange={(e) => setDonationForm({...donationForm, trxId: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 ml-1">প্রেরক নম্বর (Sender Number)</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg"
                        placeholder="উদা: 017XXXXXXXX"
                        value={donationForm.senderNumber}
                        onChange={(e) => setDonationForm({...donationForm, senderNumber: e.target.value})}
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-accent text-white font-black py-6 rounded-2xl transition-all shadow-2xl shadow-accent/20 text-xl"
                    >
                      ভেরিফাই করুন
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Floating Call Button */}
      <motion.a
        href="tel:+8801306990152"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[60] bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-900/20 flex items-center gap-3 group no-print"
      >
        <div className="bg-white/20 p-2 rounded-full">
          <Phone className="w-6 h-6" />
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
          কল করুন
        </span>
      </motion.a>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 border-b border-gray-800 pb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20">
                  ম
                </div>
                <span className="text-3xl font-black tracking-tight">মুসলিম সনদ</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg max-w-md">
                উম্মাহর ঐক্যের পথে আমাদের অঙ্গীকার। আমরা একটি সমৃদ্ধ, ন্যায়ভিত্তিক ও কল্যাণমুখী সমাজ গঠনে প্রতিশ্রুতিবদ্ধ। আমাদের এই যাত্রায় আপনার অংশগ্রহণ কাম্য।
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">লিঙ্কসমূহ</h4>
              <ul className="space-y-5">
                {[
                  { name: 'হোম', id: 'হোম' },
                  { name: 'কেন এই সনদ?', id: 'কেন-এই-সনদ?' },
                  { name: '৮টি অঙ্গীকার', id: '৮টি-অঙ্গীকার' },
                  { name: 'আমাদের যাত্রা', id: 'আমাদের-যাত্রা' },
                  { name: 'অনুদান', id: 'অনুদান' }
                ].map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="text-gray-400 hover:text-white transition-colors text-lg font-medium">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">যোগাযোগ</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-gray-400 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">ইমেইল করুন</p>
                    <p className="text-lg font-medium group-hover:text-white transition-colors">info@muslimcharter.org</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-gray-400 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">কল করুন</p>
                    <p className="text-lg font-medium group-hover:text-white transition-colors">+৮৮০ ১৩০৬৯৯০১৫২</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-sm font-medium">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p>© ২০২৬ মুসলিম সনদ। সর্বস্বত্ব সংরক্ষিত।</p>
              <p className="text-xs text-gray-600">
                Developed by <a href="https://www.facebook.com/collegepeak" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">CollegePeak</a>
              </p>
            </div>
            <div className="flex gap-8">
              <button 
                onClick={() => setShowLegalPage(true)} 
                className="hover:text-white transition-colors"
              >
                প্রাইভেসি পলিসি
              </button>
              <button 
                onClick={() => setShowLegalPage(true)} 
                className="hover:text-white transition-colors"
              >
                শর্তাবলী
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
