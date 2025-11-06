<template>
  <div class="bg-black border border-orange-500/20 rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-orange-500 font-mono text-xl flex items-center gap-2">
        <FolderKanban class="w-6 h-6" />
        PROJECT MANAGEMENT
      </h2>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-mono text-sm rounded transition-colors"
      >
        <Plus class="w-4 h-4" />
        NEW PROJECT
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

    <!-- Projects Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-orange-500/20">
            <th class="text-left text-orange-500 font-mono text-xs py-3 px-4">ID</th>
            <th class="text-left text-orange-500 font-mono text-xs py-3 px-4">TITLE</th>
            <th class="text-left text-orange-500 font-mono text-xs py-3 px-4">TYPE</th>
            <th class="text-left text-orange-500 font-mono text-xs py-3 px-4">STATUS</th>
            <th class="text-left text-orange-500 font-mono text-xs py-3 px-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="project in filteredProjects"
            :key="project.id"
            class="border-b border-orange-500/10 hover:bg-orange-500/5 transition-colors"
          >
            <td class="text-gray-400 font-mono text-sm py-3 px-4">{{ project.id }}</td>
            <td class="text-gray-300 font-mono text-sm py-3 px-4">{{ project.title }}</td>
            <td class="text-gray-400 font-mono text-sm py-3 px-4">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="
                  project.type === 'APP'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-purple-500/20 text-purple-400'
                "
              >
                {{ project.type }}
              </span>
            </td>
            <td class="text-gray-400 font-mono text-sm py-3 px-4">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="getStatusClass(project.status)"
              >
                {{ project.status }}
              </span>
            </td>
            <td class="py-3 px-4">
              <div class="flex gap-2">
                <button
                  @click="editProject(project)"
                  class="p-2 hover:bg-orange-500/20 text-orange-500 rounded transition-colors"
                  title="Edit"
                >
                  <Pencil class="w-4 h-4" />
                </button>
                <button
                  @click="deleteProject(project)"
                  class="p-2 hover:bg-red-500/20 text-red-500 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Project Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-zinc-900 border-2 border-orange-500/50 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-zinc-900 border-b border-orange-500/20 p-6 flex items-center justify-between">
          <h3 class="text-orange-500 font-mono text-lg">
            {{ isEditing ? 'EDIT PROJECT' : 'NEW PROJECT' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-orange-500">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="saveProject" class="p-6 space-y-4">
          <!-- ID -->
          <div>
            <label class="block text-orange-500 font-mono text-sm mb-2">ID</label>
            <input
              v-model="formData.id"
              type="text"
              required
              :disabled="isEditing"
              class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500 disabled:opacity-50"
              placeholder="MSN_XXX"
            />
          </div>

          <!-- Title -->
          <div>
            <label class="block text-orange-500 font-mono text-sm mb-2">TITLE</label>
            <input
              v-model="formData.title"
              type="text"
              required
              class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-orange-500 font-mono text-sm mb-2">DESCRIPTION</label>
            <textarea
              v-model="formData.description"
              required
              rows="3"
              class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          <!-- Type & Status -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">TYPE</label>
              <select
                v-model="formData.type"
                required
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              >
                <option value="APP">APP</option>
                <option value="DATA">DATA</option>
              </select>
            </div>
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">STATUS</label>
              <select
                v-model="formData.status"
                required
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="PENDING">PENDING</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>

          <!-- Skills (comma-separated) -->
          <div>
            <label class="block text-orange-500 font-mono text-sm mb-2">
              SKILLS (comma-separated)
            </label>
            <input
              v-model="skillsInput"
              type="text"
              class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              placeholder="Python, Vue, Docker"
            />
          </div>

          <!-- Objectives (one per line) -->
          <div>
            <label class="block text-orange-500 font-mono text-sm mb-2">
              OBJECTIVES (one per line)
            </label>
            <textarea
              v-model="objectivesInput"
              rows="4"
              class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              placeholder="Objective 1&#10;Objective 2&#10;Objective 3"
            />
          </div>

          <!-- Optional Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">IMAGE URL</label>
              <input
                v-model="formData.image"
                type="text"
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">ELAPSED TIME</label>
              <input
                v-model="formData.elapsed_time"
                type="text"
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
                placeholder="1400:00"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">REPOSITORY URL</label>
              <input
                v-model="formData.repository"
                type="url"
                class="w-full bg-black border border-orange-500/50 text-gray-300 font-mono p-3 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-orange-500 font-mono text-sm mb-2">DEMO URL</label>
              <input
                v-model="formData.demo"
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
              {{ isSaving ? 'SAVING...' : 'SAVE PROJECT' }}
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
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  X,
} from 'lucide-vue-next';
import {
  getAllProjects,
  createProject,
  updateProject as updateProjectApi,
  deleteProject as deleteProjectApi,
} from '../lib/supabase';

const projects = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const activeFilter = ref('ALL');

const filters = [
  { label: 'ALL', value: 'ALL' },
  { label: 'APP', value: 'APP' },
  { label: 'DATA', value: 'DATA' },
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'COMPLETED', value: 'COMPLETED' },
];

const formData = ref({
  id: '',
  title: '',
  description: '',
  type: 'APP',
  status: 'ACTIVE',
  image: '',
  elapsed_time: '',
  repository: '',
  demo: '',
});

const skillsInput = ref('');
const objectivesInput = ref('');

const filteredProjects = computed(() => {
  if (activeFilter.value === 'ALL') return projects.value;
  if (activeFilter.value === 'APP' || activeFilter.value === 'DATA') {
    return projects.value.filter((p) => p.type === activeFilter.value);
  }
  return projects.value.filter((p) => p.status === activeFilter.value);
});

const getStatusClass = (status) => {
  const classes = {
    ACTIVE: 'bg-green-500/20 text-green-400',
    COMPLETED: 'bg-blue-500/20 text-blue-400',
    PENDING: 'bg-yellow-500/20 text-yellow-400',
    ARCHIVED: 'bg-gray-500/20 text-gray-400',
  };
  return classes[status] || '';
};

const loadProjects = async () => {
  try {
    projects.value = await getAllProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  resetForm();
  showModal.value = true;
};

const editProject = (project) => {
  isEditing.value = true;
  formData.value = { ...project };
  skillsInput.value = project.skills?.join(', ') || '';
  objectivesInput.value = project.objectives?.join('\n') || '';
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  formData.value = {
    id: '',
    title: '',
    description: '',
    type: 'APP',
    status: 'ACTIVE',
    image: '',
    elapsed_time: '',
    repository: '',
    demo: '',
  };
  skillsInput.value = '';
  objectivesInput.value = '';
};

const saveProject = async () => {
  isSaving.value = true;
  try {
    const projectData = {
      ...formData.value,
      skills: skillsInput.value.split(',').map((s) => s.trim()).filter(Boolean),
      objectives: objectivesInput.value.split('\n').filter(Boolean),
    };

    if (isEditing.value) {
      await updateProjectApi(projectData.id, projectData);
    } else {
      await createProject(projectData);
    }

    await loadProjects();
    closeModal();
  } catch (error) {
    console.error('Error saving project:', error);
    alert('Error saving project: ' + error.message);
  } finally {
    isSaving.value = false;
  }
};

const deleteProject = async (project) => {
  if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

  try {
    await deleteProjectApi(project.id);
    await loadProjects();
  } catch (error) {
    console.error('Error deleting project:', error);
    alert('Error deleting project: ' + error.message);
  }
};

onMounted(() => {
  loadProjects();
});
</script>
