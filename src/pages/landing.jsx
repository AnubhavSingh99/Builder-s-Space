import React, { useState, useEffect } from 'react';
import { Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Component() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-black bg-opacity-50 backdrop-blur-md">
                <div className="text-2xl font-bold">Builder&apos;s Space</div>
                <nav>
                    <Link to="/volunteer" className="px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all">
                        Volunteer
                    </Link>
                </nav>
            </header>

            <main>
                <div className="relative h-screen">
                    <img
                        src="/h1.jpg?height=1080&width=1920"
                        alt="Colorful event background"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                        <h1
                            className="text-6xl md:text-8xl font-bold mb-4"
                            style={{
                                transform: `translateY(${scrollY * 0.5}px)`,
                                opacity: 1 - scrollY / 500,
                            }}
                        >
                            The Nights S1
                        </h1>
                        <p
                            className="text-xl md:text-2xl mb-8"
                            style={{
                                transform: `translateY(${scrollY * 0.3}px)`,
                                opacity: 1 - scrollY / 700,
                            }}
                        >
                            A new era of building begins
                        </p>
                    </div>
                </div>

                <section className="max-w-3xl mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold mb-4">Hey there, you busy-bees and night owls 🦉✨</h2>
                    <p className="mb-4">So, yeah... this is gonna be a 5-minute read. I know, I know—normally we're all about keeping it short and punchy, but this time around, I just let myself write. I wanted to lay it all out—where we started, where we're headed, and what's coming next. We're getting real here, raw storytelling style.</p>
                    <p className="mb-4">Drumroll, please... because something is coming. 🌌 The Nights is our latest and greatest, and honestly? It's not just another event. It's a vibe, a mission, and a call to all those who feel the pull of late-night ideas and big dreams. Think of The Nights as our after-hours playground, where anything can happen and everyone's invited.</p>
                </section>

                <section className="relative py-">
                    <img
                        src="/h3.jpeg?height=600&width=1200"
                        alt="People working late at night"
                        className='m-auto mb-10'
                    />
                    <div className="max-w-3xl mx-auto px-4">
                        <p className="mb-4">You see, we started as a group of people who believed that building cool stuff shouldn't feel like a chore. We wanted to create a place for creators, builders, dreamers—the people who don't sleep because they've got that "one last thing" to try, that one more feature to add. We've come a long way since then, but now, it's time to level up.</p>
                        <p className="mb-4">The Nights is all about bringing us all together on this wild ride. It's not just for techies, artists, or just any one kind of person—it's for everyone ready to make something, to be part of a movement. There'll be late-night sessions, projects that push boundaries, and, of course, a lot of laughs, fails, and wins along the way.</p>
                    </div>
                </section>

                <section className="max-w-3xl mx-auto px-4 py-16 text-center">
                    <p className="text-2xl mb-8">So, if you want in on this new adventure—this blend of chaos, creativity, and community—then keep an eye out.</p>
                    <h2 className="text-4xl font-bold mb-8">Ready to see where The Nights takes us?</h2>
                    <Link
                        to="/volunteer"
                        className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Volunteer us...
                    </Link>

                </section>
            </main>

            <footer className="bg-black p-4 flex justify-between items-center">
                <nav className="space-x-4">
                    <a href="/our-story" className="hover:text-gray-300 transition-colors">&copy; 2024 Builder's Space. All rights reserved.</a>
                </nav>
                <div className="flex space-x-4">
                    <a href="https://twitter.com/buildersspace" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="https://instagram.com/buildersspace" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="w-6 h-6" />
                    </a>
                </div>
            </footer>
        </div>
    );
}