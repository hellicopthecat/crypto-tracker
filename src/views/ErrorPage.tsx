import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import styled from "styled-components";

const WaringCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
`;
const WaringText = styled.h2`
  color: ${(props) => props.theme.txtColor};
  font-size: 80px;
  &:nth-child(2) {
    font-size: 30px;
  }
`;
export default function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>Wrong Access | Crypto Tracker</title>
        <meta name="description" content="Home | Crypto Tracker" />
      </Helmet>
      <WaringCont>
        <WaringText>Wrong access</WaringText>
        <WaringText>
          <Link to="/">Click And Go To Home</Link>
        </WaringText>
      </WaringCont>
    </>
  );
}
