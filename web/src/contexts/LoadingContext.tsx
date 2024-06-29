import { createContext, useState } from "react";

import { Dispatch, SetStateAction } from "react";

export const LoadingContext = createContext<{
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>({
  loading: false,
  setLoading: () => {},
});

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
