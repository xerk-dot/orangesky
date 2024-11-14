import Link from "next/link";

export function Footer() {
  return (
    <footer className="p-6 pt-3 pb-6 flex text-xs text-center mt-3 dark:text-gray-400 text-gray-500 font-mono">
      <div className="grow text-left">
        xerk-dot (
        <Link href="https://bsky.app/profile/orangedev.bsky.social" target="_blank">
          @orangedev.bsky.social
        </Link>
        )
      </div>
      <div>
        <Link href="https://github.com/xerk-dot/orangesky" target="_blank">
          Source
        </Link>
      </div>
    </footer>
  );
}
