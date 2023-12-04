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
  import CreateForm from '../CreateForm'
  import { useEffect } from 'react'
  
  
  export default function Create() {
    const users = useLoaderData();
    console.log(users);

    useEffect(() => {
      document.title = "Create an Account Page";  
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
              Create an Account
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            >
            <CreateForm userData = {users}/>
        
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link to="/login" style={{ color: 'green'}}>Login</Link>
                </Text>
              </Stack>
          </Box>
        </Stack>
      </Flex>
      </ChakraProvider>
    )
  }

