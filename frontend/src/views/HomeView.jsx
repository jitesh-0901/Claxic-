import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Award,
  CheckCircle2,
  Layers,
  Code2,
  ChevronRight,
  ChevronDown,
  Check,
  Clock,
  Video,
  Users,
  Terminal,
  Cpu,
  Zap,
  GraduationCap,
  Star,
  Play,
  Lock,
  FileText,
  CheckSquare,
  Globe,
  HelpCircle,
  Send,
  Calendar,
  ExternalLink,
  Laptop,
  XCircle,
  AlertTriangle,
  Upload,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { DegreeSelect } from '../components/ui/DegreeSelect.jsx';
import { StudentGrowthHero } from '../components/home/StudentGrowthHero.jsx';
import { HowItWorksProcess } from '../components/home/HowItWorksProcess.jsx';

export const HomeView = ({
  courses = [],
  onNavigate,
  onSelectCourse,
  onApplyCourse,
}) => {
  const { user } = useAuth();

  // Registration Form State
  const [selectedCourseId, setSelectedCourseId] = useState(
    courses.length > 0 ? courses[0].id : ''
  );

  const extract10DigitMobile = (val) => {
    if (!val) return '';
    let digits = String(val).replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
    if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
    if (digits.length > 10) return digits.slice(-10);
    return digits;
  };

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(extract10DigitMobile(user?.mobile));
  const [institution, setInstitution] = useState(user?.institution || '');
  const [degree, setDegree] = useState(user?.degree || '');
  const [batch, setBatch] = useState('Weekend Evening');
  const [sop, setSop] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.name) setFullName(user.name);
      if (user.email) setEmail(user.email);
      if (user.mobile) setMobile(extract10DigitMobile(user.mobile));
      if (user.institution) setInstitution(user.institution);
      if (user.degree) setDegree(user.degree);
    }
  }, [user]);

  // Interactive UI States
  const [activeDayTab, setActiveDayTab] = useState(1);

  const handleMobileChange = (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
    else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
    if (digits.length > 10) digits = digits.slice(-10);
    setMobile(digits);
  };

  const cleanCourseTitle = (title) => {
    if (!title) return '';
    return title.replace(/\s*(?:-\s*Batch\s*)?\d{10,14}/g, '').trim();
  };

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const publishedCourses = courses.filter((c) => c.status === 'PUBLISHED' || c.status === 'FULL');

  const scrollToApply = (courseId = null) => {
    if (courseId) setSelectedCourseId(courseId);
    const formElement = document.getElementById('admissions-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleInlineApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (mobile && mobile.length !== 10) {
      setSubmitError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!user) {
      if (selectedCourse) {
        try {
          sessionStorage.setItem('claxic_pending_apply_course', JSON.stringify(selectedCourse));
        } catch (err) {
          console.error('Failed to save pending course:', err);
        }
      }
      if (onNavigate) {
        onNavigate('login');
      }
      return;
    }

    if (!selectedCourse) {
      setSubmitError('Please select a valid course program.');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('claxic_token');
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          formData: {
            fullName: fullName.trim(),
            email: email.trim(),
            mobile: mobile ? `+91 ${mobile.trim()}` : '',
            institution: institution.trim(),
            degree: degree.trim(),
            batch,
            sop: sop.trim(),
            startDate: startDate || new Date().toISOString().split('T')[0],
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Application submission failed.');
      }

      setSubmitSuccess({
        applicationNumber: data.application.applicationNumber,
        courseTitle: selectedCourse.title,
        status: data.application.status,
      });
    } catch (err) {
      setSubmitError(err.message || 'Error submitting admission application.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="space-y-12 sm:space-y-16 pb-24 font-sans text-slate-900 bg-[#F8FAFC]">
      {/* Hero & Process Flow with Tightened Cohesive Spacing */}
      <div className="space-y-3 sm:space-y-6">
        {/* =================================================================== */}
        {/* 1. STUDENT GROWTH HERO: Step on Knowledge, Rise into Success        */}
        {/* =================================================================== */}
        <StudentGrowthHero
          onNavigate={onNavigate}
          onScrollToApply={() => {
            const el = document.getElementById('admissions-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* =================================================================== */}
        {/* 2. HOW IT WORKS: Simple Steps. Real Progress.                       */}
        {/* =================================================================== */}
        <HowItWorksProcess onExplore={() => onNavigate && onNavigate('courses')} />
      </div>




      {/* =================================================================== */}
      {/* 5. DIRECT ADMISSIONS REGISTRATION FORM CARD                         */}
      {/* =================================================================== */}
      <section id="admissions-form" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.1)] space-y-6">
          <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#EE2D02] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                Admissions Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1 font-display">
                Student Admission Application
              </h2>
            </div>

          </div>

          {/* Alert Messages */}
          {submitError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {submitSuccess && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Application Submitted Successfully! 🎉</span>
              </div>
              <p className="text-xs text-emerald-800">
                Application Reference: <strong className="font-mono">{submitSuccess.applicationNumber}</strong> for <strong>{submitSuccess.courseTitle}</strong>.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('student')}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Go to Student Portal
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleInlineApplySubmit} className="space-y-5">
            {/* 1. Target Course Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select Masterclass Specialization *
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#EE2D02] focus:ring-1 focus:ring-[#EE2D02] cursor-pointer"
                required
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {cleanCourseTitle(c.title)} (Starts: {c.startDate || 'Daily'})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Personal Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#EE2D02] focus:ring-1 focus:ring-[#EE2D02]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aditi.sharma@gmail.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#EE2D02] focus:ring-1 focus:ring-[#EE2D02]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile Number (10 digits) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={handleMobileChange}
                    maxLength={10}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-[#EE2D02] focus:ring-1 focus:ring-[#EE2D02]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  College / Institution *
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Anna University / IIT Madras"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#EE2D02] focus:ring-1 focus:ring-[#EE2D02]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Degree / Specialization *
              </label>
              <DegreeSelect
                value={degree}
                onChange={setDegree}
                placeholder="Search or select degree (e.g. B.Tech CSE, BCA, B.Sc Computer Science...)"
                rounded="rounded-xl"
              />
            </div>

            {/* Submit & Guarantee Strip */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#EE2D02] shrink-0" />
                <span>Verified Razorpay Gateway & Instant 18% GST Tax Invoice</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#EE2D02] hover:bg-[#D42700] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg shadow-[#EE2D02]/25 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{user ? 'Submit Application & Reserve Seat' : 'Sign In & Reserve Seat'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>






    </div>
  );
};
