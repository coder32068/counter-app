<template>
  <q-toggle v-model="value" color="green" />
</template>
<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
function getState() {
  if (localStorage.getItem("dark") == null) {
    localStorage.setItem("dark", JSON.stringify(false));
    return JSON.parse(localStorage.getItem("dark"));
  } else {
    return JSON.parse(localStorage.getItem("dark"));
  }
}
const globals = {};
export default defineComponent({
  name: "NotePost",
  setup() {
    const dark = ref(getState());
    const $quasar = useQuasar();
    globals.$quasar = $quasar;
    $quasar.dark.set(dark.value);
    return { value: dark };
  },
  watch: {
    value(val) {
      localStorage.setItem("dark", val);
      globals.$quasar?.dark?.set(val);
    },
  },
  props: {},
});
</script>
