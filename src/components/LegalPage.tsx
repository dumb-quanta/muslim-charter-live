import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldCheck, FileText, Calendar, Mail, CheckCircle2, AlertCircle, Lock, Globe, Info } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  const tabs = [
    { id: 'privacy', label: 'প্রাইভেসি পলিসি', icon: ShieldCheck, desc: 'আপনার তথ্যের সুরক্ষা আমাদের আমানত' },
    { id: 'terms', label: 'শর্তাবলী', icon: FileText, desc: 'প্ল্যাটফর্ম ব্যবহারের নিয়ম ও নির্দেশিকা' },
  ];

  const lastUpdate = "২৮শে মার্চ, ২০২৬";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-full h-full opacity-[0.02] islamic-pattern" />
      </div>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={onBack}
              className="group flex items-center gap-3 text-slate-600 hover:text-emerald-600 font-bold transition-all"
              aria-label="হোম পেজে ফিরে যান"
            >
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50 flex items-center justify-center transition-all shadow-sm group-hover:shadow-emerald-100">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="hidden sm:inline text-sm uppercase tracking-widest">ফিরে যান</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-xl shadow-emerald-200/50">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">মুসলিম সনদ</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-100"
          >
            <Lock className="w-3 h-3" />
            নিরাপদ ও স্বচ্ছ প্ল্যাটফর্ম
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            আইনি ও <span className="text-emerald-600">গোপনীয়তা</span> নীতিমালা
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
          >
            মুসলিম সনদ প্ল্যাটফর্মটি ব্যবহারের ক্ষেত্রে আমাদের স্বচ্ছতা এবং আপনার তথ্যের নিরাপত্তা নিশ্চিত করতে আমরা প্রতিশ্রুতিবদ্ধ।
          </motion.p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex flex-col items-start p-6 rounded-[2rem] border-2 transition-all text-left ${
                  isActive
                    ? 'bg-white border-emerald-500 shadow-2xl shadow-emerald-900/5'
                    : 'bg-white/50 border-transparent hover:border-slate-200 hover:bg-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                  isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-black mb-1 ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                  {tab.label}
                </h3>
                <p className={`text-sm font-medium ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>
                  {tab.desc}
                </p>
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute -inset-1 rounded-[2.1rem] border-4 border-emerald-500/10 pointer-events-none"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-[3rem] p-8 md:p-16 lg:p-20 border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden"
          >
            {/* Content Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-100">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">
                  {activeTab === 'privacy' ? 'গোপনীয়তা নীতি' : 'ব্যবহারের শর্তাবলী'}
                </h2>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  সর্বশেষ আপডেট: {lastUpdate}
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                <Globe className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-600">গ্লোবাল স্ট্যান্ডার্ড কমপ্লায়েন্স</span>
              </div>
            </div>

            {/* Quick Summary Box */}
            <div className="mb-12 p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100/50 flex gap-6 items-start">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-emerald-900 mb-2">সংক্ষিপ্ত সারমর্ম</h4>
                <p className="text-emerald-800/80 font-medium leading-relaxed">
                  {activeTab === 'privacy' 
                    ? 'আমরা আপনার কোনো ব্যক্তিগত তথ্য বাণিজ্যিক উদ্দেশ্যে ব্যবহার করি না। আপনার তথ্য আমাদের কাছে একটি পবিত্র আমানত এবং আমরা তা আধুনিক এনক্রিপশনের মাধ্যমে সুরক্ষিত রাখি।'
                    : 'এই প্ল্যাটফর্মটি সম্পূর্ণ স্বেচ্ছাপ্রণোদিত এবং অলাভজনক। এখানে অংশগ্রহণ বা অনুদান প্রদানের মাধ্যমে আপনি উম্মাহর ঐক্যের এই মহৎ উদ্দেশ্যকে সমর্থন করছেন।'}
                </p>
              </div>
            </div>

            {/* Main Prose Content */}
            <div className="prose prose-emerald prose-slate max-w-none md:prose-lg prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-strong:font-bold prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline">
              {activeTab === 'privacy' ? (
                <>
                  <p>
                    'মুসলিম সনদ' (Muslim Charter)-এ আপনার অংশগ্রহণের জন্য আমরা কৃতজ্ঞ। ইসলামে প্রতিশ্রুতি ও আমানত রক্ষার যে গুরুত্ব রয়েছে, তার আলোকে আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করা আমাদের নৈতিক ও প্রযুক্তিগত দায়িত্ব।
                  </p>

                  <h3>১. আমরা যে তথ্য সংগ্রহ করি</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mb-8">
                    {[
                      { title: 'প্রাথমিক তথ্য', desc: 'নাম, জেলা ও উপজেলা এবং ইমেইল অ্যাড্রেস।', icon: <CheckCircle2 className="w-5 h-5" /> },
                      { title: 'ডিজিটাল স্বাক্ষর', desc: 'সনদের প্রতি আপনার সম্মতির প্রতীক।', icon: <CheckCircle2 className="w-5 h-5" /> },
                      { title: 'অনুদান তথ্য', desc: 'TrxID এবং মোবাইল নম্বর (ভেরিফিকেশনের জন্য)।', icon: <CheckCircle2 className="w-5 h-5" /> },
                      { title: 'টেকনিক্যাল ডাটা', desc: 'ব্রাউজার টাইপ এবং আইপি অ্যাড্রেস (নিরাপত্তার জন্য)।', icon: <CheckCircle2 className="w-5 h-5" /> }
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-3">
                        <div className="text-emerald-600 mt-1">{item.icon}</div>
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                          <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3>২. তথ্যের ব্যবহার</h3>
                  <p>সংগৃহীত তথ্যগুলো মূলত নিম্নলিখিত উদ্দেশ্যে ব্যবহৃত হয়:</p>
                  <ul>
                    <li>আপনার নামে ব্যক্তিগতকৃত ডিজিটাল স্বীকৃতিপত্র জেনারেট করা।</li>
                    <li>ওয়েবসাইটে রিয়েল-টাইম কাউন্টার-এ কতজন স্বাক্ষর করেছেন তা প্রদর্শন করা।</li>
                    <li>অনুদান সফলভাবে গ্রহণ করা হয়েছে কিনা তা যাচাই করা।</li>
                    <li>প্ল্যাটফর্মের নিরাপত্তা নিশ্চিত করা এবং স্প্যামিং রোধ করা।</li>
                  </ul>

                  <h3>৩. ডাটা সুরক্ষা ও আমানত</h3>
                  <p>
                    আপনার তথ্য আমাদের কাছে একটি পবিত্র আমানত। আমরা কোনোভাবেই আপনার ব্যক্তিগত তথ্য বাণিজ্যিক উদ্দেশ্যে কোনো তৃতীয় পক্ষের কাছে বিক্রি, বিনিময় বা হস্তান্তর করি না। তথ্যের অননুমোদিত প্রবেশ রোধ করতে আমরা আধুনিক এনক্রিপশন ও ক্লাউড সিকিউরিটি ব্যবহার করি।
                  </p>

                  <h3>৪. পাবলিক ডিসপ্লে</h3>
                  <p>
                    যেহেতু এটি একটি গণ-স্বাক্ষর কার্যক্রম, তাই অংশগ্রহণকারীদের নাম এবং জেলা জনস্বার্থে আমাদের ওয়েবসাইটের 'লাইভ আপডেট' সেকশনে প্রদর্শিত হতে পারে। আপনি যখন আপনার স্বীকৃতিপত্রটি সোশ্যাল মিডিয়ায় শেয়ার করেন, তখন ঐ তথ্যের পাবলিক দৃশ্যমানতার দায়িত্ব আপনার নিজের।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    'মুসলিম সনদ' ওয়েবসাইটে প্রবেশ, ডিজিটাল স্বাক্ষর প্রদান অথবা অনুদান প্রদানের মাধ্যমে আপনি এই শর্তাবলীর সাথে সম্পূর্ণভাবে একমত পোষণ করছেন। 
                  </p>

                  <h3>১. সাধারণ সম্মতি</h3>
                  <p>
                    এই প্ল্যাটফর্মটি ব্যবহারের জন্য আপনার বয়স কমপক্ষে ১৩ বছর হতে হবে (অথবা আপনার অভিভাবকের অনুমতি থাকতে হবে)। আপনি সত্য ও সঠিক তথ্য প্রদান করতে অঙ্গীকারবদ্ধ।
                  </p>

                  <h3>২. সনদের প্রকৃতি</h3>
                  <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4 mb-8 not-prose">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <p className="text-amber-900 font-medium leading-relaxed">
                      এই সনদটি একটি আদর্শিক, নৈতিক ও সামাজিক ঘোষণাপত্র। এটি কোনো দেশের প্রচলিত আইনে কোনো আইনি চুক্তি বা রাজনৈতিক ইশতেহার নয়। এটি মূলত মুসলিম উম্মাহর ঐক্য ও নৈতিক মূল্যবোধ জাগরণের একটি প্ল্যাটফর্ম।
                    </p>
                  </div>

                  <h3>৩. অনুদান (Donation) নীতিমালা</h3>
                  <p>
                    এই উদ্যোগের প্রচার, প্রসার এবং ওয়েবসাইটের কারিগরি ব্যয় নির্বাহের জন্য গৃহীত যেকোনো আর্থিক সহায়তা সম্পূর্ণ স্বেচ্ছাপ্রণোদিত। 
                  </p>
                  <ul>
                    <li>এটি একটি অলাভজনক উদ্যোগ। আপনার প্রদত্ত অর্থ 'সাদাকাহ' বা 'হাদিয়া' হিসেবে গণ্য হবে।</li>
                    <li>প্রযুক্তিগত ও প্রশাসনিক কারণে একবার প্রদানকৃত অনুদান অফেরতযোগ্য (Non-refundable)।</li>
                    <li>অনুদানের অর্থ কেবল প্ল্যাটফর্মের রক্ষণাবেক্ষণ এবং প্রচারণামূলক কাজে ব্যবহৃত হবে।</li>
                  </ul>

                  <h3>৪. ব্যবহারকারীর আচরণ</h3>
                  <p>
                    ডিজিটাল ফর্মে স্বাক্ষর করার সময় শালীনতা বজায় রাখা বাধ্যতামূলক। কোনো প্রকার ফেক (Fake) ডেটা প্রদান, স্প্যামিং, বট ব্যবহার, বা উসকানিমূলক মন্তব্য করা থেকে বিরত থাকুন। সিস্টেমের অপব্যবহার প্রমাণিত হলে কর্তৃপক্ষ যে-কোনো স্বাক্ষর বাতিল করার অধিকার রাখে।
                  </p>
                </>
              )}

              {/* Contact Section */}
              <div className="mt-16 pt-12 border-t border-slate-100 not-prose">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                      <h4 className="text-2xl font-black mb-2">আরো কিছু জানতে চান?</h4>
                      <p className="text-slate-400 font-medium">আমাদের সাপোর্ট টিম আপনার যেকোনো প্রশ্নের উত্তর দিতে প্রস্তুত।</p>
                    </div>
                    <a 
                      href="mailto:info@muslimcharter.org"
                      className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/20"
                    >
                      <Mail className="w-5 h-5" />
                      ইমেইল করুন
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/60 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">ম</div>
            <span className="text-lg font-black text-slate-900">মুসলিম সনদ</span>
          </div>
          <p className="text-slate-500 font-medium text-sm">© ২০২৬ মুসলিম সনদ। সকল স্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
