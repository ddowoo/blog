import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full sticky top-0 py-5 w-100 z-50 bg-gray-900 px-5">
      <div className="max-w-screen-lg m-auto flex justify-between">
        <Link href="/" type="button" title="홈화면" className="my-auto">
          <p className="dark:text-white font-bold">{`DDOWOO'S`} DOODLE</p>
        </Link>
        <div className="flex items-center">
          <Link href="/about" type="button" title="블로그">
            <p className="dark:text-white font-bold mr-3 m-auto">ABOUT ME</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
