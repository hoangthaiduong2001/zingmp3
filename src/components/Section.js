import React from 'react'
import { useNavigate } from 'react-router-dom'

const Section = ({ data }) => {
  
  const navigate = useNavigate()
  console.log(data)
  return (
    <div className='mt-12 px-[59px] flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold'>{data?.title}</h3>
        <span className='text-xs'>TAT CA</span>
      </div>
      <div className='flex items-start justify-between gap-[28px]'>
        {data && data?.items?.length > 0 && data?.items.filter((item, index) => index <= 4)?.map(item => (
          <div 
          onClick={() => {
            navigate(item?.link?.split('.')[0])
          }}
          key={item.encodeId} 
          className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'>
            <img src={item.thumbnailM} className='w-full h-auto rounded-lg'/>
            <span className='flex flex-col'>
              <span className='font-semibold'>{`${item.title.slice(0,15)}...`}</span>
              <span>{data?.sectionId === 'h100' ? <span>{item.artistsNames}</span> : 
                <span>
                  {item.sortDescription.length >= 40 ? `${item.sortDescription.slice(0,35)}...` : item.sortDescription}
                </span>}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section