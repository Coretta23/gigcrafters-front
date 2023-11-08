import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const StyledLoader = styled.div`
    padding: 10px;
    border: 6px solid white;
    border-bottom-color: transparent;
    border-radius: 22px;
    height: 0;
    width: 0;
    animation: ${rotate} 1s infinite linear;
`

function Loader() {
    return (
        <StyledLoader />
    )
}

export default Loader;