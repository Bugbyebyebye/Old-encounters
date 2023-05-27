// pages/map/map.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用户所在经纬度
        latitude: 0,
        longitude: 0,
        allInfo:[],
        markers:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserAuth();
        this.getAllInfo();
    },
    // 获取用户权限信息
    getUserAuth(){
        const that = this;
        wx.getSetting({
            success(res) {
              // res.authSetting 是一个对象，里面存储了用户的授权情况
              const authSetting = res.authSetting;
            //   console.log(authSetting)
              // 判断用户是否已经授权位置信息
              if (authSetting['scope.userLocation']) {
                // console.log('已经授权');
                // 调用 wx.getLocation() 获取位置信息
                that.getSureSpace();
              } else {
                // console.log('未授权');
                // 弹出位置授权框引导用户进行授权操作
                wx.authorize({
                    scope: 'scope.userLocation',
                    success(res) {
                        // console.log('授权成功');
                        that.getSureSpace();
                    },
                    fail(err) {
                        console.log('授权失败', err);
                    }
                })
              }
            }
          })
    },

    // 获取精确位置信息
    // 获取用户当前位置
    getSureSpace(){
        wx.getLocation({
            type: 'gcj02',
            success:res=> {
                const latitude = res.latitude // 纬度
                const longitude = res.longitude // 经度
                console.log('当前经纬度:', latitude, longitude);
                this.setData({
                    longitude:longitude,
                    latitude:latitude
                });
                // console.log(this.data.markers);
                wx.setStorage({
                    'key':'location',
                    data:{
                        longitude:longitude,
                        latitude:latitude,
                    },
                    success:res=>{
                        // console.log(res);
                    }
                })
            },
            fail:err=> {
                console.log('获取位置失败:', err)
            }
        })
    },

    // 获取全部的事件
    getAllInfo(){
        wx.request({
          url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/info/getAllInfo',
          method:'POST',
          success:res=>{
            //   console.log(res.data.data.data);
            let arr = res.data.data.data.map(item=>{
                let date = new Date(item.createTime);
                // 格式化日期
                let formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                return {
                    ...item,
                    createTime:formattedDate
                }
            })
              this.setData({
                  allInfo:arr
              })
            //   console.log(this.data.allInfo);
              let count = 1;
            //   console.log(this.data.markers);
              let d = this.data.allInfo.map(item=>{
                    return {
                        id:count++,
                        width:'300rpx',
                        height:'200rpx',
                        latitude: Number(item.latitude).toFixed(5),
                        longitude: Number(item.longitude).toFixed(5),
                        customCallout:{
                            anchorY: 0, 
                            anchorX: 0,
                            display: 'BYCLICK'
                            // display:'ALWAYS'
                        }
                    }
              })
            //   console.log(d);
              this.setData({
                  markers:d
              })
            //   console.log(this.data.markers);
            wx.stopPullDownRefresh();
          },
          fail:err=>{
              console.loe(err);
          }
        })
    },
    // 点击标记点触发
    markertapHandler(e) {
        console.log('您点击了标记点', e.markerId);
        // 想要展示信息框，需要在这里调用相关接口（例如 showModal），并将 e.markerId 作为关键字查询显示相应的信息。
      },

// 跳转新增
    goAdd(){
        wx.navigateTo({
          url: '/pages/add/add?active='+1,
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
        this.getAllInfo();
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