<script>
  export default {
    name: 'bq-card-header',
    template: `<div class="bq-card-header bq-f-size-14">  </div>`,
    props: {
      title: {
        type: String,
        require: true
      }
    }
  }
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  @import 'scss/mixin.scss';
  .bq-card-header {
    height: 34px;
    width: 100%;
    line-height: 34px;
    color: #777777;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    letter-spacing: 0;
    padding-left: 15px;
    @include border-bottom;
  }
</style>
