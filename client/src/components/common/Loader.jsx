const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-primary-gold/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-primary-gold rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
