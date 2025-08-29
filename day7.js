import { useState } from "react";

export default function CounterAndPreview() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-6">
        {/* Counter Card */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold tracking-tight">Counter</h2>
          <p className="mt-3 text-5xl font-bold tabular-nums" aria-live="polite">
            {count}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-2xl shadow hover:shadow-md transition active:scale-95"
              onClick={() => setCount((c) => c + 1)}
            >
              + Increment
            </button>
            <button
              className="px-4 py-2 rounded-2xl shadow hover:shadow-md transition active:scale-95"
              onClick={() => setCount((c) => c - 1)}
            >
              − Decrement
            </button>
            <button
              className="px-4 py-2 rounded-2xl shadow hover:shadow-md transition active:scale-95"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </section>

        {/* Live Text Preview Card */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold tracking-tight">Live Text Preview</h2>
          <label htmlFor="live-text" className="sr-only">Type something</label>
          <input
            id="live-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something…"
            className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          />
          <div className="mt-3 text-sm text-gray-600">Characters: {text.length}</div>
          <div className="mt-5 rounded-xl bg-gray-100 p-4">
            <p className="text-gray-800">You typed: <span className="font-medium">{text || "(nothing yet)"}</span></p>
          </div>
        </section>
      </div>
    </div>
  );
}
