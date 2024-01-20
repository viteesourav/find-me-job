import React from 'react'
import { JobImg } from '../assets'

const AboutUs = () => {
  return (
    <div className='container mx-auto bg-white shadow-md rounded-md px-5 mt-2'>
    <div className='w-full flex flex-col-reverse gap-6 lg:flex-row md:gap-4 py-8'>
      <div className='w-full lg:w-1/2 flex flex-col gap-2 px-3'>
        <p className=' text-lg md:text-2xl font-semibold text-blue-800'>About Us</p>
        <p className='text-base text-left text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis et aliquid illo architecto dolorem rem error dignissimos repellat rerum. Necessitatibus ut sunt esse fugit veritatis qui similique ipsam, recusandae corrupti? </p>
        <p className='text-base text-left text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quas facere mollitia perferendis nobis totam distinctio officiis! Dolorem, aliquam possimus debitis molestiae, sint mollitia temporibus laborum, eligendi sed commodi eius!   
        </p>
        <p className='text-base text-left text-gray-600'>Magnam deleniti modi suscipit quo ipsum, maxime debitis deserunt nisi quas eos beatae ad sint, repudiandae explicabo quia pariatur minus! Omnis tempore provident, veritatis officia explicabo ducimus quas neque cumque!
        </p>
      </div>
      <img src={JobImg} alt="Job Image" className='w-full lg:w-1/2 h-fit object-contain my-auto' />
    </div>

    </div>
  )
}

export default AboutUs