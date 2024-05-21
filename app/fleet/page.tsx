import Image from 'next/image';
import Form from '@/components/Form/form';
import Jets from './components/jets';

export default function Home(){

  return (
    <main className='flex flex-col gap-24 lg:gap-36'>
      <div className='flex flex-col pt-36 gap-8'>
        <div className='flex flex-col gap-2 px-4 lg:px-16'>
          <h1 className="text-5xl lg:text-8xl font-bold">Our fleet</h1>
          <p className="text-gray-400 lg:text-xl">Explore our impressive collection of meticulously maintained aircraft, designed to provide unparalleled comfort and luxury during your journey. From sleek jets to spacious cabins, we offer a diverse range of options to suit your travel preferences. Discover the epitome of elegance and sophistication with our exceptional fleet.</p>
        </div>
        <Image src="/fleet-baner-new.webp" width={1920} height={574} alt='fleet-baner'></Image>
      </div>
      <div className='flex flex-col w-full px-4 lg:px-16 gap-12'>
        <div className='flex justify-between gap-4'>
          <input type='text' className='border border-solid border-white bg-transparent px-4 py-2 w-1/4 outline-none lg:w-fit' placeholder='Search'></input>
          <select className='border border-solid border-white bg-transparent px-4 py-2'>
            <option>Sort by</option>
            <option>Sort by</option>
            <option>Sort by</option>
          </select>
        </div>
        <Jets />
      </div>
      <Form />
    </main>
  );
}
