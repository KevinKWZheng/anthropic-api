import fetch from "node-fetch";

export async function fetcher(url: string, options?: FetchOptions) {
    // Use try/catch to handle errors
    try {
        // Stringify body if it is an object
        const bodyString = typeof options?.body === "object" ? JSON.stringify(options.body) : undefined;
        // Call fetch with url and options
        const response = await fetch(url, {
            method: options?.method,
            headers: options?.headers,
            body: bodyString
        });
        let result = await response.json() as any;
        // Check if response is ok
        if (response.ok) {
            // Return response as parsed object
            return result;
        } else {
            // Throw an error with status text
            throw response.statusText;
        }
    } catch (error) {
        // Log or handle the error
        console.error(error);
        return null;
    }
}


export function genRandSeq(len: number): string {
    const alphabet = "1234567890abcdefghijklmnopqrstuvwxyz";
    var seq = '';
    for (let i = 0; i < len; i++) {
        let index = Math.floor(Math.random() * alphabet.length);
        seq = seq.concat(alphabet.charAt(index));
    }
    return seq;
}