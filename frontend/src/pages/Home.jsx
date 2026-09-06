// import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setProducts(data.slice(0, 6)); // Featured products
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
            <div className="home-container">
                <div className="hero-banner">
                    <h1>Welcome to Musicos</h1>
                    <p>Your one-stop shop for musical and instrumental courses.</p>
                </div>
                <h2>Featured Courses</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
            
    );
};


export default Home;