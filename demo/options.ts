import ClaudeAPI from "../main";

var API = new ClaudeAPI(`sk-ant-qRl2b3ZysBEnZy8Q6jRf-GmK9oMJFzlCh_aJuRqxX7xejwHuzHr3NT5zhRlxkPwJbI_ewdWB0VcB6EWJ8BimhQ`);

var response = await API.sendMessage('Write me a short poem about dogs', undefined, { model: 'claude-v1' });
console.log(response.response);

var response2 = await API.sendMessage(`Can you write it in Chinese?`, response.conversationId, { model: 'claude-instant-v1' });
console.log(response2.response);