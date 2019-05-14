# vue-cli-plugin-tsx

Write vue in TSX, powered by `babel-plugin-macros` and `vue-tsx.macro`.

### Install

**NOTICE**: This package only works for `vue 2` and projects created by `vue-cli`.

**NOTICE**: This package isn't campatible with `@vue/cli-plugin-typescript`.

```bash
npm install -D vue-cli-plugin-tsx
```

or

```bash
yarn add -D vue-cli-plugin-tsx
```

### Example

```jsx
import LogoAsset from '../assets/logo.png'
import { component, type as t, EVENTS, SCOPED_SLOTS } from 'vue-tsx.macro'
import HelloWorld from '../components/HelloWorld.vue'
import { VNode } from 'vue'

const Component = component({
  props: {
    // optional prop with type string | undefined.
    propWithVuePropType: String,
    // required prop with type number
    propWithVuePropDef: {
      type: Number,
      required: true,
    },
    // optional prop with type { a: number; b?: string } | undefined
    propWithTSType: t<{ a: number; b?: string }>(),
    // required prop
    propWithRequiredTSType: {
      type: t<number[]>(),
      required: true,
    },
  },

  // Declare component's events with their payload types.
  // This field will be removed by macro.
  [EVENTS]: {
    eventWithStringPayload: String,
    eventWithTSPayload: t<{ count: number }>(),
  },

  // Declare component's scoped slots' scope (param) types.
  // Single required child of function.
  [SCOPED_SLOTS]: {
    default: {
      scope: Number,
      required: true,
    }
  },

  render() {
    return (
      <div>
        {this.propWithTSType ? this.propWithTSType.a : undefined}
        <HelloWorld />
        {this.$scopedSlots.default(this.propWithVuePropDef)}
      </div>
    )
  },
})

const Home = component({
  // Because Vue supports function child only if it's the only child.
  // It means if we only declare scoped slots with only one default one,
  // the component can accept a function.
  render() {
    return (
      <div
        class='home'
        on={{
          click: event => {
            console.log(event.target)
          },
        }}>
        <img alt='123' src={LogoAsset} />
        <Component propWithRequiredTSType={[1, 2]} propWithVuePropDef={123}>
          {() => [<hr />]}
        </Component>
        <!-- Or through attributes -->
        <Component props={{
          propWithRequiredTSType: [1, 2],
          propWithVuePropDef: 123,
        }} scopedSlots={{
          default: props => [<hr />]
        }} on={{
          eventWithStringPayload: payload => console.log(payload)
        }} />
        <!-- Or through spreading attributes -->
        const attrs = {
          props: {
            propWithRequiredTSType: [1, 2],
            propWithVuePropDef: 123,
          },
          scopedSlots: {
            default: props => [<hr />]
          },
          on: {
            eventWithStringPayload: payload => console.log(payload)
          }
        }
        <Component {...attrs}  />
      </div>
    )
  },
})

export default Home
```
