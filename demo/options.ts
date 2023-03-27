import ClaudeAPI from "../main";

var API = new ClaudeAPI(``);

var response = await API.sendMessage('Write me a short poem about dogs', undefined, { model: 'claude-v1' });
console.log(response.response);

var response2 = await API.sendMessage(`Can you write it in Chinese?`, response.conversationId, { model: 'claude-instant-v1' });
console.log(response2.response);