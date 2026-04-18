'use client';

import { Award, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhyChooseSection() {
  // Container variants to handle the "staggering" of child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each card animation
      },
    },
  };

  // Individual card variants
  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Curated Selection',
      description: 'Hand-picked books from acclaimed authors and emerging writers across all genres.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Shipping',
      description: 'Free shipping on all orders. Get your books delivered in 3-5 business days.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Exclusive Deals',
      description: 'Members-only discounts, pre-orders of bestsellers, and limited-time offers.',
    },
  ];

  return (
    <section className="bg-muted/50 py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Why Choose BookStore
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Triggers slightly before element enters view
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }} // Subtle lift on hover
              className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}