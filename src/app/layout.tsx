"use client";
import { ChakraProvider } from '@chakra-ui/react';
import Layout from "@/components/Layout/Layout";
import AuthModal from '@/components/Modal/Auth/AuthModal';
import theme from "@/chakra/theme";
import { RecoilRoot } from 'recoil';

export default  function RootLayout({ children }: { children: React.ReactNode }) {
   
  return (
    <html lang="en">
     <body suppressHydrationWarning={true}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Layout>
              <div>{children}</div>
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
     </body>
    </html>
  );
}
