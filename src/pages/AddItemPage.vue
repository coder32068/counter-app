<template>
  <q-input
    v-model="form.name"
    label="Counter Name"
    outlined
    clearable
    class="q-ma-md"
  />
  <q-color v-model="form.color" class="my-picker" />
  <br />
  <q-btn unelevated color="primary" :onclick="onClick">Add Item</q-btn>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { DateTime } from "luxon";
import { db } from "src/database";

export default defineComponent({
  name: "IndexPage",

  components: {},
  setup() {
    const $quasar = useQuasar();
    const form = ref({
      name: "",
      color: "#000000",
    });
    const onClick = () => {
      const content = form.value;
      content.created = DateTime.now().toISO();
      content.lastUpdated = DateTime.now().toISO();
      content.currCount = 0;
      console.log(content);
      console.log("load of bread");
      db.counter.add({ ...content });
      $quasar.notify("Saved Note to Local");
    };
    return { form, onClick };
  },
});
</script>
