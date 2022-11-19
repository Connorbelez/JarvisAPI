
(async () => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Correct this to standard English:\n\nShe no went to the market.",
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    console.log("response: ",response);
})();


