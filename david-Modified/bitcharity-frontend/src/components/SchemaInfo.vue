<template>
    <div>
        
    </div>
</template>



<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            collectionname: ""
        }
    },
    created() {
      this.collectionname = this.$route.params.collectionname;
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
    }
}
</script> 
