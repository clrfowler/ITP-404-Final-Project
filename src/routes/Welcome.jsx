import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,

  } from '@chakra-ui/react'
  import { ChakraProvider } from '@chakra-ui/react'
  import { Link } from 'react-router-dom'
  import { useEffect } from 'react'
  
  export default function Welcome() {
    useEffect(() => {
      document.title = "Welcome Page";  
    }, []);
    return (
        <ChakraProvider>
      <>
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Welcome to <br />
              <Text as={'span'} color={'green.400'}>
                EventsNow
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Your go-to application for finding upcoming events across the nation.
            </Text>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}>
            <Link to="/login">
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}>
                Log In
              </Button>
              </Link>
              <Link to="/create">
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}>
                Create an Account
              </Button>
              </Link>
            
            </Stack>
          </Stack>
        </Container>
      </>
      </ChakraProvider>
    )
  }
  

