import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
html,body{
    box-sizing:border-box;
}
body{
    transition: 0.1s ease-in-out ;
    background-color:${(props) => props.theme.bgColor};
}
h1 ,h2{
    font-size:17px;
    margin:0;
}
a{
    text-decoration:none;
    color:inherit;
    
}
ul{
    padding:0
}
li{
    list-style: none;
}
button{
    border:none;
    background-color:inherit;
}
p{
    margin:0
}
`;
