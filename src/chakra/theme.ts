import { extendTheme } from '@chakra-ui/react';
import { Button } from './button';
const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3C00",
      50: "#ffffff",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global:{
      body: {
        bg: "gray.200",
      },
    },
  },
  components: {
    Button,
  },
});

export default theme;
