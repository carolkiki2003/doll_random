<script>
  export default {
    name: 'TripIcon',
    props: {
      iconNumber: {
        type: [String, Number],
        default: 1
      },
      rotate: {
        type: [String, Number],
        default: 0
      },
      borderColor: {
        type: String,
        default: 'transparent'
      }
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />