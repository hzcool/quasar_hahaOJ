
// export function someMutation (state) {
//
// }

export function update(state, data) {
  if (data.message_count) {
    state.message_count = data.message_count
  }
  if (data.notification_count) {
    state.notification_count = data.notification_count
  }
}


export function login(state, name) {
  state.is_login = true
  state.username = name
}
export function logout(state) {
  state.is_login = false
  state.username = ""
  state.notifications = 0
  state.messages = 0
}


