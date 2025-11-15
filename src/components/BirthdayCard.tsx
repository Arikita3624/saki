import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cute from "../assets/images/miku.jpg";
import crying from "../assets/images/crying.jpg";

interface Config {
  crushName: string;
  introMsg: string;
  rejectMsg: string;
  openMsgTitle: string;
  longMsg: string;
  imgs: {
    envelope: string;
    crying: string;
    cake: string;
  };
}

const config: Config = {
  crushName: "Saki (｡･ω･｡)",
  introMsg: "Do you want to open it? (´･_･`)",
  rejectMsg: "Erh.. Why? Let try again pls! (╥_╥)",
  openMsgTitle: "Happy Birthday",
  longMsg: `Today is… hmm, a special day.
The day when you— no, the cutest little creature on this planet — were born :3

I wanted to give you a real gift, something more than just a simple birthday message like this.
But you know me =)) I always somehow run out of money exactly when I need it the most TwT.
But hey… that’s not what matters, right? :3

I want to tell you that in this new age of yours, I hope you’ll become even more beautiful, talk to me more, and maybe text me first a little more often =))).
Wishing you success, good luck, and happiness in everything ahead.

Honestly, you haven’t seemed very okay lately, and it got me really worried :<
About what happened last time… I’m still not sure what it was — maybe something with your family?
But I really hope you’ll come to me when you feel sad, stressed, or just need someone to talk to… I’ll listen.

Yeah, that’s all for now.
There’s so much I wanted to tell you, but I don’t really know how to put it into words.

After all that…
Happy Birthday, Saki.
Muah… meow /ᐠ - ˕ -マ 💗`,
  imgs: {
    envelope: cute,
    crying: crying,
    cake: "/img/cake.jpg",
  },
};

const BirthdayCard: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 2 && letterRef.current) {
      const content = letterRef.current.querySelector(".letter-content");
      if (content) {
        const mid = (content.scrollHeight - content.clientHeight) / 2;
        content.scrollTo({ top: mid, behavior: "smooth" });
      }
    }
  }, [step]);

  // ⌨️ ESC để quay lại step 0 (thoát popup)
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setStep(0);
    },
    [setStep]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-cyan-100 overflow-hidden p-4">
      <FloatingIcons />

      <AnimatePresence mode="wait">
        {/* STEP 0 - ENVELOPE */}
        {step === 0 && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-cyan-200 max-w-sm w-full"
          >
            <img
              src={config.imgs.envelope}
              alt="Envelope"
              className="w-56 mx-auto mb-4 rounded-xl"
            />
            <p className="text-gray-700 text-lg mb-5">{config.introMsg}</p>
            <div className="flex justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(2)}
                className="bg-cyan-500 text-white px-5 py-2 rounded-full transition"
              >
                Open it ✨
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(1)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 transition"
              >
                No ty 😭
              </motion.button>
            </div>
          </motion.div>
        )}
        {/* STEP 1 - REJECT */}
        {step === 1 && (
          <motion.div
            key="reject"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-cyan-200 max-w-sm w-full"
          >
            <img
              src={config.imgs.crying}
              alt="Crying"
              className="w-40 mx-auto mb-4"
            />
            <p className="text-gray-700 text-lg mb-4">{config.rejectMsg}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep(0)}
              className="bg-cyan-500 text-white px-5 py-2 rounded-full transition"
            >
              Again..?
            </motion.button>
          </motion.div>
        )}
        {/* STEP 2 - LETTER */}
        {step === 2 && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="letter-container max-w-2xl w-full bg-gradient-to-b from-cyan-50 to-white font-[Quicksand]"
            ref={letterRef}
          >
            {/* === HEADER – TĂNG KHOẢNG CÁCH === */}
            <div className="letter-header">
              <p className="text-cyan-600 text-sm font-medium">
                Ooo.. A message (/ᐠ｡ꞈ｡ᐟ\)/♡ !!
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-cyan-500">
                Happy Birthday, {config.crushName.toUpperCase()}
              </h1>
            </div>

            {/* === NỘI DUNG CUỘN === */}
            <div className="letter-content gradient-scrollbar">
              <motion.div
                className="text-gray-700 space-y-4 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {config.longMsg.split("\n").map((p, i) => (
                  <p key={i} className={p.trim() === "" ? "h-3" : ""}>
                    {p}
                  </p>
                ))}
              </motion.div>
            </div>

            {/* === FOOTER === */}
            <div className="letter-footer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(3)}
                className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white px-8 py-2.5 rounded-full shadow-lg hover:shadow-cyan-300/50 transition text-sm font-medium"
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}
        {/* STEP 3 - END */}
        {step === 3 && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative text-center max-w-lg bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-cyan-200 overflow-hidden"
          >
            <ConfettiHearts />
            <p className="text-gray-700 text-lg mb-4 font-semibold">
              💌 Thank you for being born :3!.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep(0)}
              className="bg-cyan-500 text-white px-6 py-2 rounded-full mt-4"
            >
              Replay :3?
            </motion.button>
            <p className="text-cyan-500 text-sm mt-3">
              Nguyen Duy Hung a.k.a Rim cute :3
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 🌸 Floating background effect
const FloatingIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110%", x: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{ y: ["110%", "-20%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
          className="absolute text-cyan-300 text-2xl"
        >
          {Math.random() > 0.5 ? "🤍" : "✨"}
        </motion.div>
      ))}
    </div>
  );
};

// 💙 Confetti hearts effect - Trải đều trên thanh trên
const ConfettiHearts: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -80,
            x: `${Math.random() * 100}%`,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: ["-80px", "110%"],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
          className="absolute text-cyan-500 text-xl select-none"
        >
          💙
        </motion.div>
      ))}
    </div>
  );
};

export default BirthdayCard;
