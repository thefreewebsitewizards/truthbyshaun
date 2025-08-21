declare module 'react-icons/fi' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface IconBaseProps extends SVGProps<SVGSVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
  }
  
  export type IconType = ComponentType<IconBaseProps>;
  
  export const FiCheck: IconType;
  export const FiHome: IconType;
  export const FiShoppingCart: IconType;
  export const FiClock: IconType;
  export const FiMail: IconType;
  export const FiPhone: IconType;
  export const FiHelpCircle: IconType;
  export const FiLoader: IconType;
  export const FiSearch: IconType;
  export const FiLogOut: IconType;
  export const FiPlus: IconType;
  export const FiSave: IconType;
  export const FiStar: IconType;
  export const FiInfo: IconType;
  export const FiUser: IconType;
  export const FiLock: IconType;
  export const FiEyeOff: IconType;
  export const FiEye: IconType;
  export const FiDollarSign: IconType;
  export const FiUsers: IconType;
  export const FiSettings: IconType;
  export const FiMenu: IconType;
  export const FiTrash2: IconType;
  export const FiX: IconType;
  export const FiEdit2: IconType;
}