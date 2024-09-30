import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productSlice';

const ProductList = ({ onEditProduct }) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Products</h2>
            {/* <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            /> */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.product_name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>{product.discount ? `${product.discount}%` : 'N/A'}</td>
                            <td>
                                <button onClick={() => onEditProduct(product.id)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;