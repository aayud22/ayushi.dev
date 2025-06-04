"use client";
import { useRef, useCallback } from "react";
import ClientAvatar from "./ClientAvatar";
import { m as motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionTransition from "../animations/SectionTransition";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { getRgbaColor, PRIMARY_COLORS_RGB } from "@/utils/colors";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Sample review data - replace with your actual reviews
const REVIEWS = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Manager at TechCorp",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // You'll need to add these images to your public folder
    text: "Ayushi delivered our website redesign ahead of schedule. Her attention to detail and creative approach transformed our online presence. The animations and responsive design are exactly what we needed.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Founder of CreativeStudio",
    image:
      "https://images.unsplash.com/photo-1529701870190-9ae4010fd124?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Working with Ayushi was a fantastic experience. She understood our vision immediately and created a website that perfectly represents our brand. Her technical skills and design sensibility are top-notch.",
    rating: 3.4,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CTO at StartupInnovate",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Ayushi's work on our web application exceeded our expectations. Her code is clean, well-documented, and the UI/UX design shows a deep understanding of user behavior. Would definitely hire again!",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Marketing Director at BrandGrowth",
    image:
      "https://images.unsplash.com/photo-1648412868424-9bee5023a257?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "The portfolio website Ayushi created for our agency has received countless compliments. Her ability to blend aesthetics with functionality resulted in a site that not only looks beautiful but converts visitors to clients.",
    rating: 3.8,
  },
];

export default function ClientReviews() {
  const swiperRef = useRef<any>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  // Initialize Swiper refs
  const onSwiper = useCallback((swiper: any) => {
    swiper.params.navigation.prevEl = navigationPrevRef.current;
    swiper.params.navigation.nextEl = navigationNextRef.current;
    swiper.params.pagination.el = paginationRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();
    swiperRef.current = swiper;
  }, []);

  // Generate star rating display with points
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5 text-primary-500"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-5 h-5 text-gray-300"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 text-primary-500"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg
            key={i}
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5 text-gray-300"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }

    // Add the rating number next to stars
    return (
      <div className="flex items-center gap-2">
        <div className="flex">{stars}</div>
        <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <SectionTransition>
      <section id="reviews" className="py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-1/4 h-1/4 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${getRgbaColor(
              PRIMARY_COLORS_RGB,
              "400",
              1
            )} 1px, transparent 1px)`,
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
              Don't just take my word for it. Here's what my clients have to say
              about working with me.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Swiper Carousel */}
            <div className="relative">
              <Swiper
                loop={true}
                className="py-4"
                spaceBetween={24}
                slidesPerView={1}
                onSwiper={onSwiper}
                modules={[Navigation, Pagination, Autoplay]}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
              >
                {REVIEWS.map((review) => (
                  <SwiperSlide key={review.id}>
                    <motion.div
                      className="h-full p-2"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 h-full flex flex-col min-h-[300px]">
                        <div className="flex items-center mb-4">
                          <div className="mr-4">
                            <ClientAvatar
                              size={48}
                              name={review.name}
                              image={review.image}
                            />
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

                        <div className="flex mb-3">
                          {renderStars(review.rating)}
                        </div>

                        <p className="text-secondary-700 dark:text-secondary-300 italic flex-grow">
                          "{review.text}"
                        </p>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <button
                ref={navigationPrevRef}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-secondary-800 shadow-md hover:scale-110 transition-transform"
              >
                <FiChevronLeft className="text-primary-500" size={24} />
              </button>
              <button
                ref={navigationNextRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-secondary-800 shadow-md hover:scale-110 transition-transform"
              >
                <FiChevronRight className="text-primary-500" size={24} />
              </button>

              {/* Pagination */}
              <div className="flex justify-center mt-9">
                <div className="swiper-pagination" ref={paginationRef} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
