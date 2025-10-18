<template>
  <tr
    class="transition-colors"
    :class="{
      'bg-white': level === 0,
      'bg-orange-50': level === 1,
      'bg-cyan-50': level >= 2,
    }"
  >
    <td class="px-6 py-4 whitespace-nowrap">
      <div
        class="flex items-center"
        :style="{ paddingLeft: `${level * 2}rem` }"
      >
        <button
          v-if="category.children && category.children.length > 0"
          @click="$emit('toggle', category.id)"
          class="mr-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon
            :name="
              expandedCategories.includes(category.id)
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
            :src="category.banner_image_url"
            :alt="category.name"
            class="h-8 w-8 object-cover"
          />
        </div>

        <div class="ml-3">
          <div class="text-sm font-medium text-gray-900">
            {{ category.name }}
          </div>
          <div class="text-xs text-gray-500 flex items-center gap-1">
            <Icon :name="category.icon" class="w-3 h-3" />
            <span>{{ fullSlug }}</span>
          </div>
        </div>
      </div>
    </td>

   
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
      {{ category.commission_rate }}%
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span
        :class="[
          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
          category.status == 1
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800',
        ]"
      >
        {{ category.status == 1 ? "Active" : "Inactive" }}
      </span>
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ category.order_number }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div class="flex items-center justify-end gap-2">
        <button
          @click="$emit('edit', category)"
          class="text-primary hover:text-primary-dark transition-colors p-2 rounded-lg hover:bg-primary/10"
          title="Edit category"
        >
          <Icon name="heroicons:pencil-square" class="w-4 h-4" />
        </button>
        <button
          @click="$emit('delete', category.id)"
          class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
          title="Delete category"
        >
          <Icon name="heroicons:trash" class="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>

  <CategoryRow
    v-for="child in category.children"
    :key="child.id"
    :category="child"
    :level="level + 1"
    :expanded-categories="expandedCategories"
    @toggle="$emit('toggle', $event)"
    @edit="$emit('edit', $event)"
    @delete="$emit('delete', $event)"
    v-show="expandedCategories.includes(category.id)"
  />
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { ref, onMounted, watch, computed } from "vue";
const props = defineProps({
  category: Object,
  level: { type: Number, default: 0 },
  expandedCategories: Object,
});

const fullSlug = computed(() => {
  const slugs = [];
  let current = props.category;
  while (current) {
    slugs.unshift(current.slug);
    current = current.parent || null;
  }
  return "/" + slugs.join("/");
});

</script>
