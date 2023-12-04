import { fetchEvents } from "../api";
import { useState, useEffect } from "react";
import EventCard from "../EventCard";
import { ChakraProvider, Flex, Button, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Navigation from "../Navigation";

export default function Home() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 10; 
    const { username } = useParams();



    useEffect(() => {
        document.title = "Home Page Displaying Upcoming Events";
        fetchEvents()
            .then(data => {
                setEvents(data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [username]);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <ChakraProvider>
            <div>
                <div>
                    {Navigation(username)}
                </div>
                <Text textAlign="center" fontSize="2xl" color="green.500" fontWeight="bold" mt={4}>
                    Upcoming Events
                </Text>

                <div>
                    {events.length > eventsPerPage && (
                        <Flex justifyContent="center" mt={4}>
                            {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
                                <Button key={i} mx={1} onClick={() => paginate(i + 1)}>
                                    {i + 1}
                                </Button>
                            ))}
                        </Flex>
                    )}
                </div>
                <Flex flexWrap="wrap" justifyContent="center">
                    {currentEvents.map(event => (
                        <EventCard key={event.id} event={event} isDefault={true} />
                    ))}
                </Flex>
                <div>
                    {events.length > eventsPerPage && (
                        <Flex justifyContent="center" mt={4}>
                            {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
                                <Button key={i} mx={1} onClick={() => paginate(i + 1)}>
                                    {i + 1}
                                </Button>
                            ))}
                        </Flex>
                    )}
                </div>
            </div>
        </ChakraProvider>
    );
}
