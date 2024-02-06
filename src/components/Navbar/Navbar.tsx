import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import RightSide from './RightSide/RightSide';

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/logo.svg" alt="Logo" height="30px"/>
        <Image src="/images/redditText.svg" alt="Reddit Text" height="46px" display={{ base: "none", md: "unset"}}/>
      </Flex>
      <SearchInput/>
      <RightSide/>
    </Flex>
  );
};

export default Navbar;
