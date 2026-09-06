import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer style = {{
            background: "#000000",
            borderTop: "1px solid rgba(16, 185, 129, 0.2)",
            padding: "30px 20px",
            marginTop: "auto",
        }}>
            <div style = {{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
            }}>
                <div>
                    <h3 style = {{color: "#ffffff", marginBottom: "10px"}}>Musicos</h3>
                     <p style = {{color: "#a1a1aa", fontSize: "0.9rem"}}>&copy; 2024 Musicos. All rights reserved.</p>
                </div>

                <div style = {{display: "flex", gap: "15px"}}>
                    <Link to="/about" style = {{color: "#a1a1aa", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.3s"}}>About Me</Link>
                    <Link to="/returns" style = {{color: "#a1a1aa", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.3s"}}>Return Policy</Link>
                    <Link to="/disclaimer" style = {{color: "#a1a1aa", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.3s"}}>Disclaimer</Link>
                </div>

                <div style = {{color: "#a1a1aa", fontSize: "0.9rem"}}>
                    &copy; {new Date().getFullYear()} Musicos. All rights reserved.
                </div>
            </div>
        </footer>
    );
}


export default Footer;
