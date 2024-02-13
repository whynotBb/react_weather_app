import { useNavigate } from "react-router-dom";

const Aboutpage = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    };
    return (
        <div>
            <h1>Aboutpage</h1>
            <button onClick={goToHome}>Go Home</button>
        </div>
    );
};
export default Aboutpage;
