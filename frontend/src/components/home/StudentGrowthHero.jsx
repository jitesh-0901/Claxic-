import React from 'react';
import { ArrowRight } from 'lucide-react';

export const StudentGrowthHero = ({ onNavigate, onScrollToApply }) => {
  const handleStartJourney = () => {
    if (onScrollToApply) {
      onScrollToApply();
    } else {
      const el = document.getElementById('admissions-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('courses');
      }
    }
  };

  return (
    <section className="relative z-10 pt-6 sm:pt-10 lg:pt-12 pb-1 sm:pb-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-orange-100/50 via-rose-50/40 to-amber-100/40 blur-3xl -z-10 pointer-events-none rounded-full" />

      {/* Seamless Open Grid Layout without Enclosing Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column: Heading, Subtitle & Action Buttons */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[50px] font-black text-slate-900 tracking-tight leading-[1.14] font-display">
            Step on Knowledge.{' '}
            <span className="text-[#EE2D02] block mt-1.5">
              Rise Into Real Success.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-xl">
            Every lesson and project is a stepping stone. At Claxic Academy, students ascend step-by-step
            through structured book-first curriculums, guided coding masterclasses, and hands-on mentorship
            straight into top-tier tech careers.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
            <button
              type="button"
              onClick={handleStartJourney}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#EE2D02] to-orange-600 hover:from-[#D42700] hover:to-orange-700 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('courses')}
              className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors border border-slate-200/80 cursor-pointer shadow-2xs"
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* Right Column: 3D Artwork (Balanced, neat, perfect proportion with left text) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[475px] xl:max-w-[490px]">
            {/* Subtle soft backdrop glow for the artwork */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-orange-200/30 via-amber-100/20 to-rose-200/30 rounded-full blur-2xl -z-10" />

            <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] border border-slate-200/60 bg-white">
              <img
                src="/student-book-ladder-growth.jpg"
                alt="Students ascending a staircase of books towards graduation and career success"
                className="w-full h-auto object-cover select-none"
                loading="eager"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
