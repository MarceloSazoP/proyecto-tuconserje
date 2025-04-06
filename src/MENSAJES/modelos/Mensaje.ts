import { Message } from '@prisma/client';
import { prisma } from '../../INFRAESTRUCTURA/db/prisma';

export interface CrearMensajeDTO {
  content: string;
  senderId: string;
  receiverId: string;
}

export interface ActualizarMensajeDTO {
  content?: string;
  read?: boolean;
}

export class MensajeServicio {
  async crear(datos: CrearMensajeDTO): Promise<Message> {
    return prisma.message.create({
      data: {
        content: datos.content,
        senderId: datos.senderId,
        receiverId: datos.receiverId,
      },
    });
  }

  async obtenerPorId(id: string): Promise<Message | null> {
    return prisma.message.findUnique({
      where: { id },
    });
  }

  async obtenerMensajesRecibidos(userId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: { receiverId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: true,
      },
    });
  }

  async obtenerMensajesEnviados(userId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: { senderId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        receiver: true,
      },
    });
  }

  async marcarComoLeido(id: string): Promise<Message> {
    return prisma.message.update({
      where: { id },
      data: { read: true },
    });
  }

  async actualizar(id: string, datos: ActualizarMensajeDTO): Promise<Message> {
    return prisma.message.update({
      where: { id },
      data: datos,
    });
  }

  async eliminar(id: string): Promise<Message> {
    return prisma.message.delete({
      where: { id },
    });
  }
}