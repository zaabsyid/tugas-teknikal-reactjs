import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const products = useSelector(state => state.products.items);

    const handleEditProduct = (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        setEditingProduct(productToEdit);
        setShowForm(true);
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    return (
        <div>
            <h1>Tugas Teknikal React JS</h1>
            <button onClick={() => {
                setEditingProduct(null);
                setShowForm(!showForm);
            }}>
                {showForm ? 'Hide Form' : 'Add New Product'}
            </button>
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleFormSubmit}
                />
            )}
            <ProductList onEditProduct={handleEditProduct} />
        </div>
    );
};

export default HomePage;