const express = require('express');
const cliRoutes = require('./routes/cli')

const app = express()

const port = 4000
//middleware
app.use(express.json())
//log current route
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/cli', cliRoutes)

app.listen(port, () => {
  console.log(`app listenting on port ${port}`)
})