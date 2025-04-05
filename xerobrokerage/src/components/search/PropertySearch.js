export default function PropertySearch() {
  return (
    <div className='bg-black p-6 rounded-lg shadow-md'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <input
          type='text'
          placeholder='Location'
          className='input input-bordered w-full'
        />
        <select className='select select-bordered w-full sm:w-auto'>
          <option>Property Type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Office</option>
        </select>
        <button className='btn btn-primary'>Search</button>
      </div>
    </div>
  )
}
