import { useEffect, useState } from 'react';
import axios from 'axios';
import { func, number } from 'prop-types';
import PropTypes from 'prop-types';

const ProductForm = ({ selectedProduct, onProductUpdated }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setPrice(selectedProduct.price);
        }
    }, [selectedProduct]);

    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = "Product name is required";
        if (!price || price <= 0) errors.price = "Price must be a positive number";
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const productData = { name, price };
            setSubmitting(true);
            setError(null);
            try {
                if (selectedProduct) {
                    await axios.put(`http://127.0.0.1:5000/products/${selectedProduct.id}`, productData);
                } else {
                    await axios.post('http://127.0.0.1:5000/products', productData);
                }
                await new Promise((resolve, reject) => setTimeout(resolve, 5000))
                onProductUpdated();
                setName('');
                setPrice('');
                setSubmitting(false);
            } catch (error) {
                setError(error.toString());
                setSubmitting(false);
            }
        } else {
            setErrors(errors);
        }
    };

    if (isSubmitting) return <p>Submitting product data.......</p>;
    if (error) return <p>Error submitting data: {error}</p>

    return (
        <form onSubmit={handleSubmit}>
            <h3>{selectedProduct ? 'Edit' : 'Add'}</h3>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            </label>
            <br />
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
            </label>
            <br />
            <button type='submit'>Submit</button>
        </form>
    );
};

ProductForm.propTypes = {
    selectedProduct: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    onProductUpdated: PropTypes.func.isRequired
};

export default ProductForm;