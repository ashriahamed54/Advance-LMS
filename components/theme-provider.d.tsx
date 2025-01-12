declare module '@/components/theme-provider' {
  import { ThemeProviderProps } from 'next-themes';
  export function ThemeProvider({ children, ...props }: ThemeProviderProps): JSX.Element;
} 