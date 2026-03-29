"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline();
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          display: "block",
        })
          .to(
            drawerRef.current,
            {
              x: 0,
              duration: 0.8,
              ease: "expo.out",
            },
            "-=0.3",
          )
          .from(
            ".drawer-item",
            {
              y: 30,
              opacity: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4",
          );
      } else {
        document.body.style.overflow = "";

        const tl = gsap.timeline();
        tl.to(drawerRef.current, {
          x: "100%",
          duration: 0.6,
          ease: "expo.in",
        }).to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            display: "none",
          },
          "-=0.2",
        );
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send email");

      // Animation pre-transition
      gsap.to(".drawer-item", {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          setIsSubmitted(true);
          setIsSubmitting(false);
          setFormData({ name: "", email: "", phone: "", details: "" });
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send your message. Please reach out directly via email.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitted && successRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".success-content > *", {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "expo.out",
        });

        // Checkmark draw-in effect
        gsap.from(".checkmark", {
          scale: 0,
          rotate: -45,
          duration: 0.6,
          ease: "back.out(2)",
        });
      });
      return () => ctx.revert();
    }
  }, [isSubmitted]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] hidden opacity-0"
        onClick={onClose}
      />

      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-[100dvh] w-full max-w-[700px] bg-white z-[201] shadow-2xl translate-x-full will-change-transform flex flex-col overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-black/5 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-500 group z-50 bg-white shadow-xl lg:shadow-none"
        >
          <span className="text-2xl transition-transform duration-500 group-hover:rotate-90">
            ✕
          </span>
        </button>

        <div
          ref={contentRef}
          data-lenis-prevent
          className="flex-1 overflow-hidden pt-12 px-6 md:px-12 pb-8 mt-8 flex flex-col justify-center"
        >
          {!isSubmitted ? (
            <div className="w-full">
              <div className="drawer-item mb-8">
                <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-black text-black leading-[0.95] tracking-tighter uppercase">
                  Let&apos;s build <br />
                  <span className="text-cyan-500">something iconic.</span>
                </h2>
                <p className="text-black/40 mt-4 text-sm md:text-base leading-relaxed max-w-[480px] font-medium">
                  Have a vision? I have the tools. Tell me about your project
                  and let&apos;s see how we can collaborate.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="drawer-item flex flex-col gap-2 group">
                    <label className="text-[0.65rem] font-black tracking-[0.2em] text-black/50 uppercase">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                      className="bg-transparent border-b-2 border-black/20 py-2 text-black text-lg font-bold focus:border-cyan-500 outline-none transition-all placeholder:text-black/30"
                    />
                  </div>

                  <div className="drawer-item flex flex-col gap-2 group">
                    <label className="text-[0.65rem] font-black tracking-[0.2em] text-black/50 uppercase">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      className="bg-transparent border-b-2 border-black/20 py-2 text-black text-lg font-bold focus:border-cyan-500 outline-none transition-all placeholder:text-black/30"
                    />
                  </div>

                  <div className="drawer-item flex flex-col gap-2 group md:col-span-2">
                    <label className="text-[0.65rem] font-black tracking-[0.2em] text-black/50 uppercase">
                      Contact Number
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 — — — — — —"
                      className="bg-transparent border-b-2 border-black/20 py-2 text-black text-lg font-bold focus:border-cyan-500 outline-none transition-all placeholder:text-black/30"
                    />
                  </div>
                </div>

                <div className="drawer-item flex flex-col gap-2 group">
                  <label className="text-[0.65rem] font-black tracking-[0.2em] text-black/50 uppercase">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={2}
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Briefly describe your goals..."
                    className="bg-transparent border-b-2 border-black/20 py-2 text-black text-lg font-bold focus:border-cyan-500 outline-none transition-all resize-none placeholder:text-black/30"
                  />
                </div>

                <div className="drawer-item mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold tracking-[0.1em] text-xs md:text-sm uppercase overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Inquiry"}</span>
                    {!isSubmitting && (
                      <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-0 bg-cyan-500 group-hover:h-full transition-all duration-500 ease-expo" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div
              ref={successRef}
              className="success-content h-full flex flex-col items-center justify-center text-center py-20"
            >
              <div className="checkmark w-32 h-32 rounded-full bg-black flex items-center justify-center text-white text-5xl mb-10 shadow-2xl">
                ✓
              </div>
              <h2 className="text-5xl font-black text-black uppercase mb-6 leading-[0.9] tracking-tighter">
                Message <br /> Received.
              </h2>
              <p className="text-black/40 max-w-[320px] mb-12 text-lg font-medium leading-relaxed">
                I&apos;ve received your inquiry and will personally get back to
                you within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="group relative px-10 py-4 font-black uppercase tracking-widest text-xs text-black"
              >
                <span className="relative z-10">Back to form</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black group-hover:h-full transition-all duration-300 -z-0 opacity-10" />
              </button>
            </div>
          )}

          <div className="drawer-item mt-8 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[0.6rem] font-black text-black/20 tracking-[0.3em] uppercase">
            <div className="flex items-center gap-8">
              <a
                href="mailto:hashimshaikk04@gmail.com"
                className="text-black/40 hover:text-black transition-colors"
              >
                Email
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-black/40 hover:text-black transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
