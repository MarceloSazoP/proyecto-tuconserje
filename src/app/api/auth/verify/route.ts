import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getUserFromToken } from '@/INFRAESTRUCTURA/seguridad/autenticacion';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token no proporcionado' },
        { status: 400 }
      );
    }

    try {
      // Verificar que el token sea válido
      const payload = verifyToken(token);
      
      // Obtener información actualizada del usuario
      const usuario = await getUserFromToken(token);
      
      if (!usuario) {
        return NextResponse.json(
          { error: 'Usuario no encontrado' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        valid: true,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          name: usuario.name,
          role: usuario.role
        }
      });
    } catch (tokenError) {
      return NextResponse.json(
        { valid: false, error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error al verificar token:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}