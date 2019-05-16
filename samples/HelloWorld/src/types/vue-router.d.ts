/* eslint-disable @typescript-eslint/no-unused-vars */
import { RawLocation } from 'vue-router'
import { JSX_CHILDREN_KEY } from 'vue-tsx.macro/types/constant'
import { ScopedSlotReturnValue } from 'vue/types/vnode'

declare global {
  namespace VueJSX {
    interface RouterViewProps {
      name?: string
    }

    interface RouterLinkProps {
      to: RawLocation
      tag?: string
      exact?: boolean
      append?: boolean
      replace?: boolean
      activeClass?: string
      exactActiveClass?: string
      event?: string | string[]
    }

    interface RouterViewAttributes extends RouterViewProps, BuiltinAttributes {
      [JSX_CHILDREN_KEY]?: ScopedSlotReturnValue
      on?: {}
      props?: RouterViewProps
      scopedSlots?: Record<string, (() => ScopedSlotReturnValue) | undefined>
    }

    interface RouterLinkAttributes extends RouterLinkProps, BuiltinAttributes {
      [JSX_CHILDREN_KEY]?: ScopedSlotReturnValue
      on?: {}
      props?: RouterLinkProps
      scopedSlots?: Record<string, (() => ScopedSlotReturnValue) | undefined>
    }
  }

  namespace JSX {
    interface IntrinsicElements {
      'router-view': VueJSX.RouterViewAttributes
      'router-link': VueJSX.RouterLinkAttributes
    }
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
