(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac019"],{1862:function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("P",[t._v("My Collections")]),n("p",[t._v("this is "+t._s(this.getWax))]),n("p",[t._v("fetch something:"+t._s(this.fetch))]),t._l(this.fetch,(function(e,c){return n("div",{key:e.collection_name},[t._v(" "+t._s(c)+": "+t._s(e.collection_name)+" "),n("button",{staticClass:"btn btn-primary",on:{click:function(n){return t.$router.push({name:"collectionInfo",params:{collectionname:e.collection_name}})}}},[t._v("Details")])])})),n("button",{on:{click:function(e){return t.$router.push({path:"/NFT/creator"})}}},[t._v("Create")])],2)},o=[],a=n("5530"),i=n("2f62"),s=n("bc3a"),l=n.n(s),u={name:"NFTPage",components:{},data:function(){return{wax:"",state:"",fetch:""}},computed:Object(a["a"])({},Object(i["b"])(["getWax"])),updated:function(){var t=this;if(console.log("fetch for"+this.getWax.userAccount),null!=this.getWax)return this.isFiltering=!0,l.a.get("https://wax.api.atomicassets.io/atomicassets/v1/collections",{params:{authorized_account:this.getWax.userAccount,Accept:"application/json"}}).then((function(e){t.fetch=e.data.data,console.log(t.fetch)})).catch((function(t){return console.log(t)})),this.fetch}},r=u,h=n("2877"),f=Object(h["a"])(r,c,o,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-2d0ac019.72a26e0b.js.map