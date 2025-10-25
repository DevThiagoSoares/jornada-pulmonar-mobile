/* eslint-disable prettier/prettier */
// @ts-ignore
/// <reference types="nativewind/types" />

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_URL: string;
    EXPO_PUBLIC_AUDIO_BASE_URL?: string;
  }
}

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
declare module '*.mp3' {
  const content: any;
  export default content;
}
declare module '*.jpeg' {
  const content: any;
  export default content;
}
