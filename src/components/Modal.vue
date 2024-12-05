<template>
  <div v-if="visible" class="modal-overlay" @click="closeOnOverlayClick">
    <div class="modal-content" @click.stop>
      <!-- Modal Header -->
      <div class="modal-header px-3">
        <div class="flex items-center gap-2">
          <img src="../assets/share.svg" alt="Share this recording" class="w-4 h-4 cursor-pointer" />
          <h2 class="text-4xl font-bold">{{ title }}</h2>
        </div>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      <!-- Modal Body -->
      <div class="modal-body">
        <!-- <img :src="imageSrc" alt="Modal Image" class="modal-image" /> -->
        <img src="../assets/modalimg.jpg" alt="Modal Image" class="modal-image w-full" />
        <div class="input-group border rounded-lg px-2 py-1 flex items-center justify-between">
          <input type="text" :value="url" readonly class="py-2.5 px-2 text-gray-400 border-none w-2/3 outline-none"
            placeholder="heatmap.com/unique-ID/Oct-25-1720" @click="$emit('copy-url', url)" />
          <button @click="$emit('copy-url', url)"
            class="border border-gray100 text-black px-2.5 py-2 rounded-md flex items-center text-sm gap-2">
            <img src="../assets/copylink.svg" alt="Copy URL" class="w-4 h-4" />
            Copy URL
          </button>
        </div>
        <label class="checkbox-label">
          <!-- <input type="checkbox" v-model="startAtCurrentLocation" /> -->
          <div class="inline-flex items-center">
            <label class="flex items-center cursor-pointer relative">
              <input type="checkbox" checked v-model="startAtCurrentLocation"
                class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
                id="check4" />
              <span
                class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-[35%] transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                  stroke="currentColor" stroke-width="1">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </label>
          </div>
          <span class="text-gray-400"> Start at your current location: </span>{{ currentLocation }}
        </label>
      </div>
      <!-- Modal Footer -->
      <div class="modal-footer p-3">
        <button class="done-button flex items-center gap-3" @click="closeModal">
          Done
          <img src="../assets/checktick.svg" alt="Done" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Share Recording",
    },
    imageSrc: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    currentLocation: {
      type: String,
      default: "00:00",
    },
  },
  data() {
    return {
      startAtCurrentLocation: false,
    };
  },
  emits: ["close", "copy-url"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    closeOnOverlayClick() {
      this.closeModal();
    },
  },
};
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 8px;
    /* padding: 20px; */
    max-width: 400px;
    width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .modal-body {
    padding: 20px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 18px;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 32px;
    cursor: pointer;
  }

  .modal-image {
    display: block;
    max-width: 100%;
    margin-bottom: 15px;
    border-radius: 8px;
  }

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .url-input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 5px;
  }

  .copy-button {
    padding: 5px 10px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .copy-button:hover {
    background: #0056b3;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .checkbox-label input {
    margin-right: 10px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #ddd;
    padding-top: 10px;
  }

  .done-button {
    padding: 10px 15px;
    border: none;
    background: #2ec666;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }

  .done-button:hover {
    background: #27b45d;
  }
</style>
