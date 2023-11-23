// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    coinContBg: string;
    txtColor: string;
    themeBtn: string;
    btnMove: boolean;
    txtTransitionStart: string;
    txtTransitionEnd: string;
  }
}
