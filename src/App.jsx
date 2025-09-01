import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    // Router membungkus seluruh aplikasi Anda
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* Tambahkan rute lainnya di sini */}
      </Routes>
    </Router>
  );
}

export default App;