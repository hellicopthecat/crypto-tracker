import {Link} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import styled from "styled-components";
import {darkModeAtom} from "../store/atoms";
const HeaderCont = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const HeadTitle = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.txtColor};
`;
const ThemeBtnCont = styled.div`
  position: absolute;
  right: 50px;
  width: 40px;
  height: 20px;
  border-radius: 25px;
  display: flex;
  background-color: #2a2a53;
`;
const ThemeBtn = styled.button`
  border: 1px solid #2f3542;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.themeBtn};
  transition: 0.4s ease-in-out;
  transform: ${(props) =>
    props.theme.btnMove ? `translateX(0)` : `translateX(20px)`};
`;

export default function Header() {
  const setTheme = useSetRecoilState(darkModeAtom);
  const toggleTheme = () => setTheme((prev) => !prev);
  return (
    <HeaderCont>
      <Link to="/">
        <HeadTitle>CRYPTO TRACKER</HeadTitle>
      </Link>
      <ThemeBtnCont onClick={toggleTheme}>
        <ThemeBtn></ThemeBtn>
      </ThemeBtnCont>
    </HeaderCont>
  );
}
