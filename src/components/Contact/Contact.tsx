// src/components/Contact.tsx
// Install: npm install @emailjs/browser
// Setup:   https://emailjs.com → create account → add Gmail service → create template
// Template variables to use: {{from_name}}, {{from_email}}, {{message}}

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { LuMail, LuSend, LuCheck, LuCircleAlert } from "react-icons/lu";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center bg-linear-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-linear-to-bl from-slate-50 to-transparent blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-linear-to-tr from-gray-100 to-transparent blur-3xl opacity-60" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative w-full max-w-2xl mx-auto px-5 sm:px-10 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900/5 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
            <LuMail size={12} />
            Get in touch
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-300">
              Me
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? Send me a message and I'll get back to you.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </label>
              <input
                type="text"
                name="sender_email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Tell me about your project or just say hi..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 resize-none"
            />
          </div>

          {/* Status messages */}
          {status === "success" && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
              <LuCheck size={16} />
              Message sent! I'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              <LuCircleAlert size={16} />
              Something went wrong. Please try again or email me directly.
            </div>
          )}

          {/* Hidden field — sends current time to match {{time}} in template */}
          <input type="hidden" name="time" value={new Date().toLocaleString()} />

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`
              w-full flex items-center justify-center gap-2.5 px-6 py-3.5
              rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95
              ${status === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700 cursor-default"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
              }
            `}
          >
            {status === "loading" ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : status === "success" ? (
              <>
                <LuCheck size={16} />
                Sent!
              </>
            ) : (
              <>
                <LuSend size={16} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;