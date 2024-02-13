import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();
    const goProductPage = () => {
        navigate("/products?q=pants");
    };
    return (
        <div>
            <h1>Homepage</h1>
            <Link to="/about">ABOUT</Link>
            <button onClick={goProductPage}>go to product page</button>
        </div>
    );
};
export default Homepage;
