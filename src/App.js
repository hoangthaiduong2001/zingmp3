import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Public, Album, WeekRank, ZingChart, Search, SearchSongs, SearchAll } from './containers/public';
import { Routes, Route } from 'react-router-dom';
import path from './ultis/path';
import { useEffect } from 'react';
import * as actions from './store/actions'



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHome())
  },[])


  return (
    <>
    <div className="">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />}/> 
          <Route path={path.ALBUM__TITLE_PID} element={<Album />}/> 
          <Route path={path.PLAYLIST__TITLE_PID} element={<Album />}/> 
          <Route path={path.WEEKRANK__TITLE_PID} element={<WeekRank />}/> 
          <Route path={path.ZING_CHART} element={<ZingChart />}/>
          <Route path={path.SEARCH} element={<Search />}>
            <Route path={path.ALL} element={<SearchAll />}/>
            <Route path={path.SONG} element={<SearchSongs />}/>
          </Route>
          {/* <Route path={path.STAR} element={<Home />}/>  */}
        </Route>
      </Routes>
    </div>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    {/* Same as */}
    <ToastContainer />
    </>
  );
}

export default App;
