import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Download, 
  User, 
  MapPin, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  X,
  Printer,
  Loader2
} from 'lucide-react';

interface FormData {
  name: string;
  location: string;
  email: string;
  agreed: boolean;
}

const CharterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    email: '',
    agreed: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setIsModalOpen(true);
  };

  const proceedToCertificate = () => {
    setIsModalOpen(false);
    setShowCertificate(true);
    // Scroll to certificate after a short delay
    setTimeout(() => {
      certificateRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const downloadPdf = async () => {
    if (!certificateRef.current) return;
    
    setIsGeneratingPdf(true);
    try {
      const element = certificateRef.current;
      
      // Use html-to-image's toCanvas for better compatibility and higher quality
      // We use toCanvas directly to avoid potential toDataURL "invalid state" errors
      const canvas = await toCanvas(element, {
        pixelRatio: 3, // Increased for higher resolution
        backgroundColor: '#ffffff',
        cacheBust: true,
        skipFonts: false, // Ensure fonts are included
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas capture failed');
      }

      // Create PDF in landscape A4 format
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const ratio = canvas.width / canvas.height;
      
      // Calculate dimensions to fit A4 while maintaining aspect ratio
      const margin = 10;
      let width = pageWidth - (margin * 2);
      let height = width / ratio;
      
      if (height > (pageHeight - (margin * 2))) {
        height = pageHeight - (margin * 2);
        width = height * ratio;
      }
      
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;
      
      // jsPDF can take a canvas element directly
      pdf.addImage(canvas, 'PNG', x, y, width, height, undefined, 'FAST');
      pdf.save(`Muslim_Charter_Certificate_${formData.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF তৈরি করতে সমস্যা হয়েছে। সাধারণ প্রিন্ট অপশন ব্যবহার করা হচ্ছে।');
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const today = new Intl.DateTimeFormat('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-12">
      {/* Form Section (The Bait) */}
      {!showCertificate && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-emerald-50 overflow-hidden"
        >
          <div className="bg-emerald-600 p-8 text-white text-center">
            <h2 className="text-3xl font-black mb-2">ডিজিটাল স্বাক্ষর প্রদান করুন</h2>
            <p className="text-emerald-100 font-medium">উম্মাহর ঐক্যের এই মহৎ উদ্যোগে আপনার নাম যুক্ত করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  আপনার নাম (বাংলা)
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="উদা: আব্দুল্লাহ আল মামুন"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  ঠিকানা: জেলা ও উপজেলা
                </label>
                <input
                  required
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="উদা: মিরপুর, ঢাকা"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                আপনার ইমেইল
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium"
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <input
                required
                type="checkbox"
                name="agreed"
                id="agreed"
                checked={formData.agreed}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 accent-emerald-600 cursor-pointer"
              />
              <label htmlFor="agreed" className="text-sm text-emerald-900 font-medium leading-relaxed cursor-pointer">
                আমি মুসলিম সনদের ৮টি অঙ্গীকার পাঠ করেছি এবং এর সাথে পূর্ণ একাত্মতা প্রকাশ করছি। আমি আমার ব্যক্তিগত তথ্য দিয়ে এই ডিজিটাল সনদে স্বাক্ষর করতে সম্মত।
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 group"
            >
              ডিজিটাল স্বাক্ষর করুন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      )}

      {/* Awareness Modal (The Twist) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="p-8 md:p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldAlert className="w-10 h-10 text-amber-600" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900">একটু থামুন! 🛑</h3>
                
                <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                  <p>
                    এই যে আপনি চাওয়া মাত্রই একটি ওয়েবসাইটে আপনার নাম, ইমেইল এবং ঠিকানার মতো ব্যক্তিগত তথ্য দিয়ে দিলেন, আপনি কি জানেন অনলাইনে এভাবে তথ্য দেওয়া কতটা বিপজ্জনক? 
                  </p>
                  <p className="text-red-500 font-bold">
                    যে কেউ এই ডেটা ব্যবহার করে আপনার ক্ষতি করতে পারে বা ফিশিং অ্যাটাক চালাতে পারে!
                  </p>
                  <p className="bg-emerald-50 p-4 rounded-xl text-emerald-800 text-sm">
                    ভয় পাবেন না, আমরা আপনার কোনো ডেটা আমাদের ডাটাবেসে স্টোর করছি না। আপনার তথ্য কেবল আপনার ব্রাউজারেই আছে এবং আমরা তা দিয়েই আপনার সার্টিফিকেট তৈরি করে দিচ্ছি। তবে ভবিষ্যতে অনলাইনে যেকোনো জায়গায় ব্যক্তিগত তথ্য দেওয়ার আগে অবশ্যই সাবধান থাকবেন। সুস্থ থাকুন, নিরাপদ থাকুন।
                  </p>
                </div>

                <button
                  onClick={proceedToCertificate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3"
                >
                  আমি বুঝতে পেরেছি, আমার সনদটি দিন
                  <ShieldCheck className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors"
                >
                  ফিরে যান
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certificate UI (Client-Side Rendering) */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-emerald-50 p-6 rounded-3xl border border-emerald-100 no-print">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-emerald-900">অভিনন্দন!</h4>
                  <p className="text-emerald-700 text-sm font-medium">আপনার সনদটি সফলভাবে তৈরি হয়েছে।</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={downloadPdf}
                  disabled={isGeneratingPdf}
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-bold border border-slate-200 transition-all shadow-sm disabled:opacity-50"
                >
                  {isGeneratingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Printer className="w-4 h-4" />
                  )}
                  প্রিন্ট করুন (PDF)
                </button>
                <button 
                  onClick={() => setShowCertificate(false)}
                  className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
                >
                  নতুন স্বাক্ষর
                </button>
              </div>
            </div>

            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
              @media print {
                body * { visibility: hidden; }
                .certificate-print-area, .certificate-print-area * { visibility: visible; }
                .certificate-print-area { 
                  position: absolute; 
                  left: 0; 
                  top: 0; 
                  width: 100%; 
                  height: auto;
                  margin: 0;
                  padding: 0;
                  border: none !important;
                  box-shadow: none !important;
                }
                .no-print { display: none !important; }
                @page { size: auto; margin: 0mm; }
              }
            `}} />

            {/* The Certificate Card */}
            <div 
              ref={certificateRef}
              style={{ backgroundColor: '#ffffff', borderColor: '#059669' }}
              className="relative p-4 md:p-8 rounded-[2rem] shadow-2xl border-8 border-double overflow-hidden certificate-print-area"
            >
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%23059669' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
              
              <div 
                style={{ borderColor: '#d1fae5' }}
                className="relative border-2 p-8 md:p-16 text-center space-y-10"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div 
                    style={{ backgroundColor: '#059669' }}
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                  >
                    <ShieldCheck className="w-12 h-12 text-white" />
                  </div>
                  <h1 style={{ color: '#065f46' }} className="text-5xl md:text-7xl font-black tracking-tight">মুসলিম সনদ</h1>
                  <p style={{ color: '#059669' }} className="text-xl md:text-2xl font-bold italic">উম্মাহর ঐক্যের পথে একাত্মতা</p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d1fae5] to-transparent" />

                {/* Body */}
                <div className="space-y-8">
                  <p style={{ color: '#64748b' }} className="text-xl font-medium">এতদ্বারা প্রত্যয়ন করা যাচ্ছে যে,</p>
                  
                  <div className="space-y-4">
                    <h2 
                      style={{ color: '#0f172a', borderBottomColor: '#10b981' }} 
                      className="text-4xl md:text-6xl font-black border-b-4 inline-block px-8 pb-2"
                    >
                      {formData.name || 'আপনার নাম'}
                    </h2>
                    <p style={{ color: '#047857' }} className="text-xl md:text-2xl font-bold">
                      ঠিকানা: {formData.location || 'আপনার ঠিকানা'}
                    </p>
                  </div>

                  <p style={{ color: '#475569' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                    মুসলিম সনদের ৮টি অঙ্গীকারের সাথে একাত্মতা প্রকাশ করেছেন এবং একটি সুন্দর সমাজ গঠনে নিজের প্রতিশ্রুতি ব্যক্ত করেছেন।
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-12 flex flex-col md:flex-row items-end justify-between gap-8">
                  <div className="text-left space-y-1">
                    <p style={{ color: '#94a3b8' }} className="text-sm font-bold uppercase tracking-widest">তারিখ</p>
                    <p style={{ color: '#1e293b' }} className="text-xl font-black">{today}</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div style={{ backgroundColor: '#cbd5e1' }} className="w-48 h-px mb-2" />
                    <p style={{ color: '#059669' }} className="font-black text-xl">মুসলিম সনদ কর্তৃপক্ষ</p>
                    <p style={{ color: '#94a3b8' }} className="text-xs font-bold uppercase tracking-widest">ডিজিটাল ভেরিফাইড সিগনেচার</p>
                  </div>
                </div>
              </div>

              {/* Corner Ornaments */}
              <div style={{ borderTopColor: '#059669', borderLeftColor: '#059669' }} className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 rounded-tl-3xl opacity-20" />
              <div style={{ borderTopColor: '#059669', borderRightColor: '#059669' }} className="absolute top-0 right-0 w-24 h-24 border-t-8 border-r-8 rounded-tr-3xl opacity-20" />
              <div style={{ borderBottomColor: '#059669', borderLeftColor: '#059669' }} className="absolute bottom-0 left-0 w-24 h-24 border-b-8 border-l-8 rounded-bl-3xl opacity-20" />
              <div style={{ borderBottomColor: '#059669', borderRightColor: '#059669' }} className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 rounded-br-3xl opacity-20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharterForm;
