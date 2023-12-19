<template>
  <div class="scrollable">
    <table class="table">
      <thead class="table__header table-header">
        <tr class="table-header__row">
          <th class="table-header__cell" v-for="(item, index) in labels" :key="index">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody class="table__body table-body">
        <tr class="table-body__row" v-for="(item, index) in items" :key="index">
          <td class="table-body__cell" v-for="(cell, id) in item" :key="id">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: (string[] | number[])[]
  labels: string[]
}>()
</script>

<style scoped lang="scss">
.scrollable {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}

.table {
  font-size: var(--font-size-s);
  color: var(--color-font-primary);
  background: var(--color-background-primary);
  border: 1px solid var(--color-extra-light);
  border-collapse: collapse;
  width: 100%;

  &-header {
    &__row {
      background: var(--color-blue-lightest);
    }

    &__cell {
      cursor: pointer;
      text-align: left;
      font-weight: 600;
    }
  }

  &-body {
    &__row {
      cursor: pointer;
      transition: 0.1s ease;
      background: var(--color-background-white);

      &:hover {
        background: var(--color-background-primary);
      }
    }
  }

  td,
  th {
    padding: var(--space-xs) var(--space-s);
    border: 1px solid var(--color-blue-light);
  }
}

::-webkit-scrollbar {
  height: 6px;
  width: 6px;
  cursor: pointer;
}

::-webkit-scrollbar-track {
  background: var(--color-background-primary);
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-font-third);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-font-secondary);
}
</style>
