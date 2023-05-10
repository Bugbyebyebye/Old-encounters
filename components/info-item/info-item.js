// components/info-item/info-item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        info:{
            type:Object,
            value:{}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goInfoDetail(){
            wx.navigateTo({
              url: '/pages/info/info?infoId='+this.properties.info._id,
            })
        }
    }
})
