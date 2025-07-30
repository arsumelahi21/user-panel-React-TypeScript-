
import { DefaultTheme } from "@/shared/config/theme";
import { ApolloClientProvider } from "./apollo";
import { ConfigProvider } from "antd";
import React from "react";

export const RootProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
 
  return (
    <ConfigProvider
      theme={{
        ...DefaultTheme
      }}
    >
    <ApolloClientProvider>
        {children}
      </ApolloClientProvider>
    </ConfigProvider>
  );
};

