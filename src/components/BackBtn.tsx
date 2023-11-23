import {useNavigate} from "react-router-dom";
import styled from "styled-components";
interface IDest {
  dest: string;
}
const GobackBtn = styled.button`
  position: absolute;
  top: 40px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  font-weight: 800;
  font-size: 17px;
  background-color: #4e56d1;
  color: ${(props) => props.theme.txtColor};
`;
export default function BackBtn({dest}: IDest) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(dest);
  };
  return <GobackBtn onClick={goBack}>&lt;</GobackBtn>;
}
