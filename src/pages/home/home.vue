<template>
  <div
    :class="['container', config.chainId === '20181205' ? '' : 'theme-heco']"
  >
    <div class="head">
      <div class="my flex">
        <img
          :src="require('../../assets/' + assetUrl + 'head.png')"
          class="huo"
          mode
        />
        <div class="flex_h_between" style="width: 80%">
          <div class="right">
            <div class="align-center">
              <div class="text">{{$t('power')}}</div>
              <img
                :src="require('../../assets/lv' + level + '.png')"
                class="lv"
                mode
              />
            </div>
            <div class="num alignLeft">{{ power }}</div>
            <div class="smallMainInserveTxt alignLeft">
              {{$t('rewardTotal')}} {{ rewardCount }}
            </div>
          </div>
          <div class="border_btn p_relative">
                <span class="text" @click="dropdown=true">{{$t('langShortZh')}}</span>
                <div class="dropdown flex_v_center" :style="{'opacity': dropdown ? '1' : '0' }">
                  <span class="text" @click.stop="changeLang('en')">{{$t('langEn')}}</span>
                  <span  class="text" @click.stop="changeLang('zh')">{{$t('langZh')}}</span>
                </div>
              </div>
        </div>
        
      </div>
      <div class="money space-between">
        <div class="item">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'wdye.png')"
              class="img"
              mode
            />
            <div class="text">{{$t('balance')}}</div>
          </div>
          <div class="num">{{ balance }}</div>
        </div>
        <div class="item">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'qwtx.png')"
              class="img1"
              mode
            />
            <div class="text">{{$t('supply')}}</div>
          </div>
          <div class="num">{{ totalSupply }}</div>
        </div>
      </div>
      <div class="hy">
        <div class="text alignLeft">{{$t('burnToken')}}</div>
        <div class="space-between">
          <div class="num ellipsis">{{ contractAddress }}</div>
          <img
            src="../../assets/copy.png"
            class="copy"
            @click="h5Copy(contractAddress)"
            mode
          />
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="tab space-between">
        <div class="item" @click="showBurnFlag = true">
          <img
            :src="require('../../assets/' + assetUrl + 'tab1.png')"
            class="img"
            mode
          />
          <div class="text">{{$t('burn')}}</div>
        </div>
        <div class="item" @click="showIncome">
          <img
            :src="require('../../assets/' + assetUrl + 'tab2.png')"
            class="img"
            mode
          />
          <div class="text">{{$t('drag')}}</div>
        </div>
        <div class="item" @click="lvShow = true">
          <img
            :src="require('../../assets/' + assetUrl + 'level.png')"
            class="img"
            mode
          />
          <div class="text">{{$t('levelDesc')}}</div>
        </div>
        <div class="item" @click="h5Copy(myAddress)">
          <img
            :src="require('../../assets/' + assetUrl + 'tab4.png')"
            class="img"
            mode
          />
          <div class="text">{{$t('invite')}}</div>
        </div>
      </div>
      <div class="line" v-if="receiveTimestamp != 0">
        {{$t('prevDragTime')}}：{{ receiveTime }}
      </div>
      <div class="line" v-if="receiveTimestamp != 0" style="border-top: none">
        {{$t('nextDragTime')}}：{{ nextReceiveTime }}
      </div>

      <div class="my-box airdrop-box" v-if="show_airdrop && !show_upgrade">
        <div class="top space-between">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'gift.png')"
              class="img"
              mode
            />
            <div class="text">{{$t('receiveAirdrop')}}</div>
          </div>
        </div>
        <div class="copy copy1 space-between">
          <div class="flex_v_start flex1">
            <div class="num">{{$t('airdropAmount')}}</div>
            <div class="blue_num">100 {{tokenSymbol}}</div>
          </div>
          <div class="flex-box round" @click="getAirdrop" v-if="show_airdrop">
            {{$t('receiveAirdrop')}}
          </div>
        </div>
      </div>

      <div class="my-box airdrop-box" v-if="show_upgrade">
        <div class="top space-between">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'gift.png')"
              class="img"
              mode
            />
            <div class="text">{{$t('upgradePower')}}</div>
          </div>
        </div>
        <div class="copy copy1 space-between">
          <div class="flex_v_start flex1">
            <div class="num">{{$('oldPower')}}</div>
            <div class="blue_num">{{this.oldPower}}</div>
          </div>
          <div
            class="flex-box round"
            style="background-color: #ff712a; margin-left: 10px"
            @click="getUpgrade"
            v-if="show_upgrade"
          >
            <img
              :src="require('../../assets/' + assetUrl + 'upgrade.png')"
              class="upgrade_img"
              mode
            />
            {{$t('upgrade')}}
          </div>
        </div>
      </div>

      <div class="my-box pleage-box">
        <div class="copy space-between">
          <div class="flex_v_start flex1">
            <div class="num">{{burnTokenSymbol}}{{$t('pledgeAmount')}}</div>
            <div class="blue_num">{{ usdtBalanceOf }}</div>
            <div class="flex_h">
              <div class="flex-box round" @click="pledgeShow = true">
                <img
                  :src="require('../../assets/' + assetUrl + 'up.png')"
                  class="up_img"
                  mode
                />
                {{$t('pledge')}}
              </div>
              <div
                class="flex-box round"
                style="background-color: #585858"
                @click="openPledgeOut"
              >
                <img
                  :src="require('../../assets/' + assetUrl + 'down.png')"
                  class="down_img"
                  mode
                />
                {{$t('unlockPledge')}}
              </div>
            </div>
          </div>
          <!-- <div class="flex_v_start flex1"> -->
          <!-- <div class="num">USDT质押数量</div>
            <div class="blue_num">{{ usdtBalanceOf }}</div> -->
          <!-- <div
              class="flex-box round"
              style="background-color: #585858"
              @click="openPledgeOut"
            >
              <img
                :src="require('../../assets/' + assetUrl + 'down.png')"
                class="down_img"
                mode
              />
              取出
            </div> -->
          <!-- </div> -->
        </div>
        <div class="item" style="margin-top: 10px">
          <div class="align-center">
            <div class="text">
              {{$t('totalLiquitityPledge', {symbol: burnTokenSymbol})}}
              <span style="color: red">{{ totalUsdtAmount }}</span> {{burnTokenSymbol}}
            </div>
          </div>
          <!-- <div class="num" style="color: red; margin-top: 10px; font-size: 12px"></div> -->
        </div>

        <div class="item" style="margin-top: 10px">
          <div class="align-center">
            <div class="text">
              {{$t('totalAddress')}}:
              <span style="color: red">{{ totalUsersAmount  }}</span> 
            </div>
          </div>
          <!-- <div class="num" style="color: red; margin-top: 10px; font-size: 12px"></div> -->
        </div>

        <div style="color: red; margin-top: 10px; font-size: 12px">
          {{$t('minPledgeRule', {minAmount: minUsdt, pledgeTokenSymbol: burnTokenSymbol, tokenSymbol})}}
        </div>
      </div>

      <div class="my-box">
        <div class="top space-between">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'add.png')"
              class="img"
              mode
            />
            <div class="text">{{$t('myAddress')}}</div>
          </div>
          <div class="text">{{$t('totalInvite', {amount: inviteCount})}}</div>
        </div>
        <div class="copy space-between">
          <div class="num ellipsis">{{ myAddress }}</div>
          <img
            :src="require('../../assets/' + assetUrl + 'copy1.png')"
            class="copy-img"
            @click="h5Copy(myAddress)"
            mode
          />
        </div>
      </div>
      <div class="my-box">
        <div class="top space-between">
          <div class="align-center">
            <img src="../../assets/bind.png" class="img1" mode />
            <div class="text">{{$t('bindInviter')}}</div>
          </div>
        </div>
        <div class="copy copy1 space-between">
          <div class="num ellipsis" v-if="inviteAddress != ''">
            {{ inviteAddress }}
          </div>
          <input
            type="text"
            v-model="inviteAddressInput"
            v-else
            :placeholder="$t('addressPlaceholder')"
            class="input_grey num flex1"
          />
          <div
            class="text1"
            v-if="
              inviteAddress != '' &&
              inviteAddress != '0x0000000000000000000000000000000000000000'
            "
          >
            {{$t('binded')}}
          </div>
          <div class="flex-box" v-else @click="registration">{{$t('bindBtn')}}</div>
        </div>
      </div>

      <div class="my-box qkswap">
        <div class="text2">
          <img src="../../assets/qks.png" alt="" />{{ config.tipsDesc
          }}<a :href="config.tipsUrl" class="link"
            ><b>{{ config.tipsUrl }}</b></a
          >
        </div>
      </div>

      <div class="my-box tele-box">
        <div class="copy copy1 space-between">
          <div class="flex1 flex_h">
            <img :src="require('../../assets/ok.png')" alt="" />
            <div class="flex_v_start">
              <div class="black30">discord</div>
              <div class="grey30">{{$t('chCommunity')}}</div>
            </div>
          </div>
          <div class="tele_btn" @click="joinOther">{{$t('join')}}</div>
        </div>
      </div>

      <div class="zdcy">
        <div class="item">
          <img width="30px" src="../../assets/zdcy.png" mode />
        </div>
        <div class="item">
          <div>{{$t('authentication')}}</div>
          <div>WWW.YUNAQ.COM</div>
        </div>
      </div>
    </div>
    <div class="bg" v-show="lvShow">
      <div class="flex-box">
        <div class="box">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'wenhao.png')"
              class="wenhao"
              mode
            />
            <div class="text">{{$t('levelDesc')}}</div>
          </div>
          <div class="text1 alignLeft">
            <span class="tit">{{$t('transfromFeeDesc')}}</span>
            <br />
            <span class="lv first">v1</span>
            <span class="tit">50%</span>
            <span class="lv">v2</span>
            <span class="tit">15%</span>
            <span class="lv">v3</span>
            <span class="tit">12%</span>
            <span class="lv">v4</span>
            <span class="tit">9%</span>
            <span class="lv">v5</span>
            <span class="tit">7%</span>
            <span class="lv">v6</span>
            <span class="tit">5%</span>
            <br />
            <br />v1:算力0-499 v2:算力500-4999 v3:算力5000-9999
            v4:算力10000-19999 v5:算力20000-39999 v6:算力40000+
            <br />*例如转账100个，转出方扣除120个，接收方获得100个，20个销毁。
          </div>
          <div class="flex-box btn" @click="lvShow = false">{{$t('ok')}}</div>
        </div>
      </div>
    </div>
    <!-- 燃烧原料 -->
    <div class="bg" v-show="showBurnFlag">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'rs.png')"
              class="rs"
              mode
            />
            <div class="text">{{$t('burn')}}</div>
          </div>
          <div class="text1 alignLeft">
            {{$t('balance')}}
            <span>{{ balance }}</span> {{tokenSymbol}}
          </div>
          <div class="input-box space-between">
            <input
              type="text"
              class="input"
              value
              placeholder="输入燃烧数量"
              v-model="amount"
            />
            <div class="align-center">
              <div class="text2">{{tokenSymbol}}</div>
              <div class="line"></div>
              <div class="text3" @click="inputAll">{{$t('all')}}</div>
            </div>
          </div>
          <div class="tit alignLeft">
            * {{$t('burnTips')}} 
          </div>
          <div class="tit alignLeft">* {{$t('burnTips2', {
            tokenSymbol: burnTokenSymbol
            })}}</div>
          <div class="flex-box btn" @click="burn">{{$t('burnBtn')}}</div>
          <div class="text4" @click="showBurnFlag = false">{{$t('cancel')}}</div>
        </div>
      </div>
    </div>
    <!-- 挖取矿产 -->
    <div class="bg" v-show="bgShow">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'wq.png')"
              class="wq"
              mode
            />
            <div class="text">{{$t('drag')}}</div>
          </div>
          <div class="text5">
            <span>152152.311</span>
            <br />待更新通证算力
          </div>
          <div class="tit tit1">我当前通证算力总量：{{ power }}</div>
          <div class="flex-box btn">增加更新</div>
          <div class="text4" @click="bgShow = false">取消</div>
        </div>
      </div>
    </div>
    <!-- 领取收益弹框 -->
    <div class="bg" v-show="incomeFlag">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'lqjl.png')"
              class="lq"
              mode
            />
            <div class="text">{{$t('receiveIncome')}}</div>
          </div>
          <div class="text5" v-if="receiveAble">
            <span class="hugeMainTxt">{{ expectAmount }}</span>
            <br />{{tokenSymbol}}
          </div>
          <div class="time-box" v-else>
            <div class="time" v-for="(item, index) in hour" :key="'1_' + index">
              {{ item }}
            </div>

            <div class="bi">:</div>
            <div
              class="time"
              v-for="(item, index) in minutes"
              :key="'2_' + index"
            >
              {{ item }}
            </div>
            <div class="bi">:</div>
            <div
              class="time"
              v-for="(item, index) in seconds"
              :key="'3_' + index"
            >
              {{ item }}
            </div>
          </div>
          <div class="last-time" v-if="!receiveAble">
             {{$t('prevDragTime')}}：{{ receiveTime }}
          </div>
          <!-- <div class="tit tit1">* 产出收益最多保留5天</div> -->
          <div class="tit tit1 tit2">* {{$t('leveTips', {time: this.maxDay})}}</div>
          <div
            :class="['flex-box', receiveAble ? 'btn' : 'btn-disable']"
            @click="getReceiveIncome"
          >
            {{ receiveAble ? $t('getBtn') : $t('received') }}
          </div>
          <div class="text4" @click="incomeFlag = false">{{$t('cancel')}}</div>
        </div>
      </div>
    </div>

    <!-- 取出质押 -->
    <div class="bg" v-show="pledgeOutShow">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <div class="text">{{$t('unlockPledge')}}</div>
          </div>
          <div class="text1 alignLeft">
            {{$t('unlockPledgeAmount')}}
            <span>{{ usdtBalanceOf }} </span>{{burnTokenSymbol}}
          </div>

          <div class="input-box space-between">
            <input
              type="text"
              class="input"
              value
              :placeholder="$t('amountPlaceholder')"
              v-model="amount"
            />
            <div class="align-center">
              <div class="text2">
                {{burnTokenSymbol}}</div>
                <div class="line"></div>
                <div class="text3" @click="amount = usdtBalanceOf">{{$t('all')}}</div>
              </div>
          </div>
            <div class="tit">* {{$t('withdrawRule')}}</div>
            <div class="flex-box btn" @click="withDraw">{{$t('unlockPledge')}}</div>
            <div class="text4" @click="pledgeOutShow = false">{{$t('cancel')}}</div>
          </div>
        </div>
    </div>
      <!-- 质押 -->
      <div class="bg" v-show="pledgeShow">
        <div class="flex-box">
          <div class="box1">
            <div class="align-center">
              <div class="text">{{$t('pledge')}}</div>
            </div>
            <div class="text1 alignLeft">
              {{$t('pledgeTips', {minAmount: minUsdt, symbol: burnTokenSymbol})}}
            </div>
            <div class="input-box space-between">
              <input
                type="number"
                class="input"
                value
                :placeholder="$t('amountPlaceholder')"
                v-model="amount"
              />
              <div class="align-center">
                <div class="line"></div>
                <div class="text2">{{burnTokenSymbol}}</div>
              </div>
            </div>
            <div class="flex-box btn" @click="handlePlege">{{$t('pledge')}}</div>
            <div class="text4" @click="pledgeShow = false">{{$t('cancel')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div>
  </div> -->
</template>

<script>
// import h5Copy from '../js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
import { h5Copy, initEth, timeUtils, vertify, Decimal } from "@/utils/utils";
import { ethers } from "ethers";
import { abi } from "./abi";
import { Toast } from "vant";
import { GLOBAL_CONFIGS } from "../../utils/global";
const RATE = ["0.002", "0.005", "0.0055", "0.006", "0.0065", "0.07"];
export default {
  data() {
    return {
      contractAddress: "", // 合约地址
      oldContractAddress: "", // 老合约地址，用于查询升级power
      tokenSymbol:"",//本应用token的符号
      burnTokenSymbol:"",//质押token的符号
      usdtDecimals: 8,
      usdtContractAddress: "",//质押的token合约地址
      maxDay: 7, // 最大累计的天数
      contract: null, // 当前的合约对象
      myAddress: "", // 我的地址
      balance: "0.00", // 我的余额
      // totalPower: "0",// 全网通证总量
      totalSupply: "0", // 全网通证总量
      totalUsersAmount:"0",//全网参与地址数
      power: "0", // 我的算力
      level: 1,
      lvShow: false,
      bgShow: false,
      pledgeShow: false,
      pledgeOutShow: false,
      type: 1,
      epoch: 86400, // 挖矿周期
      inviteCount: "0", // 邀请的人数
      receiveTimestamp: 0, // 上次领取奖励的时间戳
      receiveTime: "", // 上次领取奖励的时间
      nextReceiveTime: "", // 下次领取奖励的时间
      inviteAddress: "", // 已绑定邀请人地址
      inviteAddressInput: "", // 输入邀请人的地址
      rewardCount: 0, // 获取累计收益
      incomeFlag: false, // 领取收益弹框
      deadline: "", // 截止日期
      hour: "00", // 时
      minutes: "00", // 分
      seconds: "00", // 秒
      showBurnFlag: false, // 燃烧算力弹框
      receiveAble: false, // 收益是否可以被领取
      amount: "", // 燃烧数量
      expectAmount: 0, // 预估收益
      decimals: 3, //精度
      config: GLOBAL_CONFIGS,
      assetUrl: process.env.VUE_APP_PLATFORM == "QKI" ? "" : "heco/",
      is_upgrade: false, // 是否可以升级
      is_airdrop: true, //是否可以空投
      show_airdrop: true, //
      show_upgrade: false,
      oldPower: 0,
      minUsdt: 0,
      usdtSymbol: "",
      pledgeUsdtAmount: 0, // 质押usdt的数量
      usdtBalanceOf: 0,
      totalUsdtAmount: 0,
      min_gasprice: 150,
      dropdown: false,
    };
  },
  created() {
    // this.contractAddress =
    //   process.env.NODE_ENV == "development"
    //     ? "0x3FB708e854041673433e708feDb9a1b43905b6f7"
    //     : GLOBAL_CONFIGS.contractAdress;
    this.init()
  },
  mixins: [h5Copy, initEth, timeUtils, vertify, Decimal],
  methods: {
    show(num) {
      this.type = num;
      this.bgShow = true;
    },
    async init() {
      if (this.signer == null) {
        return;
      }
      let _gasPrice = await this.provider.getGasPrice();
      _gasPrice = ethers.utils.formatUnits(_gasPrice, "gwei")
      if (_gasPrice > this.min_gasprice)
      this.min_gasprice = _gasPrice;//如果网络当前矿工费高于预设最小值，使用当前值
      console.log(this.min_gasprice)

      var contract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      );
      this.contract = contract;
      await this.getEpoch();
      let [error, res] = await this.to(this.contract.totalUsersAmount());
      this.doResponse(error, res, "totalUsersAmount");
      this.getTotalSupply();
      this.getinviteCount();
      this.getReceiveTime();
      this.getRewardCount();
      this.getInviteAddress();
      this.getBalance();
      await this.getPower();
      if (this.power == 0) {
        this.show_airdrop = true
        await this.getIsUpgrade();
        if (this.is_upgrade) {
          this.getOldPower();
        } else {
          this.show_upgrade = false;
        }
      } else {
        this.show_airdrop = false
      }
      await this.initContract();
      this.getPledgeAmount();
    },
    // 获取合约初始化数据，以后都不会更新的方法，只请求一次
    async initContract() {
      // 获取token2
      let [error2, token2] = await this.to(this.contract.requireToken());
      if (this.doResponse(error2, token2)) {
        this.usdtContractAddress = token2
        const token2Contract = new ethers.Contract(token2, abi, this.signer);
        let [error2_4, token2Min] = await this.to(this.contract.anti_bot());
        this.doResponse(error2_4, token2Min, "minUsdt", this.usdtDecimals);

        let [error, usdtBalance] = await this.to(
          token2Contract.balanceOf(this.contractAddress)
        );
        this.doResponse(
          error,
          usdtBalance,
          "totalUsdtAmount",
          this.usdtDecimals
        );
      }

      // 获取是否可以进行挖矿
      let [error3, res1] = await this.to(this.contract.is_mint());
      if (this.doResponse(error3, res1)) {
        this.is_mint = res1;
      }
    },
    // 展示领取收益
    async showIncome() {
      // 新用户且算力不为0，进入页面就可以领取一次收益
      if (this.receiveTimestamp == 0) {
        if (this.power != 0) {
          this.receiveAble = true;
          this.incomeFlag = true;
          // 默认领取一天的收益，传入参数只要是小于epoch的任何一个数都可以
          this.calcExpectAmount(10);
        } else {
          Toast(this.$t('noPower'));
          return;
        }
      } else {
        this.incomeFlag = true;
        let nowTimeStr = Date.now().toString().substring(0, 10);
        let distance = this.receiveTimestamp + this.epoch - Number(nowTimeStr);
        // 如果distance大于0表示收益还不可以领取。需要计算倒计时
        if (distance <= 0) {
          this.calcExpectAmount(distance);
        }
      }
    },
    // async getAddress() {
    //   let [error, address] = await this.to(this.signer.getAddress());
    //   if (error == null) {
    //     this.myAddress = address;
    //   } else {
    //     console.log(error);
    //   }
    // },
    // 获取主网qki的余额
    async getQkiBalance() {
      let [error, balance] = await this.to(
        this.provider.getBalance(this.myAddress)
      );
      if (error == null) {
        let etherString = ethers.utils.formatEther(balance);
        return parseFloat(etherString);
      }
      return 0.0;
    },
    // 得到余额
    async getBalance() {
      let [error, balance] = await this.to(
        this.contract.balanceOf(this.myAddress)
      );
      this.doResponse(error, balance, "balance", this.decimals);
    },
    // 得到通证总量
    async getTotalSupply() {
      let [error, res] = await this.to(this.contract.totalSupply());
      this.doResponse(error, res, "totalSupply", this.decimals);
    },
    // 得到个人算力
    async getPower() {
      let [error, res] = await this.to(this.contract.power(this.myAddress));
      this.doResponse(error, res, "power", this.decimals);
    },
    // 从老合约上获取算力
    async getOldPower() {
      let contract = new ethers.Contract(
        this.oldContractAddress,
        abi,
        this.signer
      );
      let [error, res] = await this.to(contract.power(this.myAddress));
      this.doResponse(error, res, "oldPower", this.decimals);
      if (this.oldPower <= 0) {
        this.show_upgrade = false;
      } else {
        this.show_upgrade = true;
      }
    },
    // 获取累计收益
    async getRewardCount() {
      let [error, res] = await this.to(
        this.contract.rewardCount(this.myAddress)
      );
      this.doResponse(error, res, "rewardCount", this.decimals);
    },
    // 获取上次领取奖励的时间
    // 注：这个方法必须调用在getEpoch方法之后，因为他们两个共同影响倒计时的逻辑
    async getReceiveTime() {
      let [error, res] = await this.to(
        this.contract.last_miner(this.myAddress)
      );
      this.doResponse(error, res, "receiveTimestamp");
    },
    // 获取挖矿周期
    async getEpoch() {
      let [error, res] = await this.to(this.contract.epoch());
      this.doResponse(error, res, "epoch");
    },
    // 获取邀请人数
    async getinviteCount() {
      let [error, res] = await this.to(
        this.contract.inviteCount(this.myAddress)
      );
      this.doResponse(error, res, "inviteCount");
    },
    // 获取绑定人信息
    async getInviteAddress() {
      let [error, res] = await this.to(this.contract.invite(this.myAddress));
      if (this.doResponse(error, res)) {
        if (res == "0x0000000000000000000000000000000000000000") {
          res = "";
        }
        this.inviteAddress = res;
      }
    },
    // 绑定邀请人。
    async registration() {
      if (this.inviteAddressInput == "") {
        Toast(this.$t('addressPlaceholder'));
        return;
      }
      if (
        this.inviteAddressInput.toLowerCase() == this.myAddress.toLowerCase()
      ) {
        Toast(this.$t('notOwner'));
        this.inviteAddressInput = "";
        return;
      }
      if (
        this.inviteAddressInput.toLowerCase() ==
        this.contractAddress.toLowerCase()
      ) {
        Toast(this.$t('notContract'));
        this.inviteAddressInput = "";
        return;
      }

      // TODO: 如何验证地址的合法性？？
      let [error, res] = await this.to(
        this.contract.registration(this.inviteAddressInput, {
          gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),
        })
      );
      if (this.doResponse(error, res)) {
        Toast(this.$t('bindSuccess'));
        this.inviteAddress = this.inviteAddressInput;
      }
    },
    // 燃烧
    async burn() {
      if (this.amount == "") {
        Toast(this.$t('amountPlaceholder'));
        return;
      }
      let burn_amount =
        ethers.FixedNumber.from(this.amount.toString()) * 10 ** this.decimals;
      const gasLimit = await this.getEstimateGas(() =>
        this.contract.estimateGas.burn(burn_amount,{gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei")})
      );
      if (gasLimit === 0) {
        return;
      }
      let [error, res] = await this.to(
        this.contract.burn(burn_amount, {
          gasLimit,
          gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),
        })
      );
      if (this.doResponse(error, res)) {
        this.showBurnFlag = false;
        Toast(this.$t('operateSuccess'));
        await this.queryTransation(res.hash);
      }
    },
    // 领取挖矿收益
    async getReceiveIncome() {
      if  (!this.is_mint) {
        Toast("还没有开始挖矿，请先发圈宣传锁定邀请关系");
        return;
      }
      if (!this.receiveAble) {
        Toast(this.$t('received1'));
        return;
      }
      const gasLimit = await this.getEstimateGas(() =>
        this.contract.estimateGas.mint({gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei")})
      );
      if (gasLimit === 0) {
        return;
      }
      let [error, res] = await this.to(
        this.contract.mint({
          gasLimit,
          gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),
        })
      );
      if (this.doResponse(error, res, "")) {
        this.incomeFlag = false;
        Toast(this.$t('receivedSuccess'));
        await this.queryTransation(res.hash, true);
      }
    },
    async getIsAirdrop() {
      let [error, res] = await this.to(this.contract.is_airdrop());
      if (this.doResponse(error, res)) {
        this.is_airdrop = res;
      }
    },
    // 领取空投
    async getAirdrop() {
      if (!this.is_airdrop) {
        Toast(this.$t('airdropNotStart'));
        return;
      }
      if (this.power != 0) {
        Toast(this.$t('zeroAirdrop'));
        return;
      }
      let [error, res] = await this.to(
        this.contract.airdrop({
          gasLimit:"100000",
          gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),
        })
      );
      if (this.doResponse(error, res, "")) {
        Toast(this.$t('airdropSuccess'));
        await this.queryTransation(res.hash);
      }
    },
    // 是否可以升级
    async getIsUpgrade() {
      let [error, res] = await this.to(this.contract.is_upgrade());
      if (this.doResponse(error, res)) {
        this.is_upgrade = res;
      }
    },
    // 升级
    async getUpgrade() {
      if (!this.is_upgrade) {
        Toast(this.$t('notUpgrade'));
        return;
      }
      if (this.power != 0) {
        Toast(this.$t('zeroUpgrade'));
        return;
      }
      const gasLimit = await this.getEstimateGas(() =>
        this.contract.estimateGas.upgrade({
          gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),
        })
      );
      if (gasLimit === 0) {
        return;
      }
      let [error, res] = await this.to(
        this.contract.upgrade({
          gasLimit,
          gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),
        })
      );
      if (this.doResponse(error, res, "")) {
        Toast(this.$t('upgradeSuccess'));
        await this.queryTransation(res.hash);
      }
    },
    openPledgeOut() {
      let nowTimeStr = Date.now().toString().substring(0, 10);
      // 如果distance大于0表示收益还不可以领取。需要计算倒计时
      let distance = this.receiveTimestamp + 86400 - Number(nowTimeStr);
      if (distance <= 0) {
        this.pledgeOutShow = true;
      } else {
        Toast(this.$t('oneDayDrag'));
      }
    },
    // 获取质押数量
    async getPledgeAmount() {
      let [erro1, Token1balance] = await this.to(
        this.contract.TokenBalanceOf(this.myAddress, this.usdtContractAddress)
      );
      this.doResponse(erro1, Token1balance, "usdtBalanceOf", this.usdtDecimals);
    },
    // 取出质押
    async withDraw() {
      if (this.amount == "") {
        Toast(this.$t('amountPlaceholder'));
        return;
      }
      let amount = ethers.utils.parseUnits(this.amount.toString(), this.usdtDecimals);
      let tokenAddr = this.usdtContractAddress;
      const gasLimit = await this.getEstimateGas(() =>
        this.contract.estimateGas.withdrawToken(tokenAddr, amount,{gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),})
      );
      if (gasLimit === 0) {
        return;
      }
      let [error, res] = await this.to(
        this.contract.withdrawToken(tokenAddr, amount, {
          gasLimit,
          gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),
        })
      );
      if (this.doResponse(error, res)) {
        this.pledgeOutShow = false;
        this.amount = "";
        Toast(this.$t('blockSuccess'));
        await this.queryTransation(res.hash);
      }
    },
    // 质押
    async handlePlege() {
      if (this.amount == "") {
         Toast(this.$t('amountPlaceholder'));
        return;
      }
      let amount = ethers.utils.parseUnits(this.amount.toString(), this.usdtDecimals);

      let tokenAddr = this.usdtContractAddress;
      let contract = new ethers.Contract(tokenAddr, abi, this.signer);
      let [err2, allowce] = await this.to(
        contract.allowance(this.myAddress, this.contract.address)
      );
      let response = [false];

      if (this.doResponse(err2, allowce)) {
        const hex = ethers.utils.hexValue(allowce);
        console.log(this.hex2int(hex),)
        const Value = Decimal.div(
          this.hex2int(hex),
          ethers.BigNumber.from(10).pow(this.decimals)
        );

        if (!(Decimal.sub(Value, amount) >= 0)) {
          const gasLimit1 = await this.getEstimateGas(() =>
            contract.estimateGas.approve(this.contract.address, amount)
          );
          if (gasLimit1 === 0) {
            return;
          }
          response = await this.to(
            contract.approve(
              this.contract.address,
              "11579208923731619542357098500868790785326998466564056403945758400791312963993",
              {
                gasLimit: Number(gasLimit1),
                gasPrice: ethers.utils.parseUnits(
                  String(this.min_gasprice),
                  "gwei"
                ),
              }
            )
          );
        }
      }
      let [err, hash] = response;
      if (err == null) {
        Toast(this.$t('permission'));
        this.pledgeShow = false;
        await this.queryTransation(hash.hash, null, async () => {
          const gasLimit2 = await this.getEstimateGas(() =>
            this.contract.estimateGas.depositToken(tokenAddr, amount,{gasPrice: ethers.utils.parseUnits(String(this.min_gasprice), "gwei"),})
          );
          if (gasLimit2 === 0) {
            return;
          }
          let [error, res] = await this.to(
            this.contract.depositToken(tokenAddr, amount, {
              gasLimit: Number(gasLimit2),
              gasPrice: ethers.utils.parseUnits(
                String(this.min_gasprice),
                "gwei"
              ),
            })
          );
          if (this.doResponse(error, res)) {
            Toast(this.$t('waitFeedback'));
            await this.queryTransation(res.hash);
          }
        });
      } else {
        Toast(this.$t('pledging'));
        this.pledgeShow = false;
        const gasLimit2 = await this.getEstimateGas(() =>
          this.contract.estimateGas.depositToken(tokenAddr, amount, {
            gasPrice: ethers.utils.parseUnits(
              String(this.min_gasprice),
              "gwei"
            )
          })
        );
        if (gasLimit2 === 0) {
          return;
        }
        let [error, res] = await this.to(
          this.contract.depositToken(tokenAddr, amount, {
            gasLimit: Number(gasLimit2),
            gasPrice: ethers.utils.parseUnits(
              String(this.min_gasprice),
              "gwei"
            ),
          })
        );
        if (this.doResponse(error, res)) {
           Toast(this.$t('waitFeedback'));
          await this.queryTransation(res.hash);
        }
      }
    },
    // 查询Transaction
    async queryTransation(hash, updateTime, callback) {
      await this.provider.waitForTransaction(hash).then(async (receipt) => {
        Toast(this.$t('blockSuccess'), receipt);
        if(callback) {
          callback();
        } else {
          await this.getBalance();
          await this.getPower();
          await this.getTotalSupply();
          this.getPledgeAmount();
          if(this.power != 0) {
            this.show_upgrade = false
          }
          this.amount = "";
          if (updateTime) {
            await this.getRewardCount();
            await this.getEpoch();
            await this.getReceiveTime();
          }
        }
      });
    },
    async calcExpectAmount(distance) {
      // 计算阶段奖励
      let currRate = RATE[this.level - 1];
      // 奖励是否过期
      let day = Math.floor(Math.abs(distance) / this.epoch);
      day = day + 1;
      // let expectAmount = this.accMul(this.power, currRate);
      if (this.timestampToTime == 0) {
        day = 1;
      } else {
        if (this.level == 1) {
          if (day > 1) {
            day = 1;
          }
        } else {
          if (day > this.maxDay) {
            day = this.maxDay;
          }
        }
      }

      // let par1 =
      this.expectAmount = this.accMul(this.accMul(this.power, currRate), day);
    },
    // 十六进制转10进制
    hex2int(hex) {
      if (hex.indexOf("0x") >= 0) {
        hex = hex.substring("2");
      }
      var len = hex.length,
        a = new Array(len),
        code;
      for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
          code -= 48;
        } else {
          code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
      }
      return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
    // response公共处理方法
    doResponse(error, res, keyName, Decimal = 0) {
      // console.log(keyName+'================', error, res);
      if (error == null) {
        if (keyName) {
          let hex = ethers.utils.hexValue(res);
          let Value =
            this.hex2int(hex) / ethers.BigNumber.from(10).pow(Decimal);
          this[keyName] = Value;
        }
        return true;
      } else {
        try{
          if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
            Toast('错误:' + error.error)
          } else if (error.code === 'INSUFFICIENT_FUNDS') {
            Toast('矿工费不足')
          } else if (error.code === 4001 || error === 'cancelled') {
            Toast('交易取消')
          } else {
            if (error.data.message.indexOf('gas') > 0) {
              Toast('矿工费不足')
            } else if (error.data.message.indexOf('RPC') > 0) {
              Toast('节点异常，请切换节点')
            } else if (error.data.message.indexOf('reverted') > 0) {
              Toast('错误:' + error.data.message)
            } else {
              Toast('异常')
            }
          }
        } catch(e) {
          Toast('异常')
        }
        return false;
      }
    },
    // 输入全部
    inputAll() {
      this.amount = this.balance;
    },
    async getEstimateGas(fn) {
      const [err, res] = await this.to(fn());
      if (this.doResponse(err, res)) {
        const hex = ethers.utils.hexValue(res);
        const Value = this.hex2int(hex);
        console.log("getEstimateGas========", Value);
        return String(Decimal.mul(Value, 1.5)).split(".")[0];
      } else {
        return 0;
      }
    },
    joinOther() {
      this.h5Copy("https://discord.gg/wEZakneHX5");
      setTimeout(() => {
        window.location.href = "https://discord.gg/wEZakneHX5";
      }, 1000);
    },
    tab(num) {
      this.active = num;
    },
    changeLang() {
      this.dropdown = false
      const currLang = this.$i18n.locale === 'en' ? 'zh' : 'en'
      this.$i18n.locale = currLang
      localStorage.setItem('APP_LANG', currLang)
    }
  },
  // computed: {
  //   receiveAble: function(){
  //     // 获取当前时间
  //     let nowTimeStr = Date.now()
  //       .toString()
  //       .substring(0, 10);
  //     return Number(nowTimeStr) - (this.receiveTimestamp + this.epoch) > 0
  //   }
  // },
  watch: {
    power(newPower) {
      if (newPower < 500) {
        this.level = 1;
      } else if (newPower < 5000) {
        this.level = 2;
      } else if (newPower < 10000) {
        this.level = 3;
      } else if (newPower < 20000) {
        this.level = 4;
      }else if (newPower < 40000) {
        this.level = 5;
      } else {
        this.level = 6;
      }
    },
    receiveTimestamp(newTime) {
      if (newTime != 0) {
        this.receiveTime = this.timestampToTime(this.receiveTimestamp);
         this.nextReceiveTime = this.timestampToTime(this.receiveTimestamp + this.epoch);
      }
      // 获取当前时间
      let nowTimeStr = Date.now().toString().substring(0, 10);
      // 如果distance大于0表示收益还不可以领取。需要计算倒计时
      let distance = this.receiveTimestamp + this.epoch - Number(nowTimeStr);
      if (distance > 0) {
        this.countDown(distance, () => {
          this.calcExpectAmount(distance);
          this.receiveAble = true;
        });
        this.receiveAble = false;
      } else {
        this.calcExpectAmount(distance);
        this.receiveAble = true;
      }
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
.align-center {
  display: flex;
  align-items: center;
}
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.head {
  width: 100%;
  height: 500px;
  background: url(../../assets/bj.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 100px;
  position: relative;
  box-sizing: border-box;
  .my {
    margin-left: 101px;

    .huo {
      width: 93px;
      height: 104px;
    }

    .right {
      margin-left: 29px;
      margin-top: -10px;

      .num {
        font-size: 58px;
        color: #fff;
        font-weight: bold;
      }

      .align-center {
        .lv {
          width: 44px;
          height: 28px;
          margin-left: 10px;
        }

        .text {
          font-size: 26px;
          color: #ffcdcd;
          margin-left: 11px;
        }
      }
    }
  }

  .money {
    margin-top: 70px;
    padding: 0 110px;

    .item {
      text-align: center;

      .img {
        width: 33px;
        height: 31px;
      }

      .img1 {
        width: 25px;
        height: 33px;
      }

      .text {
        font-size: 24px;
        color: #ffcdcd;
        margin-left: 10px;
      }

      .num {
        font-size: 26px;
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }

  .hy {
    // margin-left: 50px;
    // margin-right: 50px;
    // width: 653px;
    height: 112px;
    background: linear-gradient(135deg, #ffc308 0%, #f6874f 100%);
    border-radius: 30px;
    margin: 40px 50px 0 50px;
    padding: 23px 45px 0 50px;
    position: relative;
    z-index: 9;
    box-sizing: border-box;
    .text {
      font-size: 24px;
      color: #fff;
      font-weight: bold;
    }

    .space-between {
      margin-top: 4px;

      .num {
        font-size: 20px;
        color: #fff;
        font-weight: bold;
      }

      .copy {
        width: 34px;
        height: 34px;
      }
    }
  }
}

.cont {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px -27px 81px 0px rgba(0, 0, 0, 0.02);
  border-radius: 35px 35px 0px 0px;
  margin-top: -28px;
  position: relative;
  padding-top: 103px;
  padding-bottom: 100px;
  .tab {
    padding: 0 58px;

    .item {
      text-align: center;

      .img {
        width: 116px;
        height: 116px;
      }

      .text {
        font-size: 26px;
        color: #737278;
        margin-top: 16px;
      }
    }
  }

  .line {
    text-align: center;
    font-size: 22px;
    color: #c0c0c0;
    // width: 608px;
    height: 2px;
    margin: 53px auto 0 auto;
    padding-top: 20px;
    border-top: 1px solid #f2f2f2;
  }

  .my-box {
    margin-top: 60px;
    padding: 0 48px;

    .img {
      width: 26px;
      height: 35px;
    }

    .img1 {
      width: 30px;
      height: 30px;
    }

    .text,
    .text2 {
      font-size: 24px;
      color: #b09b99;
      margin-left: 14px;
    }

    .text1 {
      font-size: 24px;
      color: #7d7d82;
    }

    .copy {
      width: 100%;
      height: 65px;
      background: #fff1ef;
      border-radius: 21px;
      padding: 0 45px 0 42px;
      margin-top: 26px;
      box-sizing: border-box;
      &.copy1 {
        height: 102px;
        background: #f3f3f3;
        padding: 0 33px 0 40px;
      }

      .flex-box {
        width: 156px;
        height: 62px;
        background: #dc5242;
        border-radius: 16px;
        font-size: 24px;
        color: #fff;
      }

      .num {
        font-size: 20px;
        color: #737278;
      }

      .copy-img {
        width: 34px;
        height: 34px;
      }
    }
    &.pleage-box {
      margin-bottom: 40px;
      .copy {
        background-color: #f3f3f3;
        height: auto;
        padding-top: 48px;
        padding-bottom: 48px;
        .flex-box {
          // width: 131px;
          // height: 62px;
          // margin-left: 20px;
          margin-top: 30px;
          margin-right: 100px;
          // width: 50% !important;
        }
      }
    }
    &.tele-box {
      img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
      }
      .black30 {
        color: #333;
        font-size: 28px;
      }
      .grey30 {
        color: #737278;
        font-size: 28px;
      }
      .tele_btn {
        background-color: rgb(42, 161, 213);
        color: #fff;
        font-size: 30px;
        border-radius: 10px;
        padding: 15px 30px;
      }
    }
    &.round {
      border-radius: 30px;
    }
    .upgrade_img {
      width: 16px;
      height: 30px;
      margin-right: 10px;
    }
    .up_img {
      width: 24px;
      height: 33px;
      margin-right: 10px;
    }
    .down_img {
      width: 24px;
      height: 33px;
      margin-right: 10px;
    }
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
      height: 673px;
      background: #ffffff;
      border-radius: 20px;
      padding: 90px 78px 0 63px;
      box-sizing: border-box;
      .wenhao {
        width: 40px;
        height: 40px;
      }

      .text {
        font-size: 38px;
        color: #7d7d82;
        margin-left: 10px;
        font-weight: bold;
      }

      .text1 {
        font-size: 26px;
        color: #7d7d82;
        margin-top: 30px;
        line-height: 37px;

        .tit {
          font-weight: 600;
        }

        .lv {
          color: #dc5242;
          padding-right: 10px;
          padding-left: 10px;

          &.first {
            padding-left: 0;
          }
        }
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
      .text1 {
        font-size: 26px;
        color: #b9b9b9;
        font-weight: 500;
        margin-top: 13px;
        uni-text {
          color: #dc5242;
        }
      }

      .text2 {
        font-size: 26px;
        color: #b9b9b9;
        font-weight: bold;
      }
      .line {
        width: 1px;
        height: 51px;
        background: #d8d8d8;
        margin: 0 13px;
      }
      .text3 {
        font-size: 26px;
        font-weight: 500;
        color: #dc5242;
      }
      .tit {
        font-size: 24px;
        color: #dc5242;
        font-weight: 500;
        margin-top: 73px;
        &.tit1 {
          text-align: center;
        }
        &.tit2 {
          margin-top: 26px;
        }
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
      .btn-disable {
        width: 100%;
        height: 120px;
        background: #ccc;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 50px;
      }
      .text4 {
        text-align: center;
        font-size: 32px;
        color: #b9b9b9;
        margin-top: 34px;
      }
      .text5 {
        text-align: center;
        font-size: 24px;
        color: #b9b9b9;
        margin-top: 80px;
        span {
          font-size: 50px;
          color: #dc5242;
          font-weight: 500;
        }
      }
      .time-box {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 77px;
          height: 100px;
          background: #f3f3f3;
          border-radius: 19px;
          font-size: 50px;
          color: #7d7d82;
          font-weight: bold;
        }
        .bi {
          font-size: 35px;
          color: #7d7d82;
        }
      }
      .last-time {
        text-align: center;
        margin-top: 60px;
        font-size: 22px;
        color: #c0c0c0;
      }
    }
  }
}
.input-box {
  width: 100%;
  height: 120px;
  background: #f3f3f3;
  border-radius: 20px;
  margin-top: 34px;
  padding: 0 37px;
  box-sizing: border-box;
  .input {
    width: 70%;
    height: 100%;
    border: none;
    background-color: transparent;
  }
}

.link {
  color: #b09b99;
  text-decoration-line: underline;
}

.qkswap {
  img {
    width: 35px;
    vertical-align: middle;
  }

  .text {
    border-bottom: 2px solid #f2f2f2;
    padding-bottom: 35px;
  }
}

.zdcy {
  margin-top: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b09b99;
  font-size: 11px;
  font-weight: bold;
  .item {
    text-align: left;
  }

  img {
    display: block;
    margin-right: 15px;
  }
}
.theme-heco {
  .head {
    background: url(../../assets/heco/bj.png) no-repeat;
    .my {
      .right {
        .align-center {
          .text {
            color: #fff;
          }
        }
      }
    }
    .money {
      .item {
        .text {
          color: #fff;
        }
      }
    }
  }
  .cont {
    .my-box {
      .text {
        color: #001d52;
      }
      .text1 {
        font-size: 24px;
        color: #7d7d82;
      }
      .text2 {
        color: #b09b99;
      }
      .copy {
        background: #dfe7ff;
        &.copy1 {
          height: 102px;
          background: #f3f3f3;
          padding: 0 33px 0 40px;
        }

        .flex-box {
          background: #536689;
        }

        .num {
          color: #001d52;
        }
      }
    }
  }
  .bg {
    .flex-box {
      .box {
        .text1 {
          .lv {
            color: #1c6df1;
          }
        }
        .btn {
          background: #1c6df1;
        }
      }
      .box1 {
        .text1 {
          span {
            color: #6f81a8;
          }
        }
        .text3 {
          color: #092559;
        }
        .tit {
          color: #001d52;
        }
        .btn {
          background: #1c6df1;
        }
      }
    }
  }
  .hy {
    background: linear-gradient(135deg, #005aff 0%, #337ce4 100%);
  }
 
}
 .p_relative{
    position: relative;
  }
.border_btn{
      border: 2px solid rgba(255,255,255, 0.3);
      border-radius: 8px;
      padding: 20px 25px; 
      font-size: 12px;
      color: #fff;
      &.purpler_color{
        border-color: #2D2484;
      }
      &.padd_min{
        padding: 12px 30px; 
      }
      .mdex_img{
        width: 109px;
        height: 35px;
        margin-right: 20px;
      }
      .arrow_down_icon{
        width: 15px;
        height: 21px;
        margin-left: 8px;
      }
    }
    .dropdown{
      border: 2px solid rgba(255,255,255, 0.3);
      border-radius: 8px;
      width: 100%;
      position: absolute;
      left: 0;
      top: 90px;
      z-index: 99;
      background-color: #fff;
      span{
        padding-top: 15px;
        padding-bottom: 15px;
        color: #000;
      }
    }
</style>
