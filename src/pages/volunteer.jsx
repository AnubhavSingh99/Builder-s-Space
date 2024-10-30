// App.js or your page component file
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Star } from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push } from 'firebase/database'
import { Link } from 'react-router-dom'

// Firebase configuration - replace with your own config
const firebaseConfig = {
  apiKey: "AIzaSyBDTmRod2AAdJpC_TG3RJAFQ-8JNBccJek",
  authDomain: "texty-f0e5d.firebaseapp.com",
  databaseURL: "https://texty-f0e5d-default-rtdb.firebaseio.com",
  projectId: "texty-f0e5d",
  storageBucket: "texty-f0e5d.appspot.com",
  messagingSenderId: "521973195268",
  appId: "1:521973195268:web:e285cd03d38602743dcb51",
  measurementId: "G-HWK31E5VNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Anime character SVG component
const AnimeCharacter = () => (
  <svg className="absolute bottom-0 left-0 w-64 h-64 opacity-50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="30" r="20" fill="#FFC0CB" />
    <circle cx="43" cy="25" r="3" fill="#000" />
    <circle cx="57" cy="25" r="3" fill="#000" />
    <path d="M45 35 Q50 40 55 35" stroke="#000" strokeWidth="2" />
    <path d="M30 70 Q50 80 70 70 Q60 100 30 70" fill="#FF69B4" />
    <path d="M35 20 L30 10 M65 20 L70 10" stroke="#FFC0CB" strokeWidth="2" />
  </svg>
)

// Add this to your global CSS or style tag
const globalStyles = `
  @keyframes twinkle {
    0% { opacity: 0.2; }
    50% { opacity: 1; }
    100% { opacity: 0.2; }
  }

  .anime-text-glow {
    text-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
  }

  .anime-input:focus {
    box-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
  }

  .anime-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .anime-success {
    animation: slideIn 0.5s ease-out;
  }

  .anime-error {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`

export default function AnimeBuilderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skill: '',
    portfolio: '',
    time: '',
    coolestProject: '',
    workJam: '',
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [starPosition, setStarPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Add global styles
    const styleSheet = document.createElement("style")
    styleSheet.innerText = globalStyles
    document.head.appendChild(styleSheet)

    // Star animation interval
    const interval = setInterval(() => {
      setStarPosition({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      document.head.removeChild(styleSheet)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Add submission date
      const submissionData = {
        ...formData,
        submissionDate: new Date().toISOString()
      }

      // Create a reference to the 'submissions' node in your database
      const submissionsRef = ref(database, 'submissions')
      
      // Push the new submission to Firebase
      await push(submissionsRef, submissionData)
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        skill: '',
        portfolio: '',
        time: '',
        coolestProject: '',
        workJam: '',
        additionalInfo: ''
      })
      
      setSubmitStatus('success')
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full">
        <div className="stars absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 2}s`,
                animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        animate={{ x: starPosition.x, y: starPosition.y }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute text-yellow-300 opacity-75"
      >
        <Star className="w-6 h-6" />
      </motion.div>

      <AnimeCharacter />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-2xl p-8 w-full max-w-md relative z-10 shadow-2xl border border-purple-500 overflow-hidden"
      >
        <div className="text-white mb-6 text-lg">
          <p>👋 Hey Builders (or soon-to-be famous editors and designers),</p>
          <p className="mt-2">We're cooking up something epic here, and it's missing one thing... ✨YOUR TALENT✨.</p>
          <p className="mt-2">If you've got mad video editing or design skills and are ready to flex them for the good of the squad, we need your help! Think of it like being the superhero who makes everything look 🔥 and moves like butter. You in?</p>
          <p className="mt-2">We're not just building cool stuff; we want to make it look just as cool. So if you love cutting videos, crafting visuals, or just making things pop, we want you on board!</p>
          <p className="mt-4">Here's what's on the menu:</p>
          <ul className="list-disc list-inside mt-2">
            <li>🎬 Video editing wizardry (help us turn boring into bold!)</li>
            <li>🎨 Design magic (graphics, banners, the works—make 'em shine!)</li>
          </ul>
          <p className="mt-2">No need to be a pro, just bring your A-game and a willingness to have some fun with us. 👾💻 Plus, you'll be part of something big, and you can say "Yeah, I designed that" while casually sipping your coffee. ☕️</p>
          <p className="mt-2">Hit us up if you're down to make some internet magic. 💥 Let's create something rad together!</p>
          <p className="mt-4 italic">—The "We Definitely Need Help Here" Team 😅</p>
        </div>

        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 text-center anime-text-glow">
          Join the Builder Squad
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-1 group-hover:text-pink-400 transition-colors duration-300">
              👋 What's your name, legend? (So we know who to give eternal bragging rights to.)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out placeholder-gray-500 anime-input"
              placeholder="Enter your legendary name"
            />
          </div>

          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-1 group-hover:text-pink-400 transition-colors duration-300">
              📧 What's your email? (Don't worry, we only send cool stuff... like video links and high fives.)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out placeholder-gray-500 anime-input"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="group">
            <label htmlFor="skill" className="block text-sm font-medium text-purple-300 mb-1 group-hover:text-pink-400 transition-colors duration-300">
              🎬 What are you a wizard at?
            </label>
            <select
              id="skill"
              name="skill"
              required
              value={formData.skill}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out anime-input"
            >
              <option value="">Select your skill</option>
              <option value="Video Editing">Video Editing ✂️</option>
              <option value="Design Magic">Design Magic 🎨</option>
              <option value="Both">Both because I'm unstoppable 😎</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="portfolio" className="block text-sm font-medium text-purple-300 mb-1 group-hover:text-pink-400 transition-colors duration-300">
              💻 Got a portfolio or some work to show off? Drop the link here! (Give us a taste of your superpowers 🦸‍♀️🦸‍♂️.)
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out placeholder-gray-500 anime-input"
              placeholder="https://your-awesome-portfolio.com"
            />
          </div>

          <div className="group">
            <label htmlFor="time" className="block text-sm font-medium text-purple-300 mb-1 group-hover:text-pink-400 transition-colors duration-300">
              ⏳ How much time can you dedicate to helping us look awesome? (No pressure, but we might cry a little if it's "not much." 😢)
            </label>
            <input
              type="text"
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out placeholder-gray-500 anime-input"
              placeholder="Your time dedication"
            />
          </div>

          <div className="group">
            <label htmlFor="coolestProject" className="block text-sm font-medium text-purple-300 mb-1 group-hover:text-pink-400 transition-colors duration-300">
              🔥 What's the coolest project you've worked on so far? (We're ready to be impressed. Hit us with your best!)
            </label>
            <textarea
              id="coolestProject"
              name="coolestProject"
              required
              value={formData.coolestProject}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out placeholder-gray-500 anime-input"
              placeholder="Tell us about your coolest project"
              rows={3}
            />
          </div>

          <div className="group">
            <label htmlFor="workJam" className="block text-sm font-medium text-purple-300 mb-1 group-hover:text-pink-400 transition-colors duration-300">
              🎧 What's your go-to jam while working? (We🎧 What's your go-to jam while working? (We just wanna make sure we're vibing to the same beats when we make magic together 🎶.)
            </label>
            <input
              type="text"
              id="workJam"
              name="workJam"
              value={formData.workJam}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out placeholder-gray-500 anime-input"
              placeholder="Your go-to work jam"
            />
          </div>

          <div className="group">
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-purple-300 mb-1 group-hover:text-pink-400 transition-colors duration-300">
              👾 Anything else we should know about your mad skills? (Like secret hobbies, weird talents, or the fact that you can code while doing a backflip? 🏅)
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out placeholder-gray-500 anime-input"
              placeholder="Tell us about your secret talents or weird skills"
              rows={3}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(236, 72, 153, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 relative overflow-hidden anime-button"
          >
            <span className="relative z-10">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send className="h-5 w-5 relative z-10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-75 animate-pulse"></div>
          </motion.button>
        </form>

        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-green-500 text-white rounded-md flex items-center justify-center anime-success"
            >
              <Sparkles className="mr-2" /> Form submitted successfully! ✨
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-red-500 text-white rounded-md flex items-center justify-center anime-error"
            >
              Error submitting form. Please try again. 😅
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}