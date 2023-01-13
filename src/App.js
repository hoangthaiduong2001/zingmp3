import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Public } from './containers/public';
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
