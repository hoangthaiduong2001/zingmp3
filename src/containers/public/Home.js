import React from 'react'
import { Section, Slider, NewRelease } from '../../components'
import { useSelector } from 'react-redux'

const Home = () => {
  const { autoTheme, autoTheme2, top100, album } = useSelector(state => state.app)
  return (
    <div className='overflow-y-auto'>
      <Slider />
      <Section data={autoTheme} />
      <Section data={autoTheme2} />
      <NewRelease />
      <Section data={top100} />
      <Section data={album} />
      <div className='w-full h-[300px]'></div>
    </div>
  )
}

export default Home
