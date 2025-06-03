"use client";

import { useState, useEffect, useRef } from "react";
import { m as motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionTransition from "./SectionTransition";
import ClientAvatar from "./ClientAvatar";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { getRgbaColor, PRIMARY_COLORS_RGB } from "@/utils/colors";

// Sample review data - replace with your actual reviews
const REVIEWS = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Manager at TechCorp",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // You'll need to add these images to your public folder
    text: "Ayushi delivered our website redesign ahead of schedule. Her attention to detail and creative approach transformed our online presence. The animations and responsive design are exactly what we needed.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Founder of CreativeStudio",
    image: "https://images.unsplash.com/photo-1529701870190-9ae4010fd124?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Working with Ayushi was a fantastic experience. She understood our vision immediately and created a website that perfectly represents our brand. Her technical skills and design sensibility are top-notch.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CTO at StartupInnovate",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Ayushi's work on our web application exceeded our expectations. Her code is clean, well-documented, and the UI/UX design shows a deep understanding of user behavior. Would definitely hire again!",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Marketing Director at BrandGrowth",
    image: "https://images.unsplash.com/photo-1648412868424-9bee5023a257?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "The portfolio website Ayushi created for our agency has received countless compliments. Her ability to blend aesthetics with functionality resulted in a site that not only looks beautiful but converts visitors to clients.",
    rating: 5,
  },
];

export default function ClientReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleReviews = Math.min(3, REVIEWS.length); // Number of reviews visible at once, capped by total reviews

  // Auto-rotate reviews
  useEffect(() => {
    if (isPaused) return;
    
    const maxIndex = Math.max(0, REVIEWS.length - visibleReviews);
    if (maxIndex <= 0) return; // Don't auto-rotate if all reviews fit on screen
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % (maxIndex + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((current) => Math.max(current - 1, 0));
    setIsPaused(true);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, REVIEWS.length - visibleReviews);
    setActiveIndex((current) => 
      Math.min(current + 1, maxIndex)
    );
    setIsPaused(true);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-primary-500" : "text-secondary-300 dark:text-secondary-700"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <SectionTransition>
      <section id="reviews" className="py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-1/4 h-1/4 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${getRgbaColor(PRIMARY_COLORS_RGB, "400", 1)} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        />
        
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4" 
              variants={fadeInUp}
            >
              Client <span className="text-primary-500">Reviews</span>
            </motion.h2>
            <motion.p 
              className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Don't just take my word for it. Here's what my clients have to say about working with me.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Carousel navigation buttons */}
            <div className="flex justify-between absolute top-1/2 left-0 right-0 -mt-6 px-4 md:px-0 z-10">
              <motion.button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`p-2 rounded-full bg-white dark:bg-secondary-800 shadow-md ${
                  activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                }`}
                whileHover={{ scale: activeIndex === 0 ? 1 : 1.1 }}
                whileTap={{ scale: activeIndex === 0 ? 1 : 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FiChevronLeft className="text-primary-500" size={24} />
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                disabled={activeIndex >= Math.max(0, REVIEWS.length - visibleReviews)}
                className={`p-2 rounded-full bg-white dark:bg-secondary-800 shadow-md ${
                  activeIndex >= Math.max(0, REVIEWS.length - visibleReviews) ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                }`}
                whileHover={{ scale: activeIndex >= Math.max(0, REVIEWS.length - visibleReviews) ? 1 : 1.1 }}
                whileTap={{ scale: activeIndex >= Math.max(0, REVIEWS.length - visibleReviews) ? 1 : 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FiChevronRight className="text-primary-500" size={24} />
              </motion.button>
            </div>

            {/* Reviews carousel */}
            <div 
              ref={containerRef}
              className="overflow-hidden"
            >
              <motion.div
                className="flex gap-6"
                animate={{
                  x: `-${activeIndex * (100 / visibleReviews)}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  width: `${(REVIEWS.length / visibleReviews) * 100}%`,
                }}
              >
                {REVIEWS.map((review) => (
                  <motion.div
                    key={review.id}
                    className="w-full md:w-1/3 flex-shrink-0 p-2"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <ClientAvatar name={review.name} image={review.image} size={48} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary-900 dark:text-white">
                            {review.name}
                          </h3>
                          <p className="text-sm text-secondary-600 dark:text-secondary-400">
                            {review.role}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex mb-3">{renderStars(review.rating)}</div>
                      
                      <p className="text-secondary-700 dark:text-secondary-300 italic flex-grow">
                        "{review.text}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.max(1, REVIEWS.length - visibleReviews + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 10000);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary-500 w-6"
                      : "bg-secondary-300 dark:bg-secondary-700"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
