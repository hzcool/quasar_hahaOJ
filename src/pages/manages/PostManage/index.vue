<template>
<div class="row justify-center">
    <div class="q-pa-lg q-gutter-md">
        <Button type="primary" size="large" @click="$router.push({name:'homeworkManage'})"> 作业布置与管理 </Button>
        <Button type="error" size="large">  首页公告管理 </Button>
    </div>
<!--    <div class="q-ma-lg" style="width: 1400px">-->
<!--      <div class="row justify-between">-->
<!--        <Button type="primary" size="large" @click="Modal=true"> 创建家庭作业 </Button>-->
<!--        <Page :total="10000000" :page-size="20"     :current.sync="hw_current"/>-->
<!--      </div>-->
<!--      <Table border :columns="hw_columns" :data="hw_data" class="q-mt-md">-->
<!--        <template slot-scope="{ index,row }" slot="action" style="text-align: center">-->
<!--          <Button type="primary" @click="" > 创建 </Button>-->
<!--          <Button type="error" @click="" style="margin-left:10px"> 删除 </Button>-->
<!--        </template>-->
<!--      </Table>-->

<!--      <Modal-->
<!--        width="1200px"-->
<!--        v-model="Modal"-->
<!--        :closable="false"-->
<!--        :mask-closable="false"-->
<!--      >-->
<!--        <div slot="header" class="text-h6">-->
<!--          {{ModalTitle}}-->
<!--        </div>-->
<!--        <div class="text-black q-mt-md text-h6" style="text-align: left">-->
<!--            <div class="row">-->
<!--                <div style="width: 100px"> 标题 </div>-->
<!--                <Input v-model="head" style="width:300px" />-->
<!--            </div>-->
<!--            <q-separator  class="q-my-md"/>-->
<!--            <q-editor v-model="editor" min-height="5rem" />-->
<!--        </div>-->

<!--        <div slot="footer">-->
<!--            <Button type="text" @click="Modal=false"> 取消 </Button>-->
<!--            <Button type="primary" @click=""> 提交 </Button>-->
<!--        </div>-->
<!--      </Modal>-->

<!--      <q-separator class="q-my-lg" />-->
<!--        <div class="row justify-between">-->
<!--          <Button type="error" size="large"> 创建主页公告 </Button>-->
<!--          <Page :total="10000000" :page-size="20"   :current.sync="ann_current"/>-->
<!--        </div>-->
<!--        <Table border :columns="ann_columns" :data="ann_data" class="q-mt-md">-->
<!--          <template slot-scope="{ index,row }" slot="action" style="text-align: center">-->
<!--            <Button type="primary" @click="" > 创建 </Button>-->
<!--            <Button type="error" @click="" style="margin-left:10px"> 删除 </Button>-->
<!--          </template>-->
<!--        </Table>-->
<!--    </div>-->
</div>
</template>

<script>
    export default {
        name: "index",
        data() {
          return {
            Modal:false,
            ModalTitle:"新建家庭作业",
            kind:"homework",
            head:"",
            editor:"",

            hw_current:1,
            hw_data:[],
            hw_columns: [
              {
                title:'置顶等级',
                key: 'grade',
              },
              {
                title: 'head',
                key: '标题',
              },
              {
                title: 'begin',
                key: 'begin'
              },
              {
                title: 'end',
                key: '结束',
              },
              {
                title: 'Action',
                slot: 'action',
                width: 450,
              }
            ],

            ann_current:1,
            ann_data:[],
            ann_columns: [
              {
                title:'置顶等级',
                key: 'grade',
              },
              {
                title: 'head',
                key: '标题',
              },
              {
                title: 'Action',
                slot: 'action',
                width: 450,
              }
            ],
          }
        }
    }
</script>

<style scoped>

</style>
