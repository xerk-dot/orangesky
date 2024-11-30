import Link from "next/link";

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-1 text-gray-500"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .5C5.373.5 0 5.873 0 12.5c0 5.25 3.438 9.688 8.207 11.285.6.111.793-.261.793-.577 0-.287-.011-1.243-.017-2.25-3.338.724-4.043-1.607-4.043-1.607-.546-1.384-1.333-1.754-1.333-1.754-1.089-.743.083-.728.083-.728 1.205.085 1.838 1.237 1.838 1.237 1.07 1.83 2.807 1.301 3.49.995.108-.775.42-1.301.763-1.601-2.665-.303-5.467-1.333-5.467-5.933 0-1.313.469-2.386 1.236-3.227-.124-.303-.536-1.53.117-3.185 0 0 1.008-.322 3.303 1.227A11.56 11.56 0 0112 6.5c1.02.004 2.042.138 3.003.404 2.295-1.55 3.303-1.227 3.303-1.227.653 1.655.241 2.882.118 3.185.77.841 1.236 1.914 1.236 3.227 0 4.61-2.805 5.63-5.475 5.93.43.37.815 1.099.815 2.22 0 1.604-.014 2.903-.014 3.293 0 .319.192.693.798.577C20.563 22.188 24 17.75 24 12.5 24 5.873 18.627.5 12 .5z" />
    </svg>
  );
}

export function Footer() {
  const triangleLength = 30;
  return (
    <footer className="z-50 fixed bottom-0 left-0 right-0 p-6 pt-3 pb-6 flex text-xs text-center dark:text-gray-400 text-gray-500 font-mono z-1000">
      <div className="grow text-left">
        <Link href="https://github.com/xerk-dot" target="_blank" className="flex items-center">
          <GitHubIcon />
          xerkdot
        </Link>
      </div>
      <div className="relative">
        <a href="https://github.com/xerk-dot/orangesky" target="_blank" className="relative z-10 flex items-center justify-center">
          <div 
            className={`absolute 
                       right-0 
                       bottom-0 
                       w-16 
                       h-16
                       bg-[#fcfcfc] 
                       dark:bg-[#111]
                       shadow-lg
                       z-8
                       filter: drop-shadow(0 0 10px white);`}
            style={{ margin: 0 }}
          >
            <span className="z-100 absolute bottom-0 right-0">source</span>
          </div>
        </a>
      </div>
    </footer>
  );
}
