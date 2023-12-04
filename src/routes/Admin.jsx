import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  ChakraProvider,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import Navigation from '../Navigation';
import { deleteUsers } from '../api';



export default function Admin() {
  const users = useLoaderData();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [userss, setUserss] = useState([]);

  const handleSelectAll = () => {
    let flipped = !selectAll;
    setSelectAll(flipped);
    if (!selectAll) {
        setSelectedRows(users.map((user) => user.id)); // Select all user IDs
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (isChecked, userId) => {
    setSelectedRows((prevRows) =>
      isChecked ? [...prevRows, userId] : prevRows.filter((id) => id !== userId)
    );
  };

  useEffect(() => {
    setShowDeleteButton(selectedRows.length > 0);
  }, [selectedRows]);

  useEffect(() => {
    const isAllSelected = (userss.length > 0 && selectedRows.length === userss.length) || selectAll;
    setSelectAll(isAllSelected);
    setShowDeleteButton(selectedRows.length > 0);
  }, [users, selectedRows]);

  const handleDelete = () => {
    deleteUsers(selectedRows)
      .then((deletedUserIds) => {
        console.log('Deleted user IDs:', deletedUserIds);
        const updatedUsers = users.filter(
          (user) => !deletedUserIds.includes(user.id)
        );
        setUserss(updatedUsers);
        setSelectedRows([]);
        setSelectAll(false);
      })
      .catch((error) => {
        console.error('Error deleting users:', error);
        // Handle error, if needed
      });
  };



  return (
    <ChakraProvider>
      {Navigation('to the admin page')}
      <div>
        <Flex justify="right" margin="4">
          <Button onClick={handleSelectAll} mt="4" mb="2">
            {selectAll ? 'Deselect All' : 'Select All'}
          </Button>
        </Flex>
        <Flex justify="center" mb="2">
          <Text justify="center">User Information</Text>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Password</Th>
              <Th>Liked Events</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Checkbox
                    id={`user-${user.id}`}
                    isChecked={selectAll || selectedRows.includes(user.id)}
                    defaultChecked={selectAll}
                    onChange={(e) =>
                      handleCheckboxChange(e.target.checked, user.id)
                    }
                  />
                </Td>
                <Td>{user.id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.password}</Td>
                <Td>
                  <ul>
                    {user.liked_events.map((event) => (
                      <li key={event.event_id}>
                        Event ID: {event.event_id} Favorited At: {event.favorited_at}
                      </li>
                    ))}
                  </ul>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {showDeleteButton && (
          <Flex justify="right" mt="4" mr="2">
            <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
          </Flex>
        )}
      </div>
    </ChakraProvider>
  );
}