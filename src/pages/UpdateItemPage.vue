<template>
  <q-input
    v-model="form.name"
    label="Counter Name"
    outlined
    clearable
    class="q-ma-md"
  />
  <q-input
    v-model.number="form.currCount"
    label="Count"
    type="number"
    outlined
    clearable
    class="q-ma-md"
  />
  <q-color v-model="form.color" class="my-picker" />
  <br />
  <q-btn unelevated color="primary" :onclick="onClick" :disable="loading">
    Update Item
  </q-btn>
  <q-inner-loading :showing="loading" label="Please wait...">
    <q-spinner-clock size="50px" color="primary" />
  </q-inner-loading>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuasar } from "quasar";
import { DateTime } from "luxon";
import { db } from "src/database";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "IndexPage",

  components: {},
  setup() {
    const $quasar = useQuasar();
    const loading = ref(true);
    const form = ref({
      name: "",
      color: "#000000",
      currCount: 0,
    });
    const routr = useRoute();
    const ident = computed(() => parseInt(routr.query.id));
    db.counter
      .get(ident.value)
      .then((val) => {
        console.log(val);
        form.value = val;
        loading.value = false;
      })
      .catch(console.error);
    const onClick = () => {
      const content = form.value;
      content.lastUpdated = DateTime.now().toISO();
      console.log(content);
      console.log("load of bread");
      db.counter.update(form.value.id, { ...content });
      $quasar.notify("Updated Note to Local");
    };
    return { form, onClick, loading };
  },
});
</script>
