import axios from 'axios';
import { array, func } from 'prop-types';

const ProductList = ({ products, onEditProduct, onProductDeleted }) => {
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            onProductDeleted();
        } catch (error) {
            console.error('Error deleting product: ', error);
        }
    };

    return (
        <div className='product-list'>
            <h3>Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} (ID: {product.id}) (Price: {product.price})
                        <button onClick={() => onEditProduct(product)}>Edit</button> {/*Method to set the selected product*/}
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProductList.propTypes = {
    products: array,
    onEditProduct: func,
    onProductDeleted: func
};

export default ProductList;