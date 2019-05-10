---
extend: '@vue/cli-service/generator/router/template/src/views/Home.vue'
when: 'rootOptions.router'
replace:
  - !!js/regexp /Welcome to Your Vue\.js App/
  - !!js/regexp /<template>[^]*?<\/template>/
  - !!js/regexp /<script>[^]*?<\/script>/
---
<%# REPLACE %>
Welcome to Your Vue.js + TSX App
<%# END_REPLACE %>
<%# REPLACE %>
<template>
  <home-content message="Hellow JSX">
    <template v-slot="msg">
      {{ msg }}
    </template>
  </home-content>
</template>
<%# END_REPLACE %>
<%# REPLACE %>
<script lang="ts">
import Vue from 'vue'
import HomeContent from '@/components/HomeContent.tsx'

export default Vue.extend({
  components: {
    'home-content': HomeContent,
  },
})
</script>
<%# END_REPLACE %>
