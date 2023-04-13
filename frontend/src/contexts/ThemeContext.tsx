import React from "react";

export type ThemeContextType = {
  primary: (opacity?: number) => string;
  secondary: (opacity?: number) => string;
  tertiary: (opacity?: number) => string;
  quaternary: (opacity?: number) => string;
  quinary: (opacity?: number) => string;
  senary: (opacity?: number) => string;
  septenary: (opacity?: number) => string;
  octonary: (opacity?: number) => string;
  nonary: (opacity?: number) => string;
};

type Props = {
  children?: React.ReactNode;
};

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: Props) {
  //www.color-hex.com/color-palette/53188
  const primary = (opacity: number = 1): string => {
    return opacity === 1 ? "rgb(29,185,84)" : `rgb(29,185,84, ${opacity})`;
  };
  const secondary = (opacity: number = 1): string => {
    return opacity === 1 ? "rgb(33,33,33)" : `rgb(33,33,33, ${opacity})`;
  };
  const tertiary = (opacity: number = 1): string => {
    return opacity === 1 ? "rgb(18,18,18)" : `rgb(18,18,18, ${opacity})`;
  };
  const quaternary = (opacity: number = 1): string => {
    return opacity === 1 ? "rgb(83,83,83)" : `rgb(83,83,83, ${opacity})`;
  };
  const quinary = (opacity: number = 1): string => {
    return opacity === 1 ? "rgb(179,179,179)" : `rgb(179,179,179, ${opacity})`;
  };
  const senary = (opacity: number = 1): string => {
    return opacity === 1
      ? "rgb(255, 255, 255)"
      : `rgb(255, 255, 255, ${opacity})`;
  };
  const septenary = (opacity: number = 1): string => {
    return opacity === 1 ? "rgb(0,0,0)" : `rgb(0,0,0, ${opacity})`;
  };

  const octonary = (opacity: number = 1): string => {
    return opacity === 1 ? "rgb(25,25,25)" : `rgb(25,25,25, ${opacity})`;
  };

  const nonary = (opacity: number = 1): string => {
    return opacity === 1 ? "rgb(8,8,8)" : `rgb(8,8,8, ${opacity})`;
  };

  const value: ThemeContextType = {
    primary,
    secondary,
    tertiary,
    quaternary,
    quinary,
    senary,
    septenary,
    octonary,
    nonary,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
