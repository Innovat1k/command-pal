type Props = { query: string; onChange: (q: string) => void };

export function CmdPalInput({ query, onChange }: Props) {
  return (
    <div className="flex items-center border-b border-slate-700 px-4 py-3">
      <span className="text-slate-400 mr-2">🔍</span>
      <input
        type="text"
        value={query}
        onChange={e => onChange(e.target.value)}
        placeholder="Type a command or search..."
        className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
        autoFocus
      />
    </div>
  );
}