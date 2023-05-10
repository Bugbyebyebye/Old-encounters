// pages/search/search.js
import Message from 'tdesign-miniprogram/message/index';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        searchText:'',
        navIndex:0,
        navArr:[],
        navGoodAee:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let {text,navIndex} = options;
        if(navIndex){
            this.setData({
                navIndex:parseInt(navIndex)
            })
            // console.log(this.data.navIndex);
        }
        if(text){
            console.log(text);
            this.setData({
                searchText:options.text
            })
        }
        
        if(!this.data.searchText){
            this.getNav();
        }else{
            this.getGoodByKey();
        }
    },

    // 搜索
    changeHandle(e) {
        // console.log(e.detail.value);
        this.setData({
            searchText:e.detail.value
        });
    },

    submitSearch(){
        this.getGoodByKey();
    },

    // 导航条
    onTabsChange(event) {
        // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    },
  
    onTabsClick(event) {
        this.setData({
            navIndex:event.detail.value
        })
        // console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
        // console.log(this.data.navArr);
        this.getNavGood();
    },

    //   获得分类
  getNav(){
    wx.request({
        url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/nav/get',
        success:res=>{
          //   console.log(res);
            this.setData({
                navArr:res.data.data
            })
            // console.log(this.data.navArr);
            this.getNavGood();
        },
        fail:err=>{
            console.log(err);
        }
      })
  },

//   获得分类下的旧物
  getNavGood(){
    //   console.log(this.data.navIndex);
    wx.request({
        url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/good/getNavGood',
        method:'POST',
        data:{
            navId:this.data.navArr[this.data.navIndex].id
        },
        success:res=>{
        //   console.log(res);
          this.setData({
            navGoodArr:res.data.data.data
          })
        //   console.log(this.data.navGoodArr);
        },
        fail:err=>{
            console.log(err);
        }
      })
      wx.stopPullDownRefresh();
  },

//   按条件搜索
    getGoodByKey(){
        wx.request({
          url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/good/getGoodByKey',
          method:'POST',
          data:{
              keyword:this.data.searchText
          },
          success:res=>{
            //   console.log(res);
              this.setData({
                  navGoodArr:res.data.data.data
              });
              Message.success({
                context: this,
                offset: [20, 32],
                duration: 2000,
                content: '搜索成功',
              });
          },
          fail:err=>{
              console.log(err);
          }
        })
    },
    

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        if(!this.data.searchText){
            this.getNavGood();
        }else{
            this.getGoodByKey();
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})