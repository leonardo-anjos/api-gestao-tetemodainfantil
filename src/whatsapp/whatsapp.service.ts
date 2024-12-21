import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  async sendThankYouMessage(phone: string) {
    const message = 'Obrigado pela sua compra! Apreciamos muito o seu apoio.';
    const twilioAccountSid = 'YOUR_TWILIO_ACCOUNT_SID';
    const twilioAuthToken = 'YOUR_TWILIO_AUTH_TOKEN';
    const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';
  
    const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
  
    try {
      const response = await axios.post(
        url,
        new URLSearchParams({
          To: `whatsapp:${phone}`, 
          From: `whatsapp:${twilioPhoneNumber}`,
          Body: message,
        }),
        {
          auth: {
            username: twilioAccountSid,
            password: twilioAuthToken,
          },
        }
      );
      console.log('Mensagem de agradecimento enviada:', response.data);
    } catch (error) {
      console.error('Erro ao enviar mensagem de agradecimento:', error);
    }
  }
}
