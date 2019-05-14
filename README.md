# vue-cli-plugin-tsx

Write vue in TSX, powered by `babel-plugin-macros`, `vue-tsx.macro` and `babel-plugin-transform-vue-jsx-spread-attributes`.

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
import LogoAsset from '@/assets/logo.png'
import { component, type as t, EVENTS, SCOPED_SLOTS } from 'vue-tsx.macro'
import HelloWorld from '@/components/HelloWorld.vue'
import { VNode } from 'vue'

const Component = component({
  props: {
    // optional prop with type string | undefined.
    propWithVuePropType: String,
    // required prop with type number
    propWithVuePropDef: {
      type: Number,
      // If prop contains required filed, no matter of its value (true of false),
      // this prop will be required.
      // Because in most cases, we only set required when it's true.
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
    const attrs = {
      // names that not Vue's VNode options key name will
      // move to attrs property. And Vue will pick them to
      // props if defined in Component's props field.
      propWithRequiredTSType: [1, 2],
      propWithVuePropDef: 123,

      // We can pass scoped slots to children to generate VNodes.
      scopedSlots: {
        default: props => [<hr />]
      },

      // Due to TS' restriction, we cannot derive key named 'onEventWithStringPayload',
      // so we cannot pass event listener as attribute, and we should pass them in `on`
      // attribute.
      on: {
        eventWithStringPayload: payload => console.log(payload)
      }
    }

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

        <Component {...attrs}  />
      </div>
    )
  },
})

export default Home
```
