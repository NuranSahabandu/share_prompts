
// http://localhost:3000/api/users

export async function GET ( request: Request ) {
    // handle GET request for /api/users
    // retrieve users from the database ro any other source
    const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" }
    ];
    
    // send the users as a json response
    return new Response ( JSON.stringify(users) )

    // return new Response ("Hello, Next.js!")
}

export async function POST ( request: Request ) {}

export async function PUT ( request: Request ) {}

export async function PATCH ( request: Request ) {}

export async function DELETE ( request: Request ) {}

export async function HEAD ( request: Request ) {}

export async function OPTIONS ( request: Request ) {}
