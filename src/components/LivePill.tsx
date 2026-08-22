export default function LivePill({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide ${
        light ? "text-accent-400" : "text-accent-600"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
      </span>
      Live
    </span>
  );
}
