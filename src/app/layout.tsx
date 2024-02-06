"use client";
import { ChakraProvider } from '@chakra-ui/react';
import Layout from "@/components/Layout/Layout";
import theme from "@/chakra/theme";
import AuthModal from '@/components/Modal/Auth/AuthModal';
import { RecoilRoot } from 'recoil';

export default  function RootLayout({ children }: { children: React.ReactNode }) {
   
  return (
    <html lang="en">
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Layout>
              <div>{children}</div>
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
      </html>
  );
}
