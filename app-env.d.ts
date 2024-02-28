/* eslint-disable prettier/prettier */
// @ts-ignore
/// <reference types="nativewind/types" />
declare module '*.svg' {
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}
declare module '*.png' {
    const content: any;
    export default content;
}
declare module '*.ttf' {
    const content: any;
    export default content;
}