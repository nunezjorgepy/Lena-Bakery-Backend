import nodemailer from "nodemailer";
import ENVIRONMENT from "./environment.config.js";

const mailerTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: ENVIRONMENT.EMAIL_USER,
        pass: ENVIRONMENT.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export default mailerTransporter;