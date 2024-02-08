import nodemailer from "nodemailer";
import User from "@/models/user.model";
import generateOTP from "./generateOTP";
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const otp = generateOTP();
    console.log("Entered  the try block");
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: otp,
        verifyTokenExpiry: Date.now() + 7200000,
      });
      console.log("I am at email type  VERIFY");
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpire: Date.now() + 7200000,
      });
    }
    console.log("out from if block");
    console.log("host", process.env.SMTP_HOST);
    console.log(process.env.FROM_EMAIL);
    console.log(process.env.FROM_EMAIL_PASSWORD);
    console.log(process.env.SMTP_PORT);
    console.log(email);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,

      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>your otp is ${otp} ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }

</p>`,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
