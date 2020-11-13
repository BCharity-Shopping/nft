<template>
    <div>
        
    </div>
</template>



<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            schema_name: "",
            collectionname:""
        }
    },
    created() {
      this.schema_name=this.$route.params.schemaname;
      this.collection_name = this.$route.params.collectionname;
      },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
    }
}
</script> 