import React, {useState} from 'react';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { ModalView } from "../../../atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';

  
const Login:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loginForm, setLoginForm] = useState({
        email:"",
        password: "",
        confirmPassword: "",
    });

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
         
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };
    
    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name='email'
                placeholder='email'
                type='email'
                mb={2} 
                onChange = {onChange}
                fontSize="10pt"
                _placeholder={{color: "gray.500"}}
                _hover={{
                    bg: 'white',
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                bg="gray.50"
            />
            <Input
                required
                name='password'
                placeholder='password'
                type='password'
                onChange = {onChange}
                mb={2}
                fontSize="10pt"
                _placeholder={{color: "gray.500"}}
                _hover={{
                    bg: 'white',
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                bg="gray.50"
            />
            
            <Text textAlign="center" color="red" fontSize="10pt">
                {error && error.message && FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button
                width ="100%"
                height="36px"
                mt={2}
                mb={2}
                type="submit"
                isLoading={loading}
            >
                Log In
            </Button>
            <Flex justifyContent="center" mb={2}>
                <Text fontSize="9pt" mr={1}>
                    Forgot your password?
                </Text>
                <Text
                    fontSize="9pt"
                    color="blue.500"
                    cursor="pointer"
                    onClick={() => 
                        setAuthModalState((prev) => ({
                            ...prev,
                            view:"resetPassword",
                    }))
                    }
                >
                Reset
                </Text>
            </Flex>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>New here?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => setAuthModalState(prev =>({
                        ...prev,
                        view:'signup',
                    }))
                    }
                    >
                SIGN UP
                </Text>
            </Flex>
        </form>
    );
};

export default Login;