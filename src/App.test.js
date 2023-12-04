import {
  fetchUsers,
  saveUser,
  fetchEvents,
  fetchUserLikes,
  deleteUsers,
} from "./api"; 
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import 'react-toastify/dist/ReactToastify.css';
import CreateForm from "./CreateForm";


describe('Function Tests', () => {
  test('fetchUsers: Fetches users from the API', async () => {
    const users = await fetchUsers();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });

  test('saveUser: Saves user data', async () => {
    const userData = { username: "test-name", password:"test-password" };
    const newUser = await saveUser(userData);
   
    expect(newUser).toBeDefined();
    expect(newUser.username).toBeDefined();
    expect(newUser.username).toBe("test-name");
    expect(newUser.password).toBeDefined();
    expect(newUser.password).toBe("test-password");
  });

  test('fetchEvents: Fetches events from the API', async () => {
    const events = await fetchEvents();
    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
  });

  test('fetchUserLikes: Fetches liked events for a user', async () => {
    const username = 'abc';
    const likedEvents = await fetchUserLikes(username);
    expect(likedEvents).toBeDefined();
  });

  test('deleteUsers: Deletes users by ID', async () => {
    const userIds = ['14', '15']; 
    const deletionResults = await deleteUsers(userIds);
    expect(deletionResults).toBeDefined();
    expect(Array.isArray(deletionResults)).toBe(true);
  });
});

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

describe('LoginForm Component', () => {
  const userData = {
    users: [
      { username: '1', password: 'test' },
      { username: 'anotheruser', password: 'anotherpassword' },
    ],
  };

  it('renders LoginForm component', () => {
    const { getByPlaceholderText } = render(<LoginForm userData={userData} />);
    expect(getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });
});

describe('CreateForm Component', () => {
  const userData = {
    userData: [
      { id: 1, username: 'testuser', password: 'password123' },
      { id: 2, username: 'anotheruser', password: 'pass456' },
    ],
  };

  it('renders CreateForm component', () => {
    const { getByPlaceholderText, getByText } = render(<CreateForm userData={userData} />);
    expect(getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(getByText('Create an Account')).toBeInTheDocument();
  });
});


