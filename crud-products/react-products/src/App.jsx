import { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import axios from 'axios';
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]); //our info. Our get request will change
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try { 
      const response = await axios.get('http://127.0.0.1:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleProductUpdated = () => {
    fetchProducts();
    setSelectedProduct(null);
  };

  const handleProductDeleted = () => {
    fetchProducts();
  };


  return (
    <div className='app-container'>
      <h1>Product Management</h1>
      <ProductForm
          selectedProduct={ selectedProduct }
          onProductUpdated = {handleProductUpdated}/>
      <ProductList
        products={products} // => product array
        onEditProduct={handleEditProduct} // method to set the selected product
        onProductDeleted={handleProductDeleted} // method to fetch products aftera delete is ran
        />
    </div>
  );
};

export default App;
