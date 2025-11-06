import { createClient } from '@supabase/supabase-js';

// Variables de entorno de Supabase
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('[SUPABASE] Configuración:', {
  url: supabaseUrl ? '✓ Configurada' : '✗ No configurada',
  key: supabaseAnonKey ? '✓ Configurada' : '✗ No configurada'
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno de Supabase no están configuradas');
}

// Cliente de Supabase con configuración de persistencia
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

console.log('[SUPABASE] Cliente creado con persistSession:', true);

// =============================================
// TIPOS TYPESCRIPT
// =============================================

export interface Project {
  id: string;
  title: string;
  type: 'APP' | 'DATA';
  image?: string;
  description: string;
  objectives: string[];
  skills: string[];
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING' | 'ARCHIVED';
  elapsed_time?: string;
  repository?: string;
  demo?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  id?: string;
  codename: string;
  email: string;
  message: string;
  ip_address?: string;
  user_agent?: string;
  status?: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  created_at?: string;
  read_at?: string;
  replied_at?: string;
  notes?: string;
}

export interface PageView {
  id?: string;
  page_path: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  created_at?: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  specialties: string[];
  bio?: string;
  avatar_url?: string;
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'ALUMNI';
  rank?: number;
  created_at?: string;
  updated_at?: string;
}

// =============================================
// FUNCIONES DE PROYECTOS
// =============================================

/**
 * Obtiene todos los proyectos
 */
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener proyectos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene un proyecto por ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener proyecto:', error);
    return null;
  }

  return data;
}

/**
 * Obtiene proyectos por tipo
 */
export async function getProjectsByType(type: 'APP' | 'DATA'): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('type', type)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener proyectos por tipo:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene proyectos por estado
 */
export async function getProjectsByStatus(status: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener proyectos por estado:', error);
    throw error;
  }

  return data || [];
}

/**
 * Crea un nuevo proyecto
 */
export async function createProject(project: Omit<Project, 'created_at' | 'updated_at'>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error('Error al crear proyecto:', error);
    throw error;
  }

  return data;
}

/**
 * Actualiza un proyecto
 */
export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar proyecto:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina un proyecto
 */
export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar proyecto:', error);
    throw error;
  }
}

// =============================================
// FUNCIONES DE CONTACTOS
// =============================================

/**
 * Crea un nuevo contacto
 */
export async function createContact(contact: Omit<Contact, 'id' | 'created_at'>): Promise<Contact> {
  const { data, error } = await supabase
    .from('contacts')
    .insert([contact])
    .select()
    .single();

  if (error) {
    console.error('Error al crear contacto:', error);
    throw error;
  }

  return data;
}

/**
 * Obtiene todos los contactos (requiere autenticación)
 */
export async function getAllContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener contactos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Actualiza el estado de un contacto
 */
export async function updateContactStatus(
  id: string,
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED',
  notes?: string
): Promise<Contact> {
  const updates: Partial<Contact> = { status };

  if (status === 'READ' && !notes) {
    updates.read_at = new Date().toISOString();
  }
  if (status === 'REPLIED') {
    updates.replied_at = new Date().toISOString();
  }
  if (notes) {
    updates.notes = notes;
  }

  const { data, error } = await supabase
    .from('contacts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar contacto:', error);
    throw error;
  }

  return data;
}

// =============================================
// FUNCIONES DE ESTADÍSTICAS
// =============================================

/**
 * Registra una vista de página
 */
export async function trackPageView(pageView: Omit<PageView, 'id' | 'created_at'>): Promise<PageView> {
  const { data, error } = await supabase
    .from('page_views')
    .insert([pageView])
    .select()
    .single();

  if (error) {
    console.error('Error al registrar vista:', error);
    throw error;
  }

  return data;
}

/**
 * Obtiene estadísticas de proyectos usando la función SQL personalizada
 */
export async function getProjectStats() {
  const { data, error } = await supabase.rpc('get_project_stats');

  if (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }

  return data;
}

// =============================================
// FUNCIONES DE EQUIPO/PERSONAL
// =============================================

/**
 * Obtiene todos los miembros del equipo
 */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('rank', { ascending: false });

  if (error) {
    console.error('Error al obtener miembros del equipo:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene solo miembros activos del equipo
 */
export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase.rpc('get_active_team_members');

  if (error) {
    console.error('Error al obtener miembros activos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene un miembro del equipo por ID
 */
export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener miembro:', error);
    return null;
  }

  return data;
}

/**
 * Crea un nuevo miembro del equipo (requiere autenticación)
 */
export async function createTeamMember(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .insert([member])
    .select()
    .single();

  if (error) {
    console.error('Error al crear miembro:', error);
    throw error;
  }

  return data;
}

/**
 * Actualiza un miembro del equipo (requiere autenticación)
 */
export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar miembro:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina un miembro del equipo (requiere autenticación)
 */
export async function deleteTeamMember(id: string): Promise<void> {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar miembro:', error);
    throw error;
  }
}

// =============================================
// FUNCIONES DE AUTENTICACIÓN
// =============================================

/**
 * Inicia sesión con email y contraseña
 */
export async function signIn(email: string, password: string) {
  console.log('[SUPABASE] Iniciando signInWithPassword...');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log('[SUPABASE] Respuesta de Supabase Auth:', {
    hasData: !!data,
    hasError: !!error,
    hasUser: !!data?.user,
    hasSession: !!data?.session,
  });

  if (error) {
    console.error('[SUPABASE] Error al iniciar sesión:', error);
    throw error;
  }

  if (!data.session) {
    console.warn('[SUPABASE] ⚠️ Supabase devolvió data pero sin session');
    console.log('[SUPABASE] Data completa:', data);
  }

  return data;
}

/**
 * Cierra sesión
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
}

/**
 * Obtiene el usuario actual
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }

  return user;
}

/**
 * Verifica si hay una sesión activa
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error al obtener sesión:', error);
    return null;
  }

  return session;
}

/**
 * Suscribirse a cambios de autenticación
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}

// =============================================
// FUNCIONES DE STORAGE (IMÁGENES)
// =============================================

/**
 * Sube una imagen al bucket de avatars
 */
export async function uploadAvatar(file: File, fileName: string): Promise<string> {
  console.log('[STORAGE] Subiendo avatar:', fileName);

  // Generar nombre único con timestamp
  const timestamp = Date.now();
  const fileExt = fileName.split('.').pop();
  const uniqueFileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(uniqueFileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('[STORAGE] Error al subir archivo:', error);
    throw error;
  }

  console.log('[STORAGE] Archivo subido:', data.path);

  // Obtener URL pública
  const { data: publicUrlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

/**
 * Elimina una imagen del bucket de avatars
 */
export async function deleteAvatar(filePath: string): Promise<void> {
  console.log('[STORAGE] Eliminando avatar:', filePath);

  // Extraer el nombre del archivo de la URL
  const fileName = filePath.split('/').pop();

  if (!fileName) {
    console.warn('[STORAGE] No se pudo extraer nombre de archivo de:', filePath);
    return;
  }

  const { error } = await supabase.storage
    .from('avatars')
    .remove([fileName]);

  if (error) {
    console.error('[STORAGE] Error al eliminar archivo:', error);
    throw error;
  }

  console.log('[STORAGE] Archivo eliminado');
}

/**
 * Obtiene la URL pública de un avatar
 */
export function getAvatarUrl(fileName: string): string {
  if (!fileName) return '';

  // Si ya es una URL completa, devolverla tal cual
  if (fileName.startsWith('http')) {
    return fileName;
  }

  // Si es una ruta local (por compatibilidad con imágenes antiguas)
  if (fileName.startsWith('/')) {
    return fileName;
  }

  // Obtener URL pública de Supabase Storage
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/**
 * Lista todos los archivos en el bucket de avatars
 */
export async function listAvatars() {
  const { data, error } = await supabase.storage
    .from('avatars')
    .list();

  if (error) {
    console.error('[STORAGE] Error al listar archivos:', error);
    throw error;
  }

  return data;
}
