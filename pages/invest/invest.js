const wxCharts = require('../../utils/wxcharts.js')
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
    this.getMothElectro()
  },
  /**
   * 页面的初始数据
   */
  data: {
    recordForm:{
      
    },
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
      {
        name: 'shuanghui',
        code: '0'
      },      {
        name: 'shuanghui12121',
        code: '1'
      }
    ],
    addForm: {
      name: ''
    },
    listData: [
      { "date": "2019/01/01", "time": "9:00", "content": "工作内容1" },
      { "date": "2019/01/01", "time": "10:30", "content": "工作内容2" },
      { "date": "2019/01/01", "time": "12:00", "content": "工作内容3" }
    ]
  },
  getMothElectro:function(){
    var windowWidth = 320;
    try {
     var res = wx.getSystemInfoSync();
     windowWidth = res.windowWidth;
    } catch (e) {
     console.error('getSystemInfoSync failed!');
    }
    yuelineChart = new wxCharts({ //当月用电折线图配置
     canvasId: 'yueEle',
     type: 'line',
     categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'], //categories X轴
     animation: true,
     // background: '#f5f5f5',
     series: [{
      name: '总用电量',
      //data: yuesimulationData.data,
      data: [1, 6, 9, 1, 0, 2, 9, 2, 8, 6, 0, 9, 8, 0, 3, 7, 3, 9, 3, 8, 9, 5, 4, 1, 5, 8, 2, 4, 9, 8, 7],
      format: function (val, name) {
       return val.toFixed(2) + 'kWh';
      }
     }, {
      name: '电池供电量',
      data: [0, 6, 2, 2, 7, 6, 2, 5, 8, 1, 8, 4, 0, 9, 7, 2, 5, 2, 8, 2, 5, 2, 9, 4, 4, 9, 8, 5, 5, 5, 6],
      format: function (val, name) {
       return val.toFixed(2) + 'kWh';
      }
     },
     {
      name: '光伏供电量',
      data: [6, 4, 9, 7, 1, 4, 5, 1, 1, 8, 8, 6, 6, 2, 2, 2, 0, 5, 5, 8, 8, 8, 8, 9, 0, 4, 6, 9, 2, 1, 6],
      format: function (val, name) {
       return val.toFixed(2) + 'kWh';
      }
     },
     {
      name: '市电供电量',
      data: [0, 4, 3, 3, 1, 7, 7, 7, 9, 9, 3, 3, 0, 0, 5, 6, 0, 4, 1, 2, 0, 1, 3, 9, 2, 5, 1, 8, 3, 4, 2],
      format: function (val, name) {
       return val.toFixed(2) + 'kWh';
      }
     }],
     xAxis: {
      disableGrid: true
     },
     yAxis: {
      title: '当月用电(kWh)',
      format: function (val) {
       return val.toFixed(2);
      },
      max: 20,
      min: 0
     },
     width: windowWidth,
     height: 200,
     dataLabel: false,
     dataPointShape: true,
     extra: {
      lineStyle: 'curve'
     }
    });
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
//新增记录
  addRecordOperate : function(res) {
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
      this.setData({recordForm: {
        type: 'stock',
        typeName:'股票',
        name: '',
        operate: 'buy',
        price: '',
        num: '',
        perPrice: ''
      }})
    } else if (res.detail.res == 'cancel') {
      console.log('cancel')
    }
  },
  //编辑记录
  editRecord: function(){
    let objModal = {
      show: true,
      title: '编辑打卡记录',
      showCancel: true,
      height: '90%',
      confirmText: '保存'
    }
    this.setData({
      addRecordShow: objModal
    })
    this.setData({recordForm: {
      type: 'stock',
      typeName:'股票',
      name: 'shanghaishuanghui',
      operate: 'buy',
      price: '1000',
      num: 10,
      perPrice: '100'
    }})
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
  //改变标签页的切换
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //改变类型
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    var obj = this.data.investType[e.detail.value]
    this.setData({
      'recordForm.type': obj.value,
      'recordForm.typeName': obj.name
    })
  },
  //改变名字
  investNameChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value, this)
    var obj = this.data.investTypeJSON[e.detail.value]
    this.setData({
      'recordForm.nameValue': obj.code,
      'recordForm.name': obj.name
    })
  },
  //保存记录
  saveRecordOperate: function(res){
    if (res.detail.res == 'confirm') {
      console.log('confirm')
    } else if (res.detail.res == 'cancel') {
      console.log('cancel')
    }
  },
  
})