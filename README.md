# vue-cli-plugin-tsx

Write vue in TSX, powered by [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros), [vue-tsx.macro](https://github.com/TerenceZ/vue-tsx.macro) and [babel-plugin-transform-vue-jsx-spread-attributes](https://github.com/TerenceZ/babel-plugin-transform-vue-jsx-spread-attributes). And no runtime helpers are injected, except for merging attributes in JSX.

**NOTICE**: This package only works for `vue 2` and projects created by `vue-cli`.

**NOTICE**: This package isn't campatible with `@vue/cli-plugin-typescript`.

**NOTICE**: `<template />` isn't available, please use `scopedSlots` attribute.

**NOTICE**: The followed names / prefixes are reserved, if you use them, something will go wrong.

- staticClass
- class
- style
- key
- ref
- refInFor
- slot
- scopedSlots
- model
- domProps (prop and prefixed prop)
- on (prop and prefixed prop)
- nativeOn (prop and prefixed prop)
- hook (prop and prefixed prop)
- attrs (prop and prefixed prop)

_However, you can use them as attributes in JSX to pass related data._

### Install

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

// It will transform to Vue object with no runtime helper:
// const Component = { props: {...}, render: function () { ... } }
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
      // so we cannot pass event listener as attribute for custom component, and we should
      // pass them in `on` attribute.
      on: {
        eventWithStringPayload: payload => console.log(payload)
      }
    }

    // However, because Intrinsic Elements' listener names are known,
    // you can use such as `onMouseUp={...}` on Intrinsic Elements, e.g.,
    // div, span, and so on.
    return (
      <div
        class='home'
        onMouseDown={event => console.log(event.pageX)}
        on={{
          click: event => {
            console.log(event.target)
          },
        }}>
        <img alt='123' src={LogoAsset} />
        <Component propWithRequiredTSType={[1, 2]} propWithVuePropDef={123}>
          {() => <hr />}
        </Component>

        <Component {...attrs}  />
      </div>
    )
  },
})

export default Home
```
