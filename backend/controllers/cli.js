const { ls, cd, code } = require ('../cli_utils/commands')


const ls_controller = async (req, res) => {
  res.json(await ls(req.target))
  
  }

const cd_controller = async (req, res)=> {
  res.json(await cd(req.body.target))
}

const code_controller = (req, res) => {
  code(req.body.target)
}

module.exports = {
  ls_controller,
  cd_controller,
  code_controller
}