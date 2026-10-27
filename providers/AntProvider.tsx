"use client";

import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: "#0f0f0f",
    borderRadius: 2,
    fontFamily: "var(--font-roboto), Arial, Helvetica, sans-serif",
  },
};

export default function AntProviders({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
