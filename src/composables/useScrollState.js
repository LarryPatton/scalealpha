import { ref } from 'vue'

const currentSection = ref('hero')

export function useScrollState() {
  const setSection = (section) => {
    currentSection.value = section
  }

  return {
    currentSection,
    setSection
  }
}
