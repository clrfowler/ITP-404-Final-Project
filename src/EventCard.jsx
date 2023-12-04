import { Card, CardBody, CardFooter, Button, ButtonGroup, Divider, Image, Stack, Heading, Text, Flex } from '@chakra-ui/react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateFavorites } from './api';
import { useParams } from 'react-router-dom';
import { deleteFromFavorites } from './api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUserLikes } from './api';

const EventCard = ({ event, isDefault }) => {
    const { username } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoritedAt, setFavoritedAt] = useState("");


    const fetchUserLikesAndTimestamps = () => {
        fetchUserLikes(username)
            .then(likedEvents => {
                const isLiked = isEventLiked(event.id, likedEvents);
                setIsFavorite(isLiked);
                if (isLiked) {
                    const likedEvent = likedEvents.find(liked => liked.id === event.id);
                    if (likedEvent) {
                        const favoritedTime = convertToPST(likedEvent.timestamp);
                        setFavoritedAt(favoritedTime);
                    }
                } else {
                    setFavoritedAt('');
                }
            })
        }
    useEffect(() => {
        fetchUserLikesAndTimestamps(); 
        }, [event.id, username]);        

    useEffect(() => {
        fetchUserLikes(username)
            .then(likedEvents => {
                const isLiked = isEventLiked(event.id, likedEvents);
                setIsFavorite(isLiked);
                if (isLiked) {
                    const likedEvent = likedEvents.find(liked => liked.id === event.id);
                    if (likedEvent) {
                        const favoritedTime = convertToPST(likedEvent.timestamp);
                        setFavoritedAt(favoritedTime);
                    }
                } else {
                    setFavoritedAt('');
                }
            })
            .catch(error => {
                console.error('Error fetching user likes:', error);
            });
    }, [event.id, username]);

    const isEventLiked = (eventId, likedEvents) => {
        if (likedEvents) {
            const likedEventIds = likedEvents.map(event => event.id);
            return likedEventIds.includes(eventId);
        }
        return false;
    };

    const toggleFavorite = () => {
        setIsFavorite(prevState => !prevState);
    };

    const handleFavoriteClick = () => {
        toggleFavorite();
        if (isFavorite) {
            deleteFromFavorites(username, event.id)
                .then(() => {
                    // Display a toast when the event is removed from favorites
                    toast.success('Event removed from favorites', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                })
                .catch(error => {
                    console.error('Error removing event from favorites:', error);
                    // Handle errors accordingly
                    toast.error('Failed to remove event from favorites', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                });
        } else {
            updateFavorites(username, event.id);
        }
    };
 

    function convertToPST(utcDate) {
        const utcDateTime = new Date(utcDate);
        const pstTimestamp = utcDateTime.getTime();
        const pstDateTime = new Date(pstTimestamp);
        
        const options = {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        
        return pstDateTime.toLocaleString('en-US', options);
    }
    
    

    return isFavorite || isDefault ? (
        <Card key={event.id} maxW='sm' boxShadow='md' borderRadius='md' overflow='hidden' m='4'>
            <Image src={event.img} alt={event.name} borderRadius='lg' />
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{event.name}</Heading>
                    <Text>Date: {event.date}</Text>
                    <Text>Location: {event.location}</Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Flex justifyContent='center' width='100%'>
                    <ButtonGroup spacing='2' margin="auto">
                        <Button
                            variant='ghost'
                            colorScheme={isFavorite ? 'red' : 'gray'}
                            onClick={handleFavoriteClick}
                        >
                            <FontAwesomeIcon icon={faHeart} size="2x" />
                        </Button>
                        {isFavorite ? (
                            <Button variant='ghost' colorScheme='green'>
                                {console.log(favoritedAt)}
                                {favoritedAt && <span>Favorited At: {favoritedAt}</span>}
                            </Button>
                        ) : (
                            <Text justifyContent="center" color='green'>
                                Add to Favorites
                            </Text>
                        )}
                    </ButtonGroup>
                </Flex>
            </CardFooter>
            <ToastContainer/>
        </Card>
    ) : null;
};

export default EventCard;
