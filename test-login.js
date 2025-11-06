// Script de prueba para el login
// Ejecuta este código en la consola del navegador (F12)

console.log('=== TEST DE LOGIN FOXLAB ===\n');

// 1. Verificar que supabase está disponible
console.log('1. Verificando módulo de Supabase...');
try {
  // Intentar acceder al módulo
  const supabaseModule = await import('/src/lib/supabase.ts');
  console.log('✓ Módulo de Supabase cargado correctamente');

  // 2. Verificar cliente
  console.log('\n2. Verificando cliente de Supabase...');
  if (supabaseModule.supabase) {
    console.log('✓ Cliente de Supabase disponible');
  } else {
    console.error('✗ Cliente de Supabase no disponible');
  }

  // 3. Probar autenticación
  console.log('\n3. Probando autenticación...');
  console.log('Ingresa tus credenciales:');

  const email = prompt('Email:');
  const password = prompt('Password:');

  if (email && password) {
    console.log(`Intentando login con: ${email}`);

    const result = await supabaseModule.signIn(email, password);

    console.log('\n=== RESULTADO ===');
    console.log('Data:', result);

    if (result && result.session) {
      console.log('✓ Login EXITOSO');
      console.log('Usuario:', result.user.email);
      console.log('Sesión válida hasta:', new Date(result.session.expires_at * 1000));
    } else {
      console.error('✗ Login FALLÓ - No hay sesión');
    }
  } else {
    console.log('Prueba cancelada');
  }

} catch (error) {
  console.error('\n=== ERROR ===');
  console.error('Mensaje:', error.message);
  console.error('Detalles:', error);

  if (error.message.includes('Invalid login credentials')) {
    console.log('\n💡 Solución: Verifica email y contraseña');
  } else if (error.message.includes('Email not confirmed')) {
    console.log('\n💡 Solución: Confirma el email en Supabase Dashboard');
  } else if (error.message.includes('variables de entorno')) {
    console.log('\n💡 Solución: Configura PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY en .env');
  }
}

console.log('\n=== FIN DEL TEST ===');
