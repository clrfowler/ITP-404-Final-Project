import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = "http://localhost:5000";
const apiKey = "VzGOGRV4MPQC0M1QcZJvzE2EsR5iLtYx";

export function fetchUsers(){
    return fetch(`${baseURL}/users`).then((response) => {
        return response.json();
      });
}


export function saveUser(data) {
  console.log(data);
  const userData = {
    ...data,
    liked_events: [
      {
        event_id: "",
        favorited_at: ""
      }
    ]
  };

  return fetch(`${baseURL}/users`, {

    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}



  export function fetchEvents() {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=${apiKey}`;
  
    return fetch(url, {
      method: 'GET',

    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      
        return response.json();
      })
      .then(json => {
        const eventsData = json._embedded.events.map(event => {
          const image = event.images.find(img => img.ratio === '16_9');
          return {
            id: event.id,
            name: event.name,
            date: event.dates.start.localDate,
            location: event._embedded.venues[0].name,
            img: image ? image.url : ''
          };
        });
  
        console.log(eventsData); 
        return eventsData; 
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        throw error; 
      });
  }

  export function updateFavorites(username, eventID){
    const currentDate = new Date().toISOString();
    fetch(`${baseURL}/users?username=${username}`)
    .then(response => {
     
      return response.json();
    }).then(data => {
      const user = data.find(user => user.username === username);
      if (user) {
        user.liked_events.push({
          event_id: eventID,
          favorited_at: currentDate
        });
        

        return fetch(`${baseURL}/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok while updating user data');
      }
      toast.success('Event added successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log('User data updated successfully');
    })
    .catch(error => {
      console.error('Error updating favorites:', error);
      throw error; 
    });
  }

  export function deleteFromFavorites(username, eventID) {
    let user;
  

    return fetch(`${baseURL}/users?username=${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok while fetching user data');
        }

        return response.json();
      })
      .then(data => {

        user = data.find(user => user.username === username);
        if (user) {
          const index = user.liked_events.findIndex(event => event.event_id === eventID);
          if (index > -1) {
            user.liked_events.splice(index, 1);
          }
      
        }

        return fetch(`${baseURL}/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok while updating user data');
        }

        console.log('Event removed from favorites');

      })
      .catch(error => {
        console.error('Error removing event from favorites:', error);
        throw error;
      });
};


export function fetchUserLikes(username) {
  return fetch(`${baseURL}/users?username=${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(userData => {
      const user = userData.find(user => user.username === username);
      if (!user) {
        throw new Error('User not found');
      }

      return fetch('http://localhost:5000/users') 
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch local data');
          }
          return response.json();
        })
        .then(localData => {
          const userLikedEvents = user.liked_events.map(event => {
            const userEvent = localData.find(
              data => data.id === user.id && data.username === username
            );

            return {
              event_id: event.event_id,
              timestamp: userEvent?.liked_events.find(
                likedEvent => likedEvent.event_id === event.event_id
              )?.favorited_at || null
            };
          });

          const likedEventDetailsPromises = userLikedEvents.slice(1).map(userEvent => {
            const apiURL = `https://app.ticketmaster.com/discovery/v2/events/${userEvent.event_id}.json?apikey=${apiKey}`;
            const apiDataPromise = fetch(apiURL)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Failed to fetch event details from API');
                }
                return response.json();
              })
              .then(apiData => ({
                id: apiData.id,
                name: apiData.name,
                date: apiData.dates.start.localDate,
                location: apiData._embedded.venues[0].name,
                img: apiData.images[0] ? apiData.images[0].url : '',
                timestamp: userEvent.timestamp
              }))
              .catch(error => {
                console.error('Error fetching event details from API:', error);
                throw error;
              });

            return apiDataPromise;
          });

          return Promise.all(likedEventDetailsPromises);
        });
    })
    .catch(error => {
      console.error('Error fetching user likes:', error);
      throw error;
    });
}

export function deleteAccount(username) {
  return fetch(`${baseURL}/users`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const user = data.find((user) => user.username === username);
      if (!user) {
        throw new Error('User not found');
      }

      const userId = user.id;
      return fetch(`${baseURL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });



  }


  const deleteUsers = async (userIds) => {
    try {
      const deletionResults = await Promise.all(
        userIds.map(async (userId) => {
          const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`Failed to delete user with ID ${userId}`);
          }
          toast.success("Deletion Complete.")
          return userId; 
        })
      );
  
      return deletionResults; 
    } catch (error) {
      console.error('Error deleting users:', error);
      return []; 
    }
  };

  export {deleteUsers};
  