import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Clock,
  Zap,
  Code2,
  Users,
  Award,
  RotateCw,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Play,
  FileText,
  Terminal,
  Box,
} from 'lucide-react';

export const Interactive3DArchitecture = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [tilt, setTilt] = useState({ x: 18, y: -24 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, initialTiltX: 18, initialTiltY: -24 });

  // The 5 Distinctive Pillars of Claxic Academy
  const steps = [
    {
      step: '01',
      title: 'Daily Auto-Scheduled Cadence',
      tag: 'STRUCTURED CURRICULUM',
      icon: Clock,
      color: '#EE2D02',
      glow: 'rgba(238, 45, 2, 0.4)',
      summary: 'Prevent student burnout and procrastination with structured daily milestone unlocks.',
      details: [
        'Daily morning class unlock ensures disciplined study routine',
        'No overwhelming 100+ video dumps; structured daily cohorts',
        'Live milestone tracker synchronized with your student dashboard',
      ],
      deliverable: 'Consistent daily engineering rhythm with 94%+ cohort completion rate.',
    },
    {
      step: '02',
      title: 'Enforced 75% Active Engagement Gate',
      tag: 'ANTI-CHEAT RIGOR',
      icon: Zap,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      summary: 'Guarantees genuine concept mastery. Lessons require at least 75% verified active playback before tasks unlock.',
      details: [
        'Cryptographic range tokens prevent video skipping or automated bot skipping',
        'Automatic focus tracking ensures active video watching',
        'Milestone coding tasks and assessments unlock only after genuine completion',
      ],
      deliverable: 'Fraud-proof academic integrity recognized and trusted by employers.',
    },
    {
      step: '03',
      title: 'Hands-On Production Code Sprints',
      tag: 'ENTERPRISE PRACTICE',
      icon: Code2,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      summary: 'Replace superficial copy-paste tutorials with containerized, real-world distributed architectures.',
      details: [
        'Build multi-container systems (Postgres, Redis, RabbitMQ, Docker Compose)',
        'Implement Clean Architecture with strict domain boundaries and CI/CD pipelines',
        'Push code to real GitHub repositories with test suites and linting',
      ],
      deliverable: 'Production-ready GitHub portfolio with verified enterprise microservices.',
    },
    {
      step: '04',
      title: 'Direct Architect Review & Doubt Desk',
      tag: 'MENTOR-LED EVALUATION',
      icon: Users,
      color: '#6366F1',
      glow: 'rgba(99, 102, 241, 0.4)',
      summary: 'Active engineering leads evaluate your architectural defense, code quality, and system resilience.',
      details: [
        '1-on-1 written code review and bottleneck debugging on every submission',
        'In-class Doubt Portal for rapid technical clarifications from faculty',
        'Live architectural defense calls before capstone certification',
      ],
      deliverable: 'Personalized guidance from practitioners who build distributed systems daily.',
    },
    {
      step: '05',
      title: 'Verifiable Certification & 18% GST Invoicing',
      tag: 'ACCREDITED CREDENTIALS',
      icon: Award,
      color: '#EC4899',
      glow: 'rgba(236, 72, 153, 0.4)',
      summary: 'Permanent cryptographically signed certificates with instant tax invoice generation.',
      details: [
        'Permanent public verification URL with QR code and SHA-512 tamper-proof hash',
        'Detailed transcript showcasing completed milestone hours and capstone defense',
        'Instant official 18% GST Tax Invoice for easy college or corporate reimbursement',
      ],
      deliverable: 'Globally verifiable credentials backed by complete audit documentation.',
    },
  ];

  const currentStep = steps[activeStep] || steps[0];

  // Mouse / Pointer Parallax Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    dragStart.current = {
      x: clientX,
      y: clientY,
      initialTiltX: tilt.x,
      initialTiltY: tilt.y,
    };
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    const newTiltY = Math.max(-60, Math.min(45, dragStart.current.initialTiltY + deltaX * 0.28));
    const newTiltX = Math.max(0, Math.min(45, dragStart.current.initialTiltX - deltaY * 0.22));

    setTilt({ x: newTiltX, y: newTiltY });
  }, [isDragging]);

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, handlePointerMove]);

  // Smooth Auto-Orbit
  useEffect(() => {
    if (!isAutoSpinning) return;
    const timer = setInterval(() => {
      setTilt((prev) => ({
        ...prev,
        y: ((prev.y + 0.35 + 60) % 105) - 60,
      }));
    }, 32);
    return () => clearInterval(timer);
  }, [isAutoSpinning]);

  const scrollToApply = () => {
    const el = document.getElementById('admissions-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="w-full space-y-6 select-none">
      {/* 3D Interactive Claxic Methodology Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="w-full relative rounded-[32px] sm:rounded-[40px] bg-[#07090E] border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden min-h-[540px] sm:min-h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none group"
        style={{ perspective: '1200px' }}
      >
        {/* Subtle Warm Amber / Claxic Red Floor Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(238,45,2,0.16) 0%, transparent 68%),
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 36px 36px, 36px 36px',
          }}
        />

        {/* Ambient Orbit Guide Rings */}
        <div className="absolute w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full border border-dashed border-[#EE2D02]/20 animate-spin pointer-events-none [animation-duration:50s]" />
        <div className="absolute w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full border border-amber-500/15 pointer-events-none" />

        {/* Top Control Bar */}
        <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-xl text-white font-mono text-[11px] shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#EE2D02] animate-pulse" />
            <span className="font-bold tracking-wider text-slate-200">THE CLAXIC METHODOLOGY</span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-amber-400 hidden md:inline">5-PILLAR ENGINEERING ROADMAP</span>
          </div>

          {/* Quick 3D Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExploded((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg backdrop-blur-xl ${
                isExploded
                  ? 'bg-[#EE2D02] text-white border-[#EE2D02] shadow-[#EE2D02]/30 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/15'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>{isExploded ? 'Compact View' : 'Explode 3D Steps'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoSpinning((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg backdrop-blur-xl ${
                isAutoSpinning
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/15'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isAutoSpinning ? 'Auto-Orbiting' : 'Auto-Orbit'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTilt({ x: 18, y: -24 });
              }}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 backdrop-blur-xl"
              title="Reset View"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* 3D Floating Methodology Platforms */}
        <div
          className="relative w-72 sm:w-88 h-96 sm:h-[420px] transition-transform duration-75 ease-out select-none will-change-transform z-10"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* Base Pedestal */}
          <div
            className="absolute inset-x-2 bottom-4 h-48 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-transparent pointer-events-none shadow-2xl"
            style={{
              transform: 'translateZ(-50px)',
            }}
          />

          {/* Central Conduit Spine */}
          <div
            className="absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-2 rounded-full bg-gradient-to-b from-[#EC4899] via-amber-400 to-[#EE2D02] pointer-events-none opacity-60 shadow-[0_0_20px_#EE2D02]"
            style={{
              transform: isExploded ? 'translateZ(130px) scaleY(1.4)' : 'translateZ(90px)',
              transition: 'transform 0.4s ease-out',
            }}
          />

          {/* 5 FLOATING STEPS OF CLAXIC ACADEMY */}
          {steps.map((s, idx) => {
            const isSelected = activeStep === idx;
            const Icon = s.icon;

            const baseZ = (4 - idx) * 44;
            const explodedMultiplier = isExploded ? 2.3 : 1;
            const zPos = baseZ * explodedMultiplier + (isSelected ? 30 : 0);
            const yPos = isExploded ? (idx - 2) * 55 : (idx - 2) * 28;

            return (
              <div
                key={s.step}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStep(idx);
                }}
                className={`absolute inset-x-0 h-16 sm:h-20 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl p-3 sm:p-4 flex items-center justify-between shadow-2xl ${
                  isSelected
                    ? 'border-[#EE2D02] bg-gradient-to-r from-[#EE2D02]/35 via-slate-900/95 to-slate-900/90 ring-2 ring-[#EE2D02]/80 ring-offset-2 ring-offset-black scale-[1.03]'
                    : 'border-white/15 bg-slate-900/85 hover:border-white/40 hover:bg-slate-800/90'
                }`}
                style={{
                  transform: `translateZ(${zPos}px) translateY(${yPos}px)`,
                  boxShadow: isSelected
                    ? `0 20px 45px -10px ${s.glow}, 0 0 30px ${s.glow}`
                    : '0 10px 30px -5px rgba(0,0,0,0.6)',
                }}
              >
                {/* Left: Step Number + Icon + Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-transform ${
                      isSelected ? 'scale-110 shadow-lg text-white' : 'text-slate-300'
                    }`}
                    style={{
                      backgroundColor: isSelected ? s.color : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-extrabold text-amber-400 tracking-wider">
                        STEP {s.step}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white truncate max-w-[150px] sm:max-w-[210px]">
                      {s.title}
                    </p>
                  </div>
                </div>

                {/* Right: Badge */}
                <div className="text-right shrink-0">
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border text-white block shadow-inner"
                    style={{
                      backgroundColor: isSelected ? `${s.color}40` : 'rgba(255,255,255,0.05)',
                      borderColor: isSelected ? s.color : 'rgba(255,255,255,0.15)',
                    }}
                  >
                    {s.tag}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                    {isSelected ? 'SELECTED' : 'CLICK TO VIEW'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Cockpit (Explaining How Claxic Works) */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 z-20 pointer-events-auto">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 backdrop-blur-2xl shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Overview */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase text-white shadow-xs"
                  style={{ backgroundColor: currentStep.color }}
                >
                  CLAXIC PILLAR {currentStep.step}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {currentStep.title}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {currentStep.summary}
              </p>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {currentStep.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="md:col-span-4 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
              <div className="text-left md:text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Student Outcome:
                </span>
                <strong className="text-xs text-emerald-400 font-bold block max-w-[200px] truncate">
                  {currentStep.deliverable}
                </strong>
              </div>

              <button
                type="button"
                onClick={scrollToApply}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#EE2D02] hover:bg-[#D42700] text-white text-xs font-bold shadow-lg shadow-[#EE2D02]/30 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 group"
              >
                <span>Enroll in Cohort</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
