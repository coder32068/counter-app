<template>
  <div>
    <div class="row justify-center q-gutter-sm">
      <q-intersection
        v-for="item in items"
        :key="item.id"
        transition="scale"
        class="example-item"
      >
        <q-card class="q-ma-sm example-item" flat bordered>
          <q-card-section>
            <q-item>
              <q-item-section avatar>
                <q-avatar square :style="{ background: item.color }" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6">{{ item.name }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn flat icon="menu">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item
                        clickable
                        v-close-popup
                        :to="`/update?id=` + new String(item && item.id)"
                      >
                        <q-item-section>Edit Counter</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="item && database.counter.delete(item.id)"
                      >
                        <q-item-section> Delete Counter </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
            <div class="text-subtitle2">
              last updated: {{ DateTime.fromISO(item.lastUpdated).toHTTP() }}
            </div>
            <div class="text-subtitle2">
              created: {{ DateTime.fromISO(item.created).toHTTP() }}
            </div>
          </q-card-section>
          <q-card-section align="center">
            <b>{{ item.currCount }}</b>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat @click="onIncrement(item, $event)"> Increment </q-btn>
            <q-btn flat @click="onDecrement(item, $event)"> Decrement </q-btn>
            <q-btn flat @click="onReset(item, $event)"> Reset </q-btn>
          </q-card-actions>
        </q-card>
      </q-intersection>
      <div
        class="absolute-center"
        v-if="count !== null && !count"
        style="opacity: 0.5"
      >
        <div class="text-h2 text-primary text-center">
          <q-icon name="alarm" />
        </div>
        <div class="text-h5 text-primary text-center">No Counters</div>
      </div>
      <q-inner-loading :showing="count == null" label="Please wait...">
        <q-spinner-clock size="50px" color="primary" />
      </q-inner-loading>
    </div>
  </div>
  <br />
</template>
<style lang="sass" scoped>
.example-item
  height: 279px
  width: 290px
</style>
<script>
import { defineComponent, ref } from "vue";
import { db } from "src/database";
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { DateTime } from "luxon";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const countref = ref(0);

    return {
      countref,
      database: db,
      items: useObservable(
        liveQuery(() => {
          return db.counter.toArray();
        })
      ),
      count: useObservable(
        liveQuery(() => {
          return db.counter.count();
        })
      ),
      onIncrement: (item) => {
        db.counter.update(item.id, {
          currCount: item.currCount + 1,
          lastUpdated: DateTime.now().toISO(),
        });
      },
      onDecrement: (item) => {
        db.counter.update(item.id, {
          currCount: item.currCount - 1,
          lastUpdated: DateTime.now().toISO(),
        });
      },
      onReset: (item) => {
        db.counter.update(item.id, {
          currCount: 0,
          lastUpdated: DateTime.now().toISO(),
        });
      },
      DateTime,
    };
  },
});
</script>
