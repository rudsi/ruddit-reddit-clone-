import React from 'react';
import { Button, Image,Flex } from '@chakra-ui/react';



const OAuthButtons:React.FC = () => {
    
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth">
                <Image src="/images/googlelogo.png" height="20px" mr={4}/>
                continue with Google
            </Button>
        </Flex>
    );
};
export default OAuthButtons;