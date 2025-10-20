'use client';

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  caseType: string;
  outcome: string;
  rating: number;
  location: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "After my car accident, I was overwhelmed with medical bills and insurance hassles. The attorney I found through this service took care of everything and got me a settlement far beyond what I expected.",
    clientName: "Sarah M.",
    caseType: "Car Accident",
    outcome: "$425,000 Settlement",
    rating: 5,
    location: "Atlanta, GA",
    initials: "SM"
  },
  {
    id: '2',
    quote: "I was hit by a distracted driver and didn't know where to turn. This resource connected me with an excellent attorney who fought hard for my case and secured a great outcome.",
    clientName: "Robert T.",
    caseType: "Car Accident",
    outcome: "$180,000 Settlement",
    rating: 5,
    location: "Atlanta, GA",
    initials: "RT"
  },
  {
    id: '3',
    quote: "I was rear-ended on I-85 and suffered serious injuries. The attorney recommended through this service was professional, knowledgeable, and got me the compensation I deserved.",
    clientName: "Maria L.",
    caseType: "Car Accident",
    outcome: "$225,000 Recovery",
    rating: 5,
    location: "Atlanta, GA",
    initials: "ML"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play carousel
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} transition-all duration-300`}
        aria-hidden="true"
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-32 relative overflow-hidden bg-gradient-to-br from-gray-50 via-amber-50/30 to-gray-50"
      aria-label="Client Testimonials"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-yellow-200 to-amber-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-amber-200 to-orange-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-yellow-200 rounded-full px-8 py-4 mb-10 shadow-lg shadow-yellow-100 hover:shadow-yellow-200 transition-all duration-300">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-yellow-700 font-semibold text-sm md:text-base">Success Stories</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
            <span className="block mb-3">Real Results from</span>
            <span className="block bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Atlanta Car Accident Cases
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how our network of <span className="text-gray-900 font-semibold">experienced attorneys</span> has helped Atlanta car accident victims 
            get the compensation they deserved.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto mb-16">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-50" />
          
          <Card className="relative p-10 md:p-16 text-center bg-white border-2 border-yellow-200 shadow-2xl rounded-3xl overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400" />
            
            {/* Quote Icon */}
            <div className="mb-10">
              <Quote className="h-20 w-20 mx-auto text-yellow-400 opacity-50" aria-hidden="true" />
            </div>
            
            {/* Star Rating */}
            <div className="flex justify-center mb-8 gap-2" role="img" aria-label={`${currentTestimonial.rating} out of 5 stars`}>
              {renderStars(currentTestimonial.rating)}
            </div>
            
            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-relaxed mb-10 italic">
              "{currentTestimonial.quote}"
            </blockquote>
            
            {/* Client Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-yellow-100">
              
              {/* Client Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-xl shadow-yellow-500/30">
                <span className="text-white font-bold text-2xl">
                  {currentTestimonial.initials}
                </span>
              </div>
              
              {/* Client Details */}
              <div className="text-center md:text-left flex-1">
                <div className="font-bold text-xl text-gray-900">
                  {currentTestimonial.clientName}
                </div>
                <div className="text-amber-700 font-semibold text-lg">
                  {currentTestimonial.caseType}
                </div>
                <div className="text-gray-600">
                  {currentTestimonial.location}
                </div>
              </div>
              
              {/* Case Outcome */}
              <div className="text-center">
                <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg text-lg">
                  {currentTestimonial.outcome}
                </div>
                <p className="text-xs text-gray-500 mt-2">Settlement Amount</p>
              </div>
            </div>
          </Card>

          {/* Enhanced Navigation Arrows */}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-2xl hover:shadow-yellow-500/50 hover:scale-110 transition-all duration-300 group"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-7 w-7 text-white group-hover:-translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          <div className="absolute -right-6 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-2xl hover:shadow-yellow-500/50 hover:scale-110 transition-all duration-300 group"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-7 w-7 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Enhanced Progress Dots */}
        <div className="flex justify-center items-center space-x-3 mb-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-10 h-3 bg-gradient-to-r from-yellow-400 to-amber-500' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
          {!isAutoPlaying && (
            <span className="ml-4 text-sm text-gray-500 italic">Paused</span>
          )}
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">1000+</div>
            <div className="text-gray-600">Accident Victims Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">$100M+</div>
            <div className="text-gray-600">Recovered in Settlements</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">50+</div>
            <div className="text-gray-600">Partner Attorneys</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">24/7</div>
            <div className="text-gray-600">Emergency Support</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-black mb-4">
            Ready to Get the Help You Deserve?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't wait to get the legal help you need. Get connected with an experienced Atlanta car accident attorney today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold px-8 py-4"
              asChild
            >
              <a href="/find-attorney">
                Find My Attorney Now
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-400 hover:text-black font-bold px-8 py-4"
              asChild
            >
              <a href="/free-case-evaluation">
                Free Case Evaluation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 