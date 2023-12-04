import { Flex, Spacer, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export default function Navigation(username){
    const user = username;
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="green.500"
      color="white"
    >
      <Heading as="h1" size="md">
        Welcome {user}!
      </Heading>
      <Spacer />
     <Flex align="center">
        <Button as={Link} to={`/home/${user}`} variant="ghost" colorScheme="whiteAlpha">
          Home
        </Button> 
        <Button as={Link} to={`/profile/${user}`} variant="ghost" colorScheme="whiteAlpha">
          My Profile
        </Button>
        <Button as={Link} to="/" variant="ghost" colorScheme="whiteAlpha">
          Log Out
        </Button>
        <Button as={Link} to="/admin" variant="ghost" colorScheme="whiteAlpha">
          Admin
        </Button>
      </Flex>
    </Flex>
  );
};


