import React, { useState } from 'react';

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Box,
    Divider,
    Text,
    Input,
    Checkbox,
    Stack,
    Flex,
    Icon,
} from "@chakra-ui/react"

import { BsFillEyeFill,BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({open, handleClose}) => {
    const[communityName, setCommunityName] = useState("");
    const[charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const[error, setError] = useState("");
    const[user] = useAuthState(auth);
    const[loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);

    }

    const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name);
    }

    const handleCreateCommunity = async () => {
      const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (format.test(communityName) || communityName.length <3){
        setError(
          "Communities names must must be between 3-21 characters, and can only contain letter, numbers, or underscores"
        );
        return;
      }

      setLoading(true);
      
      try {
        const communityDocRef = doc(firestore, "communities", communityName);

        await runTransaction(firestore, async (transaction) => {
          const communityDoc = await transaction.get(communityDocRef);
          if(communityDoc.exists()){
            throw new Error(`Sorry, r/${communityName} is already taken. Try another.`);
          }

          transaction.set(communityDocRef, {
            creatorId: user?.uid,
            createdAt: serverTimestamp(),
            numberOfMembers: 1,
            privacyType: communityType,
          });

          transaction.set(doc(firestore,`users/${user?.uid}/communitySnippet`, communityName),{
            communityId: communityName,
            IsModerator: true,
          });
        });
        
        
      } catch (error: any) {
        console.log("handleCreateCommunity error", error);
        setError(error.message);
      }
      setLoading(false);  
    };
    
    return (
        <>
          <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
                display="flex"
                flexDirection="column"
                fontSize={15}
                padding={3}
              >
                Create a community
              </ModalHeader>
              <Box pl={3} pr={3}>
                <Divider/>
                <ModalCloseButton />
                <ModalBody
                  display="flex"
                  flexDirection="column"
                  padding="10px 0px"
                >
                  <Text fontWeight={600} fontSize={15}>
                    Name
                  </Text>
                  <Text fontSize={11} color="gray.500">
                    Community names including capitalization cannot be changed
                  </Text>
                  <Text
                    position="relative"
                    color="gray.500"
                    top="28px"
                    left="10px"
                    width="20px"
                  >r/
                  </Text>
                  <Input
                    position="relative"
                    value={communityName}
                    size="sm"
                    pl="22px"
                    onChange={handleChange}
                  />
                  <Text
                    fontSize="9pt"
                    color={charsRemaining === 0 ? "red" : "gray.500"}>
                    {charsRemaining} Characters remaining
                  </Text>
                  <Text fontSize="9pt" color="red" pt={1}>
                    {error}
                  </Text>
                  <Box mt={4} mb={4}>
                    <Text fontWeight={600} fontSize={15}>
                        Community Type
                    </Text>
                    <Stack spacing={2}>
                        <Checkbox
                          name="public"
                          isChecked={communityType === "public"}
                          onChange={onCommunityTypeChange}
                        > 
                          <Flex align="center">
                            <Icon as={BsFillPersonFill} color="gray.500" mr={2}/>
                            <Text fontSize="10pt" mr={1}>
                              Public
                            </Text>
                            <Text fontSize="8pt" color="gray.500" pt={1} >Anyone can view, post, and comment to this community</Text>
                          </Flex>
                          
                        </Checkbox>
                        <Checkbox
                          name="restricted"
                          isChecked={communityType === "restricted"}
                          onChange={onCommunityTypeChange}
                        >
                        <Flex align="center">
                        <Icon as={BsFillEyeFill} color="gray.500" mr={2}/>
                            <Text fontSize="10pt" mr={1}>
                              restricted
                            </Text>
                            <Text fontSize="8pt" color="gray.500" pt={1} >Anyone can view this community, but only approved users can post</Text>
                        </Flex>
                        </Checkbox>
                        <Checkbox
                          name="private"
                          isChecked={communityType === "private"}
                          onChange={onCommunityTypeChange}
                        >
                        <Flex align="center">
                        <Icon as={HiLockClosed} color="gray.500" mr={2}/>
                            <Text fontSize="10pt" mr={1}>
                              Private
                            </Text>
                            <Text fontSize="8pt" color="gray.500" pt={1} >Only approved users can view and submit to this community</Text>
                        </Flex>
                        </Checkbox>
                    </Stack>
                  </Box>
                </ModalBody>
              </Box>
              
    
              <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
                <Button variant='outline' height="30px" mr={3} onClick={handleClose}>
                  Cancel
                </Button>
                <Button height="30px" onClick={handleCreateCommunity} isLoading={loading}>Create community</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
}
export default CreateCommunityModal;