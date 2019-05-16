import { css } from 'emotion/macro'
import { functional } from 'vue-tsx.macro'

const appCSS = css`
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
`

const navCSS = css`
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
`

export default functional(() => (
  <div class={appCSS}>
    <div class={navCSS}>
      <router-link to='/'>Home</router-link> |
      <router-link to='/about'>About</router-link>
    </div>
    <router-view />
  </div>
))
