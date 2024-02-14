import React from 'react';
import { Menu, Flex, MenuButton, MenuItem, MenuList, Icon, MenuDivider, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { User } from "@firebase/auth";
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { auth } from '@/firebase/clientApp';
import { signOut } from 'firebase/auth';
import { authModalState } from '@/atoms/authModalAtom';
import { useRecoilState } from "recoil";
import { useAuthState } from 'react-firebase-hooks/auth';

const UserMenu: React.FC = () => {
    const [authModal, setModalState] = useRecoilState(authModalState);
    const [user] = useAuthState(auth);
    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding="0px 6px"
                borderRadius={4}
                _hover={{outline: "1px solid", outlineColor: "gray.200"}}
            >
                <Flex align="center">
                    <Flex align="center">
                        {user ? (
                            <>
                                <Icon
                                    fontSize={24}
                                    mr={1}
                                    color='gray.300'
                                    as={FaRedditSquare}
                                />
                            </>  
                        ) : (
                            <Icon
                                fontSize ={24}
                                color="gray.400"
                                mr={1}
                                as={VscAccount}
                            />
                        )}
                    </Flex>
                    <ChevronDownIcon/>
                </Flex>                        
            </MenuButton>
            <MenuList>
                <MenuItem
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{ bg: "blue.500", color: "white"}}
                >
                   <Flex align="center">
                        <Icon fontSize="20" mr={2} as={CgProfile}/>
                        Profile
                   </Flex>
                </MenuItem>
                <MenuDivider/>
                <MenuItem
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{ bg: "blue.500", color: "white"}}
                    onClick={() => signOut(auth)}
                >
                    <Flex align="center">
                        <Icon  mr={2} fontSize ="10pt" as={MdOutlineLogin}/>
                        Log Out
                    </Flex>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
export default UserMenu;
