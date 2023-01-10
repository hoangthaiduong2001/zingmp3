import icons from "./icons"


const { MdOutlineLibraryMusic, GrEmptyCircle, GiChart, MdOutlineFeed } = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icons: <MdOutlineLibraryMusic size={24}/>    
    },
    {
        path: '',
        text: 'Khám phá',
        icons: <GrEmptyCircle size={24}/>    
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icons: <GiChart size={24}/>    
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icons: <MdOutlineFeed size={24}/>    
    }
]