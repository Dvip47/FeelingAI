import fs from 'fs';

// Read the content of the "data.txt" file
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the data into individual messages based on newlines and timestamps
  const messages = data.split('\n');

  // Process the messages to create the JSON representation
  let conversation = [];
  let currentMessage = {};

  for (const message of messages) {
    const parts = message.split(' - ');

    if (parts.length >= 2) {
      const timestamp = parts.shift();
      const nameAndMessage = parts.join(' - ');
      const [name, messageContent] = nameAndMessage.split(': ');

      if (currentMessage.prompt && currentMessage.completion) {
        conversation.push(currentMessage);
        currentMessage = {};
      }

      if (name === 'Khusi Insta') {
        currentMessage.prompt = messageContent;
        currentMessage.completion = '';
      } else if (name === 'Vipin Vishwakarma') {
        currentMessage.completion += ' ' + messageContent;
      }
    }
  }

  // Push the last message into the conversation
  if (currentMessage.prompt && currentMessage.completion) {
    conversation.push(currentMessage);
  }

  // Convert the conversation array to a JSON string
  const jsonString = conversation.map((message) => JSON.stringify(message)).join('\n');

  fs.appendFile('preparedChat.jsonl', jsonString, 'utf8', (err) => {
    if (err) {
      console.error('Error appending to preparedChat.jsonl:', err);
      return;
    }
    console.log('Conversion successful. Messages appended to preparedChat.jsonl');
  });
});
