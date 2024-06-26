import * as brevo from "@getbrevo/brevo";

export const sendEmail = ({
  subject,
  htmlContent,
  to,
  params,
}: {
  subject: string;
  htmlContent: string;
  to: string;
  params?: any;
}) => {
  let apiInstance = new brevo.TransactionalEmailsApi();
  //@ts-ignore
  let apiKey = apiInstance.authentications["apiKey"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = {
    name: "Promt marketplace",
    email: "jonoyanguren@gmail.com",
  };
  sendSmtpEmail.to = [{ email: to, name: to }];

  sendSmtpEmail.params = params;

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("Email sent successfully");
    },
    function (error) {
      console.error(error);
    }
  );
};

module.exports = { sendEmail };
