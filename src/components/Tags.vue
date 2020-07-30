<template>
  <div>
    <div class="q-gutter-sm">
      <div>
        系统标签
        <q-checkbox v-for="(item,idx) in system_tags" :key="idx"
          v-model="selection"
          :val="item.val"
          :color="item.color"
        >
        <Tag :color="item.color" size="large"  style="font-size: 16px">{{item.label}}</Tag>
        </q-checkbox>
      </div>
      <div>
        自定义标签
        <Tag v-for="(item,idx) in my_tags" :key="idx"
             :color="item.color"
             size="large"
             style="font-size: 16px"
             type="border"
             closable @on-close="handleClose(idx)">{{item.label}}</Tag>
      </div>
      <div class="q-mt-sm">
        <div>添加自定义标签 <q-btn outline color="primary" dense icon="add" @click="add=true"/> </div>
        <div v-if="add" class="q-gutter-md row items-start q-mt-sm" >
            <div> 标签名 </div>
            <q-input v-model="tag_name" dense outlined style="width: 200px"/>
            <q-color v-model="hex" class="my-picker" />
          <Button @click="add_tag" type="primary">确认</Button>
          <Button @click="cancle_add_tag" type="error">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Tags",
        props:['prop_tags'],
        data() {
          return {
            selection:[],
            add : false,
            tag_name : "",
            hex: '#FF00FF',
            system_tags: [
              {
                label:"模拟",
                val:0,
                color:"red",
              },
              {
                label:"动态规划",
                val:1,
                color: "orange",
              },
              {
                label:"数据结构",
                val:2,
                color: "cyan",
              },
              {
                label:"图论",
                val:3,
                color: "teal",
              },
              {
                label:"数学",
                val:4,
                color: "primary",
              }
            ],
            my_tags: [],
          }
        },
        methods:{
          get_select_tags() {
            let ret = []
            for (let item of this.selection) {
              ret.push(this.system_tags[item])
            }
            ret = ret.concat(this.my_tags)
            return ret
          },
          handleClose(idx) {
            this.my_tags.splice(idx,1)
          },
          cancle_add_tag() {
            this.add = false
            this.tag_name = ""
          },
          add_tag() {
              this.tag_name =  this.tag_name.trim()
              if(this.tag_name=="") {
                this.$notify("error","请输入标签名字")
                return
              }
              if (this.tag_name.length > 30) {
                this.$notify("error","标签名太长")
                return
              }

              for (let item of this.my_tags) {
                if (item.label == this.tag_name) {
                  this.$notify("error","标签名已有")
                  return
                }
              }
              this.my_tags.push({
                "label":this.tag_name,
                "val":-1,
                "color":this.hex
              })
              this.cancle_add_tag()
          }
        },
        mounted() {
          let num = this.system_tags.length
          for(let item of this.prop_tags) {
            if(item.val==-1) {
              this.my_tags.push(item)
            }
            else if(item.val < num) {
              this.selection.push(item.val)
            }
          }
        }
    }
</script>

<style scoped>

</style>
