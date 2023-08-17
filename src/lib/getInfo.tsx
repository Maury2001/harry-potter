import { NextResponse } from "next/server";

async function getInfo() {
    const response = await fetch(`https://hp-api.onrender.com/api/characters`,{'method':"GET"});

    if (!response.ok) {
        throw new Error('Failed to fetch characters');
    }

    return response.json();
}

export async function GET(request: any) {
    try {
        const chars = await getInfo();
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        const filtered = chars.filter((char: any) => {
            return char.name.toLowerCase().includes(query?.toLowerCase()) ||
                   char.alternate_names.toLowerCase().includes(query?.toLowerCase());
        });

        return new NextResponse(JSON.stringify(filtered), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

// const [query, setQuery] = useState('')
// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//         const encodedQuery = encodeURIComponent(query); // Encode the query
//         const response = await fetch(`/api/characters?query=${encodedQuery}`);

//         if (!response.ok) {
//             throw new Error('Failed to fetch characters');
//         }

//         const char = await response.json();
//         getSearchResult(char);
//         setSearchQuery(query);
//     } catch (error) {
//         console.error('Error fetching characters:', error);
//     }
// };
