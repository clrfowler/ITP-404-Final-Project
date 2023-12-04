import { useState } from "react";
import { Stack } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';




export default function LoginForm(userData) {
    const navigate = useNavigate();
    console.log(userData);
    console.log(userData.users);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);   

    const handleUsernameChange = event => {
        setUsername(event.target.value);
        setIsUsernameValid(false); 
        setIsUsernameEmpty(false);
      };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
        setIsPasswordEmpty(false);
        setIsPasswordValid(false);
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
        setIsUsernameValid(true);
        const user = existingUser[0];
        if (user.password === password) {
            setIsPasswordValid(true);
           
            navigate(`/home/${username}`);
        }else{
            setIsPasswordValid(false);
            toast.error("Password is incorrect.");
        }
      } else {
        setIsUsernameValid(false);
        toast.error("Username not found. Please try again.");

        

        



    setUsername('');
    setPassword('');

    setIsPasswordEmpty(false);
    setIsUsernameEmpty(false);


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
                test-id = "username-input"
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
                test-id = "password-input"
              />
                {isPasswordEmpty && (
                    <Text color="red">Please enter a password</Text>
                    )}
      
            <Button type="submit" colorScheme="green" test-id="login-button">
              Login
            </Button>
            <ToastContainer />
          </Stack>
        </form>
      );
}