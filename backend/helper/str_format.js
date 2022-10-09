const sub_tilde = (s) => {
  if (s[0] == '~') {
    s = s.replace('~', process.env.HOME)
  }
  return s
}

module.exports = { sub_tilde }