(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f8c06a0"],{a359:function(e,a,i){"use strict";i.r(a);var t=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"asset"},[t("h1",[e._v("Asset Page of "+e._s(e.$route.params.asset_id))]),t("ApolloQuery",{attrs:{query:i("d35c"),variables:{asset_id:e.$route.params.asset_id}},scopedSlots:e._u([{key:"default",fn:function(a){var i=a.result,s=i.loading,n=i.error,d=i.data;return[s?t("div",{staticClass:"loading apollo"},[e._v("Loading...")]):n?t("div",{staticClass:"error apollo"},[e._v("An error occurred")]):d?t("div",{staticClass:"result apollo"},[t("div",{staticClass:"inventory"},e._l(d.atomicassets_assets,(function(a){return t("div",{key:a.asset_id},[null!=a.atomicassets_template?t("div",{staticClass:"asset-img"},[null!=a.atomicassets_template.immutable_data.img?t("div",{staticClass:"asset-img-2"},[t("img",{attrs:{src:e.ipfs+a.atomicassets_template.immutable_data.img,width:"100%",height:"100%"}})]):e._e()]):null!=a.immutable_data?t("div",{staticClass:"asset-img"},[null!=a.immutable_data.img?t("div",{staticClass:"asset-img-2"},[t("img",{attrs:{src:e.ipfs+a.immutable_data.img,width:"100%",height:"100%"}})]):e._e()]):e._e(),t("div",{staticClass:"mint-num"},[e._v(" "+e._s(a.atomicassets_asset_mints.template_mint)+" ")]),t("div",{staticClass:"col-name"},[e._v(" "+e._s(a.collection_name)+" ")]),null!=a.atomicassets_template?t("div",{staticClass:"asset-name"},[e._v(" "+e._s(a.atomicassets_template.immutable_data.name)+" ")]):t("div",{staticClass:"asset-name"},[e._v(" "+e._s(a.immutable_data.name)+" ")]),t("div",{staticClass:"owner-name"},[e._v(" "+e._s(a.owner)+" ")])])})),0)]):t("div",{staticClass:"no-result apollo"},[e._v("No result :(")])]}}])})],1)},s=[],n={data:function(){return{aid:1099512463310,ipfs:"http://ipfs.io/ipfs/"}}},d=n,l=i("2877"),m=Object(l["a"])(d,t,s,!1,null,null,null);a["default"]=m.exports},d35c:function(e,a){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"atomicassets_assets"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"asset_id"}},type:{kind:"NamedType",name:{kind:"Name",value:"bigint"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"atomicassets_assets"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"asset_id"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"_eq"},value:{kind:"Variable",name:{kind:"Name",value:"asset_id"}}}]}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"asset_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"atomicassets_template"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"immutable_data"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"max_supply"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"issued_supply"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"burnable"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"transferable"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"owner"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"template_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"schema_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"collection_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"atomicassets_assets_backed_tokens"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"token_symbol"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"immutable_data"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"atomicassets_asset_mints"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"template_mint"},arguments:[],directives:[]}]}}]}}]}}],loc:{start:0,end:470}};i.loc.source={body:"query atomicassets_assets ($asset_id: bigint) {\n  atomicassets_assets(where: {asset_id: {_eq: $asset_id}}) {\n    asset_id\n    atomicassets_template {\n      immutable_data\n      max_supply\n      issued_supply\n      burnable\n      transferable\n    }\n    owner\n    template_id\n    schema_name\n    collection_name\n    atomicassets_assets_backed_tokens {\n      token_symbol\n      amount\n    }\n    immutable_data\n    atomicassets_asset_mints {\n      template_mint\n    }\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};function t(e,a){if("FragmentSpread"===e.kind)a.add(e.name.value);else if("VariableDefinition"===e.kind){var i=e.type;"NamedType"===i.kind&&a.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){t(e,a)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){t(e,a)})),e.definitions&&e.definitions.forEach((function(e){t(e,a)}))}var s={};function n(e,a){for(var i=0;i<e.definitions.length;i++){var t=e.definitions[i];if(t.name&&t.name.value==a)return t}}function d(e,a){var i={kind:e.kind,definitions:[n(e,a)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var t=s[a]||new Set,d=new Set,l=new Set;t.forEach((function(e){l.add(e)}));while(l.size>0){var m=l;l=new Set,m.forEach((function(e){if(!d.has(e)){d.add(e);var a=s[e]||new Set;a.forEach((function(e){l.add(e)}))}}))}return d.forEach((function(a){var t=n(e,a);t&&i.definitions.push(t)})),i}(function(){i.definitions.forEach((function(e){if(e.name){var a=new Set;t(e,a),s[e.name.value]=a}}))})(),e.exports=i,e.exports["atomicassets_assets"]=d(i,"atomicassets_assets")}}]);
//# sourceMappingURL=chunk-4f8c06a0.bff4954a.js.map