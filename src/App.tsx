import { CmdPalOverlay } from './components/CmdPalOverlay';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2">CmdPal Demo</h1>
      <p className="text-slate-400 mb-8">Press <kbd className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Ctrl</kbd> + <kbd className="bg-slate-800 px-2 py-1 rounded border border-slate-700">K</kbd> to open</p>
      <CmdPalOverlay />
    </main>
  );
}

export default App;