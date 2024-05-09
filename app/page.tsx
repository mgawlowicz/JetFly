import Experience from '../components/Experience/experience'
import Baner from '../components/Baner/baner'
import Fleet from '../components/Fleet/fleet'
import Map from '../components/Map/map'
import Form from '../components/Form/form'

export default function Home() {
  return (
    <main className="flex flex-col gap-36">
      <Baner />
      <Experience />
      <Fleet />
      <Map />
      <Form />
    </main>
  );
}
