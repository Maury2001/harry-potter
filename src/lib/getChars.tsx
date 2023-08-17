
export default async function getUser(id: number) {
    const response = await fetch(`https://hp-api.onrender.com/api/characters/:${id}`)

    if (!response.ok) { // Check if the response is not okay (status other than 200)
        throw new Error('Failed to fetch user');
    }
    
    return response.json();
}
