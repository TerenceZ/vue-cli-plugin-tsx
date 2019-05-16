import HomeContent from '@/components/HomeContent'
import { functional } from 'vue-tsx.macro'

export default functional(() => (
  <HomeContent message='Hellow JSX'>{message => message}</HomeContent>
))
