

export const URL = {
    /**
     * The base url for Anthropic's API
    */
    Base: "https://api.anthropic.com/",

    /**
     * The request URL for completions.
     * This POST endpoint sends a prompt to Claude for completion.
     */
    Completion: "https://api.anthropic.com/v1/complete"
}

export const PROMPT = {
    human: "\n\nHuman: ",
    AI: "\n\nAssistant: ",
}