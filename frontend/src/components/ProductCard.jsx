import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/product.css";


const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl
        }));
    };

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <span className="product-category">{product.category}</span>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta">
                    <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                    <div className="product-rating">
                        <span className="star">★</span> {product.rating} ({product.numReviews})
                    </div>
                </div>
                <div className="product-actions">
                    <Link to={`/product/${product._id}`} className="view-details-button">
                        View Details
                    </Link>
                    <button className="add-cart-button" onClick={handleAddToCart} title="Add to Cart">
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
    );
};

export default ProductCard;