export default function Home() {
  return (
    <main className='min-h-screen bg-gray-100 p-8'>
      <h1 className='text-4xl font-bold text-blue-600 mb-6'>
        Welcome to Next.js with Tailwind!
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <p className='text-gray-700'>This setup includes:</p>
        <ul className='list-disc pl-5 mt-2 space-y-1'>
          <li className='text-green-600'>Next.js</li>
          <li className='text-blue-600 font-bold '>React</li>
          <li className='text-purple-600'>Tailwind CSS</li>
        </ul>
      </div>
    </main>
  )
}
