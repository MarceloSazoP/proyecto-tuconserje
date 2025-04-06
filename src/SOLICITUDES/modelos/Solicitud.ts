import { Request, RequestStatus } from '@prisma/client';
import { prisma } from '../../INFRAESTRUCTURA/db/prisma';

export interface CrearSolicitudDTO {
  title: string;
  description: string;
  userId: string;
  assignedTo?: string;
}

export interface ActualizarSolicitudDTO {
  title?: string;
  description?: string;
  status?: RequestStatus;
  assignedTo?: string;
}

export class SolicitudServicio {
  async crear(datos: CrearSolicitudDTO): Promise<Request> {
    return prisma.request.create({
      data: {
        title: datos.title,
        description: datos.description,
        userId: datos.userId,
        assignedTo: datos.assignedTo,
      },
    });
  }

  async obtenerPorId(id: string): Promise<Request | null> {
    return prisma.request.findUnique({
      where: { id },
      include: {
        user: true,
        concierge: true,
      },
    });
  }

  async obtenerSolicitudesUsuario(userId: string): Promise<Request[]> {
    return prisma.request.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        concierge: true,
      },
    });
  }

  async obtenerSolicitudesAsignadas(conciergeId: string): Promise<Request[]> {
    return prisma.request.findMany({
      where: { assignedTo: conciergeId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });
  }

  async obtenerTodasLasSolicitudes(): Promise<Request[]> {
    return prisma.request.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        concierge: true,
      },
    });
  }

  async actualizarEstado(id: string, status: RequestStatus): Promise<Request> {
    return prisma.request.update({
      where: { id },
      data: { status },
    });
  }

  async asignarConserje(id: string, conciergeId: string): Promise<Request> {
    return prisma.request.update({
      where: { id },
      data: { 
        assignedTo: conciergeId,
        status: 'IN_PROGRESS',
      },
    });
  }

  async actualizar(id: string, datos: ActualizarSolicitudDTO): Promise<Request> {
    return prisma.request.update({
      where: { id },
      data: datos,
    });
  }

  async eliminar(id: string): Promise<Request> {
    return prisma.request.delete({
      where: { id },
    });
  }
}