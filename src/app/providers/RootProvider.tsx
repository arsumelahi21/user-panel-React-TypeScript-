
import { DefaultTheme } from "@/shared/config/theme";
import { ApolloClientProvider } from "./apollo";
import { ConfigProvider, Switch, theme } from "antd";
import React, { useState } from "react";

export const RootProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ConfigProvider
      theme={{
        ...DefaultTheme,
       algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
    <ApolloClientProvider>
        {children}
      </ApolloClientProvider>
    </ConfigProvider>
  );
};

