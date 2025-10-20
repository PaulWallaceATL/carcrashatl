'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Phone, 
  ArrowRight,
  Shield,
  Heart,
  CheckCircle,
  Clock,
  Users,
  Star,
  ChevronDown,
  AlertTriangle,
  MessageCircle,
  MapPin,
  Award,
  TrendingUp,
  PhoneCall
} from 'lucide-react';

// Dynamic imports for mobile optimization
const Image = dynamic(() => import('next/image'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
});

interface HeroSectionProps {
  backgroundImage?: string;
  className?: string;
}

const urgentSteps = [
  {
    icon: AlertTriangle,
    title: 'Right Now',
    subtitle: 'Safety First',
    description: 'Check for injuries, move to safety, call 911 if needed',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    glowColor: 'group-hover:shadow-red-500/20',
    urgent: true
  },
  {
    icon: Shield,
    title: 'Next 24 Hours',
    subtitle: 'Protect Yourself',
    description: 'Document everything, call police, contact insurance',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    glowColor: 'group-hover:shadow-amber-500/20',
    urgent: false
  },
  {
    icon: Heart,
    title: 'This Week',
    subtitle: 'Get Support',
    description: 'See a doctor, connect with an attorney, focus on healing',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    glowColor: 'group-hover:shadow-emerald-500/20',
    urgent: false
  }
];

const trustMetrics = [
  {
    icon: Users,
    value: '500+',
    label: 'Families We\'ve Helped',
    sublabel: 'Real people, real stories',
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/10 to-blue-600/5'
  },
  {
    icon: Star,
    value: '4.9★',
    label: 'Client Rating',
    sublabel: 'Based on 200+ reviews',
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-500/10 to-yellow-600/5'
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Always Here',
    sublabel: 'When you need us most',
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/10 to-emerald-600/5'
  }
];

export function HeroSection({ backgroundImage, className = '' }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Enhanced Background with better depth */}
      <div className="absolute inset-0">
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-purple-900/30" />
        
        {/* Subtle grid pattern for sophistication */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        {/* Overlay patterns with better blend */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/30 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-indigo-600/30 via-transparent to-transparent" />
        </div>
        
        {/* Optional background image */}
        {backgroundImage && (
          <Suspense fallback={null}>
            <Image
              src={backgroundImage}
              alt="Professional legal support"
              fill
              priority={false}
              className="object-cover opacity-5 mix-blend-overlay"
              sizes="100vw"
              quality={60}
              loading="lazy"
            />
          </Suspense>
        )}
        
        {/* Improved animated orbs with stagger */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-full blur-3xl animate-pulse" 
            style={{ animationDuration: '4s', animationDelay: '0s' }} />
          <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 to-purple-600/5 rounded-full blur-3xl animate-pulse" 
            style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-500/15 to-pink-600/5 rounded-full blur-3xl animate-pulse" 
            style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>
        
        {/* Subtle vignette for focus */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Emotional Impact */}
          <div className={`lg:col-span-7 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Urgent Status Badge - Enhanced */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-400/40 rounded-full px-6 py-3 mb-8 backdrop-blur-sm shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-300 group">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 group-hover:bg-red-400 transition-colors"></span>
              </div>
              <span className="text-red-100 font-medium text-sm md:text-base">Just had an accident? Take a deep breath. You're going to be okay.</span>
            </div>

            {/* Main Headline with Better Typography & Stagger Animation */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              <h1 id="hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] sm:leading-[1.1] tracking-tighter">
                <span className={`block transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  You're Not
                </span>
                <span className={`block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mt-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Fighting This
                </span>
                <span className={`block text-white/95 mt-2 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Alone
                </span>
              </h1>
              
              <p className={`text-lg sm:text-xl md:text-2xl text-blue-100/90 leading-relaxed max-w-2xl font-light transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Right now, everything feels overwhelming and scary. <span className="text-white font-normal">We get it.</span> We've helped over <span className="text-emerald-400 font-semibold">500 families</span> through this exact situation, and we're here to guide you through every single step.
              </p>
            </div>

            {/* Trust Indicators with Better Design & Animation */}
            <div className={`flex flex-wrap gap-4 justify-center lg:justify-start mb-10 transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center space-x-2 text-emerald-300 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 backdrop-blur-sm hover:bg-emerald-500/20 transition-all duration-300">
                <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium text-sm">No pressure, ever</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-300 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium text-sm">Free guidance 24/7</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-300 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 backdrop-blur-sm hover:bg-purple-500/20 transition-all duration-300">
                <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium text-sm">Real people who care</span>
              </div>
            </div>

            {/* Enhanced CTAs with Better Hierarchy */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Link
                href="/what-to-do-after-car-accident"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-2xl transition-all duration-500 text-base sm:text-lg shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transform hover:-translate-y-1 hover:scale-105"
                style={{ backgroundSize: '200% 100%' }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                <Heart className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">I Need Help Right Now</span>
              </Link>
              
              <Link
                href="/find-attorney"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/20 hover:border-white/60 transition-all duration-300 text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span>Find My Attorney</span>
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            {/* Emergency Contact - Premium Design */}
            <div className={`relative group transition-all duration-700 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative p-4 sm:p-6 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                      <PhoneCall className="h-4 w-4 text-yellow-400" />
                      <p className="text-white/90 text-xs sm:text-sm font-medium">Emergency? Someone is standing by:</p>
                    </div>
                    <a 
                      href="tel:4048442799" 
                      className="block text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent hover:from-yellow-200 hover:to-yellow-200 transition-all duration-300 hover:scale-105"
                    >
                      (404) 844-2799
                    </a>
                    <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <p className="text-white/70 text-xs font-medium">LIVE NOW</p>
                      </div>
                      <span className="text-white/40">•</span>
                      <p className="text-white/70 text-xs">Real person answers</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow duration-300">
                      <div className="absolute inset-0 bg-green-400/50 rounded-full animate-ping" />
                      <div className="w-3 h-3 bg-white rounded-full relative z-10" />
                    </div>
                    <p className="text-white/90 text-xs font-bold tracking-wider">AVAILABLE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Action Steps with Premium Design */}
          <div className={`lg:col-span-5 space-y-6 sm:space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            
            {/* What to Do Section - Glassmorphism Design */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400" />
                
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                      What You Need to Do
                    </h2>
                    <p className="font-sans text-blue-200/90 text-sm md:text-base tracking-snug">
                      Step by step, we'll get through this together
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {urgentSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div 
                          key={step.title} 
                          className={`group/card relative p-5 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${step.bgColor} ${step.borderColor} hover:shadow-xl ${step.glowColor}`}
                          style={{ 
                            transitionDelay: `${index * 100}ms`,
                            animation: isVisible ? `slideInRight 0.6s ease-out ${index * 0.1}s both` : 'none'
                          }}
                        >
                          {/* Shine effect on hover */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 group-hover/card:animate-shimmer" />
                          
                          <div className="relative flex items-start space-x-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover/card:shadow-2xl group-hover/card:scale-110 transition-all duration-300`}>
                              <Icon className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-display font-bold text-white text-lg leading-tight tracking-tight">{step.subtitle}</h3>
                                {step.urgent && (
                                  <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg shadow-red-500/50">
                                    URGENT
                                  </span>
                                )}
                              </div>
                              <p className="text-white/80 text-sm font-medium mb-2">{step.title}</p>
                              <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Link
                      href="/what-to-do-after-car-accident"
                      className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-all duration-300 font-medium group/link text-sm md:text-base"
                    >
                      <span className="border-b-2 border-transparent group-hover/link:border-blue-300 transition-all duration-300">
                        Get the complete step-by-step guide
                      </span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Metrics - Redesigned */}
            <div className="grid grid-cols-3 gap-3">
              {trustMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div 
                    key={metric.label} 
                    className="relative group"
                    style={{
                      animation: isVisible ? `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both` : 'none'
                    }}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Card */}
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl">
                      <div className={`w-12 h-12 bg-gradient-to-br ${metric.bgGradient} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        <Icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                      <div className={`text-2xl md:text-3xl font-bold mb-1 ${metric.color}`}>{metric.value}</div>
                      <div className="text-white text-xs font-medium mb-1 leading-tight">{metric.label}</div>
                      <div className="text-white/60 text-[10px] leading-tight">{metric.sublabel}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Proof - Premium Design */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-green-500/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-emerald-500/15 to-green-500/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 hover:border-emerald-400/50 transition-all duration-500 shadow-xl">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-t-2xl" />
                
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow-lg" style={{
                        animation: `starPulse 1.5s ease-in-out ${i * 0.1}s infinite`
                      }} />
                    </div>
                  ))}
                </div>
                <blockquote className="text-white/95 font-medium text-center mb-4 italic text-sm md:text-base leading-relaxed">
                  "I was so scared and confused after my accident. They walked me through everything 
                  and made me feel like I wasn't alone. I got way more than I expected."
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg">
                    MS
                  </div>
                  <div className="text-left">
                    <p className="text-emerald-200 text-sm font-semibold">Maria S.</p>
                    <p className="text-emerald-400/80 text-xs">Car accident victim, Atlanta</p>
                  </div>
                  <Award className="h-5 w-5 text-emerald-400 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-white/80 text-sm font-medium mb-3">See how we can help you</p>
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="relative">
              <ChevronDown className="h-6 w-6 text-white/70 animate-bounce group-hover:text-white transition-colors" />
              <div className="absolute -inset-2 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-white/60 via-white/30 to-transparent mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
} 