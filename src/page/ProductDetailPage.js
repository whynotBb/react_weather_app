import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
    const { id } = useParams();
    {
        /* <Route
                        path="/products/:id/:num"
                        element={<ProductDetailPage />}
                    /> */
    }
    {
        /* ㄴ> APP.js에서 라우팅 설정 : 
        컴포넌트에서는 usePrams를 통해 {id:'aa',num:'123'}으로 받아 이용할 수 있음  */
    }
    return (
        <div>
            <h1>ProductDetail-{id}</h1>
        </div>
    );
};
export default ProductDetailPage;
