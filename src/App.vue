<template>
  <div id="app">
    <TransactionHistory />
  </div>
</template>

<script>
import TransactionHistory from './components/TransactionHistory.vue'

export default {
  name: 'App',
  components: {
    TransactionHistory
  }
}
</script>