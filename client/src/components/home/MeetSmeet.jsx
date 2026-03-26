import React from 'react';

const MeetSmeet = () => {
    return (
        <section className="py-32 px-8 bg-background relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="w-full aspect-square rounded-full border border-primary/20 relative flex items-center justify-center">
                            <div className="w-[85%] aspect-square rounded-full overflow-hidden bg-surface-container-highest border-4 border-primary shadow-[0_0_50px_rgba(230,195,100,0.2)]">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQTFjSpD78Skg2dqyA_M4Lu9iBJywp_YcsExCA-OlAxtNzsZ0h5QWj4XfkFFjDi6KQJKbzk7Qxe3ID0AEWvPqH0ORMuFhfyp_-7zutEmPFdIqy-RAT0U4odYdTYvWrcld72fbqtm0AmcYuq4RoaasRVW8BsSfjevuEeRA4mp0LW2OVNtbJGgOSk57G88U5E3nH_ghnBj4ezs71cOwkQdhCTUwW5bbG916X3BBZPdvtu0RPvBtqVmQ2PYVCMR1AmLof0yNBHa79Heqm"
                                    alt="Smeet - Senior Consultant"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Orbiting icons */}
                            <div className="absolute inset-0 animate-[spin_60s_linear_infinite] pointer-events-none">
                                <span className="material-symbols-outlined absolute top-0 left-1/2 -translate-x-1/2 text-primary">flare</span>
                                <span className="material-symbols-outlined absolute bottom-0 left-1/2 -translate-x-1/2 text-primary">auto_awesome</span>
                            </div>

                            {/* Stat chip — top right */}
                            <div className="absolute top-4 right-0 bg-surface-container border border-primary/20 rounded-full px-4 py-2 flex items-center gap-2 text-sm shadow-xl">
                                <span className="material-symbols-outlined text-primary text-sm">star</span>
                                <span className="text-primary font-label font-bold">3+ Yrs</span>
                            </div>

                            {/* Stat chip — bottom left */}
                            <div className="absolute bottom-8 left-0 bg-surface-container border border-primary/20 rounded-full px-4 py-2 flex items-center gap-2 text-sm shadow-xl">
                                <span className="material-symbols-outlined text-primary text-sm">language</span>
                                <span className="text-on-surface-variant font-label text-xs">3 Languages</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        <div>
                            <span className="text-primary font-label text-sm uppercase tracking-[0.2em] block mb-2">The Guiding Light</span>
                            <h2 className="text-6xl font-headline font-bold text-primary mt-4 tracking-tight">Smeet</h2>
                            <p className="text-on-surface-variant font-label tracking-widest uppercase text-xs mt-2 opacity-60">Principal Jyotish Acharya</p>
                        </div>
                        
                        <blockquote className="border-l-2 border-primary/40 pl-6 my-10">
                            <p className="text-2xl font-headline italic text-on-surface-variant/90 leading-relaxed">
                                "I don't just read your chart — I help you rewrite your destiny through the lens of ancient Vedic science."
                            </p>
                        </blockquote>

                        <div className="flex flex-wrap gap-3 py-4">
                            {['Speaks English · Hindi · Gujarati', 'Guru-mentored', 'Practical Remedies'].map((tag, i) => (
                                <span key={i} className="px-5 py-2 rounded-full border border-primary/20 bg-surface-container-low text-on-surface-variant text-sm flex items-center gap-2 hover:bg-primary/5 transition-colors">
                                    <span className="material-symbols-outlined text-primary text-sm">
                                        {i === 0 ? 'translate' : i === 1 ? 'verified' : 'bolt'}
                                    </span>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="pt-6">
                            <button className="gold-gradient text-on-primary px-12 py-5 rounded-full font-bold text-lg hover:scale-105 shadow-[0_10px_30px_rgba(230,195,100,0.2)] transition-all">
                                Book a Session with Smeet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetSmeet;
