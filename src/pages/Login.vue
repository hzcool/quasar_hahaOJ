<template>
  <div class="q-pa-md row justify-center">

    <q-card class="my-card" style="width:25rem">
      <q-card-section class="text-white" style="background: #FF0080">
        <div class="text-h6">登 陆</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          @submit="login"
          @reset="clear"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
            :rules="[
               val => val && val.length > 0 || '请输入用户名',
               val => val.length <= 20 || '用户名太长',
               val => val.search(' ')==-1 || '不能存在空格',
            ]"
          >
            <template v-slot:prepend>
              <svg t="1585799828259" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16389" width="20" height="20"><path d="M865.8 746.5c-19.3-45.7-47-86.8-82.3-122-35.3-35.3-76.3-62.9-122-82.3-4.4-1.9-8.9-3.7-13.4-5.4C720.1 491.5 768 411.4 768 320c0-141.4-114.6-256-256-256S256 178.6 256 320c0 91.4 47.9 171.5 119.9 216.8-4.5 1.7-8.9 3.5-13.4 5.4-45.7 19.3-86.8 47-122 82.3-35.3 35.3-62.9 76.3-82.3 122-20 47.4-30.2 97.7-30.2 149.5 0 17.7 14.3 32 32 32s32-14.3 32-32c0-85.5 33.3-165.8 93.7-226.3C346.2 609.3 426.5 576 512 576s165.8 33.3 226.3 93.7C798.7 730.2 832 810.5 832 896c0 17.7 14.3 32 32 32s32-14.3 32-32c0-51.8-10.2-102.1-30.2-149.5zM376.2 455.8C340 419.5 320 371.3 320 320s20-99.5 56.2-135.8C412.5 148 460.7 128 512 128s99.5 20 135.8 56.2C684 220.5 704 268.7 704 320s-20 99.5-56.2 135.8C611.5 492 563.3 512 512 512s-99.5-20-135.8-56.2z" fill="#1875F0" p-id="16390"></path></svg>
            </template>
          </q-input>

          <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || '请输入密码',
              val => val.length >= 6 && val.length <= 16 || '密码长度范围[6,16]',
              val => val.search(' ')==-1 || '不能存在空格',
            ]"
          >
            <template v-slot:prepend>
              <svg t="1585799562698" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6462" width="20" height="20"><path d="M512 752.64c-15.36 0-25.6-10.24-25.6-25.6v-117.76c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v117.76c0 15.36-10.24 25.6-25.6 25.6zM691.2 394.24c-15.36 0-25.6-10.24-25.6-25.6V256c0-87.04-66.56-153.6-153.6-153.6S358.4 168.96 358.4 256v112.64c0 15.36-10.24 25.6-25.6 25.6S307.2 384 307.2 368.64V256c0-112.64 92.16-204.8 204.8-204.8s204.8 92.16 204.8 204.8v112.64c0 15.36-10.24 25.6-25.6 25.6z" fill="#007AFF" p-id="6463"></path><path d="M727.04 972.8H296.96c-97.28 0-179.2-81.92-179.2-179.2v-235.52c0-97.28 81.92-179.2 179.2-179.2h424.96c97.28 0 179.2 81.92 179.2 179.2v235.52c5.12 97.28-76.8 179.2-174.08 179.2zM296.96 430.08c-71.68 0-128 56.32-128 128v235.52c0 71.68 56.32 128 128 128h424.96c71.68 0 128-56.32 128-128v-235.52c0-71.68-56.32-128-128-128H296.96z" fill="#007AFF" p-id="6464"></path></svg>
            </template>
          </q-input>



          <div align="center">
            <q-btn label="确 认" type="submit" color="primary" />
            <q-btn label="清 空" type="reset" color="primary" flat class="q-ml-sm"/>

          </div>
          <div align="right">
            <q-btn flat color="primary" label="忘记密码?"/>
          </div>



        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
          username: "",
          password: ""
      }
    },
    methods: {
      login() {
        this.$req.post("login",{"username":this.username,"password":this.$rsa.encrypt(this.password)})
        .then(res => {
            if(res.errno==undefined) {
                this.$notify("success", "登陆成功")
                this.$store.commit("login", res)
                this.$router.push({name:"home"})
            }
        })
      },
      clear() {
        this.password = this.username = ""
      },
    },
    mounted() {
      if (this.$store.state.user.is_login) {
          this.$router.push({name:"home"})
      }
    }
  }
</script>

<style scoped>

</style>
