const sub_tilde = (s) => {
  if (s[0] == '~') {
    s = s.replace('~', process.env.HOME)
  }
  return s
}

const isCode = (path) => {
  const code_exts = '.py.sh.csh.m.php.pl.c.cpp.js.zshrc.bashrc'
  const local_path = path.split('/').pop()
  if (local_path.includes('.') && code_exts.includes(`.${local_path.split('.').pop()}`)) {
    return true
  }
  return false
    
}

module.exports = { sub_tilde, isCode }