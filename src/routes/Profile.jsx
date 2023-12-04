import { fetchUserLikes } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import EventCard from "../EventCard";
import { ChakraProvider, Flex, Text, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import { deleteAccount } from "../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function Profile(){
    const navigate = useNavigate();
    const [likedEvents, setLikedEvents] = useState([]);
    const { username } = useParams();

  useEffect(() => {
    document.title = "Profile Page";
    fetchUserLikes(username)
      .then(data => {
        console.log(data);
        setLikedEvents(data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [username]);

  const handleDeleteAccount = () => {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
        toast.success("Account deleted successfully. You will be redirected to the welcome page.", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            bodyClassName: 'toast-body-success'
        });
        performAccountDeletion();
    } else {
        // User canceled deletion
        toast.info("Account deletion canceled.", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            bodyClassName: 'toast-body-info'
        });
    }
};
const performAccountDeletion = () => {
    deleteAccount(username)
        .then(() => {

            setTimeout(() => {
                navigate(`/`); 
            }, 3000);
        })
    }




  return (
    <ChakraProvider>
      <div>
        <div>
            {Navigation(username)}
            </div>
            <Text textAlign="center" fontSize="2xl" color="green.500" fontWeight="bold" mt={4}>
                    {username}'s Profile Page
                </Text>
            <Flex flexWrap="wrap" justifyContent="center">
            <Link to="/">
                <Button variant='outline' colorScheme='green' margin={2}>
                        Logout
                    </Button>
                    </Link>
                <Button variant='outline' colorScheme='red' margin={2} onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>                    
            </Flex>
            <Text textAlign="center" fontSize="2xl">Your Favorited Events</Text>
        <Flex flexWrap="wrap" justifyContent="center">
          {likedEvents.map(event => (
            <EventCard key={event.id} event={event} isDefault={false} />
          ))}
        </Flex>
    
      </div>
    </ChakraProvider>
  );
};

