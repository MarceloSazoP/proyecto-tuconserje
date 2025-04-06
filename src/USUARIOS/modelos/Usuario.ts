import { User, UserRole } from '@prisma/client';
import { prisma } from '../../INFRAESTRUCTURA/db/prisma';
import { hashPassword, comparePasswords } from '../../INFRAESTRUCTURA/seguridad/autenticacion';

export interface CrearUsuarioDTO {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface ActualizarUsuarioDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export class UsuarioServicio {
  async crear(datos: CrearUsuarioDTO): Promise<User> {
    const passwordHash = await hashPassword(datos.password);
    
    return prisma.user.create({
      data: {
        email: datos.email,
        name: datos.name,
        password: passwordHash,
        role: datos.role || 'RESIDENT',
      },
    });
  }

  async obtenerPorId(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async obtenerPorEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async actualizar(id: string, datos: ActualizarUsuarioDTO): Promise<User> {
    const actualizarDatos: any = {};
    
    if (datos.name) actualizarDatos.name = datos.name;
    if (datos.email) actualizarDatos.email = datos.email;
    if (datos.role) actualizarDatos.role = datos.role;
    if (datos.password) {
      actualizarDatos.password = await hashPassword(datos.password);
    }
    
    return prisma.user.update({
      where: { id },
      data: actualizarDatos,
    });
  }

  async eliminar(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  async verificarCredenciales(email: string, password: string): Promise<User | null> {
    const usuario = await this.obtenerPorEmail(email);
    
    if (!usuario) return null;
    
    const passwordValido = await comparePasswords(password, usuario.password);
    
    return passwordValido ? usuario : null;
  }
}