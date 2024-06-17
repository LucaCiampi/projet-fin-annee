declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
