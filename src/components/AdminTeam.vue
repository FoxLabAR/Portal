<template>
  <div class="bg-black border border-orange-500/20 rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-orange-500 font-mono text-xl flex items-center gap-2">
        <Users class="w-6 h-6" />
        TEAM MANAGEMENT
      </h2>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-mono text-sm rounded transition-colors"
      >
        <UserPlus class="w-4 h-4" />
        NEW MEMBER
      </button>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="activeFilter = filter.value"
        class="px-3 py-1 text-xs rounded font-mono transition-colors"
        :class="
          activeFilter === filter.value
            ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50'
            : 'bg-zinc-900 text-gray-400 hover:bg-orange-500/10'
        "
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Team Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="member in filteredMembers"
        :key="member.id"
        class="bg-zinc-900 border border-orange-500/20 rounded-lg p-4 hover:border-orange-500/50 transition-colors"
      >
        <!-- Avatar -->
        <div class="flex items-start gap-4 mb-4">
          <div class="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
            <img
              v-if="member.avatar_url"
              :src="member.avatar_url"
              :alt="member.name"
              class="w-full h-full rounded-full object-cover"
            />
            <User v-else class="w-8 h-8 text-orange-500" />
          </div>
          <div class="flex-1">
            <h3 class="text-gray-200 font-mono text-sm font-bold">{{ member.name }}</h3>
            <p class="text-orange-500/60 font-mono text-xs">{{ member.role }}</p>
            <div class="mt-1">
              <span
                class="px-2 py-0.5 rounded text-xs font-mono"
                :class="getStatusClass(member.status)"
              >
                {{ member.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <p v-if="member.bio" class="text-gray-400 text-xs mb-3 line-clamp-2">
          {{ member.bio }}
        </p>

        <!-- Specialties -->
        <div v-if="member.specialties?.length" class="flex flex-wrap gap-1 mb-3">
          <span
            v-for="(specialty, idx) in member.specialties.slice(0, 3)"
            :key="idx"
            class="px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded text-xs font-mono"
          >
            {{ specialty }}
          </span>
          <span
            v-if="member.specialties.length > 3"
            class="px-2 py-0.5 bg-zinc-800 text-gray-500 rounded text-xs font-mono"
          >
            +{{ member.specialties.length - 3 }}
          </span>
        </div>

        <!-- Social Links -->
        <div class="flex gap-2 mb-3">
          <a
            v-if="member.github_url"
            :href="member.github_url"
            target="_blank"
            class="p-2 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 rounded transition-colors"
            title="GitHub"
          >
            <Github class="w-4 h-4" />
          </a>
          <a
            v-if="member.linkedin_url"
            :href="member.linkedin_url"
            target="_blank"
            class="p-2 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 rounded transition-colors"
            title="LinkedIn"
          >
            <Linkedin class="w-4 h-4" />
          </a>
          <a
            v-if="member.email"
            :href="`mailto:${member.email}`"
            class="p-2 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 rounded transition-colors"
            title="Email"
          >
            <Mail class="w-4 h-4" />
          </a>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 pt-3 border-t border-orange-500/10">
          <button
            @click="editMember(member)"
            class="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-orange-500/20 text-orange-500 rounded transition-colors font-mono text-xs"
          >
            <Pencil class="w-3 h-3" />
            EDIT
          </button>
          <button
            @click="deleteMember(member)"
            class="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-red-500/20 text-red-500 rounded transition-colors font-mono text-xs"
          >
            <Trash2 class="w-3 h-3" />
            DELETE
          </button>
        </div>
      </div>
    </div>

    <!-- Member Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-zinc-900 border-2 border-orange-500/50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-zinc-900 border-b border-orange-500/20 p-6 flex items-center justify-between">
          <h3 class="text-orange-500 font-mono text-lg">
            {{ isEditing ? 'EDIT TEAM MEMBER' : 'NEW TEAM MEMBER' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-orange-500">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="saveMember" class="p-6 space-y-4">
          <!-- Name & Role -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">NAME *</label>
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">ROLE *</label>
              <input
                v-model="formData.role"
                type="text"
                required
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <!-- Bio -->
          <div>
            <label class="block text-orange-500 font-mono text-sm mb-2">BIO</label>
            <textarea
              v-model="formData.bio"
              rows="3"
              class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          <!-- Specialties -->
          <div>
            <label class="block text-orange-500 font-mono text-sm mb-2">
              SPECIALTIES (comma-separated)
            </label>
            <input
              v-model="specialtiesInput"
              type="text"
              class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              placeholder="Full Stack, Python, Vue.js"
            />
          </div>

          <!-- Status & Rank -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">STATUS</label>
              <select
                v-model="formData.status"
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ALUMNI">ALUMNI</option>
              </select>
            </div>
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">RANK</label>
              <input
                v-model.number="formData.rank"
                type="number"
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
                placeholder="0-100"
              />
            </div>
          </div>

          <!-- Avatar Upload -->
          <div>
            <label class="block text-orange-500 font-mono text-sm mb-2">AVATAR</label>
            <div class="grid grid-cols-2 gap-4">
              <!-- Preview -->
              <div class="flex items-center gap-4">
                <div class="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center overflow-hidden">
                  <img
                    v-if="avatarPreview || formData.avatar_url"
                    :src="avatarPreview || formData.avatar_url"
                    alt="Preview"
                    class="w-full h-full object-cover"
                  />
                  <User v-else class="w-10 h-10 text-orange-500" />
                </div>
                <div class="flex-1">
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileChange"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-mono text-sm rounded transition-colors"
                  >
                    {{ selectedFile ? 'CHANGE IMAGE' : 'UPLOAD IMAGE' }}
                  </button>
                  <p v-if="selectedFile" class="text-gray-400 text-xs mt-1 truncate">
                    {{ selectedFile.name }}
                  </p>
                  <p v-if="isUploading" class="text-orange-500 text-xs mt-1 animate-pulse">
                    Uploading...
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-orange-500 font-mono text-sm mb-2">EMAIL</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">GITHUB URL</label>
              <input
                v-model="formData.github_url"
                type="url"
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">LINKEDIN URL</label>
              <input
                v-model="formData.linkedin_url"
                type="url"
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              :disabled="isSaving"
              class="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-mono py-3 px-6 rounded transition-colors disabled:opacity-50"
            >
              {{ isSaving ? 'SAVING...' : 'SAVE MEMBER' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="flex-1 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-mono py-3 px-6 rounded transition-colors"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  Users,
  UserPlus,
  User,
  Pencil,
  Trash2,
  X,
  Github,
  Linkedin,
  Mail,
} from 'lucide-vue-next';
import {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember as updateTeamMemberApi,
  deleteTeamMember as deleteTeamMemberApi,
  uploadAvatar,
  getAvatarUrl,
} from '../lib/supabase';

const members = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const isUploading = ref(false);
const activeFilter = ref('ALL');
const selectedFile = ref(null);
const avatarPreview = ref('');
const fileInput = ref(null);

const filters = [
  { label: 'ALL', value: 'ALL' },
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'INACTIVE', value: 'INACTIVE' },
  { label: 'ALUMNI', value: 'ALUMNI' },
];

const formData = ref({
  name: '',
  role: '',
  bio: '',
  status: 'ACTIVE',
  rank: 50,
  avatar_url: '',
  email: '',
  github_url: '',
  linkedin_url: '',
});

const specialtiesInput = ref('');

const filteredMembers = computed(() => {
  if (activeFilter.value === 'ALL') return members.value;
  return members.value.filter((m) => m.status === activeFilter.value);
});

const getStatusClass = (status) => {
  const classes = {
    ACTIVE: 'bg-green-500/20 text-green-400',
    INACTIVE: 'bg-yellow-500/20 text-yellow-400',
    ALUMNI: 'bg-gray-500/20 text-gray-400',
  };
  return classes[status] || '';
};

const loadMembers = async () => {
  try {
    const teamMembers = await getAllTeamMembers();
    // Procesar URLs de avatares
    members.value = teamMembers.map((member) => ({
      ...member,
      avatar_url: getAvatarUrl(member.avatar_url || ''),
    }));
  } catch (error) {
    console.error('[ADMIN-TEAM] Error loading team members:', error);
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  resetForm();
  showModal.value = true;
};

const editMember = (member) => {
  isEditing.value = true;
  formData.value = { ...member };
  specialtiesInput.value = member.specialties?.join(', ') || '';
  showModal.value = true;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file');
    return;
  }

  // Validar tamaño (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Image size must be less than 2MB');
    return;
  }

  selectedFile.value = file;

  // Crear preview
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name: '',
    role: '',
    bio: '',
    status: 'ACTIVE',
    rank: 50,
    avatar_url: '',
    email: '',
    github_url: '',
    linkedin_url: '',
  };
  specialtiesInput.value = '';
  selectedFile.value = null;
  avatarPreview.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const saveMember = async () => {
  isSaving.value = true;
  try {
    let avatarUrl = formData.value.avatar_url;

    // Si hay un archivo seleccionado, subirlo primero
    if (selectedFile.value) {
      console.log('[ADMIN-TEAM] Subiendo avatar...');
      isUploading.value = true;
      try {
        avatarUrl = await uploadAvatar(selectedFile.value, selectedFile.value.name);
        console.log('[ADMIN-TEAM] Avatar subido:', avatarUrl);
      } catch (uploadError) {
        console.error('[ADMIN-TEAM] Error al subir avatar:', uploadError);
        alert('Error uploading image: ' + uploadError.message);
        return;
      } finally {
        isUploading.value = false;
      }
    }

    const memberData = {
      ...formData.value,
      avatar_url: avatarUrl,
      specialties: specialtiesInput.value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    console.log('[ADMIN-TEAM] Guardando miembro:', memberData);

    if (isEditing.value) {
      await updateTeamMemberApi(memberData.id, memberData);
    } else {
      await createTeamMember(memberData);
    }

    console.log('[ADMIN-TEAM] Miembro guardado exitosamente');
    await loadMembers();
    closeModal();
  } catch (error) {
    console.error('[ADMIN-TEAM] Error al guardar miembro:', error);
    alert('Error saving member: ' + error.message);
  } finally {
    isSaving.value = false;
  }
};

const deleteMember = async (member) => {
  if (!confirm(`Are you sure you want to delete "${member.name}"?`)) return;

  try {
    await deleteTeamMemberApi(member.id);
    await loadMembers();
  } catch (error) {
    console.error('Error deleting member:', error);
    alert('Error deleting member: ' + error.message);
  }
};

onMounted(() => {
  loadMembers();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
