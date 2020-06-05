const app = getApp()
Page({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  onLoad: function() {

    var that = this;

    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({

      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    investNum: 0,
    investMoney: 0,
    selected: [{
      date: '2020-5-21'
    }, {
      date: '2020-5-22'
    }, {
      date: '2020-5-24'
    }, {
      date: '2020-5-25'
    }],
    modal: {},
    addRecordShow:{},//添加记录详情
    investType: app.globalData.investType,
    operationType: app.globalData.operationType,
    investTypeJSON: [
      [{
        name: 'shuanghui',
        code: 'xxxx'
      }]
    ],
    addForm: {
      name: ''
    },
    listData: [
      { "date": "2019/01/01", "time": "9:00", "content": "工作内容1" },
      { "date": "2019/01/01", "time": "10:30", "content": "工作内容2" },
      { "date": "2019/01/01", "time": "12:00", "content": "工作内容3" },
      { "date": "2019/01/01", "time": "2:30", "content": "工作内容4" },
      { "date": "2019/01/01", "time": "3:30", "content": "工作内容5" },
      { "date": "2019/01/01", "time": "4:00", "content": "工作内容6" },
      { "date": "2019/01/01", "time": "5:00", "content": "工作内容7" },
      { "date": "2019/01/02", "time": "9:00", "content": "工作内容1" },
      { "date": "2019/01/02", "time": "10:30", "content": "工作内容2" },
      { "date": "2019/01/02", "time": "12:00", "content": "工作内容3" },
      { "date": "2019/01/02", "time": "2:30", "content": "工作内容4" },
      { "date": "2019/01/02", "time": "3:30", "content": "工作内容5" },
      { "date": "2019/01/02", "time": "4:00", "content": "工作内容6" },
      { "date": "2019/01/02", "time": "5:00", "content": "工作内容7" }
    ]
  },

  /**
   * 弹框按钮操作事件
   * @res 取消/确定按钮的相关信息
   */
  modalOperate: function(res) {
    if (res.detail.res == 'confirm') {
      console.log('confirm')
      let objModal = {
        show: true,
        title: '添加打卡记录',
        showCancel: true,
        height: '90%',
        confirmText: '保存'
      }
      this.setData({
        addRecordShow: objModal
      })
    } else if (res.detail.res == 'cancel') {
      console.log('cancel')
    }
  },
  addRecordOperate: function(res){
    if (res.detail.res == 'confirm') {
      console.log('confirm')

    } else if (res.detail.res == 'cancel') {
      console.log('cancel')
    }
  },
  /**
   * 日历是否被打开
   */
  bindselect(e) {

    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    let objModal = {
      show: true,
      title: time.year + '年' + time.month + '月' + time.date + '日',
      showCancel: true,
      height: '90%',
      confirmText: '添加'
    }
    this.setData({
      modal: objModal
    })
  },
  //  tab切换逻辑
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  investNameChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      investName: e.detail.value
    })
  },
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
})