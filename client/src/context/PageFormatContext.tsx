// contexts/PageFormatContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export type PageFormat = "landscape" | "portrait";

type PageFormatContextType = {
  format: PageFormat;
  setFormat: (format: PageFormat) => void;
};

// Create the context with a default value of undefined
const PageFormatContext = createContext<PageFormatContextType | undefined>(
  undefined
);

export const PageFormatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [format, setFormat] = useState<PageFormat>("landscape");

  return (
    <PageFormatContext.Provider value={{ format, setFormat }}>
      {children}
    </PageFormatContext.Provider>
  );
};

export const usePageFormatContext = () => {
  const context = useContext(PageFormatContext);
  if (!context) {
    throw new Error(
      "usePageFormatContext must be used within a PageFormatProvider"
    );
  }
  return context;
};
