
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors')
app.use(cors())
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");
// const {response} = require("express");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log("process.env.OPENAI_API_KEY: ",process.env.OPENAI_API_KEY);
const openai = new OpenAIApi(configuration);


async function openAIReq2() {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Correct this to standard English:\n\nShe no went to the market.",
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    console.log("response: ",response.data.choices[0].text);
}


async function openAIReq(req,res,pr, temp, maxTok) {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: pr,
        temperature: temp,
        max_tokens: maxTok,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    const data = await response.data
    let dataObj = {text: data.choices[0].text, usage: data.usage}
    // console.log("================response: =============\n",dataObj.text + "\n================response end: =============");
    res.status(200).json({ result: dataObj.text, usage: dataObj.usage});
}

function buildStandardEmailPrompt(email) {
    return `respond to the following email:\n\n${email}`;
}

app.get('/', (req, res) => {

    let response = openAIReq2();

    console.log("back from repsonse");
    console.log(response);
    res.status(200).send({
        msg:'Hello World!',
        arbitrary: 'arbitrary'
    })
});

//ALL TEXT NEEDS TO BE STRIPPED OF NEW LINES BEFORE BEING SENT AS A PROMPT
app.post('/email/:id', (req, res) => {
    console.log("received email");
    const { id } = req.params;
    const { body } = req.body;
    const { headers } = req.headers;
    const email = req.body.email;

    if (!email) {
        res.status(418).send({
            msg: 'Email is required'
        })
    }

    let retCode = openAIReq(req, res, buildStandardEmailPrompt(email), 1, 100);
    // let retCode = openAIReq(req, res, "\n\nThis is a test", 1, 100);

});




app.listen(
    PORT,
    () => console.log(`Example app listening on port ${PORT}!`)
    );

