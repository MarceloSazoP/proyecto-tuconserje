import { NextRequest, NextResponse } from 'next/server';
import { UsuarioServicio } from '../modelos/Usuario';
import { generateToken } from '../../INFRAESTRUCTURA/seguridad/autenticacion';

const usuarioServicio = new UsuarioServicio();

export async function registro(req: NextRequest) {
  try {
    const { email, name, password, role } = await req.json();
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await usuarioServicio.obtenerPorEmail(email);
    if (usuarioExistente) {
      return NextResponse.json(
        { error: 'El correo electrónico ya está registrado' },
        { status: 400 }
      );
    }
    
    // Crear nuevo usuario
    const nuevoUsuario = await usuarioServicio.crear({
      email,
      name,
      password,
      role,
    });
    
    // Generar token
    const token = generateToken(nuevoUsuario);
    
    // Eliminar la contraseña de la respuesta
    const { password: _, ...usuarioSinPassword } = nuevoUsuario;
    
    return NextResponse.json({
      user: usuarioSinPassword,
      token,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}

export async function iniciarSesion(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Verificar credenciales
    const usuario = await usuarioServicio.verificarCredenciales(email, password);
    if (!usuario) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
    
    // Generar token
    const token = generateToken(usuario);
    
    // Eliminar la contraseña de la respuesta
    const { password: _, ...usuarioSinPassword } = usuario;
    
    return NextResponse.json({
      user: usuarioSinPassword,
      token,
    });
  } catch (error) {
    console.error('Error en inicio de sesión:', error);
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
}