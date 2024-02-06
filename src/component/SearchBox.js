import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

const SearchBox = ({ cities, cityChanger }) => {
    const SearchBox = styled.div`
        input {
            border: none;
            outline: none;
        }
        button {
            border: none;
            outline: none;
            background: none;
        }
        border: 1px solid #dedede;
        border-radius: 4px;
        padding: 10px;
    `;
    const inputRef = useRef(null);

    useEffect(() => {
        // 컴포넌트가 마운트된 후에 실행될 로직
        inputRef.current.focus();
    }, []);
    return (
        <SearchBox>
            <form>
                <input ref={inputRef} type="text" />
                <button onClick={() => cityChanger(inputRef.current.value)}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        </SearchBox>
    );
};
export default SearchBox;
