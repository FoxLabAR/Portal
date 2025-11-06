// Test de autenticación directo para diagnóstico
// Ejecuta este código en la consola del navegador (F12) DESPUÉS de que el sitio cargue

console.log('=== TEST DIRECTO DE AUTENTICACIÓN ===\n');

// 1. Verificar que las variables de entorno están disponibles
console.log('1. Verificando variables de entorno en el cliente...');
console.log('   (Estas deben aparecer en la consola al cargar la página)');
console.log('   Busca: [SUPABASE] Configuración\n');

// 2. Test con credenciales
async function testAuth() {
  console.log('2. Iniciando test de autenticación...\n');

  // Solicitar credenciales
  const email = prompt('Ingresa tu email:');
  const password = prompt('Ingresa tu password:');

  if (!email || !password) {
    console.log('❌ Test cancelado\n');
    return;
  }

  try {
    console.log('📧 Email ingresado:', email);
    console.log('🔐 Intentando autenticación con Supabase...\n');

    // Importar el módulo
    const { signIn, getSession } = await import('/src/lib/supabase.ts');

    // Intentar login
    console.log('⏳ Llamando a signIn()...');
    const result = await signIn(email, password);

    console.log('\n=== RESULTADO DE signIn() ===');
    console.log('📦 Data recibida:', result);
    console.log('✅ ¿Hay user?', !!result?.user);
    console.log('✅ ¿Hay session?', !!result?.session);

    if (result?.user) {
      console.log('\n👤 USUARIO:');
      console.log('   - ID:', result.user.id);
      console.log('   - Email:', result.user.email);
      console.log('   - Confirmado:', result.user.email_confirmed_at ? '✓' : '✗');
    }

    if (result?.session) {
      console.log('\n🎫 SESIÓN:');
      console.log('   - Access Token:', result.session.access_token ? '✓ Presente' : '✗ No presente');
      console.log('   - Refresh Token:', result.session.refresh_token ? '✓ Presente' : '✗ No presente');
      console.log('   - Expira:', new Date(result.session.expires_at * 1000).toLocaleString());
    }

    // Verificar que la sesión se guardó
    console.log('\n🔍 Verificando sesión guardada...');
    const session = await getSession();
    console.log('   Sesión guardada:', !!session);

    if (session) {
      console.log('   ✅ Sesión activa hasta:', new Date(session.expires_at * 1000).toLocaleString());
    } else {
      console.error('   ❌ No se encontró sesión guardada después del login');
    }

    // Resultado final
    if (result?.session && session) {
      console.log('\n✅ ¡LOGIN EXITOSO! Todo funciona correctamente.');
      console.log('   La redirección debería funcionar.');
    } else if (result?.user && !result?.session) {
      console.error('\n❌ PROBLEMA: Usuario válido pero SIN SESIÓN');
      console.error('   Posibles causas:');
      console.error('   1. Email no confirmado en Supabase');
      console.error('   2. Usuario deshabilitado');
      console.error('   3. Problema de configuración en Supabase Auth');
      console.error('\n   📋 Solución:');
      console.error('   - Ve a Supabase Dashboard > Authentication > Users');
      console.error('   - Verifica que el email esté confirmado');
      console.error('   - Verifica que el usuario esté activo');
    } else {
      console.error('\n❌ PROBLEMA: No se recibió data válida');
    }

  } catch (error) {
    console.error('\n=== ERROR ===');
    console.error('❌ Error:', error.message);
    console.error('📋 Detalles:', error);

    if (error.message.includes('Invalid login credentials')) {
      console.log('\n💡 SOLUCIÓN: Credenciales incorrectas');
      console.log('   - Verifica el email y contraseña');
      console.log('   - Asegúrate de que el usuario existe en Supabase');
    } else if (error.message.includes('Email not confirmed')) {
      console.log('\n💡 SOLUCIÓN: Email no confirmado');
      console.log('   - Ve a Supabase Dashboard > Authentication > Users');
      console.log('   - Click en el usuario > Confirm email');
    }
  }
}

// Ejecutar test
testAuth();
