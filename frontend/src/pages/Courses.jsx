import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

const Courses = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    }));
  };

  return (
    <div className="shop-container">
      <h2>All Courses</h2>
      <input 
        type="text" 
        placeholder="Search courses..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="courses-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="course-card">
              <div className="course-card-image-wrapper">
                <img src={product.imageUrl} alt={product.name} className="course-card-image" />
                <span className="course-card-category">{product.category}</span>
              </div>
              <div className="course-card-info">
                <h3 className="course-card-name">{product.name}</h3>
                <p className="course-card-description">{product.description}</p>
                <div className="course-card-meta">
                  <p className="course-card-price">₹{product.price.toLocaleString('en-IN')}</p>
                  <div className="course-card-rating">
                    <span>★</span> {product.rating} ({product.numReviews})
                  </div>
                </div>
                <div className="course-card-actions">
                  <Link to={`/product/${product._id}`} className="course-card-button">
                    View Details
                  </Link>
                  <button className="add-cart-button" onClick={() => handleAddToCart(product)} title="Add to Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span className="cart-plus">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
