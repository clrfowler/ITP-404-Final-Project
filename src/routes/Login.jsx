import {
    Flex,
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { ChakraProvider } from '@chakra-ui/react'
  import { Link } from 'react-router-dom'
  import { useLoaderData } from "react-router-dom"
  import LoginForm from '../LoginForm'
  import { useEffect } from 'react'
  
  
  export default function Login() {
    const users = useLoaderData();
    console.log(users);
  
    useEffect(() => {
      document.title = "Login Page";  
    }, []);

    return (
        <ChakraProvider>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            >
            <LoginForm userData = {users}/>
        
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account? <Link to="/create" style={{ color: 'green'}}>Sign up</Link>
                </Text>
              </Stack>
          </Box>
        </Stack>
      </Flex>
      </ChakraProvider>
    )
  }
