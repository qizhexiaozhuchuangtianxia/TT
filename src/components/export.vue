<template>
  <view class="verification-wrapper">
    <view class="status-bg" v-if="addonsStatus != '1'" :style="{ 'backgroundImage':'url('+statusBg+')'}">
      <view>
        <image v-if="addonsStatus == 4" :src="errorImg"></image>
        <image v-if="addonsStatus == 2" :src="loadingImg"></image>
      </view>
      <view>
        <text>{{addonsStatus == 2?'信息审核中':'审核失败'}}</text>
        <text v-if="addonsStatus==4 || signCardStatus != 2">原因:{{signCardStatus != 2 ? '待上传身份证' :  data.stateDesc }}</text>
      </view>
    </view>

    <view class="forms-cont">
    <view>
      <text>姓名</text>
      <input v-if="isEdit" class="forms-input" v-model="forms[0].val" type="text" placeholder="请输入姓名">
      <text v-if="!isEdit">{{forms[0].val}}</text>
    </view>
      <view>
        <text>证件类型</text>
        <text>居民身份证</text>
      </view>
      <view>
        <text>身份证</text>
        <input v-if="isEdit" class="forms-input" v-model="forms[1].val"  maxlength="18"  type="idcard" placeholder="请输入身份证">
       <text v-if="!isEdit">{{forms[1].val}}</text>
      </view>
      <view>
        <text>手机号码</text>
        <input  v-if="isEdit" class="forms-input"  v-model="forms[2].val" type="number" maxlength="11" placeholder="请输入手机号码">
        <text v-if="!isEdit">{{forms[2].val}}</text>
      </view>
      <view class="forms-code" v-if="addonsStatus == 1" >
        <text>验证码</text>
        <input class="forms-input" v-model="forms[3].val" type="number" maxlength="6" placeholder="请输入验证码">
        <VerificationCode  @clearInterval="clearInterval"  :type="type" :isPhone="forms[2].val" :errorText="forms[2].msg" ></VerificationCode>
      </view>
    </view>

    <view class="sfz-upload">
      <view>
        <image  @tap="upload('card_front_img')" :src="cardFront"></image>
        <image  @tap="upload('card_back_img')" :src="cardBack"></image>
      </view>
    </view>
    <view class="tips-info">
      <text>根据《电商法》规定，个人收入需要缴纳个税（您的税费由商家承担），请先完成个人信息认证，</text>
      <text>否则将无法获得奖励。</text>
    </view>
    <view class="agreement-info"  v-if="addonsStatus != 2 || signCardStatus != 2">
          <image @tap="checkChange('')" :src="checkoutImageO"></image>
          <text class="sure-text">已阅读并同意</text>
          <text @tap="handleClickAgreement('spreadAgreement')" class="small-text"> 《 推广计划协议 》 </text>
          <text @tap="handleClickAgreement('taxAgreement')" class="small-text"> 《 个税服务协议 》 </text>
    </view>
    <view class="sure-attestation" v-if="addonsStatus != 2 || signCardStatus != 2">
<!--      重新认证 -->
      <view class="defaule-sublime" :class="{'not-allow-sure': !isAgreement}"  @tap="formsVer()">{{btnName}}</view>
      <view class="defaule-sublime" @tap="backUserHome">下次再说</view>
    </view>
  </view>
</template>
<script>
import Button from "../choose_gift/components/button";
import VerificationCode from "../../component/verificationCode/verification-code";
import request from "../../utils/request";
export default {
  name: "index.vue",
  components: {Button,VerificationCode},
  data(){
    return {
      data:{
        // name:'',
        // identity:'',
        // personal_mobile:''
      },
      type:'5', // 5-推手立即认证
      statusBg: `${getApp().globalData.img_url}status-bg.png`,
      status:[
        {
          val:'审核中'
        },
        {
          val:'审核失败'
        }
      ],
      forms:[
        {
          val:"",
          msg:'请填写姓名',
          name:'姓名',
          reg:/^[a-zA-Z\u4e00-\u9fa5]+$/,
          isMust:true
        },
        {
          val:'',
          msg:'请填写身份证',
          name:'身份证号码',
          reg:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
          isMust:true
        },
        {
          val:'',
          msg:'请填写手机号码',
          name:'手机号码',
          reg: 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/,
          isMust:true
        },
       {
         val:'',
         msg:'请填写验证码',
         name:'验证码',
         reg:'',
         isMust:false
       },
        {
          frontImg:'',
          val:'' ,
          msg:'请上传身份证正面照片',
          name:'身份证正面照片',
          reg:'',
          isMust:true
        },
        {
          backImg:'',
          val:'',
          msg:'请上传身份证反面照片',
          name:'身份证反面照片',
          reg:'',
          isMust:true
        }
      ],
      cardFrontName:'',
      cardBackName:'',
      cardFront:`${getApp().globalData.img_url}var-front.png`,
      cardBack:`${getApp().globalData.img_url}var-back.png`,
      ssys_key:'',
      key: '',
      addonsStatus:'',
      signCardStatus:'',
      isEdit:true,
      btnName:'立即认证',
      isShare:'', // 分享进入的认证页面 1
      gid:'',
      errorImg:`${getApp().globalData.img_url}status-error.png`,
      loadingImg:`${getApp().globalData.img_url}status-load.png`,
      timer:'',
      isAgreement:false,
      checkoutImageO:`${getApp().globalData.img_url}radio-icon.png`,
    }
  },
  onLoad: function(option){
    this.ssys_key = uni.getStorageSync('ssys_key');
    if(option){
      this.isShare = option.isShare
      this.gid = option.gid
    }
    this.getUserVerificationInfo()
  },
  methods: {
    clearInterval(time){
      this.timer = time
    },
    /**
     * 获取用户签约信息
     * @sign_status  审核状态待上传资料1，审核中2，审核通过3，审核拒绝4’
     * @sign_card_status 1待上传2上传成功3上传失败
     */
    getUserVerificationInfo() {
      request({
        url: getApp().globalData.ser_url + `/index.php?app=user_sign&mod=index&sld_addons=spreader&ssys_key=${this.ssys_key}`,
      }).then(res => {
        console.log(res, '_res_getInfo_', res.datas.sign_status, '审核状态', res.datas.sign_card_status, '身份证审核状态')
        if (res.code == 200 && res.status == 200) {
          this.data = res.datas
          this.addonsStatus = this.data.sign_status
          this.signCardStatus = this.data.sign_card_status
          this.cardFrontName = ''
          this.cardBackName = ''
          this.btnName = this.addonsStatus == 4 ? '重新认证' : '立即认证'
          // 审核失败、审核中-赋值
          if (this.addonsStatus == 4 || this.addonsStatus == 2) {
            this.isEdit = false
            this.forms[0].val = this.data.name
            this.forms[1].val = this.data.identity
            this.forms[2].val = this.data.personal_mobile
            this.cardFront = this.data.card_front_img
            this.cardBack = this.data.card_back_img
            // 未上传成功
            if (this.signCardStatus != 2) {
              this.cardFront = `${getApp().globalData.img_url}var-front.png`
              this.cardBack = `${getApp().globalData.img_url}var-back.png`
              this.forms[4].val = ''
              this.forms[5].val = ''
            }
          }
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration:2000
          });
        }
      });
  },

    upload : function(sign){
      if(this.signCardStatus == 2) return
      let _self = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function (res) {
          uni.showLoading({title: '加载中',mask:true});
          const tempFilePaths = res.tempFilePaths;
          let data = {}
          data[sign] = tempFilePaths[0]
          data.name='file'
          uni.uploadFile({
            url :getApp().globalData.ser_url + `/index.php?app=user_sign&mod=upload_pic&sld_addons=spreader&ssys_key=${_self.ssys_key}`,
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData:data,
            success: (res) => {
              console.log(res,'res')
              setTimeout( () => {uni.hideLoading();}, 100);
              let resData = JSON.parse(res.data);
              if(resData.code == 200){
                if(sign == 'card_front_img'){
                  _self.cardFrontName =  resData.datas.name
                  _self.cardFront = resData.datas.img_url
                  _self.forms[4].val =  resData.datas.img_url
                }else{
                  _self.cardBackName =  resData.datas.name
                  _self.cardBack = resData.datas.img_url
                  _self.forms[5].val =  resData.datas.img_url
                }
              }else{
                uni.showToast({
                  title: resData.error,
                  duration:3000,
                  icon: 'none',
                });
              }
            }
          });


        },
        error : function(e){
          console.log(e);
        }
      });
    },

    formsVer(){
      if(!this.isAgreement) return
      if(this.addonsStatus == 4){
        this.addonsStatus = 1
        this.isEdit = true
        this.btnName = '立即认证'
        this.forms.forEach(item=>{
          item['val'] = ''
        })
        this.cardFront = `${getApp().globalData.img_url}var-front.png`
        this.cardBack = `${getApp().globalData.img_url}var-back.png`
        return
      }
      // 未提交
      if( this.addonsStatus == 1 || this.signCardStatus == 3 ){
        for(let a = 0;a<this.forms.length;a++) {
          let item = this.forms[a]
          for (let i in item) {

            if (!item['val']) {
              if(!item['isMust'] && this.signCardStatus == 3 ) break
                uni.showToast({
                  title: `${item['msg']}`,
                  icon: 'none',
                  duration:2000
                });
                return;
            }
            if(item['reg'] && !item['reg'].test(item['val'])  ){
              uni.showToast({
                title: `${item['name']}格式不正确`,
                icon: 'none',
                duration:2000
              });
              return
            }
          }
        }
      }
      this.sublime()
    },
    /**
     * 实名认证上传信息
     */
    sublime(){
      let params={
        identity_type:0, // 证件类型0-身份证
        identity:this.forms[1].val,
        name:this.forms[0].val,
        phone:this.forms[2].val,
        captcha:this.forms[3].val,
        card_front_img: this.cardFrontName,
        card_back_img: this.cardBackName
      }
      uni.showLoading({
        title: '加载中'
      });
      request({
        url :getApp().globalData.ser_url + `/index.php?app=user_sign&mod=create&sld_addons=spreader&ssys_key=${this.ssys_key}`,
        data:params,
        method:'post',
      }).then(res => {
        uni.hideLoading();

        if (res.code == 200 ) {
          uni.showToast({
            title: '提交成功',
            icon: 'none',
            duration:2000
          });
          setTimeout(()=>{
            clearInterval(this.timer)
            this.getUserVerificationInfo()
          },2000)
        } else if(  res.code == 250){
          uni.showToast({
            title: res.datas.error,
            icon: 'none',
            duration:2000

          });
        }else if(  res.code == 251 ) { // 身份证信息失败刷新页面
          clearInterval(this.timer)
          this.getUserVerificationInfo()
        }else{
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
      });

    },
    backUserHome(){
      uni.reLaunch({
        url: '/pages/user/user'
      });
    },
    checkChange: function () {
      this.isAgreement = this.isAgreement ? false : true
      this.checkoutImageO = this.isAgreement  ? `${getApp().globalData.img_url}radio-act-icon.png` : `${getApp().globalData.img_url}radio-icon.png`
    },
    handleClickAgreement(sign){
      let path = sign
      uni.navigateTo({
        url:`/pages/verification/${path}`
      })
      console.log('handleClickAgreement','_path',path)
    }
  },
}
</script>

<style scoped lang="less">
@import "../../addons/templates/wxss/common-less.less";
.verification-wrapper{
  width:100%;
  height: 100%;
  .status-bg{
    background-size: 100% 100%;
    padding:41rpx 32rpx;
    display: flex;
    align-items: top;
    view:nth-child(1){
      image{
        width: 36rpx;
        height: 36rpx;
        margin-top:5rpx;
      }
      margin-right:20rpx;
    }
    view:nth-child(2){
      text{
        color: #ffffff;
        display: block;
      }
      text:nth-child(1){
        font-size: 36rpx;
        font-weight: 500;
      }
      text:nth-child(2){
        margin-top: 26rpx;
        font-size: 24rpx;
        font-weight: 400;

      }

    }
  }
  .sfz-upload{
    &>view{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 40rpx 0;
    image{
      width:478rpx;
      height:292rpx;
      margin-bottom: 20rpx;
    }
    }
  }
  .tips-info{
    position: relative;
    padding: 0 20rpx 0 45rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    margin-bottom: 20rpx;
    text:nth-child(2){
      color:red;
    }
  }
  .tips-info:before{
    content: "";
    position: absolute;
    left: 26rpx;
    top: 13rpx;
    width: 8rpx;
    height: 8rpx;
    background: #fc1b1d;
    border-radius: 10rpx;

  }
  .sure-attestation{
    margin-bottom: 40rpx;
    padding:0 32rpx;
    margin-top:80rpx;
    .not-allow-sure{
      background: #ccc !important;
    }
    view:nth-child(2){
      background: #FFFFFE;
      color: #D8D8D8;
    }

  }
  .agreement-info{
    display: flex;
    align-items: center;
    margin-top:10rpx;
    height: 80rpx;
    background: rgba(241,39,13,0.10);
    padding: 0 25rpx;
    margin-bottom: 20rpx;
    text{
      font-size: 24rpx;
    }
    .sure-text{
      color:#666666;
    }
    .small-text{
      color: #F1270D;
    }
    image{
      width: 36rpx;
      height: 36rpx;
      margin-right:10rpx;
    }

  }
}
</style>