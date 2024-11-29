import { ThemeToggle } from "../theme-toggle";
import { Logo } from "../ui/logo";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex mb-5 md:mb-5 items-center m-4">
      <Logo />

      <nav className="font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3">
        <ThemeToggle />

        <Link
          href="/about"
          className="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
        >
          About
        </Link>
        <a
          href="https://bsky.app/profile/orangedev.bsky.social"
          target="_blank"
          className="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center p-2 rounded-sm transition-[background-color] whitespace-nowrap -mr-2"
        >
          <BlueskyIcon style={{ marginRight: 4 }} />
          <div className="flex flex-col">
            <span>Follow <span className="hidden md:inline">me</span></span>
          </div>
        </a>
      </nav>
    </header>
  );
}

function BlueskyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      viewBox="0 0 600 530"
      {...props}
    >
      <path
        fill="#1185fe"
        d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.825c0-88.687 77.742-60.816 125.72-24.795z"
      />
    </svg>
  );
}
