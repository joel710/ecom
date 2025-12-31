import { createContext, useContext, useState } from 'react';
import ProductDetailModal from '../components/ProductDetailModal';

const ProductModalContext = createContext();

export function ProductModalProvider({ children }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => setSelectedProduct(product);
    const closeModal = () => setSelectedProduct(null);

    return (
        <ProductModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {selectedProduct && (
                <ProductDetailModal product={selectedProduct} onClose={closeModal} />
            )}
        </ProductModalContext.Provider>
    );
}

export const useProductModal = () => useContext(ProductModalContext);
