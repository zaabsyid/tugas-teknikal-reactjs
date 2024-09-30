import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../redux/productSlice';

const ProductForm = ({ product, onSubmit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        product_name: product ? product.product_name : '',
        category: product ? product.category : '',
        price: product ? product.price : '',
        discount: product ? product.discount : '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            dispatch(updateProduct({ id: product.id, product: formData }));
        } else {
            dispatch(addProduct(formData));
        }
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Discount:</label>
                <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">{product ? 'Update' : 'Add'} Product</button>
        </form>
    );
};

export default ProductForm;