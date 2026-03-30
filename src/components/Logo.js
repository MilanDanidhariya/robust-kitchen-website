export default function Logo({ size = 'normal', animated = false }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    normal: 'w-12 h-12',
    large: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className={`absolute inset-0 bg-gradient-to-br from-lime/20 to-gold/20 rounded-lg ${animated ? 'animate-pulse' : ''}`}></div>
      <div className="relative w-full h-full bg-dk rounded-lg border-2 border-lime/30 flex items-center justify-center overflow-hidden">
        <div className="text-lime font-bold text-xs font-jetbrains-mono">
          RK
        </div>
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lime/10 to-transparent animate-shimmer"></div>
        )}
      </div>
    </div>
  );
}