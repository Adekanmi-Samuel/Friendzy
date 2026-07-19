export function SkeletonLine({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-pebble/30 rounded ${className}`} />
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white border border-pebble p-5 space-y-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-pebble/30 animate-pulse" />
        <div className="space-y-2 flex-1">
          <SkeletonLine className="h-4 w-1/3" />
          <SkeletonLine className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonLine className="h-32 w-full rounded-xl" />
      <div className="space-y-2">
        <SkeletonLine className="h-3 w-full" />
        <SkeletonLine className="h-3 w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonMatchCard() {
  return (
    <div className="rounded-2xl bg-white border border-pebble overflow-hidden">
      <div className="h-48 bg-pebble/20 animate-pulse" />
      <div className="p-4 space-y-3">
        <SkeletonLine className="h-5 w-1/2" />
        <SkeletonLine className="h-3 w-3/4" />
        <div className="flex gap-1.5">
          <SkeletonLine className="h-6 w-16 rounded-full" />
          <SkeletonLine className="h-6 w-16 rounded-full" />
          <SkeletonLine className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
