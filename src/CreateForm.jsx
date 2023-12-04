import { useState } from "react";
import { Stack } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveUser } from "./api";


export default function CreateForm(userData) {
    console.log(userData);
    console.log(userData.users);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);   

    const handleUsernameChange = event => {
        setUsername(event.target.value);
        setIsUsernameTaken(false); 
      };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
      };

    const handleSubmit = event => {
        event.preventDefault();

        if (!username || !password) {
            setIsUsernameEmpty(!username);
            setIsPasswordEmpty(!password);
            return; 
          }

    const existingUser = userData.userData.filter(user => user.username === username);

    if (existingUser.length > 0) {
        setIsUsernameTaken(true);
      } else {
        const newUser = {
          id: userData.userData[userData.userData.length+1], 
          username: username,
          password: password,
        };

        saveUser(newUser);

    userData.userData.push(newUser);
    console.log('Added user to the mock database:', newUser);

    setUsername('');
    setPassword('');
    setIsUsernameTaken(false);
    setIsPasswordEmpty(false);
    setIsUsernameEmpty(false);

    toast.success('Account created successfully!');
      }
    };

    return (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
      
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter your username"
              />
              {isUsernameEmpty && (
                <Text color="red">Please enter a username</Text>
                )}
         
         
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
                {isPasswordEmpty && (
                    <Text color="red">Please enter a password</Text>
                    )}
      
            <Button type="submit" colorScheme="green">
              Create an Account
            </Button>
            {isUsernameTaken && (
              <Text color="red">Username '{username}' is already taken.</Text>
            )}
            <ToastContainer />
          </Stack>
        </form>
      );
}