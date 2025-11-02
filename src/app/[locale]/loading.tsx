export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-black/50 to-transparent animate-diagonal-sweep"/>
      </div>

      <div className="relative z-10 animate-bounce-slow">
        {/* <Image
          src="/logos/logo.webp" 
          alt="Brand Name Logo"
          width={80}
          height={80}
          className="object-contain"
          priority
        /> */}
      </div>

      <div className="relative z-10 flex space-x-0 overflow-hidden">
        {Array.from("Brand Name").map((letter, i) => (
          <span
            key={i}
            className="text-4xl font-bold text-foreground inline-block animate-wave"
            style={{
              animationDelay: `${i * 0.1}s`,
              display: "inline-block",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
}
