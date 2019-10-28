<script>
  export default {
    name: 'CusSelect',
    $_veeValidate: {
      name() {
        return this.label
      },
      value() {
        return this.value
      }
    },
    props: {
      label: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />
