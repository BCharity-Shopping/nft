<template>
  <div class="immutable">
    <table>
      <tr v-for="attr in attributes" :key="attr.name">
        <td class="attr_name">{{attr.name}}</td>
        <td>{{attr.value}}</td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  name: 'AttributeData',
  props: ['immutable_data'],
  data() {
    return {
      attributes: []
    }
  },
  methods: {
  },
  mounted() {
    this.attributes = []
    for (const [key, value] of Object.entries(this.immutable_data)) {
      if(key=="name") {
        this.attributes.push({"name":"Cause","value":value})
      }
      else {
        this.attributes.push({"name":key,"value":value})
      }
    }
  },
}
</script>

<style scoped>
.immutable {
  width: 100%;
  height: 100%;
  overflow-wrap: anywhere;
}

.attr_name {
  width: 100px;
}
</style>