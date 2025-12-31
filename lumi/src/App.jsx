import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductModalProvider } from './context/ProductModalContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ProductModalProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="results" element={<SearchResults />} />
            </Route>
          </Routes>
        </ProductModalProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
