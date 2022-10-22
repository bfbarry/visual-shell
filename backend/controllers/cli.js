const { ls, cd } = require ('../cli_utils/commands')


const ls_controller = async (req, res) => {

  res.json(await ls(req.target))
  
  }


const cd_controller = async (req, res)=> {
  res.json(await cd(req.body.target))
}

module.exports = {
  ls_controller,
  cd_controller
}