<script setup>
import Modal from "@/components/Modal.vue";
import { ref, onMounted, watch } from "vue";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
const router = useRouter();

const { loading, error, sendRequest } = useAxios();

// Static e-commerce category data for demonstration
const categories = ref([
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    icon: "mdi:laptop",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150",
    order_number: 1,
    parent_id: null,
    product_count: 156,
    commission_rate: 5,
    status: "active",
    children: [
      {
        id: 2,
        name: "Smartphones",
        slug: "smartphones",
        icon: "mdi:cellphone",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150",
        order_number: 1,
        parent_id: 1,
        product_count: 89,
        commission_rate: 6,
        status: "active",
        children: [
          {
            id: 3,
            name: "Android Phones",
            slug: "android-phones",
            icon: "mdi:android",
            image:
              "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=150",
            order_number: 1,
            parent_id: 2,
            commission_rate: 5,
            product_count: 45,
            status: "active",
          },
          {
            id: 4,
            name: "iPhones",
            slug: "iphones",
            icon: "mdi:apple",
            image:
              "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=150",
            order_number: 2,
            parent_id: 2,
            commission_rate: 5,
            product_count: 32,
            status: "active",
          },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        slug: "laptops",
        icon: "mdi:laptop",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150",
        order_number: 2,
        parent_id: 1,
        product_count: 67,
        commission_rate: 3,
        status: "active",
        children: [
          {
            id: 6,
            name: "Gaming Laptops",
            slug: "gaming-laptops",
            icon: "mdi:gamepad-variant",
            image:
              "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=150",
            order_number: 1,
            parent_id: 5,
            product_count: 23,
            commission_rate: 8,
            status: "active",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Fashion",
    slug: "fashion",
    icon: "mdi:tshirt-crew",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=150",
    order_number: 2,
    parent_id: null,
    product_count: 342,
    commission_rate: 7,
    status: "active",
    children: [
      {
        id: 8,
        name: "Men's Clothing",
        slug: "mens-clothing",
        icon: "mdi:account",
        image:
          "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=150",
        order_number: 1,
        parent_id: 7,
        product_count: 156,
        commission_rate: 5,
        status: "active",
      },
      {
        id: 9,
        name: "Women's Clothing",
        slug: "womens-clothing",
        icon: "mdi:account-outline",
        image:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=150",
        order_number: 2,
        parent_id: 7,
        product_count: 186,
        commission_rate: 25,
        status: "active",
      },
    ],
  },
  {
    id: 10,
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: "mdi:home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150",
    order_number: 3,
    parent_id: null,
    product_count: 278,
    commission_rate: 15,
    status: "active",
    children: [],
  },
]);

const search = ref("");
const expandedCategories = ref(new Set());

const getCategories = async (query = "") => {
  // In a real app, this would be an API call
  if (query) {
    const filtered = categories.value.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase()) ||
        cat.slug.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  }
  return categories.value;
};

// Handle category image
const categoryImg = ref(null);
const onFileChange = (image) => {
  const file = image.target.files[0];
  categoryImg.value = URL.createObjectURL(file);
  form.value.image = file;
};

const form = ref({
  name: null,
  icon: null,
  image: null,
  order_number: null,
  parent_id: null,
  status: "active",
  commission_rate: 0,
});

// Save Category
const onSubmit = async () => {
  // In a real app, this would be an API call
  const newCategory = {
    id: Math.max(...categories.value.map((c) => c.id)) + 1,
    ...form.value,
    slug: form.value.name.toLowerCase().replace(/\s+/g, "-"),
    product_count: 0,
    children: [],
  };

  if (form.value.parent_id) {
    // Find parent and add child
    const parent = findCategoryById(
      categories.value,
      parseInt(form.value.parent_id)
    );
    if (parent) {
      parent.children.push(newCategory);
    }
  } else {
    categories.value.push(newCategory);
  }

  toast.success("Category Created Successfully", {
    autoclose: 1000,
    theme: "dark",
  });
  closeModal();
};

const category = ref(null);
const editCategory = (cat) => {
  isEditModalOpened.value = true;
  category.value = { ...cat };
  categoryImg.value = category.value.image || null;
  form.value.name = category.value.name;
  form.value.icon = category.value.icon;
  form.value.order_number = category.value.order_number;
  form.value.parent_id = category.value.parent_id;
  form.value.status = category.value.status;
};

const onUpdate = async (id) => {
  // In a real app, this would be an API call
  const updatedCategory = {
    ...category.value,
    name: form.value.name,
    icon: form.value.icon,
    order_number: form.value.order_number,
    parent_id: form.value.parent_id,
    status: form.value.status,
    commission_rate:
      form.value.commission_rate ?? category.value.commission_rate, // ✅
    image: form.value.image || categoryImg.value,
  };

  // Update the category in the tree
  updateCategoryInTree(categories.value, id, updatedCategory);

  toast.success("Category Updated Successfully", {
    autoClose: 500,
    theme: "dark",
  });
  getCategories();
  closeModal();
};

const handelDelete = async (id) => {
  // In a real app, this would be an API call
  deleteCategoryFromTree(categories.value, id);

  toast.success("Category Deleted Successfully", {
    autoClose: 500,
    theme: "dark",
  });
  await getCategories();
};

const reset = () => {
  form.value.name = null;
  form.value.icon = null;
  form.value.image = null;
  form.value.order_number = null;
  form.value.parent_id = null;
  form.value.status = "active";
  categoryImg.value = null;
};

// Helper functions for category tree operations
const findCategoryById = (categories, id) => {
  for (const category of categories) {
    if (category.id === id) return category;
    if (category.children && category.children.length > 0) {
      const found = findCategoryById(category.children, id);
      if (found) return found;
    }
  }
  return null;
};

const updateCategoryInTree = (categories, id, updatedCategory) => {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id === id) {
      categories[i] = { ...categories[i], ...updatedCategory };
      return true;
    }
    if (categories[i].children && categories[i].children.length > 0) {
      if (updateCategoryInTree(categories[i].children, id, updatedCategory)) {
        return true;
      }
    }
  }
  return false;
};

const deleteCategoryFromTree = (categories, id) => {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id === id) {
      categories.splice(i, 1);
      return true;
    }
    if (categories[i].children && categories[i].children.length > 0) {
      if (deleteCategoryFromTree(categories[i].children, id)) {
        return true;
      }
    }
  }
  return false;
};

const toggleCategory = (categoryId) => {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId);
  } else {
    expandedCategories.value.add(categoryId);
  }
};

// Modal management
const isModalOpened = ref(false);
const isEditModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = false;
  isEditModalOpened.value = false;
  reset();
};

// Stats calculations
const totalCategories = ref(0);
const activeCategories = ref(0);
const categoriesWithProducts = ref(0);

const calculateStats = () => {
  let total = 0;
  let active = 0;
  let withProducts = 0;

  const countCategories = (cats) => {
    cats.forEach((cat) => {
      total++;
      if (cat.status === "active") active++;
      if (cat.product_count > 0) withProducts++;
      if (cat.children && cat.children.length > 0) {
        countCategories(cat.children);
      }
    });
  };

  countCategories(categories.value);

  totalCategories.value = total;
  activeCategories.value = active;
  categoriesWithProducts.value = withProducts;
};

onMounted(() => {
  getCategories();
  calculateStats();
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
            <template v-for="category in categories" :key="category.id">
              <!-- Parent Category Row -->
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <button
                      @click="toggleCategory(category.id)"
                      class="mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                      v-if="category.children && category.children.length > 0"
                    >
                      <Icon
                        :name="
                          expandedCategories.has(category.id)
                            ? 'heroicons:chevron-down'
                            : 'heroicons:chevron-right'
                        "
                        class="w-4 h-4"
                      />
                    </button>
                    <div
                      class="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden bg-gray-200"
                    >
                      <img
                        class="h-10 w-10 object-cover"
                        :src="category.image"
                        :alt="category.name"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ category.name }}
                      </div>
                      <div
                        class="text-sm text-gray-500 flex items-center gap-1"
                      >
                        <Icon :name="category.icon" class="w-4 h-4" />
                        <span>/{{ category.slug }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-medium">
                    {{ category.product_count }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ category.commission_rate }}%
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    {{ category.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ category.order_number }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="editCategory(category)"
                      class="text-primary hover:text-primary-dark transition-colors p-2 rounded-lg hover:bg-primary/10"
                      title="Edit category"
                    >
                      <Icon name="heroicons:pencil-square" class="w-5 h-5" />
                    </button>
                    <button
                      @click="handelDelete(category.id)"
                      class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                      title="Delete category"
                    >
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Child Categories (if expanded) -->
              <template
                v-if="
                  expandedCategories.has(category.id) &&
                  category.children &&
                  category.children.length > 0
                "
              >
                <tr
                  v-for="child in category.children"
                  :key="child.id"
                  class="bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center pl-10">
                      <button
                        @click="toggleCategory(child.id)"
                        class="mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                        v-if="child.children && child.children.length > 0"
                      >
                        <Icon
                          :name="
                            expandedCategories.has(child.id)
                              ? 'heroicons:chevron-down'
                              : 'heroicons:chevron-right'
                          "
                          class="w-4 h-4"
                        />
                      </button>
                      <div
                        class="flex-shrink-0 h-8 w-8 rounded-lg overflow-hidden bg-gray-200"
                      >
                        <img
                          class="h-8 w-8 object-cover"
                          :src="child.image"
                          :alt="child.name"
                        />
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900">
                          {{ child.name }}
                        </div>
                        <div
                          class="text-xs text-gray-500 flex items-center gap-1"
                        >
                          <Icon :name="child.icon" class="w-3 h-3" />
                          <span>/{{ category.slug }}/{{ child.slug }}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ child.product_count }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      {{ child.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ child.order_number }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <div class="flex items-center justify-end gap-2">
                      <button
                        @click="editCategory(child)"
                        class="text-primary hover:text-primary-dark transition-colors p-2 rounded-lg hover:bg-primary/10"
                        title="Edit category"
                      >
                        <Icon name="heroicons:pencil-square" class="w-4 h-4" />
                      </button>
                      <button
                        @click="handelDelete(child.id)"
                        class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                        title="Delete category"
                      >
                        <Icon name="heroicons:trash" class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- Grandchild Categories (if expanded) -->
                <template
                  v-if="
                    expandedCategories.has(child.id) &&
                    child.children &&
                    child.children.length > 0
                  "
                >
                  <tr
                    v-for="grandchild in child.children"
                    :key="grandchild.id"
                    class="bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center pl-16">
                        <div
                          class="flex-shrink-0 h-6 w-6 rounded-lg overflow-hidden bg-gray-300"
                        >
                          <img
                            class="h-6 w-6 object-cover"
                            :src="grandchild.image"
                            :alt="grandchild.name"
                          />
                        </div>
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-900">
                            {{ grandchild.name }}
                          </div>
                          <div
                            class="text-xs text-gray-500 flex items-center gap-1"
                          >
                            <Icon :name="grandchild.icon" class="w-3 h-3" />
                            <span
                              >/{{ category.slug }}/{{ child.slug }}/{{
                                grandchild.slug
                              }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ grandchild.product_count }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ grandchild.status }}
                      </span>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ grandchild.order_number }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <div class="flex items-center justify-end gap-2">
                        <button
                          @click="editCategory(grandchild)"
                          class="text-primary hover:text-primary-dark transition-colors p-2 rounded-lg hover:bg-primary/10"
                          title="Edit category"
                        >
                          <Icon
                            name="heroicons:pencil-square"
                            class="w-4 h-4"
                          />
                        </button>
                        <button
                          @click="handelDelete(grandchild.id)"
                          class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                          title="Delete category"
                        >
                          <Icon name="heroicons:trash" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </template>
            </template>
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

      <div
        v-if="categories.length === 0 && !loading"
        class="w-full h-52 flex items-center justify-center"
      >
        <div class="text-center">
          <Icon
            name="heroicons:rectangle-stack"
            class="w-16 h-16 text-gray-300 mx-auto"
          />
          <p class="mt-4 text-gray-500">
            No categories found. Create your first category!
          </p>
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
        <div class="md:col-span-2">
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
            >Parent Category</label
          >
          <select
            v-model="form.parent_id"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option :value="null">No Parent (Top Level)</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
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
        <div class="md:col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Category Name</label
          >
          <input
            v-model="category.name"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label
            for="order_number"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Order Number</label
          >
          <input
            v-model="category.order_number"
            type="number"
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
            v-model="category.status"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
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
            v-model="category.icon"
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
            v-model="category.commission_rate"
            type="number"
            min="0"
            max="100"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
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
