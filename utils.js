import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import mailgun from "mailgun-js";
// const mg = mailgun({apiKey: process.env.api_key, domain: process.env.DOMAIN}).messages().send();
console.log(process.env.api_key, process.env.DOMAIN)

const sendMail = (email) => {
    const client = nodemailer.createTransport(
        mailgun({apiKey: process.env.api_key, domain: process.env.DOMAIN}).messages().send(email)
    );
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: 'fresh-and-bubbly-cutie@samples.mailgun.org',
        to: address,
        subject: 'Hello',
        text: `Testing some Mailgun ${secret} awesomness!`
    }
    return sendMail(email);
};
// mg.messages().send(data, function(error, body) {
//     console.log(body);
// })


export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
}