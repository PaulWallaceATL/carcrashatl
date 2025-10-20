import React from 'react';
import { ModernLayout } from '@/components/layout/modern-layout';
import { HeroSection } from '@/components/sections/hero-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactFormSection } from '@/components/sections/contact-form-section';

// Updated Schema for Car Crashes in Atlanta resource
const resourceSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Car Crashes in Atlanta",
  "url": "https://www.carcrashatl.com",
  "description": "Compassionate support and expert legal guidance for car accident victims in Atlanta. We understand what you're going through and we're here to help.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.carcrashatl.com/find-attorney?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// FAQ Schema for car accident resource
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "I just had a car accident in Atlanta. What should I do first?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Take a deep breath. First, make sure you're safe and get medical help if needed. Call 911, take photos if you can, exchange information with the other driver, and contact your insurance. Don't admit fault or sign anything yet. We're here to guide you through every step."
      }
    },
    {
      "@type": "Question",
      "name": "I'm scared to talk to a lawyer. Will they pressure me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We understand that fear. The attorneys we work with are different - they listen first and only offer help if it's truly right for you. Most offer free consultations with no pressure, so you can get answers without any commitment."
      }
    },
    {
      "@type": "Question",
      "name": "How long do I have to take action after my accident?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Georgia, you generally have 2 years to file a lawsuit, but it's important to start gathering evidence and talking to lawyers much sooner. Insurance companies work fast, and evidence can disappear quickly. The sooner you get help, the better we can protect your rights."
      }
    },
    {
      "@type": "Question",
      "name": "What can I get help with after my accident?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You may be able to get help with medical bills, lost wages, car repairs, pain and suffering, and future medical care. Every situation is different, which is why it's worth talking to an experienced attorney about your specific situation - most consultations are completely free."
      }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resourceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <ModernLayout>
        <main id="main-content" role="main" aria-label="Car Crashes in Atlanta - Help When You Need It Most">
          {/* Hero Section */}
          <HeroSection className="modern-hero-2025" />
          
          {/* Immediate Support Section - Redesigned */}
          <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden" aria-labelledby="immediate-support-heading">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50" />
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)'
            }} />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 sm:mb-20 md:mb-24">
                {/* Enhanced Badge */}
                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/80 backdrop-blur-sm border-2 border-red-200 rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 mb-8 sm:mb-10 shadow-lg shadow-red-100 hover:shadow-red-200 transition-all duration-300 group">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 group-hover:bg-red-600 transition-colors"></span>
                  </div>
                  <span className="text-red-700 font-semibold text-xs sm:text-sm md:text-base">We know this is overwhelming</span>
                </div>
                
                {/* Better Typography */}
                <h2 id="immediate-support-heading" className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 sm:mb-10 leading-[1.05] sm:leading-[1.1] tracking-tighter px-4">
                  <span className="block mb-2 sm:mb-3">Right Now, Everything Feels</span>
                  <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                    Completely Overwhelming
                  </span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                  Car accidents turn your world upside down in an instant. You're probably feeling <span className="text-gray-900 font-semibold">scared, confused, angry, or lost</span> right now. Those feelings are <span className="text-red-600 font-semibold">completely normal</span>. Take a deep breath - 
                  we're going to help you figure this out, <span className="text-gray-900 font-semibold">one step at a time</span>.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {[
                  {
                    step: "1",
                    title: "Take Care of Yourself First",
                    description: "Your health and safety matter more than anything else. Get checked by a doctor even if you feel okay. Shock and adrenaline can hide serious injuries.",
                    color: "from-red-500 to-red-600",
                    bgColor: "bg-white",
                    borderColor: "border-red-200",
                    shadowColor: "group-hover:shadow-red-200",
                    glowColor: "from-red-500/20 to-red-600/10",
                    icon: "🏥"
                  },
                  {
                    step: "2", 
                    title: "Don't Let Them Take Advantage",
                    description: "Insurance companies will try to pressure you into quick settlements. You have rights, and we'll help you understand exactly what they are.",
                    color: "from-orange-500 to-orange-600",
                    bgColor: "bg-white",
                    borderColor: "border-orange-200", 
                    shadowColor: "group-hover:shadow-orange-200",
                    glowColor: "from-orange-500/20 to-orange-600/10",
                    icon: "🛡️"
                  },
                  {
                    step: "3",
                    title: "You Don't Have to Do This Alone", 
                    description: "Connect with attorneys who've helped hundreds of people in your exact situation. Most offer free consultations with no pressure.",
                    color: "from-blue-500 to-blue-600",
                    bgColor: "bg-white",
                    borderColor: "border-blue-200",
                    shadowColor: "group-hover:shadow-blue-200",
                    glowColor: "from-blue-500/20 to-blue-600/10",
                    icon: "🤝"
                  },
                  {
                    step: "4",
                    title: "Focus on Getting Your Life Back",
                    description: "While you focus on healing and recovery, let experienced advocates handle the complicated legal stuff for you.",
                    color: "from-green-500 to-green-600", 
                    bgColor: "bg-white",
                    borderColor: "border-green-200",
                    shadowColor: "group-hover:shadow-green-200",
                    glowColor: "from-green-500/20 to-green-600/10",
                    icon: "💚"
                  }
                ].map((item, index) => (
                  <div key={index} className="group relative">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.glowColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Card */}
                    <div className={`relative ${item.bgColor} p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border-2 ${item.borderColor} ${item.shadowColor} transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] h-full`}>
                      {/* Top gradient accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color} rounded-t-2xl sm:rounded-t-3xl`} />
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center border-2 border-gray-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <span className={`text-base sm:text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.step}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="text-center mb-4 sm:mb-6 mt-2 sm:mt-4">
                        <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">{item.icon}</div>
                        <h3 className="font-display font-bold text-gray-900 text-lg sm:text-xl mb-3 sm:mb-4 leading-tight tracking-tight group-hover:text-gray-800 transition-colors">{item.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed text-center text-sm">{item.description}</p>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-16 sm:mt-20 md:mt-24 px-4">
                <div className="relative inline-block group w-full sm:w-auto">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  
                  {/* Button */}
                  <a 
                    href="/what-to-do-after-car-accident" 
                    className="relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-indigo-800 transition-all duration-300 text-base sm:text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <span className="relative z-10">Show Me Exactly What to Do Next</span>
                    <svg className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                  </a>
                </div>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detailed step-by-step guide</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free to access</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No signup required</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Understanding Section - Redesigned */}
          <section className="py-32 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden" aria-labelledby="understanding-heading">
            {/* Enhanced Background */}
            <div className="absolute inset-0">
              <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-200 to-purple-100 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column - Better Typography & Layout */}
                <div>
                  <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-full px-8 py-4 mb-10 shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all duration-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-blue-700 font-semibold text-sm md:text-base">We've been where you are</span>
                  </div>
                  
                  <h2 id="understanding-heading" className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-12 leading-[1.05] tracking-tighter">
                    <span className="block mb-3">We Actually Understand</span>
                    <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      What You're Going Through
                    </span>
                  </h2>
                  
                  <div className="space-y-6 mb-12">
                    {[
                      {
                        title: "Your phone won't stop ringing",
                        description: "with insurance adjusters who seem friendly but are actually trying to get you to say something that hurts your case.",
                        gradient: "from-blue-500 to-blue-600",
                        bgGradient: "from-blue-500/10 to-blue-600/5"
                      },
                      {
                        title: "Medical bills are piling up",
                        description: "and you're worried about money while trying to recover from injuries that might be worse than you first thought.",
                        gradient: "from-purple-500 to-purple-600",
                        bgGradient: "from-purple-500/10 to-purple-600/5"
                      },
                      {
                        title: "You're missing work",
                        description: "and losing income at the worst possible time, wondering if you can afford a lawyer or if you even need one.",
                        gradient: "from-pink-500 to-red-500",
                        bgGradient: "from-pink-500/10 to-red-600/5"
                      }
                    ].map((item, index) => (
                      <div key={index} className="group relative">
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        
                        {/* Content */}
                        <div className="relative flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                          <div className={`w-3 h-3 bg-gradient-to-r ${item.gradient} rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300`} />
                          <div>
                            <p className="text-lg">
                              <strong className="text-gray-900 font-bold">{item.title}</strong>
                              <span className="text-gray-700"> {item.description}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced Info Box */}
                  <div className="relative group mt-12">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-green-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    
                    {/* Card */}
                    <div className="relative p-8 bg-gradient-to-br from-white via-emerald-50/50 to-green-50/50 backdrop-blur-sm rounded-3xl border-2 border-emerald-200 shadow-xl">
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-t-3xl" />
                      
                      <h3 className="font-display text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-3 tracking-tight">
                        <span className="text-3xl">💡</span>
                        Here's what most people don't know:
                      </h3>
                      <div className="space-y-5">
                        {[
                          "Most car accident lawyers work on contingency - meaning you pay nothing unless they win your case",
                          "Free consultations are standard - you can understand your rights and options without any pressure or cost",
                          "People with attorneys get 3-4x more compensation on average than those who handle it alone"
                        ].map((text, index) => (
                          <div key={index} className="flex items-start space-x-4 group/item">
                            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-emerald-500/30 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-emerald-900 text-lg leading-relaxed">
                              <strong className="font-bold">{text.split(' - ')[0]}</strong>
                              {text.includes(' - ') && <span className="text-emerald-800"> - {text.split(' - ')[1]}</span>}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced CTA */}
                  <div className="mt-12 relative inline-block group/cta">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover/cta:opacity-75 transition-opacity duration-300" />
                    <a 
                      href="/understanding-your-rights" 
                      className="relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white font-bold rounded-2xl hover:from-green-700 hover:via-emerald-700 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-1 hover:scale-105 text-lg"
                    >
                      <span>Learn About Your Rights</span>
                      <svg className="ml-3 h-5 w-5 group-hover/cta:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Right Column - Enhanced Cards */}
                <div className="space-y-8">
                  {/* Warning Card - Redesigned */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="relative bg-white p-8 border-2 border-yellow-300 rounded-3xl shadow-2xl hover:shadow-yellow-200 transition-all duration-300">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-t-3xl" />
                      <div className="flex items-center mb-8">
                        <div className="text-4xl mr-4 animate-pulse">⚠️</div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-yellow-900 tracking-tight">Don't Make These Costly Mistakes</h3>
                      </div>
                      <div className="space-y-4">
                        {[
                          "Accepting the first settlement offer (usually 10-30% of what you deserve)",
                          "Giving recorded statements without legal advice",
                          "Admitting fault when you're not sure what happened",
                          "Waiting too long to seek medical attention",
                          "Trusting that insurance companies have your best interests at heart"
                        ].map((mistake, index) => (
                          <div key={index} className="flex items-start space-x-4 group/item p-4 rounded-xl hover:bg-yellow-50 transition-colors duration-200">
                            <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-red-200 group-hover/item:scale-110 transition-all duration-300">
                              <span className="text-red-600 font-bold text-lg">×</span>
                            </div>
                            <span className="text-yellow-900 font-medium text-base leading-relaxed">{mistake}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Encouragement Card - Redesigned */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="relative bg-white p-8 border-2 border-blue-300 rounded-3xl shadow-2xl hover:shadow-blue-200 transition-all duration-300">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-t-3xl" />
                      <div className="flex items-center mb-6">
                        <div className="text-4xl mr-4">💙</div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-blue-900 tracking-tight">Remember: This Isn't Your Fault</h3>
                      </div>
                      <p className="text-blue-900 leading-relaxed text-lg mb-6">
                        <span className="font-semibold">You didn't ask for this to happen.</span> You're not overreacting by seeking help. 
                        You <span className="font-semibold text-blue-600">deserve fair compensation</span> for what you've been through. 
                        <span className="font-semibold">Taking care of yourself and your family</span> is the most important thing right now - everything else can wait.
                      </p>
                      <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <svg className="h-6 w-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-blue-800 font-medium text-sm">You're not alone in this journey. We're here to help.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Connection Section - Redesigned */}
          <section className="py-32 relative overflow-hidden" aria-labelledby="connection-heading">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)'
            }} />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400" />
            
            <div className="relative max-w-7xl mx-auto px-4">
              <div className="text-center mb-24">
                <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-full px-8 py-4 mb-10 shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all duration-300">
                  <span className="text-blue-700 font-semibold text-sm md:text-base">You deserve better than the runaround</span>
                </div>
                
                <h2 id="connection-heading" className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-10 leading-[1.05] tracking-tighter">
                  <span className="block mb-3">Connect with Attorneys Who</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    Actually Care About You
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Not all attorneys are the same. We work exclusively with professionals who understand that 
                  you're <span className="text-gray-900 font-semibold">a human being going through a traumatic experience</span>, not just another case file.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {[
                  {
                    icon: "👂",
                    title: "They Actually Listen to You",
                    description: "These attorneys take time to understand your story, your pain, and your specific goals. You'll never feel rushed or unheard.",
                    gradient: "from-blue-500 to-blue-600",
                    bgGradient: "from-blue-500/10 to-blue-600/5"
                  },
                  {
                    icon: "⚔️", 
                    title: "They Fight Hard for You",
                    description: "Insurance companies have teams of lawyers working to pay you as little as possible. You need someone equally aggressive fighting for you.",
                    gradient: "from-purple-500 to-purple-600",
                    bgGradient: "from-purple-500/10 to-purple-600/5"
                  },
                  {
                    icon: "💰",
                    title: "They Get Life-Changing Results", 
                    description: "On average, people with attorneys receive 3-4 times more compensation than those who handle it alone. That difference can change your family's future.",
                    gradient: "from-green-500 to-green-600",
                    bgGradient: "from-green-500/10 to-green-600/5"
                  }
                ].map((feature, index) => (
                  <div key={index} className="group text-center relative">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Card */}
                    <div className="relative bg-white p-8 rounded-3xl border-2 border-gray-100 hover:border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                      <div className="relative mb-8">
                        <div className={`w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-2xl mx-auto flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Primary CTA Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative bg-white p-10 rounded-3xl shadow-2xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-3xl" />
                    <div className="text-6xl mb-6">🎯</div>
                    <h3 className="font-display text-3xl font-bold text-gray-900 mb-4 tracking-tight">Find the Right Attorney for You</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      Get matched with <span className="text-gray-900 font-semibold">experienced attorneys</span> who specialize in cases like yours. 
                      Free consultations, no pressure, no upfront costs.
                    </p>
                    <div className="relative inline-block w-full group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity duration-300" />
                      <a 
                        href="/find-attorney" 
                        className="relative inline-flex items-center justify-center w-full px-8 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 transition-all duration-300 text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1"
                      >
                        <span>Find My Attorney Now</span>
                        <svg className="ml-3 h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-4 text-gray-500 text-sm">
                      {["Free consultations", "No pressure", "No upfront costs"].map((text, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Secondary CTA Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-purple-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative bg-white p-10 rounded-3xl shadow-2xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-3xl" />
                    <div className="text-6xl mb-6">🤖</div>
                    <h3 className="font-display text-3xl font-bold text-gray-900 mb-4 tracking-tight">Build Your Case First</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      Use our <span className="text-gray-900 font-semibold">AI-powered tool</span> to organize your evidence and understand your case strength 
                      before talking to attorneys.
                    </p>
                    <a 
                      href="/ai-case-builder" 
                      className="inline-flex items-center justify-center w-full px-8 py-5 border-3 border-purple-600 text-purple-600 font-bold rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <span>Build My Case Now</span>
                      <svg className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <div className="mt-4 flex items-center justify-center gap-4 text-gray-500 text-sm">
                      {["Organize evidence", "Get insights", "Be prepared"].map((text, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Success Stories Section */}
          <TestimonialsSection />
          
          {/* Contact Form Section */}
          <ContactFormSection />
          
          {/* Final Support Section */}
          <section className="py-24 relative overflow-hidden" aria-labelledby="support-heading">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900" />
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
            
            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <h2 id="support-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-10 leading-tight tracking-tight">
                You Don't Have to Figure 
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  This Out Alone
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed font-light">
                Whether you need immediate guidance, want to understand your options, or you're ready to talk to an attorney, 
                real people are standing by to help you through this difficult time.
              </p>
              
              <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-12">
                <a 
                  href="tel:4704841972" 
                  className="group relative inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-white to-gray-100 text-gray-900 font-bold rounded-2xl hover:from-gray-100 hover:to-white transition-all duration-300 text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                >
                  <span className="text-3xl mr-4">📞</span>
                  Call Us Right Now
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">(470) 484-1972</div>
                  <div className="text-blue-200 text-lg">
                    <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span>Live person answers 24/7</span>
                    </div>
                    <p className="text-sm opacity-80">No robots • No voicemail • Real help</p>
                  </div>
                </div>
              </div>
              
              <div className="inline-flex items-center space-x-4 text-blue-200 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Free to call</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>No pressure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Confidential</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </ModernLayout>
    </>
  );
}
