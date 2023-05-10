import Message from 'tdesign-miniprogram/message/index';

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userId:{
            type:String,
            value:''
          },
        location:{
            type:Object,
            value:{}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        form:{
            title:'',
            place:'',
            content:'',
            picArr:[]
        },
        originFiles: [],
          gridConfig: {
            column: 4,
            width: 160,
            height: 160,
          },
          config: {
            count: 1,
          },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleInputChange(e){
            // 取出实时的变量值
            let value = e.detail.value;
            let fieldName = e.target.dataset.fieldName;
            this.setData({
                [`${fieldName}`]: value
            })
        },
        async formSubmit() {
            // console.log(this.data.bargain);
            // console.log(this.data.kindValue);
            await this.uploadPic();
            // return;
            this.setData({
                'form.userId':this.properties.userId,
                'form.latitude':this.properties.location.latitude,
                'form.longitude':this.properties.location.longitude
            })
            // console.log('form发生了submit事件，携带数据为：', this.data.form);
            wx.request({
              url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/info/add',
              method:"POST",
              data:this.data.form,
              success:res=>{
                    console.log(res);
                    Message.success({
                        context: this,
                        offset: [20, 32],
                        duration: 2000,
                        content: '提交成功'
                    });
                    this.formReset();
                    wx.navigateBack();
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
        },

        // 上传文件
        async uploadPic() {
            if(this.data.originFiles.length == 0){
                return
            }
            let pic = [];
            // 使用 Promise.all() 将所有异步函数封装，并等待全部执行完毕
            await Promise.all(this.data.originFiles.map(async item => {
              const res = await wx.cloud.uploadFile({
                cloudPath: Date.now() + ".jpg",
                filePath: item.url
              });
            //   console.log(res.fileID);
              pic.push(res.fileID);
            }));
            // console.log(pic);
            this.setData({
                'form.picArr':pic
            })
            // 执行其他程序
            // console.log('上传完毕');
          },
        
        formReset() {
            this.setData({
               form:{
                   title:'',
                   place:'',
                   content:'',
                   picArr:[]
               },
               originFiles:[]
            })
        },

        handleSuccess(e) {
            const { files } = e.detail;
            this.setData({
              originFiles: files,
            });
          },
          handleRemove(e) {
            const { index } = e.detail;
            const { originFiles } = this.data;
            originFiles.splice(index, 1);
            this.setData({
              originFiles,
            });
          },
          handleClick(e) {
            console.log(e.detail.file);
          },
    }
})
