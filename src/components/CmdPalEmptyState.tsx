export function CmdPalEmptyState({ query }: { query: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-8 px-4 text-center"
    >
      <div className="text-4xl mb-3">🔍</div>
      <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">
        No results for "{query}"
      </p>
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        Try different keywords or check your spelling.
      </p>
    </div>
  );
}
