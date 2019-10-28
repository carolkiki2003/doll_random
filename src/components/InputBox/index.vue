<script>
  export default {
    name: 'InputBox',
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
      placeholder: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      customStyle: {
        type: Object,
        default: () => null
      },
      keyup: {
        type: Function,
        default: () => null
      }
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />
