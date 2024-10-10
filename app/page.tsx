import { HeartPulseIcon, User2Icon } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-2 items-center">
          <p className="font-mono text-5xl text-violet-800">MED-GUARD</p>
          <HeartPulseIcon className="text-violet-800 w-8 h-8" />
        </div>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] max-w-sm">
          <li className="mb-2 text-balance">
            Ingreso a la seccion Institucional.
          </li>
          <li>Ingreso perfil médico.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/panel"
            rel="noopener noreferrer"
          >
            <HeartPulseIcon />
            Institución
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/profesional"
            rel="noopener noreferrer"
          >
            <User2Icon className="mr-1" />
            Profesional
          </a>
        </div>
      </main>
    </div>
  );
}
