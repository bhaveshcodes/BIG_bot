var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

// BOT require
const { Telegraf } = require("telegraf");
 

const generateIMG = require('./generateIMG');

app.use(bodyParser.json()) // for parsing application/json
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post("/new-message", function (req, res) {
	const { message } = req.body

	//Each message contains "text" and a "chat" object, which has an "id" which is the chat id

	if (!message || message.text.toLowerCase().indexOf("marco") < 0) {
		// In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
		return res.end()
	}

	// If we've gotten this far, it means that we have received a message containing the word "marco".
	// Respond by hitting the telegram bot API and responding to the appropriate chat_id with the word "Polo!!"
	// Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
	axios
		.post(
			"https://api.telegram.org/bot777845702:5971390987:AAG-OndGJ2FzpT8KjwfvLxq5goLBkmiCvdQ",
			{
				chat_id: message.chat.id,
				text: "Polo!!",
			}
		)
		.then((response) => {
			// We get here if the message was successfully posted
			console.log("Message posted")
			res.end("ok")
		})
		.catch((err) => {
			// ...and here if it was not
			console.log("Error :", err)
			res.end("Error :" + err)
		})
})

app.get('/',(req,res)=>{
	res.send("bot code added")
})


// Finally, start our server
app.listen(process.env.PORT || 3100, function () {
	console.log("Telegram app listening on port 3100!")
})


// BOT CODE

const token = "5971390987:AAG-OndGJ2FzpT8KjwfvLxq5goLBkmiCvdQ"

const bot = new Telegraf(token)

bot.command("start", async (ctx) => {
    await ctx.replyWithHTML('Enter Any Text');
})

bot.on("message", async (ctx) => {

    // await ctx.replyWithHTML("Loading...")
    // await ctx.replyWithHTML("Loading....").then(async({ message_id  }) => {

    await ctx.reply("⏳").then(async({ message_id  }) => {
        
        console.log(ctx.message.message_id + " 30"),
        console.log(message_id + " 33"),
        console.log(ctx.chat.id + " 30")

       


        
        
        
        const text = ctx.update.message.text
        const img=await generateIMG.generateImage(text)
        console.log(img);
        await ctx.replyWithPhoto({url: img })
        await ctx.telegram.deleteMessage(ctx.chat.id,message_id);
        await ctx.replyWithHTML(text)

    }) 
})



bot.launch().then(() => {
    console.log("Bot Started...");
})