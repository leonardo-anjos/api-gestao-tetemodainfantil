import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class WhatsappService {
  private twilioClient: Twilio;

  constructor() {
    // Configuração do Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;  // Sua Account SID do Twilio
    const authToken = process.env.TWILIO_AUTH_TOKEN;    // Seu Auth Token do Twilio
    const whatsappFromNumber = 'whatsapp:+14155238886'; // Número do WhatsApp fornecido pelo Twilio

    // Inicializar o cliente Twilio
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  // Método para enviar mensagem personalizada
  async sendCustomMessage(toPhone: string, message: string): Promise<any> {
    try {
      const response = await this.twilioClient.messages.create({
        body: message,  // Mensagem que você deseja enviar
        from: 'whatsapp:+14155238886',  // O número do WhatsApp configurado no Twilio
        to: `whatsapp:${toPhone}`,  // O número do destinatário (com prefixo whatsapp:)
      });
      return response;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw new Error('Failed to send WhatsApp message');
    }
  }
}
