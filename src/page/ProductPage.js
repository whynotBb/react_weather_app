import { useSearchParams } from "react-router-dom";

const ProductPage = () => {
    let [query, setQuery] = useSearchParams(); //url 의 쿼리값을 가져오는 방법
    console.log("query", query.get("q"));
    return (
        <div>
            <h1>Show All Products! {query.get("q")}</h1>
        </div>
    );
};
export default ProductPage;
