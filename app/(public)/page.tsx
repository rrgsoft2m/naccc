'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Trophy, Users, BookOpen, Star } from 'lucide-react'

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">

      {/* 1. HERO SECTION */}
      <section className="relative bg-[#001F3F] text-white py-32 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#002f5f] opacity-50 transform skew-x-12 translate-x-12 z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#C5A059] opacity-10 rounded-full blur-3xl z-0"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="text-[#C5A059] font-bold tracking-widest uppercase text-sm mb-4 block">
              1-6 Sinf O‘quvchilari Uchun
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              National Academic <br /><span className="text-[#C5A059]">Challenge</span> (NAC)
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-8 max-w-lg">
              Where Thinking Becomes Excellence. Bilimni yodlash emas, fikrlash va tahlilni baholashga asoslangan milliy akademik olimpiada.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="bg-[#C5A059] text-[#001F3F] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition shadow-lg text-center flex items-center justify-center gap-2">
                Ro‘yxatdan O‘tish <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-[#001F3F] transition text-center">
                Batafsil ma'lumot
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Placeholder for Hero Image - generated via tool or static */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#C5A059] to-[#001F3F] rounded-full p-2 animate-pulse-slow">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Use an icon or leave empty for now, prompt suggests specific content logic */}
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <Image
                    src="/nac-crest.png"
                    alt="NAC Crest"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. NAC QANDAY ISHLAYDI? */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] mb-4">NAC Qanday Ishlaydi?</h2>
            <div className="w-20 h-1 bg-[#C5A059] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Ro‘yxatdan o‘tish", icon: Users, desc: "Ishtirokchi onlayn ro‘yxatdan o‘tadi va shaxsiy ID/QR-code oladi." },
              { title: "Viloyat bosqichi", icon: BookOpen, desc: "70% va undan yuqori natija ko‘rsatgan ishtirokchilar keyingi bosqichda." },
              { title: "Respublika bosqichi", icon: Trophy, desc: "Murakkablik darajasi yuqoriroq savollar va yakuniy g‘oliblar." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="w-16 h-16 bg-[#001F3F]/10 rounded-full flex items-center justify-center text-[#001F3F] mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#001F3F]">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAN YO‘NALISHLARI */}
      <section className="py-20 bg-[#001F3F] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fan Yo‘nalishlari</h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">Matematika va Ingliz tili fanlari bo‘yicha chuqurlashtirilgan savollar.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Matematika", color: "bg-blue-600" },
              { name: "Ingliz tili", color: "bg-red-600" },
              { name: "Combo (Mat+Eng)", color: "bg-purple-600" }
            ].map((subject, idx) => (
              <div key={idx} className={`${subject.color} rounded-xl p-10 transform hover:scale-105 transition-transform shadow-2xl`}>
                <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                <p className="text-white/80">1-6 Sinf</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BAHOLASH & MUKOFOTLAR */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] mb-6">Baholash va Mukofotlar</h2>
            <ul className="space-y-4">
              {[
                "Har bir sinf alohida baholanadi",
                "Har bir fan bo‘yicha 20 ta savol (5 balldan)",
                "Maksimal natija — 100 ball",
                "1-o‘rin — Kubok, diplom va sovg‘alar",
                "2-3 o‘rin — Medal va diplom",
                "Barcha ishtirokchilarga — QR-code bilan sertifikat"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg text-gray-700">
                  <Star className="w-5 h-5 text-[#C5A059] fill-current" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/register" className="text-[#001F3F] font-bold border-b-2 border-[#001F3F] hover:text-[#C5A059] hover:border-[#C5A059] transition">
                Barcha mukofotlarni ko‘rish
              </Link>
            </div>
          </div>
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            {/* Placeholder for medal image */}
            <div className="text-center">
              <Trophy className="w-32 h-32 text-[#C5A059] mx-auto mb-4" />
              <p className="text-gray-500 font-medium">G'oliblar taqdirlanadi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#C5A059] text-[#001F3F] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Olimpiadada qatnashishga tayyormisiz?</h2>
          <Link href="/register" className="inline-block bg-[#001F3F] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#003366] transition shadow-xl">
            Ro‘yxatdan O‘tish
          </Link>
          <p className="mt-4 text font-medium">Shoshiling, joylar soni cheklangan!</p>
        </div>
      </section>

    </div>
  )
}
