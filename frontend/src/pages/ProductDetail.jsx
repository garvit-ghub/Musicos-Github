import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import '../styles/product.css';
import { Link } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);


    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                qty: 1,
                imageUrl: product.imageUrl
            }));
            alert(`${product.name} has been added to your cart.`);
        }
    };

 

    if (loading) return <p style={{ color: "#fafafa", padding: "40px", textAlign: "center" }}>Loading...</p>;
    if (!product) return <p style={{ color: "#fafafa", padding: "40px", textAlign: "center" }}>Product not found.</p>;

    return (
    <div className="product-detail-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ color: '#a1a1aa', marginBottom: '20px', fontSize: '0.95rem' }}>
        <Link to="/" style={{ color: '#10b981' }}>Home</Link> / <Link to="/shop" style={{ color: '#10b981' }}>Shop</Link> / {product.category} / <span style={{ color: '#fff' }}>{product.name}</span>
      </div>

      <div className="product-detail">
        {/* Left Side: Image */}
        <div className="detail-image-container">
          <img src={product.imageUrl} alt={product.name} className="detail-image" />
        </div>

        {/* Right Side: Information Block */}
        <div className="detail-info">
          
          <h2 style={{ fontSize: '2.8rem', marginBottom: '10px' }}>{product.name}</h2>

          <p className="detail-price" style={{ fontSize: '2.5rem', margin: '15px 0' }}>₹{product.price.toFixed(2)}</p>

          {/* Description */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Product Description</h4>
            <p style={{ color: '#a1a1aa', lineHeight: '1.8' }}>{product.description}</p>
          </div>

          {/* Cart & Stock Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={handleAddToCart} className="btn" style={{ flexGrow: '1', padding: '18px', fontSize: '1.2rem' }}>
              Add to Shopping Cart
            </button>
          </div>
          
          <p style={{ marginTop: '20px', color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: '600' }}>
            {product.stock > 0 ? `In Stock (${product.stock} units available)` : `Temporarily Out of Stock`}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
