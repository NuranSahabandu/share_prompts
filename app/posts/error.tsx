'use client' // error components must be client components.

import { useEffect } from 'react'

interface ErrorProps {
  error: Error
  reset: () => void
}

const Error = ({ error, reset }: ErrorProps) => {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
            onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
            }
            >
                Try again
            </button>
        </div>
    );
}

export default Error
