import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="results" element={<SearchResults />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
