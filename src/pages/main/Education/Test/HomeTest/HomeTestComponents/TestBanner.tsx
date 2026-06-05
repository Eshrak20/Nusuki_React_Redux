import EduTestCmnBtn from "@/components/education/EduTestCmnBtn"

const TestBanner = () => {
    return (
        <section className="relative w-full bg-primary dark:bg-background text-white overflow-hidden">
            {/* The comment is now inside the element, which is valid JSX */}
            {/* Uses shadcn theme variables for background and text contrast */}
    
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-10 left-1/2 w-150 h-150 rounded-full border border-primary-foreground/20 -translate-x-1/2"></div>
                <div className="absolute top-20 left-1/2 w-200 h-200 rounded-full border border-primary-foreground/10 -translate-x-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                
                {/* Left Column: Text Content */}
                <div className="flex-1 flex flex-col items-start max-w-2xl">
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-balance">
                        Nusuki Education the smartest way to reach your top test score
                    </h1>
                    
                    <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed">
                        We are the test prep partner you are looking for. Experience the most seamless test prep techniques with Nusuki Education and reach the test scores you need to land in your dream university.
                    </p>
                    
                  <EduTestCmnBtn title="Book Free Demo Class"/>
                </div>

                {/* Right Column: Image */}
                <div className="flex-1 w-full hidden lg:flex justify-end relative">
                    <div className="relative w-full max-w-lg">
                        <div className="absolute -top-6 -left-6 text-primary-foreground/50">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                           </svg>
                        </div>
                        
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGg4jlOlXWgTwXwCcB7m-isScCjuuEy98W4g&s" 
                            alt="Student studying" 
                            className="w-full h-auto object-cover rounded-sm shadow-2xl relative z-10"
                        />
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default TestBanner;