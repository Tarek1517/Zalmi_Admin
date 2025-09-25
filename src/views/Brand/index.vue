<script setup>
import Modal from "@/components/Modal.vue";
import { ref, onMounted, watch } from "vue";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
const router = useRouter();

const { loading, error, sendRequest } = useAxios();

// Static brand data for demonstration
const brands = ref([
  {
    id: 1,
    name: "Apple",
    slug: "apple",
    logo: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=150",
    description: "Innovative technology and electronics brand",
    website: "https://apple.com",
    product_count: 156,
    status: "active",
    featured: true,
    established_year: 1976
  },
  {
    id: 2,
    name: "Samsung",
    slug: "samsung",
    logo: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=150",
    description: "Global leader in electronics and appliances",
    website: "https://samsung.com",
    product_count: 234,
    status: "active",
    featured: true,
    established_year: 1938
  },
  {
    id: 3,
    name: "Nike",
    slug: "nike",
    logo: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150",
    description: "World's leading athletic footwear and apparel",
    website: "https://nike.com",
    product_count: 189,
    status: "active",
    featured: true,
    established_year: 1964
  },
  {
    id: 4,
    name: "Sony",
    slug: "sony",
    logo: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=150",
    description: "Premium electronics and entertainment products",
    website: "https://sony.com",
    product_count: 98,
    status: "active",
    featured: false,
    established_year: 1946
  },
  {
    id: 5,
    name: "Adidas",
    slug: "adidas",
    logo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=150",
    description: "Sportswear manufacturer and lifestyle brand",
    website: "https://adidas.com",
    product_count: 145,
    status: "active",
    featured: true,
    established_year: 1949
  },
  {
    id: 6,
    name: "Microsoft",
    slug: "microsoft",
    logo: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=150",
    description: "Technology company and software developer",
    website: "https://microsoft.com",
    product_count: 76,
    status: "active",
    featured: false,
    established_year: 1975
  }
]);

const search = ref("");

const getBrands = async (query = "") => {
  // In a real app, this would be an API call
  if (query) {
    const filtered = brands.value.filter(
      (brand) =>
        brand.name.toLowerCase().includes(query.toLowerCase()) ||
        brand.slug.toLowerCase().includes(query.toLowerCase()) ||
        brand.description.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  }
  return brands.value;
};

// Handle brand logo
const brandLogo = ref(null);
const onFileChange = (image) => {
  const file = image.target.files[0];
  brandLogo.value = URL.createObjectURL(file);
  form.value.logo = file;
};

const form = ref({
  name: null,
  description: null,
  website: null,
  logo: null,
  established_year: null,
  status: "active",
  featured: false
});

// Save Brand
const onSubmit = async () => {
  // In a real app, this would be an API call
  const newBrand = {
    id: Math.max(...brands.value.map((b) => b.id)) + 1,
    ...form.value,
    slug: form.value.name.toLowerCase().replace(/\s+/g, "-"),
    product_count: 0,
  };

  brands.value.push(newBrand);

  toast.success("Brand Created Successfully", {
    autoclose: 1000,
    theme: "dark",
  });
  closeModal();
};

const brand = ref(null);
const editBrand = (brd) => {
  isEditModalOpened.value = true;
  brand.value = { ...brd };
  brandLogo.value = brand.value.logo || null;
  form.value.name = brand.value.name;
  form.value.description = brand.value.description;
  form.value.website = brand.value.website;
  form.value.established_year = brand.value.established_year;
  form.value.status = brand.value.status;
  form.value.featured = brand.value.featured;
};

const onUpdate = async (id) => {
  // In a real app, this would be an API call
  const updatedBrand = {
    ...brand.value,
    name: form.value.name,
    description: form.value.description,
    website: form.value.website,
    established_year: form.value.established_year,
    status: form.value.status,
    featured: form.value.featured,
    logo: form.value.logo || brandLogo.value,
  };

  // Update the brand in the array
  const index = brands.value.findIndex(b => b.id === id);
  if (index !== -1) {
    brands.value[index] = updatedBrand;
  }

  toast.success("Brand Updated Successfully", {
    autoClose: 500,
    theme: "dark",
  });
  getBrands();
  closeModal();
};

const handelDelete = async (id) => {
  // In a real app, this would be an API call
  brands.value = brands.value.filter(brand => brand.id !== id);

  toast.success("Brand Deleted Successfully", {
    autoClose: 500,
    theme: "dark",
  });
  await getBrands();
};

const reset = () => {
  form.value.name = null;
  form.value.description = null;
  form.value.website = null;
  form.value.logo = null;
  form.value.established_year = null;
  form.value.status = "active";
  form.value.featured = false;
  brandLogo.value = null;
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
const totalBrands = ref(0);
const activeBrands = ref(0);
const featuredBrands = ref(0);

const calculateStats = () => {
  totalBrands.value = brands.value.length;
  activeBrands.value = brands.value.filter(brand => brand.status === 'active').length;
  featuredBrands.value = brands.value.filter(brand => brand.featured).length;
};

onMounted(() => {
  getBrands();
  calculateStats();
});

watch(search, (newValue) => {
  getBrands(newValue);
});
</script>

<template>
  <AppLayout>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Total Brands -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Total Brands
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ totalBrands }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:tag" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Active Brands -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-green-500/10 to-green-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-green-600/80"
            >
              Active Brands
            </p>
            <p class="text-3xl font-bold text-green-900">
              {{ activeBrands }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon name="heroicons:check-badge" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Featured Brands -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-purple-500/10 to-purple-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-purple-600/80"
            >
              Featured Brands
            </p>
            <p class="text-3xl font-bold text-purple-900">
              {{ featuredBrands }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="heroicons:star" class="text-2xl" />
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
              placeholder="Search brands..."
            />
          </div>
        </div>
      </div>

      <button
        @click="openModal"
        class="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary px-4 py-3 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
      >
        <Icon name="heroicons:plus" class="w-5 h-5" />
        Add New Brand
      </button>
    </div>

    <!-- Brands Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-primary/25">
            <tr>
              <th
                scope="col"
                class="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Brand
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
                Established
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
                Featured
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
            <tr 
              v-for="brand in brands" 
              :key="brand.id" 
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-gray-200"
                  >
                    <img
                      class="h-12 w-12 object-cover"
                      :src="brand.logo"
                      :alt="brand.name"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ brand.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      /{{ brand.slug }}
                    </div>
                    <div v-if="brand.website" class="text-xs text-blue-500">
                      <a :href="brand.website" target="_blank" class="hover:underline">
                        {{ brand.website }}
                      </a>
                    </div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-medium">
                  {{ brand.product_count }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ brand.established_year }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="brand.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ brand.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="brand.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ brand.featured ? 'Yes' : 'No' }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="editBrand(brand)"
                    class="text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-100"
                    title="Edit brand"
                  >
                    <Icon name="heroicons:pencil-square" class="w-5 h-5" />
                  </button>
                  <button
                    @click="handelDelete(brand.id)"
                    class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                    title="Delete brand"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="loading" class="w-full h-52 flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
          ></div>
          <p class="mt-4 text-gray-600">Loading brands...</p>
        </div>
      </div>

      <div
        v-if="brands.length === 0 && !loading"
        class="w-full h-52 flex items-center justify-center"
      >
        <div class="text-center">
          <Icon
            name="heroicons:tag"
            class="w-16 h-16 text-gray-300 mx-auto"
          />
          <p class="mt-4 text-gray-500">
            No brands found. Create your first brand!
          </p>
        </div>
      </div>
    </div>
  </AppLayout>

  <!-- Create Brand Modal -->
  <Modal
    title="Create New Brand"
    :isOpen="isModalOpened"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Brand Name</label
          >
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g. Apple, Nike, Samsung"
          />
        </div>

        <div class="md:col-span-2">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Brief description about the brand..."
          ></textarea>
        </div>

        <div>
          <label for="website" class="block text-sm font-medium text-gray-700 mb-1"
            >Website URL</label
          >
          <input
            v-model="form.website"
            type="url"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label for="established_year" class="block text-sm font-medium text-gray-700 mb-1"
            >Established Year</label
          >
          <input
            v-model="form.established_year"
            type="number"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g. 1976"
            min="1900"
            :max="new Date().getFullYear()"
          />
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <input
              v-model="form.status"
              id="status-active"
              name="status"
              type="radio"
              value="active"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label for="status-active" class="ml-2 block text-sm text-gray-700">
              Active
            </label>
          </div>
          <div class="flex items-center">
            <input
              v-model="form.status"
              id="status-inactive"
              name="status"
              type="radio"
              value="inactive"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label for="status-inactive" class="ml-2 block text-sm text-gray-700">
              Inactive
            </label>
          </div>
        </div>

        <div class="flex items-center">
          <input
            v-model="form.featured"
            id="featured"
            name="featured"
            type="checkbox"
            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="featured" class="ml-2 block text-sm text-gray-700">
            Featured Brand
          </label>
        </div>

        <div class="md:col-span-2">
          <label
            for="logo"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Brand Logo</label
          >
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
          >
            <div class="space-y-1 text-center">
              <div class="flex text-sm text-gray-600 justify-center">
                <label
                  for="brand_logo"
                  class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                >
                  <span>Upload a logo</span>
                  <input
                    id="brand_logo"
                    name="brand_logo"
                    type="file"
                    class="sr-only"
                    @change="onFileChange"
                    accept="image/*"
                  />
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</p>
            </div>
          </div>
          <div v-if="brandLogo" class="mt-4 flex justify-center">
            <img
              :src="brandLogo"
              class="h-32 rounded-lg object-contain shadow-md"
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
          Create Brand
        </button>
      </div>
    </div>
  </Modal>

  <!-- Edit Brand Modal -->
  <Modal
    title="Update Brand"
    :isOpen="isEditModalOpened"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Brand Name</label
          >
          <input
            v-model="brand.name"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div class="md:col-span-2">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="brand.description"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          ></textarea>
        </div>

        <div>
          <label for="website" class="block text-sm font-medium text-gray-700 mb-1"
            >Website URL</label
          >
          <input
            v-model="brand.website"
            type="url"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label for="established_year" class="block text-sm font-medium text-gray-700 mb-1"
            >Established Year</label
          >
          <input
            v-model="brand.established_year"
            type="number"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            min="1900"
            :max="new Date().getFullYear()"
          />
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <input
              v-model="brand.status"
              id="edit-status-active"
              name="edit-status"
              type="radio"
              value="active"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label for="edit-status-active" class="ml-2 block text-sm text-gray-700">
              Active
            </label>
          </div>
          <div class="flex items-center">
            <input
              v-model="brand.status"
              id="edit-status-inactive"
              name="edit-status"
              type="radio"
              value="inactive"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label for="edit-status-inactive" class="ml-2 block text-sm text-gray-700">
              Inactive
            </label>
          </div>
        </div>

        <div class="flex items-center">
          <input
            v-model="brand.featured"
            id="edit-featured"
            name="edit-featured"
            type="checkbox"
            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="edit-featured" class="ml-2 block text-sm text-gray-700">
            Featured Brand
          </label>
        </div>

        <div class="md:col-span-2">
          <label
            for="logo"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Brand Logo</label
          >
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
          >
            <div class="space-y-1 text-center">
              <div class="flex text-sm text-gray-600 justify-center">
                <label
                  for="edit_brand_logo"
                  class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                >
                  <span>Upload a new logo</span>
                  <input
                    id="edit_brand_logo"
                    name="edit_brand_logo"
                    type="file"
                    class="sr-only"
                    @change="onFileChange"
                    accept="image/*"
                  />
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</p>
            </div>
          </div>
          <div class="mt-4 flex justify-center">
            <img
              :src="brandLogo || brand.logo"
              class="h-32 rounded-lg object-contain shadow-md"
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
          @click="onUpdate(brand.id)"
          class="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Update Brand
        </button>
      </div>
    </div>
  </Modal>
</template>