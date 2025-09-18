'use client';
import Link from 'next/link';

export default function NavMenu() {
  return (
    <div className="flex justify-center">
    <nav className="flex gap-8 py-4 px-6 bg-white/10 backdrop-blur-md border-b border-white/70 text-sm font-medium m-5 rounded-md">
      <Link href="/" className="hover:underline">Головна</Link>
      <Link href="/contact" className="hover:underline">Контрагенти</Link>
      <Link href="/group" className="hover:underline">Групи</Link>
      <Link href="/contact" className="hover:underline">Суборенда</Link>
      <Link href="/contact" className="hover:underline">Охорона</Link>
      <Link href="/contact" className="hover:underline">Архів</Link>
      <Link href="/agreements-now" className="hover:underline">Договори</Link>
      <Link href="/ecp" className="hover:underline">ЕЦП</Link>
    </nav>
  </div>
  );
}
