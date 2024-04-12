//import { CellId } from "./hooks/gameContext";

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

export const loadGame = async (token: string, gameId: number) => {
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

// export const sendMove = async (token: string, gameId: number, cell: CellId) => {
//     const result = await fetch(`${baseUrl}/game/move/${gameId}`, {
//         method: 'POST',
//         headers: {
//             ...baseHeaders,
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//             cell
//         })
//     })

//     const data = await result.json();

//     return data
// }