<template>
  <div id="app">
    <ApiDocumentation />
    <TransactionHistory />
  </div>
</template>

<script>
import ApiDocumentation from './components/ApiDocumentation.vue'
import TransactionHistory from './components/TransactionHistory.vue'

export default {
  name: 'App',
  components: {
    ApiDocumentation
    TransactionHistory
  }
}
</script>
