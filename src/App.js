import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Snackbar from './components/Snackbar';
import { useState } from 'react';
import NotFound from './components/NotFound';

function App() {

  const [popups, setPopups] = useState([])

  const showPopup = (text, icon, color) => {
    //adds new popup to the list
    setPopups((old) => [
      {
        "text": text,
        "icon": icon,
        "color": color,
        "time": Date.now()
      },
      ...(old.filter((p) => Date.now() - p.time < 5000))] //remove 5sec old popups
    )
  }

  return (
    <>
      <Navbar/>

      <div id="pageContent">
          <Routes>

            <Route exact path="/home" element={ <Dashboard showPopup={showPopup}/> }/>
            <Route exact path="/" element={ <Navigate to="/home" /> }/>

            <Route exact path="/signin" element={ <SignIn showPopup={showPopup} /> }/>
            <Route exact path="/signup" element={ <SignUp showPopup={showPopup} /> }/>

            <Route exact path="*" element={ <NotFound/> }/>
            
          </Routes>
      </div>

      <span id="footer">Made for Kshitij, IIT-KGP by Kaustubh R</span>

      {popups.map((p) => {
        return (<Snackbar popup={p} key={p.time}/>)
      })}

    </>

  );
}

export default App;
