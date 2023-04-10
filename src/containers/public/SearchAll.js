import React from 'react'
import { useSelector } from 'react-redux'
import { handlerNumber } from '../../ultis/function'

const SearchAll = () => {
  const {searchData} = useSelector(state => state.music)
  console.log(searchData)
  return (
    <div className='fle flex-col w-full px-[60px]'>
      <div>
        <h3 className='text-lg font-bold mb-5'>Nổi bật</h3>
        <div className='flex gap-8'>
          {searchData?.top && <div className='p-[10px] flex-1 bg-main-200 rounded-md flex gap-8 items-center'>
            <img src={searchData?.top.thumbnail} className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType === 'artist' && 'rounded-full'}`}/>
            <div className='flex flex-col text-xs'>
              <span className='mb-[6px]'>{searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
              <span className='tex-sm font-semibold'>{searchData.top.title || searchData.top.name}</span>
              {searchData.top.objectType === 'artist' && <span>{handlerNumber(searchData?.artists[0]?.totalFollow) + ' quan tâm'}</span>}
            </div>
          </div>}
          <div className='flex-1'>Song 1</div>
          <div className='flex-1'>Song 2</div>
        </div>
      </div>
    </div>
  )
}

export default SearchAll