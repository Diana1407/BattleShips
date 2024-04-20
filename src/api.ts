//import { CellId } from "./hooks/gameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = 'http://163.172.177.98:8081';
console.log(baseUrl)
const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<string> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    console.log(data);

    return data.accessToken
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    console.log(data);

    return data.accessToken
};

export const listGames = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();
    return data.games
}

export const createGame = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();
    return data
}

export const loadGame = async (token: string, gameId: string) => {
    
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })
   
    const data = await result.json();
    return data
}


export const fetchUserDetails = async (): Promise<any> => {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
  
    const response = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch user details');
      }
  };


  export const joinGame = async (token: string, gameId : string) => {
    console.log("Joining game", gameId)
    const result = await fetch(`${baseUrl}/game/join/${gameId}`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })
    
    const data = await result.json();
    console.log(data)
    return data
}