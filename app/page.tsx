import Image from "next/image";
import Nav from '../components/Nav/navbar'
import Experience from '../components/Experience/experience'
import Baner from '../components/Baner/baner'
import Fleet from '../components/Fleet/fleet'

export default function Home() {
  return (
    <main className="flex flex-col gap-36">
      <Nav />
      <Baner />
      <Experience />
      <Fleet />
    </main>
  );
}
