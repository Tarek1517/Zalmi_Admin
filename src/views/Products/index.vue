<script setup>
import { ref, onMounted, watch } from "vue";
import useAxios from "@/composables/useAxios";
import Modal2 from "@/components/Modal2.vue";
import { toast } from "vue3-toastify";

const { loading, error, sendRequest } = useAxios();
const products = ref(null);
const search = ref("");

const getProducts = async (query = "", page = 1) => {
  try {
    const response = await sendRequest({
      method: "get",
      url: `/v1/products?search=${query}&page=${page}`,
    });
    if (response) {
      products.value = response?.data?.data;
    }
  } catch (err) {
    console.error("Failed to fetch products:", err);
    toast.error("Failed to load products");
  }
};

const toggleProductStatus = async (product) => {
  try {
    const newStatus = product.status === true || product.status === "true" ? false : true;
    await sendRequest({
      method: "put",
      url: `/v1/products/${product.id}`,
      data: { ...product, status: newStatus },
    });
    await getProducts(search.value);
    toast.success(`Product ${newStatus ? "activated" : "deactivated"}`);
  } catch (err) {
    console.error("Failed to update product status:", err);
    toast.error("Failed to update product status");
  }
};


const isDeleteModalOpened = ref(false);
const deleteProductId = ref(null);
const deleteProductName = ref("");

const deleteProduct = (id) => {
  const prod = products.value?.data?.find((p) => p.id === id) || products.value?.find((p) => p.id === id);
  deleteProductId.value = id;
  deleteProductName.value = prod?.title || "this product";
  isDeleteModalOpened.value = true;
};

const confirmDelete = async () => {
  if (!deleteProductId.value) return;

  try {
    await sendRequest({
      method: "delete",
      url: `/v1/products/${deleteProductId.value}`,
    });

    toast.success(`🗑️ ${deleteProductName.value} deleted successfully`, {
      autoClose: 1500,
      theme: "dark",
    });

    await getProducts(search.value);
  } catch (err) {
    console.error("Failed to delete product:", err);
    toast.error("Failed to delete product");
  } finally {
    closeModal();
  }
};

const closeModal = () => {
  isDeleteModalOpened.value = false;
  deleteProductId.value = null;
  deleteProductName.value = "";
};

// Pagination functions
const goToPage = (page) => {
  getProducts(search.value, page);
};

const extractPage = (url) => {
  if (!url) return 1;
  const match = url.match(/page=(\d+)/);
  return match ? parseInt(match[1]) : 1;
};

onMounted(() => {
  getProducts();
});

watch(search, (newValue) => {
  getProducts(newValue, 1);
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Product List</h2>
    </div>

    <!-- Products List -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-5 border-b border-gray-100 flex justify-between items-center">
        <input
          type="text"
          id="table-search"
          v-model="search"
          placeholder="Search products..."
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
        />
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="products && (products.data?.length > 0 || products.length > 0)">
              <tr v-for="product in (products.data || products)" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-md object-cover"
                        :src="product.cover_image_url || '/placeholder-image.jpg'"
                        :alt="product.title"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {{ product.title }}
                      </div>
                      <div class="text-sm text-gray-600">
                       <span class="text-sm text-gray-900 font-semibold">Brand :</span> {{ product.brand?.name || 'No brand' }}
                      </div>
                      <div class="text-sm text-gray-600">
                      <span class="text-sm text-gray-900 font-semibold">category :</span>  {{ product.category?.name || 'Uncategorized' }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div v-if="product.vendor" class="text-sm">
                    <div class="font-medium text-gray-900">{{ product.vendor.vendorName }}</div>
                    <div class="text-gray-600">{{ product.vendor.email }}</div>
                    <div class="text-gray-600">{{ product.vendor.phoneNumber }}</div>
                  </div>
                  <div v-else class="text-sm text-gray-500">No vendor</div>
                </td>
               
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ parseFloat(product.price).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ product.stock }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-green-100 text-green-800': product.stock > (product.low_stock_threshold || 10) * 1.2,
                      'bg-yellow-100 text-yellow-800': product.stock > (product.low_stock_threshold || 10) && product.stock <= (product.low_stock_threshold || 10) * 1.2,
                      'bg-red-100 text-red-800': product.stock <= (product.low_stock_threshold || 10),
                    }"
                  >
                    {{
                      product.stock <= (product.low_stock_threshold || 10)
                        ? "Out of Stock"
                        : product.stock <= (product.low_stock_threshold || 10) * 1.2
                        ? "Low Stock"
                        : "In Stock"
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      product.status == true || product.status == 'true'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    ]"
                  >
                    {{
                      product.status == true || product.status == "true"
                        ? "Active"
                        : "Inactive"
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="toggleProductStatus(product)"
                      class="p-1.5 rounded-md transition-colors"
                      :class="
                        (product.status == true || product.status == 'true')
                          ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                          : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                      "
                      :title="
                        (product.status == true || product.status == 'true')
                          ? 'Deactivate Product'
                          : 'Activate Product'
                      "
                    >
                      <Icon
                        :name="
                          (product.status == true || product.status == 'true')
                            ? 'heroicons:eye-slash'
                            : 'heroicons:eye'
                        "
                        class="h-4 w-4"
                      />
                    </button>
                    <button
                      @click="deleteProduct(product.id)"
                      class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                      title="Delete product"
                    >
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
                  No products found
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="products && products.meta" class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ products.meta.from }} to {{ products.meta.to }} of {{ products.meta.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              v-if="products.links.prev"
              @click="goToPage(extractPage(products.links.prev))"
              class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              v-if="products.links.next"
              @click="goToPage(extractPage(products.links.next))"
              class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal2
      title="Delete Product"
      :isOpen="isDeleteModalOpened"
      @modal-close="closeModal"
      size="sm"
    >
      <div class="p-6 text-center">
        <Icon
          name="heroicons:exclamation-triangle"
          class="mx-auto text-red-500 w-12 h-12 mb-3"
        />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Are you sure you want to delete {{ deleteProductName }}?
        </h3>
        <p class="text-sm text-gray-500 mb-6">This action cannot be undone.</p>

        <div class="flex justify-center gap-3">
          <button
            @click="closeModal"
            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal2>
  </div>
</template>