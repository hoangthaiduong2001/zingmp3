import React from 'react'
import { Section, Slider, NewRelease } from '../../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const { autoTheme, autoTheme2, top100, album, weekChart, favoritedArtist } = useSelector(state => state.app)
  return (
    <div className='overflow-y-auto'>
      <Slider />
      <Section data={autoTheme} />
      <Section data={autoTheme2} />
      <NewRelease />
      <Section data={top100} />
      <Section data={album} />
      <Section data={favoritedArtist}/>
      <div className='flex w-full items-center px-[43px] mt-12'>
        {weekChart?.map(item => (
          <Link
            to={item?.link?.split('.')[0]}
            key={item.link}
            className='flex-1 px-4'
          >
            <img src={item.cover} className='w-full object-cover rounded-md'/>
          </Link>
        ))}
      </div>
      <div className='w-full h-[300px]'></div>
    </div>
  )
}

export default Home
