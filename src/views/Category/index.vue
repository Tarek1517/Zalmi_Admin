<script setup>
import CategoryRow from "@/components/CategoryRow.vue";
import Modal from "@/components/Modal.vue";
import { ref, onMounted, watch } from "vue";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const router = useRouter();
const { loading, error, sendRequest } = useAxios();

const parentCategories = ref([]);
const categories = ref([]);
const expandedCategories = ref(new Set());
const search = ref("");
const categoryImg = ref(null);

// Form data
const form = ref({
  name: "",
  icon: "",
  banner: null,
  order_number: "",
  parent_id: null,
  status: "active",
  commission_rate: 0,
  short_description: "",
});

const toggleCategory = (id) => {
  if (expandedCategories.value.has(id)) {
    expandedCategories.value.delete(id);
  } else {
    expandedCategories.value.add(id);
  }
};

const category = ref(null);

const getParentCategories = async () => {
  try {
    const res = await sendRequest({
      method: "get",
      url: "/v1/parent/category", // this should return nested categories
    });

    const allCats = res?.data?.data || [];
    parentCategories.value = flattenCategories(allCats);
  } catch (err) {
    console.error(err);
  }
};

// Recursive flatten function
const flattenCategories = (categories, level = 0) => {
  const result = [];
  for (const cat of categories) {
    result.push({
      id: cat.id,
      name: `${"— ".repeat(level)}${cat.name}`,
    });

    if (cat.children && cat.children.length > 0) {
      result.push(...flattenCategories(cat.children, level + 1));
    }
  }
  return result;
};

const getCategories = async (page = 1) => {
  const res = await sendRequest({
    method: "get",
    url: `/v1/category?page=${page}`,
  });
  categories.value = res?.data?.data || [];
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    categoryImg.value = URL.createObjectURL(file);
    form.value.banner = file;
  }
};

const onSubmit = async () => {
  try {
    const response = await sendRequest({
      method: "post",
      url: "/v1/category",
      data: form.value,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response?.data) {
      toast.success("✅ Category Created Successfully", {
        autoClose: 1500,
        theme: "dark",
      });
      closeModal();
      await getCategories();
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to create category");
  }
};

const editCategory = (cat) => {
  isEditModalOpened.value = true;
  category.value = { ...cat };
  categoryImg.value = cat.banner_image_url || null;

  // Populate form for editing
  form.value = {
    name: cat.name,
    icon: cat.icon,
    banner: null,
    order_number: cat.order_number,
    parent_id: cat.parent_id,
    status: cat.status,
    commission_rate: cat.commission_rate,
    short_description: cat.short_description,
  };
};

const onUpdate = async (id) => {
  try {
    const formData = new FormData();
    for (const key in form.value) {
      formData.append(key, form.value[key] ?? "");
    }
    formData.append("_method", "PUT");

    const response = await sendRequest({
      method: "post",
      url: `/v1/category/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response?.data) {
      toast.success("✅ Category Updated Successfully", {
        autoClose: 1500,
        theme: "dark",
      });
      await getCategories();
      closeModal();
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update category");
  }
};

const totalCategories = ref(0);
const activeCategories = ref(0);
const categoriesWithProducts = ref(0);

// Fetch stats from API
const getCategoryStats = async () => {
  try {
    const res = await sendRequest({
      method: "get",
      url: "/v1/category/stats",
    });

    if (res?.data) {
      totalCategories.value = res.data.total;
      activeCategories.value = res.data.active;
      categoriesWithProducts.value = res.data.with_products;
    }
  } catch (err) {
    console.error("Failed to load category stats", err);
  }
};

const handelDelete = async (id) => {
  try {
    await sendRequest({
      method: "delete",
      url: `/v1/category/${id}`,
    });
    toast.success("🗑️ Category Deleted Successfully", {
      autoClose: 1500,
      theme: "dark",
    });
    await getCategories();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete category");
  }
};

const isModalOpened = ref(false);
const isEditModalOpened = ref(false);

const openModal = () => (isModalOpened.value = true);

const closeModal = () => {
  isModalOpened.value = false;
  isEditModalOpened.value = false;
  resetForm();
  categoryImg.value = null;
};

// Reset form after closing
const resetForm = () => {
  form.value = {
    name: "",
    icon: "",
    banner: null,
    order_number: "",
    parent_id: null,
    status: "active",
    commission_rate: 0,
    short_description: "",
  };
};

onMounted(() => {
  getCategories();
  getParentCategories();
  getCategoryStats();
});

watch(search, (newValue) => {
  getCategories(newValue);
});
</script>

<template>
  <AppLayout>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Total Categories -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Total Categories
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ totalCategories }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:rectangle-stack" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Active Categories -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-green-500/10 to-green-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-green-600/80"
            >
              Active Categories
            </p>
            <p class="text-3xl font-bold text-green-900">
              {{ activeCategories }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon name="heroicons:check-badge" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Categories with Products -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-purple-500/10 to-purple-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-purple-600/80"
            >
              With Products
            </p>
            <p class="text-3xl font-bold text-purple-900">
              {{ categoriesWithProducts }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="heroicons:shopping-bag" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>
    <!-- Header Section -->
    <div
      class="flex items-center justify-between py-6 bg-white rounded-xl shadow-sm mb-6"
    >
      <div>
        <div class="">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <Icon
                name="heroicons:magnifying-glass"
                class="w-5 h-5 text-gray-400"
              />
            </div>
            <input
              type="text"
              id="table-search"
              v-model="search"
              class="w-80 rounded-lg block pt-2.5 pb-2.5 pl-10 pr-4 text-sm border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 shadow-sm transition-all"
              placeholder="Search categories..."
            />
          </div>
        </div>
      </div>

      <button
        @click="openModal"
        class="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary px-4 py-3 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
      >
        <Icon name="heroicons:plus" class="w-5 h-5" />
        Add New Category
      </button>
    </div>

    <!-- Categories Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th
                scope="col"
                class="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Products
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Commission Rate
              </th>

              <th
                scope="col"
                class="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Order
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <CategoryRow
              v-for="category in categories"
              :key="category.id"
              :category="category"
              :expanded-categories="expandedCategories"
              @toggle="toggleCategory"
              @edit="editCategory"
              @delete="handelDelete"
            />
          </tbody>
        </table>
      </div>

      <div v-if="loading" class="w-full h-52 flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
          ></div>
          <p class="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    </div>
  </AppLayout>

  <!-- Create Category Modal -->
  <Modal
    title="Create New Category"
    :isOpen="isModalOpened"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Category Name</label
          >
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g. Electronics, Clothing"
          />
        </div>

        <div>
          <label
            for="status"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Status</label
          >
          <select
            v-model="form.status"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div>
          <label
            for="order_number"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Order Number</label
          >
          <input
            v-model="form.order_number"
            type="number"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Display order"
          />
        </div>

        <div>
          <label
            for="parent_id"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Parent Category
          </label>

          <select
            v-model="form.parent_id"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option :value="null">No Parent (Top Level)</option>
            <option
              v-for="cat in parentCategories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="md:col-span-1">
          <label
            for="icon"
            class="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
          >
            Icon Code
            <a
              href="https://icones.js.org/collection/all"
              target="_blank"
              class="text-primary flex items-center gap-1 text-xs"
            >
              Get icon code from here
              <Icon
                name="heroicons:arrow-top-right-on-square"
                class="w-3 h-3"
              />
            </a>
          </label>
          <input
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            v-model="form.icon"
            placeholder="e.g. mdi:laptop"
          />
        </div>

        <div class="md:col-span-1">
          <label
            for="commission_rate"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Commission Rate (%)
          </label>
          <input
            v-model="form.commission_rate"
            type="number"
            min="0"
            max="100"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g. 10"
          />
        </div>

        <div class="md:col-span-2">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="form.short_description"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Brief description about the brand..."
          ></textarea>
        </div>

        <div class="md:col-span-2">
          <label
            for="image"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Category Image</label
          >
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
          >
            <div class="space-y-1 text-center">
              <div class="flex text-sm text-gray-600 justify-center">
                <label
                  for="cover_image"
                  class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                >
                  <span>Upload an image</span>
                  <input
                    id="cover_image"
                    name="cover_image"
                    type="file"
                    class="sr-only"
                    @change="onFileChange"
                  />
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div v-if="categoryImg" class="mt-4 flex justify-center">
            <img
              :src="categoryImg"
              class="h-32 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button
          @click="closeModal"
          class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
        >
          <Icon
            name="material-symbols:close-rounded"
            class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
          />
        </button>
        <button
          @click="onSubmit"
          class="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Create Category
        </button>
      </div>
    </div>
  </Modal>

  <!-- Edit Category Modal -->
  <Modal
    title="Update Category"
    :isOpen="isEditModalOpened"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Category Name</label
          >
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label
            for="status"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Status</label
          >
          <select
            v-model="form.status"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div>
          <label
            for="order_number"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Order Number</label
          >
          <input
            v-model="form.order_number"
            type="number"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label
            for="parent_id"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Parent Category</label
          >
          <select
            v-model="form.parent_id"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option :value="null">No Parent (Top Level)</option>
            <option
              v-for="cat in parentCategories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="md:col-span-1">
          <label
            for="icon"
            class="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
          >
            Icon Code
            <a
              href="https://icones.js.org/collection/all"
              target="_blank"
              class="text-primary flex items-center gap-1 text-xs"
            >
              Get icon code from here
              <Icon
                name="heroicons:arrow-top-right-on-square"
                class="w-3 h-3"
              />
            </a>
          </label>
          <input
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            v-model="form.icon"
          />
        </div>

        <div>
          <label
            for="commission_rate"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Commission Rate (%)
          </label>
          <input
            v-model="form.commission_rate"
            type="number"
            min="0"
            max="100"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div class="md:col-span-2">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="form.short_description"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Brief description about the brand..."
          ></textarea>
        </div>

        <div class="md:col-span-2">
          <label
            for="image"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Category Image</label
          >
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
          >
            <div class="space-y-1 text-center">
              <div class="flex text-sm text-gray-600 justify-center">
                <label
                  for="cover_image_edit"
                  class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                >
                  <span>Upload a new image</span>
                  <input
                    id="cover_image_edit"
                    name="cover_image_edit"
                    type="file"
                    class="sr-only"
                    @change="onFileChange"
                  />
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div class="mt-4 flex justify-center">
            <img
              :src="categoryImg || category.image"
              class="h-32 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button
          @click="closeModal"
          class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
        >
          <Icon
            name="material-symbols:close-rounded"
            class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
          />
        </button>
        <button
          @click="onUpdate(category.id)"
          class="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Update Category
        </button>
      </div>
    </div>
  </Modal>
</template>
