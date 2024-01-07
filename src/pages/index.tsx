import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <main className={`p-24 ${inter.className}`}>Hello, World!</main>;
}
