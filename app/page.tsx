import Image from "next/image";
import Nav from '../components/Nav/navbar'
import Experience from '../components/Experience/experience'
import Baner from '../components/Baner/baner'
import Fleet from '../components/Fleet/fleet'
import Map from '../components/Map/map'

export default function Home() {
  return (
    <main className="flex flex-col gap-36">
      <Nav />
      <Baner />
      <Experience />
      <Fleet />
      <Map />
    </main>
  );
}
