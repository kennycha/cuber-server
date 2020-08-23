import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxd450e169c47441c482686592965902ce.mailgun.org",
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "dudqn136@naver.com",
    to: "dudqn136@naver.com",
    subject,
    html,
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/>here</a>`;
  return sendEmail(emailSubject, emailBody);
};
