const { Configuration, OpenAIApi } = require('openai');



const configuration = new Configuration({
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);




async function generateImage(text) {
    // const generateImage = async (text) => {
    //   const { prompt, size } = req.body;
    prompt = text;
    console.log(prompt + "<-- prompt line 34");
    //   const imageSize =
    //     size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    const imageSize = '1024x1024';

    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        });

        const imageUrl = response.data.data[0].url;

        return imageUrl;

        // res.status(200).json({
        //   success: true,
        //   data: imageUrl,
        // });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        // res.status(400).json({
        //   success: false,
        //   error: 'The image could not be generated',
        // });
    }
};

console.log(generateImage + "<-- line 52 ");
module.exports = { generateImage };


































    // function log(text) {                  // Working commented fro experementation

//     ans = text
//     console.log("testing");

//     return ans;


// }
// module.exports = { log };           // Working commented fro experementation

// function log(text) {
//     return "https://cdn.mos.cms.futurecdn.net/rjqJEKv6P9Yjy9d3KMGvp8.jpg";
// }



// module.exports = { generateImage };