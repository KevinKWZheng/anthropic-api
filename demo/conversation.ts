import ClaudeAPI from "../main";

var API = new ClaudeAPI(``);

var response = await API.sendMessage('Hello there!');

console.log(response.response);

var response2 = await API.sendMessage(`Can you introduce yourself in detail?`, response.conversationId);

console.log(response2.response);