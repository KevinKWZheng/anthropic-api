interface FetchOptions {
    method: "POST" | "GET";
    headers: Record<string, string>;
    body?: Record<string, any>;
}

interface ClaudeOptions {

    /**
     * This controls which version of Claude answers your request
     */
    model: "claude-v1" | "claude-instant-v1";

    /**
     * A maximum number of tokens to generate before stopping.
     */
    max_tokens_to_sample?: number;

    /**
     * A list of strings upon which to stop generating. 
     * @default ["\n\nHuman:"]
     */
    stop_sequences?: string[];

    /**
     * Whether to incrementally stream the response using SSE.
     * @default false
     */
    stream?: boolean;

    /**
     * Amount of randomness injected into the response. Ranges from 0 to 1. Use temp closer to 0 for analytical / multiple choice, and temp closer to 1 for creative and generative tasks.
     * @default 1
     */
    temperature?: number;

    /**
     * Only sample from the top K options for each subsequent token. Used to remove "long tail" low probability responses. Defaults to -1, which disables it.
     * @default -1
     */
    top_k?: number;

    /**
     * Does nucleus sampling, in which we compute the cumulative distribution over all the options for each subsequent token in decreasing probability order and cut it off once it reaches a particular probability specified by top_p. Defaults to -1, which disables it.
     * @default -1
     */
    top_p?: number;
}

interface ClaudeResponse {
    /**
     * The resulting completion up to and excluding the stop sequences
     */
    completion: string;

    /**
     * The reason we stopped sampling, either stop_sequence if we reached one of your provided stop_sequences, or max_tokens if we exceeded max_tokens_to_sample.
     */
    stop_reason: "stop_sequence" | "max_tokens";

    /**
     * If the stop_reason is stop_sequence, this contains the actual stop sequence (of the stop_sequences list passed-in) that was seen
     */
    stop: string | null;
}

interface ClaudeAPIResponse {
    response: string;
    conversationId: string;
}