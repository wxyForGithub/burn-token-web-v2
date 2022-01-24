<template>
  <div
    :class="['team_container', config.chainId === '20181205' ? '' : 'theme-heco']"
  >
    <div class="head">
      <div class="flex_v_end">
          <img
            :src="require('../../assets/question.png')"
            class="question_img"
            mode
            @click="lvShow = true"
          />
        </div>
        <div class="flex_h_center_center">
          <img
            :src="require('../../assets/king.png')"
            class="team_logo_img"
            mode
          />
          <span class="fStyle30_FFFFFF_w6 ml_10">{{$t('teams')}}·</span>
          <span class="fStyle30_FFFFFF_w6" style="font-style:italic">LV.{{teamLevel}}</span>
        </div>
        <div class="flex_v_center_center mt_30">
          <span class="fStyle50_FFFFFF_w6">{{teamPowers}}</span>
        </div>
        <div class="flex_v_center_center">
          <span class="fStyle24_FFFFFF">{{$t('teamPowers')}}</span>
        </div>
        <div class="flex_h_between mt_30">
          <div class="flex_v_center_center flex1">
            <span class="fStyle38_FFFFFF_w6">{{bigTeamPowers}}</span>
            <span class="fStyle24_FFFFFF">{{$t('bigTeamPowers')}}</span>
          </div>
          <div class="v_line"></div>
          <div class="flex_v_center_center flex1">
            <span class="fStyle38_FFFFFF_w6">{{smallTeamPowers}}</span>
            <span class="fStyle24_FFFFFF">{{$t('smallTeamPowers')}}</span>
          </div>
        </div>
    </div>
    <div class="cont">
      <div class="flex_h_between pb_20">
        <div class="flex1 flex_h_start_center">
          <img
            :src="require('../../assets/user.png')"
            class="user_img"
            mode
          />
          <span class="fStyle28_F89144_w6 ml_26">{{$t('bigTeamFriend')}}</span>
        </div>
        <span class="fStyle24_E5D1CF_w6">{{bigFriends}}{{$t('personUnit')}}</span>
      </div>
      <w-list-item v-for="(item, index) in bigList" :key="index" :item="item"></w-list-item>
      <div class="h_line"></div>
      <div class="flex_h_between pb_20">
        <div class="flex1 flex_h_start_center">
          <img
            :src="require('../../assets/user_group.png')"
            class="userGroup_img"
            mode
          />
          <span class="fStyle28_F89144_w6 ml_26">{{$t('smallTeamFriend')}}</span>
        </div>
        <span class="fStyle24_E5D1CF_w6">{{smallFriends}}{{$t('personUnit')}}</span>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        loading-text="加载中"
        @load="onLoad"
      >
        <w-list-item v-for="(item, index) in smallList" :key="'2_'+index" :item="item"></w-list-item>
      </van-list>
    </div>
    <div class="bg" v-show="lvShow">
      <div class="flex-box">
        <div class="box">
          <div class="flex_h_start_center">
            <img
              :src="require('../../assets/question_origen.png')"
              class="question1_img"
              mode
            />
            <span class="fStyle38_7D7D82">发展委员制度</span>
          </div>
          <div class="fStyle26_7D7D82_w6 aLeft mt_30">一级发展委<span class="fStyle22_DC5242">(手续费分红20%)</span></div>
          <div class="fStyle22_7D7D82 aLeft">团队算力1万，小区算力2000。</div>
          <div class="fStyle26_7D7D82_w6 aLeft mt_30">二级发展委<span class="fStyle22_DC5242">(手续费分红15%)</span></div>
          <div class="fStyle22_7D7D82 aLeft">团队算力5万，小区算力1万。</div>
          <div class="fStyle26_7D7D82_w6 aLeft mt_30">三级发展委<span class="fStyle22_DC5242">(手续费分红10%)</span></div>
          <div class="fStyle22_7D7D82 aLeft">团队算力25万，小区算力5万。</div>
          <div class="fStyle26_7D7D82_w6 aLeft mt_30">四级发展委<span class="fStyle22_DC5242">(手续费分红5%)</span></div>
          <div class="fStyle22_7D7D82 aLeft">团队算力125万，小区算力25万。</div>
          <div class="flex-box btn" @click="lvShow = false">{{$t('ok')}}</div>
        </div>
      </div>
    </div>
    </div>
    <!-- </div>
  </div> -->
</template>

<script>
import { h5Copy, initEth, timeUtils, vertify, Decimal } from "@/utils/utils";
import { ethers } from "ethers";

import { abi } from "../home/abi";
// import { Toast } from "vant";
import { GLOBAL_CONFIGS } from "../../utils/global";
import WListItem from '../../components/WListItem.vue'
import {teamInfo, smallList} from '@/utils/request/api'
export default {
  data() {
    return {
      contractAddress: process.env.VUE_APP_contractAddress, // 合约地址
      contract: null, // 当前的合约对象
      lvShow: false,
      config: GLOBAL_CONFIGS,
      assetUrl:'',
      teamPowers: '0.00',
      teamLevel: '1',
      bigTeamPowers: '0.00',
      smallTeamPowers: '0.00',
      bigFriends: '0',
      smallFriends: '0',
      page: 1,
      address: '',
      bigList: [],
      smallList: [],
      loading: false,
      finished: false,
      chain_id: ''
    };
  },
  created() {
    // this.init()
     const {address, chain_id} = this.$route.query
    this.address = address
    this.chain_id = chain_id
    this.getTeamInfo()
  },
  mixins: [h5Copy, initEth, timeUtils, vertify, Decimal],
  components: {WListItem},
  methods: {
    async init() {
      if (this.signer == null) {
        return;
      }
      let _gasPrice = await this.provider.getGasPrice();
      _gasPrice = ethers.utils.formatUnits(_gasPrice, "gwei")
      if (_gasPrice > this.min_gasprice)
      this.min_gasprice = _gasPrice;//如果网络当前矿工费高于预设最小值，使用当前值

      var contract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      );
      this.contract = contract;
    },
    async getTeamInfo() {
      let res = await teamInfo(this.contractAddress, this.chain_id, this.address)
      if(res.code == 0){
        this.teamPowers = res.data.team_total || '0.00'
        this.bigTeamPowers = res.data.big_total || '0.00'
        this.smallTeamPowers = res.data.small_total || '0.00'
        this.bigFriends = res.data.big_list.length || '0'
        this.bigList = res.data.big_list || []
        this.teamLevel = res.data.kol_level
      }
    },
    async onLoad() {
      let res = await smallList(this.contractAddress, this.chain_id, this.address, this.page)
      if(res.code == 0) {
        this.loading = false;
        if(res.data.length < 20) {
          this.finished = true;
        }
        if(this.page == 1) {
          this.smallList = res.data
          this.smallFriends = res.meta.total || 0
        } else {
          this.smallList = this.smallList.concat(res.data)
        }
        this.page++
      }
    },
    subAddress (addr, subLen = 6 ) {
      const address = addr
      if (address !== '') {
        const prevStr = address.substring(0, subLen)
        const lastStr = address.substring(
          address.length - subLen,
          address.length,
        )
        return prevStr + '...' + lastStr
      } else {
        return ''
      }
    },
    tab(num) {
      this.active = num;
    },
  },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.h_line{
    width: 100%;
    height: 2px;
    background-color: #F2F2F2;
    margin-top: 30px;
    margin-bottom: 45px;
  }
  .question1_img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
.head {
  width: 100%;
  height: 500px;
  background: url(../../assets/team_bg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 60px;
  padding-right: 48px;
  padding-left: 48px;
  position: relative;
  box-sizing: border-box;
  .question_img{
    width: 40px;
    height: 40px;
  }
  .team_logo_img{
    width: 37px;
    height: 34px;
  }
  
  .v_line{
    width: 2px;
    height: 60px;
    background-color: rgba(255,255,255, 0.8);
  }
}
.cont {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px -27px 81px 0px rgba(0, 0, 0, 0.02);
  border-radius: 35px 35px 0px 0px;
  margin-top: -28px;
  position: relative;
  padding-top: 49px;
  padding-bottom: 100px;
  padding-left: 48px;
  padding-right: 48px;
  box-sizing: border-box;
  .user_img{
    width: 27px;
    height: 34px;
  }
  .userGroup_img{
    width: 39px;
    height: 34px;
  }
}

.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba($color: #000000, $alpha: 0.5);

  .flex-box {
    width: 100%;
    height: 100%;

    .box {
      width: 654px;
      // height: 673px;
      background: #ffffff;
      border-radius: 20px;
      padding: 90px 78px 45px 63px;
      box-sizing: border-box;
     

      .text {
        font-size: 38px;
        color: #7d7d82;
        margin-left: 10px;
        font-weight: bold;
      }

      .btn {
        width: 100%;
        height: 120px;
        background: #dc5242;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 50px;
      }
    }

    .box1 {
      margin-left: 50px;
      margin-right: 50px;

      width: 100%;
      // height: 699px;
      background: #ffffff;
      border-radius: 20px;
      padding: 71px 56px 71px 56px;
      .rs {
        width: 30px;
        height: 45px;
      }
      .lq {
        width: 42px;
        height: 38px;
      }
      .wq {
        width: 40px;
        height: 40px;
      }
      .text {
        font-size: 38px;
        color: #7d7d82;
        font-weight: bold;
        margin-left: 13px;
      }
      .btn {
        width: 100%;
        height: 120px;
        background: #dc5242;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 28px;
      }
  
    }
  }
}
.link {
  color: #b09b99;
  text-decoration-line: underline;
}
.team_container{
&.theme-heco {
  .head {
    background: url(../../assets/heco/team_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .bg {
    .flex-box {
      .box {
        .btn {
          background: #1c6df1;
        }
      }
    }
  }
}
}
</style>
