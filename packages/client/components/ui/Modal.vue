<template>
  <ClientOnly>
    <TransitionRoot appear :show="modelValue" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-mode-500"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  {{ title }}
                </DialogTitle>
                <button @click="closeModal" class="absolute right-6 top-6">
                  <Icon icon="heroicons:x-mark" :inline="true" />
                </button>
                <div class="mt-2">
                  <div>
                    <slot />
                  </div>
                </div>

                <div class="mt-4"></div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

defineProps({
  title: String,
  modelValue: Boolean, // For v-model
});

const emit = defineEmits();

const openModal = () => {
  emit("update:modelValue", true);
};

const closeModal = () => {
  emit("update:modelValue", false);
};
</script>
