import Message from 'tdesign-miniprogram/message/index';

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        right: [
            {
              text: '编辑',
              className: 'btn edit-btn',
            },
            {
              text: '删除',
              className: 'btn delete-btn',
            },
          ],
          confirmBtn: { content: '删除', variant: 'base' ,theme:'danger'},
          showConfirm: false,
          cur: {},
          id:'',
          nickname:'',
          contact:'',
          visible:false,
          defaultName:'',
          defaultContact:'',
          imageUrl: defaultAvatarUrl,
          myGood:[],
          myInfo:[],
        //   等待删除id
        deleteId:'',
        deleteFlag:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.getStorage({
            key:'openid',
            success:res=>{
                this.setData({
                    id:res.data
                });
                this.getMyGood(this.data.id);
                this.getMyInfo(this.data.id);
            }
        })
        wx.getStorage({
            key:'user',
        }).then(res=>{
            // console.log(res);
            this.setData({
                imageUrl:res.data.avatar,
                defaultName:res.data.nickname,
                defaultContact:res.data.contact
            });
        })
    },

    // 获取我的旧物
    getMyGood(id){
        // console.log('get+id'+id);
        wx.request({
          url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/good/getMyGood',
          method:'POST',
          data:{
              userId:id
          },
          success:res=>{
            //   console.log(res);
              
              let newData = res.data.data.map(item=>{
                  let date = new Date(item.createTime);
                  let year = date.getFullYear(); // 年份
                    let month = date.getMonth() + 1; 
                    let day = date.getDate();
                    let theDate = `${year}-${month}-${day}`;
                    return {
                        ...item,
                        createTime:theDate
                    }
              });
              this.setData({
                  myGood:newData
              })
            //   console.log(this.data.myGood);
            Message.success({
                context: this,
                offset: [20, 32],
                duration: 2000,
                content: '加载成功'
              });
              wx.stopPullDownRefresh();
          },
          fail:err=>{
              console.log(err);
          }
        })
    },

    // 获取我的消息
    getMyInfo(id){
        wx.request({
            url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/info/getMyInfo',
            method:'POST',
            data:{
                userId:id
            },
            success:res=>{
                // console.log(res);
                this.setData({
                    myInfo:res.data.data
                })
                // console.log(this.data.myInfo);
              Message.success({
                  context: this,
                  offset: [20, 32],
                  duration: 2000,
                  content: '加载成功'
                });
                wx.stopPullDownRefresh();
            },
            fail:err=>{
                console.log(err);
            }
          })
    },

    // 头像弹出
    handlePopup(e) {
        this.setData({ visible: true });
    },
    chooseImage() {
        wx.chooseMedia({
          count: 1, // 可选择的图片数量
        //   sizeType: ['compressed'], // 压缩图片
          sourceType: ['album', 'camera'], // 来源：相册或相机
          success:  (res)=> {
            // 将选择的图片上传到服务器
            this.uploadImage(res.tempFiles[0].tempFilePath);
          }
        })
      },
      uploadImage(imagePath) {
            console.log(imagePath);
            wx.cloud.uploadFile({
                cloudPath:Date.now()+".jpg",
                filePath:imagePath
            }).then(res=>{
                console.log(res);
                this.setData({
                    imageUrl:res.fileID
                })
            })
      },
    changeNickName(e) {
        // console.log(e.detail.value);
        this.setData({
            nickname:e.detail.value
        });
    },
    changeContact(e){
        this.setData({
            contact:e.detail.value
        });
        // console.log(this.data.contact);
    },
    setUserInfo(){
        this.setData({
            defaultName:this.data.nickname,
            defaultContact:this.data.contact,
            visible:false
        })

        // 发送用户到数据库
        wx.request({
          url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/user/add',
          method:'POST',
          data:{
            "id":this.data.id,
            "nickname":this.data.nickname,
            "avatar":this.data.imageUrl,
            "contact":this.data.contact
          },
          success:res=>{
            console.log(res);
            Message.success({
                context: this,
                offset: [20, 32],
                duration: 2000,
                content: '提交成功'
              });
          },
          fail:err=>{
              console.log(err);
              Message.error({
                context: this,
                offset: [20, 32],
                duration: 2000,
                content: '提交失败'
              });
          }
        })

        wx.setStorage({
            key:'user',
            data:{
                nickname:this.data.nickname,
                contact:this.data.contact,
                avatar:this.data.imageUrl,
                id:this.data.id
            }
        })
    },
    onClose() {
        this.setData({
          visible: false,
        });
    },

    // 长按删除旧物
    showDialog(event) {
        // console.log(event);
        this.setData({
            deleteFlag:event.currentTarget.dataset.flag,
            deleteId:event.currentTarget.dataset.id,
            showConfirm:true
        })
        // console.log(this.data.deleteId);
    },

    deleteGood(){
        this.setData({
            showConfirm:false
        })
        let url = '';
        if(this.data.deleteFlag == 'good'){
            url = '/good/delete'
        }else if(this.data.deleteFlag == 'info'){
            url = '/info/delete'
        }
        wx.request({
          url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com'+url,
          method:'POST',
          data:{
              id:this.data.deleteId
          },
          success:res=>{
              console.log(res);
              this.getMyGood(this.data.id);
              this.getMyInfo(this.data.id);
              this.setData({
                  deleteId:'',
                  deleteFlag:''
              })
              Message.success({
                context: this,
                offset: [20, 32],
                duration: 2000,
                content: '删除成功'
              });
              
          },
          fail:err=>{
              console.log(err);
          }
        })
        
    },

    closeDialog() {
        this.setData({
            showConfirm:false
        })
    },

    // 跳转到添加页面
    goAdd(){
        wx.navigateTo({
          url: '/pages/add/add?active='+0,
        })
    },

    // 跳转到信息详情
    goInfoDetail(event){
        wx.navigateTo({
          url: '/pages/info/info?infoId='+event.currentTarget.dataset.id,
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
        this.getMyGood(this.data.id);
        this.getMyInfo(this.data.id);
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