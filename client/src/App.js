
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter ,Routes, Route , Link } from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
      <Route path="/home" exact Component={Homescreen} />
    
      </Routes>
      <Routes>
      <Route path="/book/:roomid/:fromdate/:todate" exact Component={Bookingscreen}/>
      </Routes>
      <Routes>
        <Route path='/register' exact Component={Registerscreen} />
      </Routes>
      <Routes>
        <Route path="/login" exact Component={Loginscreen} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
