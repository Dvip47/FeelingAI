import { openai } from './api.js'
import fs from 'fs'

async function upload() {
  try {
    const response = await openai.createFile(
      fs.createReadStream('./conversation.jsonl'),
      'fine-tune'
    );
    console.log('File ID: ', response.data.id)
    fs.writeFileSync('./fileId.js', `export const fileId = "${response.data.id}"`)
  } catch (err) {
    console.log('err: ', err)
  }
}

upload()
