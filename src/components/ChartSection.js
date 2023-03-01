import React, {memo, useState, useEffect} from 'react'
import bgChart from '../assets/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js'
import { useSelector } from 'react-redux'


const ChartSection = () => {
  const [data, setData] = useState(null)
  const { chart, rank} = useSelector(state => state.app)
  const options = {
    reponsive: true,
    pointRadius: 0,
    aspectRatio: 5,
    scale: {
        y: {
            ticks: { display: false},
            grid: { borderDash: [4, 4], color: 'rgba(255,255,255,0.5)'}
        },
        x : {
            ticks: { color: 'white'},
            grid: { color: 'transparent'}
        }
    },
    plugins: {
        legend: false
    }
  }

  useEffect(() => {
    const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => item.hour)
    const dataset = []
    if(chart?.items){
        for(let i = 0; i < 3; i++){
            dataset.push({
                data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                borderColor: i === 0 ? 'blue' : i === 1 ? 'yellow' : 'red',
                tension: 0.2,
                borderWidth: 2
            })
        }
    }
    setData({labels, dataset})      
  }, [chart]) 
  return (
    <div className='px-[59px] mt-12 relative'>
        <img src={bgChart} className='w-full object-cover rounded-md'/>
        <div className='absolute z-10 left-[59px] right-[59px] top-0 bottom-0 bg-[rgba(77,34,104,0.9)]'></div>
        <div className='absolute z-20 left-[59px] right-[59px] top-0 bottom-0 p-5'>
            <h3 className='text-2xl text-white font-bold'>#zingchart</h3>
            <div className='flex gap-4 h-full'>
                <div className='flex-4 border border-white'>rank</div>
                <div className='flex-6 h-full'>
                    {data && <Line data={data} />} 
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(ChartSection)