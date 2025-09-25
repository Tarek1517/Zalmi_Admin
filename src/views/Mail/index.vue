<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";

// Default email settings
const defaultEmailSettings = {
  fromName: "Your Company",
  fromEmail: "noreply@example.com",
  toEmail: "", // 👈 Added recipient email
  subject: "",
  message: "",
};

// Reactive settings object
const settings = ref({
  email: { ...defaultEmailSettings },
});

// Send test email (dummy implementation)
const sendTestEmail = async () => {
  if (!settings.value.email.fromEmail || !settings.value.email.toEmail) {
    toast.error("Please enter both From Email and To Email", { theme: "dark" });
    return;
  }

  toast.info("Sending test email...", { theme: "dark" });

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(`Test email sent to ${settings.value.email.toEmail}`, {
      theme: "dark",
    });
  } catch (error) {
    toast.error("Failed to send test email", { theme: "dark" });
  }
};
</script>

<template>
  <!-- Send Email -->
  <div class="space-y-6 w-full max-w-3xl mx-auto mt-1">
    <!-- Header -->
    <div class="flex items-center justify-center gap-3 mb-12">
      <div class="p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
        <Icon name="lucide:mail" class="w-5 h-5 text-blue-600" />
      </div>
      <h3 class="text-xl font-semibold text-gray-900">Send Email</h3>
    </div>

    <div class="space-y-5">
      <!-- From / To Section -->
      <div class="grid grid-cols-2 gap-6">
        <!-- From Name -->
        <div class="group">
          <label
            class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            From
          </label>
          <div class="relative">
            <input
              v-model="settings.email.fromName"
              type="text"
              class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Your Company Name"
            />
            <Icon
              name="lucide:edit-3"
              class="w-4 h-4 text-purple-400 absolute left-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>

        <!-- From Email -->
        <div class="group">
          <label
            class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            From Email
          </label>
          <div class="relative">
            <input
              v-model="settings.email.fromEmail"
              type="email"
              class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="noreply@example.com"
            />
            <Icon
              name="lucide:mail"
              class="w-4 h-4 text-sky-400 absolute left-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>

        <!-- To Email -->
        <div class="group col-span-2">
          <label
            class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            To Email
          </label>
          <div class="relative">
            <input
              v-model="settings.email.toEmail"
              type="email"
              class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="recipient@example.com"
            />
            <Icon
              name="lucide:mail"
              class="w-4 h-4 text-indigo-400 absolute left-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      <!-- Subject -->
      <div class="group">
        <label
          class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
        >
          Subject
        </label>
        <div class="relative">
          <input
            v-model="settings.email.subject"
            type="text"
            class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
            placeholder="Test Email Subject"
          />
          <Icon
            name="lucide:pen-line"
            class="w-4 h-4 text-rose-400 absolute left-4 top-1/2 transform -translate-y-1/2"
          />
        </div>
      </div>

      <!-- Message -->
      <div class="group">
        <label
          class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
        >
          Message
        </label>
        <div class="relative">
          <textarea
            v-model="settings.email.message"
            rows="5"
            class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
            placeholder="Write your email message here..."
          ></textarea>
          <Icon
            name="lucide:edit"
            class="w-4 h-4 text-green-400 absolute left-4 top-4"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-4 mt-8">
        <button
          @click="sendTestEmail"
          class="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Icon name="lucide:send" class="w-4 h-4" />
          Send Email
        </button>
      </div>
    </div>
  </div>
</template>
