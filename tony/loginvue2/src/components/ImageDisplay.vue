<template>
  <div class="gallery">
    <div class="small">
      <b-avatar class="small-image" v-for="image in images" 
      :key="'image_'+ image" 
      :id="'image_'+image" 
      v-bind:src="image" size="80px" 
      @click.native="selectImage(image)"
      square>
      </b-avatar>
    </div>
    <div class="large">
      <img class="large-image" v-if="images.length!=0" v-bind:src="images[selectedImage]">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageDisplay',
  props: ['data'],
  data () {
    return {
      ipfs: "http://ipfs.io/ipfs/",
      url: "",
      currentURL: "",
      images: [],
      selectedImage: 0,
    }
  },
  mounted() {
    this.images = []
    
    if(this.data.
    atomicmarket_sales[0].
    atomicassets_offer.
    atomicassets_offers_assets[0].
    atomicassets_asset.
    immutable_data!=null) {
      let imm_data = this.data.
      atomicmarket_sales[0].
      atomicassets_offer.
      atomicassets_offers_assets[0].
      atomicassets_asset.
      immutable_data
      for (const [key, value] of Object.entries(imm_data)) {
        if(this.checkNormalURL(value)) {
          if(key=="img") {
            this.images.unshift(value)
          }
          else {
            this.images.push(value)
          }
        }
        else if(this.checkIPFSHash(value)) {
          if(key=="img") {
            this.images.unshift(this.ipfs + value)
          }
          else {
            this.images.push(this.ipfs + value)
          }
        }
      }
    }
    if(this.data.
    atomicmarket_sales[0].
    atomicassets_offer.
    atomicassets_offers_assets[0].
    atomicassets_asset.
    atomicassets_template!=null &&
    this.data.
    atomicmarket_sales[0].
    atomicassets_offer.
    atomicassets_offers_assets[0].
    atomicassets_asset.
    atomicassets_template.
    immutable_data!=null) {
      let imm_data = this.data.
      atomicmarket_sales[0].
      atomicassets_offer.
      atomicassets_offers_assets[0].
      atomicassets_asset.
      atomicassets_template.
      immutable_data
      for (const [key, value] of Object.entries(imm_data)) {
        if(this.checkNormalURL(value)) {
          if(key=="img") {
            this.images.unshift(value)
          }
          else {
            this.images.push(value)
          }
        }
        else if(this.checkIPFSHash(value)) {
          if(key=="img") {
            this.images.unshift(this.ipfs + value)
          }
          else {
            this.images.push(this.ipfs + value)
          }
        }
      }
    }
    
  },
  methods: {
    selectImage(image) {
      this.selectedImage = this.images.indexOf(image)
    },
    checkURL(url) {
      console.log(url)
      console.log("normal url " + this.checkNormalURL(url))
      console.log("ipfs hash " + this.checkIPFSHash(url))
      return this.checkNormalURL || this.checkIPFSHash
    },
    checkNormalURL(url) {
      if(url!="" && url!=null) {
        return String(url).match(/(http:\/\/|https:\/\/).*\.(jpeg|jpg|gif|png|gifv)$/) != null 
      }
      else {
        return false
      }
    },
    checkIPFSHash(url) {
      if(url!="" && url!=null) {
        return String(url).match(/Qm[A-Za-z0-9]{44}($|\/.+(jpeg|jpg|gif|png|gifv)$)/) != null 
      }
      else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 5%;
  height: 100%;
  width: 100%;
}

.small {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 15%;
  overflow: auto;
}

.small-image {
  margin: 1px;
  padding: 1px;
  background-color: black;
}

.large {
  width: 70%;
  height: 100%;
}

.large-image {
  width: auto;
  max-width: 100%;
  height: 100%;
}

</style>