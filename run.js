//run.js
const { exec } = require('child_process')
exec('hexo server',(error, stdout, stderr) => {
  if(error){
      console.log(`exec error: ${error}`)
      return
  }
})
