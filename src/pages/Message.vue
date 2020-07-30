<template>
  <div class="q-pa-md row justify-center" style="font-size: 18px;" >

    <q-card flat bordered style="width:65%; height: 51rem">
      <q-card-section horizontal>
        <q-card-section class="col-3" >
          <q-item class="text-h4">私信</q-item>
          <q-item>
            <q-input v-model="person" outlined placeholder="查找你想私信的用户">
              <template v-slot:append>
                <q-icon name="search" @click.stop="find_contact_person"/>
              </template>
            </q-input>
          </q-item>
          <q-separator spaced inset />
          <q-item>联系人列表</q-item>
          <q-layout style="max-height: 39rem" container>
            <q-page-container>
              <q-list >
                <div v-for="(item,idx) in contact" :key="idx">
                  <q-item clickable @click="get_msg_with_person(item)">
                    <q-item-section avatar >
                      <q-avatar rounded >
                        <img :src="item.avatar"/>
                        <q-badge color="red" text-color="white" floating v-if="item.unread_count"> {{item.unread_count}} </q-badge>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{item.person}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn  flat dense round icon="delete" color="deep-orange" @click.stop="del_one_contact(idx)" >
                        <q-tooltip>从列表中删除</q-tooltip>
                      </q-btn>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset />
                </div>
              </q-list>
              <div class="q-mt-lg"></div>
              <q-page-scroller>
                <q-btn fab icon="keyboard_arrow_up" color="accent" />
              </q-page-scroller>
            </q-page-container>
          </q-layout>
        </q-card-section>

        <q-card-section class="col-9" >

          <div v-if="chat_with">
              <div class="text-h4 text-center">
                <q-avatar rounded>
                  <img :src="chat_with.avatar" />
                </q-avatar>
                {{chat_with.person}}
              </div>
              <q-separator  inset class="q-mt-sm"/>

            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              style="height: 33rem;"
              ref="msgArea"
              class="q-pa-md"
            >
              <div v-if="!msg_is_end" class="text-center">
                <q-btn  label="查看更多聊天记录" outline @click="get_messages"/>
              </div>
              <div class="text-center" v-else>
                  所有聊天记录
              </div>
              <div v-for="(item,idx) in messages" :key="idx">
                <div v-if="is_new_block(idx)" class="text-center">
                  <br>
                  <i-time  :time="new Date(item.stamp)" />
                </div>

                <q-chat-message
                  :name="item.name"
                  :avatar="item.avatar"
                  :text="item.text"
                  :stamp="item.stamp"
                  :sent="item.sent"
                />
              </div>
            </q-scroll-area>

            <q-separator  inset />
            <div class="q-pa-md q-gutter-sm">
              <q-editor
                v-model="editor"
                flat
                content-class="bg-amber-1"
                toolbar-text-color="white"
                toolbar-bg="info"
                min-height="5rem"
                max-height="5rem"
                :toolbar="[
                ['bold', 'italic', 'underline'],
                [{
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                }],
              ]"
              />
            </div>
            <Button type="primary" class="float-right q-mr-md" @click="send" :loading="loading">发送</Button>
          </div>
          <div v-else>
            <q-card-actions class="row justify-center q-mt-lg">
              <q-img src="https://www.helloimg.com/images/2020/07/27/no_message3decd4a9c615764a.jpg"   style="width: 300px; height: 400px;"/>
            </q-card-actions>
            <q-card-actions class="row justify-center">
              <div class="text-h4"> 暂时没有私信 </div>
            </q-card-actions>
          </div>
        </q-card-section>

      </q-card-section>
    </q-card>

  </div>
</template>

<script>
    export default {
      name: "message",
      data() {
        return {
          contact: [], //联系人
          messages: [], //消息
          loaded: false,
          editor: "",

          person: "",

          chat_with: null, //name avatar
          step_len: 10,
          msg_is_end: false,

          my_avatar: "",
          minuteDur: 1000*60,
          hourDur: 1000*60*60,
          dayDur: 1000*60*60*24,
          weekDur: 1000*60*60*24*7,

          loading:false,
        }
      },
      methods: {
        message_handle(msg) {
          let obj = {}
          obj = {"name": msg.from, "stamp": msg.created_at, "text": [msg.content]}
          if (msg.from != this.chat_with.person) {
            obj.sent = true
            obj.avatar = this.my_avatar
          } else {
            obj.avatar = this.chat_with.avatar
          }
          return obj
        },
        change_to_bottom() {
          this.$refs.msgArea.setScrollPosition(5000, 300)
        },
        get_messages() {
          let params = {
            "person": this.chat_with.person,
            "l": this.messages.length + 1,
            "r": this.messages.length + this.step_len
          }
          if (this.chat_with.unread_count > 0) {
            params.unread = "exist"
          }
          this.$req.get("getMessages", params)
            .then(res => {
              if (res.errno == undefined) {
                if (res.messages.length < this.step_len) {
                  this.msg_is_end = true
                }
                for (let item of res.messages) {
                  this.messages.unshift(this.message_handle(item))
                }
                this.chat_with.unread_count = 0
                if (this.messages.length <= this.step_len) {
                    setTimeout(() => {
                      this.change_to_bottom()
                    }, 500)
                }
              }
            })
        },
        get_msg_with_person(chat_with) {
          this.chat_with = chat_with
          this.messages.splice(0)
          this.msg_is_end = false
          this.get_messages()
        },
        find_contact_person() {
          this.person = this.person.trim()
          if (this.person == "") {
            this.$notify("error", "请输入查询用户")
            return
          }
          if (this.person == this.$store.state.user.username) {
            this.$notify("error", "不要给自己发私信")
            return
          }

          for (let i = 0; i < this.contact.length; i++) {
            if (this.contact[i].person == this.person) {
              this.get_msg_with_person(this.contact[i])
              return;
            }
          }
          this.$req.get("findContactPerson", {"person": this.person})
            .then(res => {
              if (res.errno == undefined) {
                res = res.chat
                this.contact.unshift(res)
                this.get_msg_with_person(res)
              }
            })
        },
        send() {
          if (this.editor.trim() == "") {
            this.$notify("error", "不能发空消息")
            return
          }
          this.loading = true
          let form = new FormData()
          form.append("person", this.chat_with.person)
          form.append("content", this.editor)
          this.$req.post("sendOneMessage", form)
            .then(res => {
              if (res.errno == undefined) {
                this.messages.push(this.message_handle(res.message))
                this.editor = ""
                setTimeout(this.change_to_bottom(),100)
              }
              this.loading = false
            })
        },
        del_one_contact(idx) {
            this.$req.get("delOneContact",{"person":this.contact[idx].person})
            .then(res => {
                if (res.errno == undefined) {
                    if(this.chat_with && this.chat_with.person == this.contact[idx].person ) {
                      this.chat_with = null
                    }
                    this.contact.splice(idx,1)
                }
            })
        },
      },
      computed: {
        thumbStyle() {
          return {
            right: '4px',
            borderRadius: '5px',
            backgroundColor: '#027be3',
            width: '5px',
            opacity: 0.75
          }
        },

        barStyle() {
          return {
            right: '2px',
            borderRadius: '9px',
            backgroundColor: '#027be3',
            width: '9px',
            opacity: 0.2
          }
        },
        is_new_block() {
            return function (idx) {
              if (idx == 0) return true
              let d1 = (new Date(this.messages[idx-1].stamp)).getTime()
              let d2 = (new Date(this.messages[idx].stamp)).getTime()
              let d3 = (new Date()).getTime()
              let x = d3-d2,y = d3-d1
              if (x >= this.weekDur) return false
              if (x >= this.dayDur) {
                  if (parseInt(y/this.dayDur) > parseInt(x/this.dayDur)) return true
                  return false
              } else if (x >= this.hourDur) {
                if (parseInt(y/this.hourDur) > parseInt(x/this.hourDur)) return true
                return false
              } else  if (y - x >= 5*this.minuteDur) return true
              return  false
            }
        }
      },
      mounted() {
        setTimeout(() => {
          if (this.$store.state.user.is_login) {
            this.my_avatar = this.$store.state.user.avatar
            this.$req.get("getContacts")
              .then(res => {
                if (res.errno == undefined) {
                  for (let obj of res.contacts) {
                    this.contact.push(obj)
                  }
                }
              })
          } else {
            this.$router.push({name: "home"})
          }
        }, 500)
      }
    }
</script>

<style scoped>

</style>
