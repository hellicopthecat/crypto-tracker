import styled from "styled-components";
interface IBadgeProps {
  text: string;
  color: string;
}
interface IBadgeColor {
  $badgecolor: string;
}

const CoinBadge = styled.p<IBadgeColor>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.$badgecolor};
  color: ${(props) => props.theme.txtColor};
  border-radius: 25px;
  padding: 2px 7px;
  white-space: nowrap;
  margin: 0 5px;
  height: 20px;
  span {
    display: flex;
  }
`;
export default function Badge({text, color}: IBadgeProps) {
  return (
    <CoinBadge $badgecolor={color}>
      <span>{text}</span>
    </CoinBadge>
  );
}
