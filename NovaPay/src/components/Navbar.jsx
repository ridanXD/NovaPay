export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-[#eeeef3] bg-white px-5 py-5 sm:px-8 lg:px-14">
      <a href="#home" className="font-jakarta text-lg font-bold text-[#17182b]">NovaPay</a>
      <nav aria-label="Navigasi utama" className="flex items-center gap-5 text-sm text-[#68697b] sm:gap-8">
        <a href="#features" className="transition-colors hover:text-[#6366F1]">Login</a>
      </nav>
    </header>
  )
}
