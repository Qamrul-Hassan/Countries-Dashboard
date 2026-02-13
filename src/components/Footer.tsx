export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)] bg-[color:var(--surface-deep)]/35">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 text-sm text-[color:var(--muted-text)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span className="font-semibold">Copyright 2026 Countries Dashboard</span>
        <span className="text-xs uppercase tracking-[0.08em]">Next.js | Tailwind | REST Countries API</span>
      </div>
    </footer>
  );
}
