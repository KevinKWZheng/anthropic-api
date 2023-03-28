# anthropic-api

A TS API for Anthropic's models. A cache for conversations is included for Claude's API.

## Installation

Run `npm i anthropic-api` in your project directory.

## Use

The project is designed to be easy for use.

You can import the `ClaudeAPI` by the following command.

```ts
import ClaudeAPI from 'anthropic-api';
```

To use this class, you will need an API key from Anthropic. Then you can use the following line.

```ts
var Claude=new ClaudeAPI(YOUR_API_KEY_HERE);
```

You can check out the demos on how to use this package. Run `npx tsx demo/conversation.ts` and see how Claude performs.

Support for other models from Anthropic will be added if they are published. You are welcome to submit PRs and feature requests.
