

export async function createCompletion(req, res,dModel,dPrompt,dTemperature) {
    const { model, pr, temperature } = req.body;
    if(!dModel || !dTemperature){
        const completion = await openai.createCompletion({
            model:"text-davinci-002",
            prompt: pr,
            temperature:0.6,
        });
    }
  res.status(200).json({ result: completion.data.choices[0].text });
}