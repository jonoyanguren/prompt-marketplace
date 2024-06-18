// import nodemailer from "nodemailer";

// export const sendEmail = async (to: string, verificationCode: number) => {
//   // Configurar el transporter de Nodemailer
//   const transporter = nodemailer.createTransport({
//     host: "smtp.example.com",
//     port: 587,
//     auth: {
//       user: "your-email@example.com",
//       pass: "your-password",
//     },
//   });

//   // Configurar el mensaje de correo electrónico
//   const mailOptions = {
//     from: "your-email@example.com",
//     to: to,
//     subject: "Verifica tu cuenta de usuario",
//     text: `Tu código de verificación es: \[${verificationCode}\]`,
//   };

//   // Enviar el correo electrónico
//   await transporter.sendMail(mailOptions);
// };
