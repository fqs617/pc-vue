<template>
  <bq-loading v-model="isLoading" :top="loadingTop"></bq-loading>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'bq-base',
  computed: {
    ...mapState({
      isLoading: state => state.loading.isLoading,
      loadingTop: state => state.loading.isLoadingTop
    })
  }
}
</script>
