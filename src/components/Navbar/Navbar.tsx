import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import RightSide from './RightSide/RightSide';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Directory from "../Navbar/Directory/Directory";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{md: "space-between" }}
    >
      <Flex align="center" width={{base: "40px", md:"auto"}} mr={{base:0, md:"2"}}>
        <Image src="/images/logo.svg" alt="Logo" height="30px"/>
        <Image src="/images/redditText.svg" alt="Reddit Text" height="46px" display={{ base: "none", md: "unset"}}/>
      </Flex>
      {user && <Directory />}
      <SearchInput user={user}/>
      <RightSide user={user}/>
    </Flex>
  );
};

export default Navbar;
