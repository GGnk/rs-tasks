<template>
  <div class="main-wrapper">
    <InfoBlock/>
    <MapBlock/>

  </div>
</template>

<script>
import InfoBlock from '@/components/blocks/InfoBlock'
import MapBlock from '@/components/blocks/MapBlock'

export default {
  name: 'WrapperComponent',
  components: {
    InfoBlock,
    MapBlock
  },
}
</script>

