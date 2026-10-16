import React from 'react';
import {
  BookOpen,
  Code2,
  Upload,
  Star,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export const HowItWorksProcess = ({ onExplore }) => {
  const steps = [
    {
      step: '01',
      title: 'Learn',
      description: 'Follow structured lessons and understand the concepts.',
      icon: BookOpen,
    },
    {
      step: '02',
      title: 'Build',
      description: 'Work on real projects with step-by-step guidance.',
      icon: Code2,
    },
    {
      step: '03',
      title: 'Submit',
      description: 'Share your work and get feedback from mentors.',
      icon: Upload,
    },
    {
      step: '04',
      title: 'Grow',
      description: 'Improve, add to your portfolio and get placement support.',
      icon: Star,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 sm:pt-1 relative z-20">
      <div className="bg-white border border-slate-200/90 rounded-[24px] sm:rounded-[36px] p-5 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.1)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          
          {/* Left Header Column */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4 text-left">
            <div className="flex items-center gap-2">
              <span className="w-6 sm:w-8 h-1 bg-[#EE2D02] rounded-full inline-block" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#EE2D02]">
                How It Works
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
              Simple Steps.<br />
              <span className="text-slate-900">Real Progress.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Our process is designed to keep you focused, consistent and job-ready.
            </p>

            <div className="pt-1 sm:pt-2">
              <button
                type="button"
                onClick={onExplore}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#EE2D02] hover:text-[#D42700] group cursor-pointer transition-colors"
              >
                <span>Explore Full Process</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Steps Process Timeline Column */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 relative">
              {steps.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === steps.length - 1;

                return (
                  <div
                    key={item.step}
                    className="relative p-3.5 sm:p-4 xl:p-0 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-[#FFF9F7] sm:bg-none sm:from-transparent sm:via-transparent sm:to-transparent border border-slate-200/80 sm:border-0 shadow-2xs sm:shadow-none flex sm:flex-col items-start gap-3.5 sm:gap-3 group hover:border-[#FFD4CC] sm:hover:border-transparent transition-all"
                  >
                    {/* Icon & Step Number */}
                    <div className="flex items-center justify-between w-auto sm:w-full shrink-0">
                      <div className="relative">
                        {/* Number Badge (Desktop: above icon, Mobile: cute chip on icon) */}
                        <span className="hidden sm:inline-block text-[11px] font-mono font-bold text-[#EE2D02] bg-[#FFF1EE] px-2.5 py-0.5 rounded-full border border-[#FFD4CC] mb-2 shadow-2xs">
                          {item.step}
                        </span>

                        {/* Icon Container */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FFF1EE] via-white to-[#FFE5DF] border border-[#FFD4CC] flex items-center justify-center text-[#EE2D02] shadow-xs group-hover:scale-105 group-hover:shadow-sm transition-all duration-300">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                        </div>

                        {/* Mobile Step Badge Chip overlay */}
                        <span className="sm:hidden absolute -top-1.5 -right-1.5 text-[9px] font-mono font-bold text-[#EE2D02] bg-white px-1.5 py-0.2 rounded-full border border-[#FFD4CC] shadow-2xs">
                          {item.step}
                        </span>
                      </div>

                      {/* Desktop Connecting Arrow between steps */}
                      {!isLast && (
                        <div className="hidden xl:flex items-center text-slate-300 pr-2">
                          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#EE2D02] group-hover:translate-x-1 transition-all" />
                        </div>
                      )}
                    </div>

                    {/* Step Title & Description */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                          {item.title}
                        </h3>
                        {/* Mobile Step Pill */}
                        <span className="sm:hidden text-[10px] font-mono font-bold text-[#EE2D02] bg-[#FFF1EE] px-2 py-0.5 rounded-full border border-[#FFD4CC]/70">
                          Step {item.step}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
