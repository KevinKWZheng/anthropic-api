import { fetcher, genRandSeq } from "./util";
import fs from 'fs';
import * as fsAsync from 'fs/promises';
import { URL } from "./Constants";

export class ClaudeAPI implements ClaudeAPI {
    constructor(APIKey: string) {
        this.key = APIKey;
    }
    public async sendMessage(text: string, conversationId?: string, options?: ClaudeAPI.Options): Promise<ClaudeAPI.ClaudeAPIResponse> {
        var conversations = '\n\n';
        //Find previously cached conversation
        if (conversationId) {
            if (conversationId == '') {
                conversationId = this.initConversationCache();
            } else if (!fs.existsSync(`data/${conversationId}.txt`)) {
                throw new Error(`conversationId does not exist`);
            } else {
                conversations = await fsAsync.readFile(`data/${conversationId}.txt`, { encoding: 'utf-8' });
            }
        } else conversationId = this.initConversationCache();

        conversations = conversations.concat(`Human: ${text}\n\nAssistant: `);
        var response: ClaudeAPI.Response = await fetcher(URL.Completion, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "x-api-key": this.key,
            },
            body: {
                "prompt": conversations,
                "model": options ? options.model : 'claude-v1',
                "max_tokens_to_sample": (options) ? (options.max_tokens_to_sample ? options.max_tokens_to_sample : 512) : 512,
                "stream": options?.stream,
                "stop_sequence": options?.stop_sequences,
                "temperature": options?.temperature,
                "top_k": options?.top_k,
                "top_p": options?.top_p,
            }
        });
        if (!response) throw "Error parsing response body";
        conversations = conversations + response.completion + '\n\n';
        await fsAsync.writeFile(`data/${conversationId}.txt`, conversations, { encoding: 'utf-8' });
        return {
            response: response.completion,
            conversationId: conversationId,
        };
    }

    public getConversation(conversationId: string) {
        if (!fs.existsSync(`data/${conversationId}.txt`))
            throw new Error('conversationId does not exist');

        return fs.readFileSync(`data/${conversationId}.txt`, { encoding: 'utf-8' });
    }

    public delConversation(conversationId: string) {
        if (!fs.existsSync(`data/${conversationId}.txt`))
            throw new Error('conversationId does not exist');

        fs.unlinkSync(`data/${conversationId}.txt`);
    }

    public initConversationCache() {
        var conversationId = '';
        do {
            conversationId = genRandSeq(25);
        }
        while (fs.existsSync(`data/${conversationId}.txt`))
        fs.writeFileSync(`data/${conversationId}.txt`, "", { encoding: 'utf-8' });
        return conversationId;
    }

    protected key: string;
}