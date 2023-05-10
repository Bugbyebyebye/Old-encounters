// app.js
App({
  onLaunch() {
    wx.cloud.init({
        env: 'cloud1-0gm2hhn25384379e'
      })
      this.getM();
  },
  //   登录
  getM(){
    wx.request({
      url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/mi/get',
      method:'POST',
      success:res=>{
        //   console.log(res);
          this.login(res.data.name);
        //   console.log(res.data.name);
      }
    })
  },
  login(id){
        let code;
        // console.log(id);
        wx.login({
            success: (res) => {
                // console.log(res);
                code = res.code;
                // console.log(code);
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    method:"GET",
                    data:{
                        appid:'wx99f358f8ac559ba6',
                        secret:id,
                        js_code:code,
                        grant_type:'authorization_code'
                    },
                    success:res=>{
                        console.log('登录成功');
                        // console.log(res);
                        wx.setStorage({
                            key:'openid',
                            data:res.data.openid
                        })
                    },
                    fail:res=>{
                        console.log('登录失败');
                        console.log(res);
                    }
                })
            },
        })
    },
  globalData: {
    
  }
})
