import { component, SCOPED_SLOTS, type } from 'vue-tsx.macro'
import HelloWorld from '@/components/HelloWorld'

export default component({
  props: {
    message: {
      type: type<string>(),
      required: true,
    },
  },

  [SCOPED_SLOTS]: {
    default: {
      scope: type<string>(), // message
      required: true,
    },
  },

  render() {
    return (
      <div class='home'>
        <img alt='Vue logo' src={require('../assets/logo.png')} />
        <HelloWorld msg='Welcome to Your Vue.js App' />
        <h3>{this.message}</h3>
        <hr />
        <h4>Default Scoped Slot: {this.$scopedSlots.default(this.message)}</h4>
      </div>
    )
  },
})
