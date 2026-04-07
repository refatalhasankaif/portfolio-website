import { useEffect, useState } from "react";

const Loader = () => {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        let raf: number;

        const start1 = performance.now();
        const duration1 = 1800;

        const animate = (time: number) => {
            const elapsed = time - start1;
            let t = Math.min(elapsed / duration1, 1);

            // Very smooth easing
            t = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const eased = Math.pow(t, 1.7);

            setProgress(eased * 100);

            if (t < 1) {
                raf = requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(() => setVisible(false), 300);
                }, 400);
            }
        };

        raf = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(raf);
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-99999 flex items-center justify-center bg-white transition-opacity duration-500 ${
                isExiting ? "opacity-0" : "opacity-100"
            }`}
        >
            <div className="flex flex-col items-center gap-8 w-full max-w-70 px-6">
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-black rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm uppercase tracking-[3px] text-zinc-500 font-medium">
                        LOADING
                    </p>
                    <span className="text-5xl font-semibold text-zinc-700 tabular-nums">
                        {Math.floor(progress)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Loader;