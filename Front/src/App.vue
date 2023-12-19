<template>
  <main class="main">
    <FileUploader @handleFileUpload="uploadCsvFile" />
    <div class="info">
      <section class="info__block">
        <div class="info__chart">
          <BarChart
            @selectItem="getDeciles"
            :chartData="subjectsChartData"
            :items="avgSubjectsGrades"
            chartTitle="Subjects statistics"
          />
        </div>
        <DataTable :labels="subjectsLabels" :items="subjectsData" />
      </section>
      <section class="info__block">
        <div class="info__chart">
          <BarChart
            @selectItem="getSelected"
            :items="avgStudentsGrades"
            :chartData="studentsChartData"
            chartTitle="Students statistics"
          />
        </div>
        <DataTable
          :labels="studentsLabels"
          :items="[studentsData]"
          @selectItem="getSelectedGrades"
        />
      </section>
    </div>
    <Modal ref="modal">
      <template #modal>
        <div class="selected-chart">
          <h3 class="selected-chart__title">{{ selectedItemTitle }}</h3>
          <BarChart v-if="selectedChartData" :chartData="selectedChartData" />
        </div>
      </template>
    </Modal>
  </main>
</template>
<script setup lang="ts">
import FileUploader from './components/FileUploader.vue'
import BarChart from './components/BarChart.vue'
import DataTable from './components/DataTable.vue'
import Modal from './components/Modal.vue'
import { useStudentsStore } from './stores/studentsStore'
import { useSubjectsStore } from './stores/subjectsStore'

const { avgStudentsGrades, selectedGrades } = storeToRefs(useStudentsStore())
const { getAverageStudentsGrades, getSelectedGrades } = useStudentsStore()

const { avgSubjectsGrades, decileGrades } = storeToRefs(useSubjectsStore())
const { getAverageSubjectsGrades, getDecileGrades } = useSubjectsStore()

import { computed, onMounted, ref } from 'vue'

import { useFilesStore } from './stores/filesStore'
import { storeToRefs } from 'pinia'
import type { IStudentGrades } from './types'

const { uploadFile } = useFilesStore()

const modal = ref<InstanceType<typeof Modal> | null>(null)

const selectedItemData = ref<string[] | number[]>([])
const selectedItemTitle = ref('')
const selectedItemLabels = ref()

const getDeciles = async (id: string) => {
  await getDecileGrades(id)

  if (decileGrades.value) {
    selectedItemLabels.value = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    selectedItemData.value = decileGrades.value.deciles
    selectedItemTitle.value = 'Deciles statistics'
  }

  modal.value?.toggleModalStatus()
}

const getSelected = async (id: string) => {
  await getSelectedGrades(id)

  if (selectedGrades.value) {
    selectedItemLabels.value = selectedGrades.value.grades.map(
      (grade: IStudentGrades) => grade.subject.name
    )
    selectedItemData.value = selectedGrades.value.grades.map((grade: IStudentGrades) => grade.value)
    selectedItemTitle.value = 'Selected student statistics'
  }

  modal.value?.toggleModalStatus()
}

const selectedChartData = computed(() => {
  return {
    labels: selectedItemLabels.value,
    datasets: [
      {
        label: selectedItemTitle.value,
        backgroundColor: '#7ab3ef',
        data: selectedItemData.value
      }
    ]
  }
})

const uploadCsvFile = (file: File) => {
  const formdata = new FormData()
  formdata.append('file', file)
  uploadFile(formdata)
}

const dataAverage = computed(() => avgSubjectsGrades.value.map((subject) => subject.averageGrade))
const dataMedian = computed(() => avgSubjectsGrades.value.map((subject) => subject.medialGrade))
const subjectsLabels = computed(() => avgSubjectsGrades.value.map((subject) => subject.name))

const subjectsData = computed(() => [dataAverage.value, dataMedian.value])

const subjectsChartData = computed(() => {
  return {
    labels: subjectsLabels.value,
    datasets: [
      {
        label: 'Average value',
        backgroundColor: '#1666ba',
        data: dataAverage.value
      },
      {
        label: 'Median value',
        backgroundColor: '#368ce7',
        data: dataMedian.value
      }
    ]
  }
})

const studentsData = computed(() => avgStudentsGrades.value.map((student) => student.averageGrade))
const studentsLabels = computed(() => avgStudentsGrades.value.map((student) => student.name))

const studentsChartData = computed(() => {
  return {
    labels: studentsLabels.value,
    datasets: [
      {
        label: 'Average grade by student',
        backgroundColor: '#7ab3ef',
        data: studentsData.value
      }
    ]
  }
})

onMounted(() => {
  getAverageSubjectsGrades()
  getAverageStudentsGrades()
})
</script>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: wrap;
  padding: var(--space-2xl);
  background: var(--color-background-primary);
}

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  gap: var(--space-xl);
  padding: 0 var(--space-xl);

  &__block {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: var(--space-6xl);
    max-height: 100%;
    width: 100%;
    background-color: var(--color-background-white);
    padding: var(--space-l) var(--space-l) var(--space-2xl);
    box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
    position: relative;
  }

  &__chart {
    height: 300px;
  }
}

.selected-chart {
  background: var(--color-background-white);
  width: 500px;
  max-width: 100%;
  height: 300px;
  padding-bottom: var(--space-m);

  &__title {
    margin-bottom: var(--space-2xs);
  }
}

@media only screen and (max-width: 992px) {
  main {
    flex-direction: column;
  }

  .info {
    padding: 0;

    &__block {
      max-width: 100%;
    }
  }
}
</style>
./stores/subjectsStore
