import { NextRequest, NextResponse } from 'next/server';
import { UsuarioServicio } from '@/USUARIOS/modelos/Usuario';
import { generateToken } from '@/INFRAESTRUCTURA/seguridad/autenticacion';

const usuarioServicio = new UsuarioServicio();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validar que se proporcionaron email y password
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Verificar credenciales
    const usuario = await usuarioServicio.verificarCredenciales(email, password);

    if (!usuario) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = generateToken(usuario);

    // Devolver respuesta con token y datos básicos del usuario
    return NextResponse.json({
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        name: usuario.name,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}