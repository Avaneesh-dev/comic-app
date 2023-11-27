import './App.css';
import MainComponent from './Component/MainComponent';
import NavbarComponent from './Component/NavBar';
import Footer from './Component/Footer';
function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <MainComponent />
      <Footer />
    </div>
  );
}

export default App;
