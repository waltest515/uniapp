<template>
	<view class="yunpool">
		<comHeader :owerAddress="owerAddress" :lianid = "lianid" @switchNetwork="switchNetwork"></comHeader>
		<u-gap height="114rpx"></u-gap>
		<view class="yunpoolInfo">
			<view class="avater">
				<u--image width="66rpx" height="74rpx" src="/static/img/index/avater.png">
				  <template v-slot:loading>
					<u-loading-icon color="red"></u-loading-icon>
				  </template>
				</u--image>
				<text>{{$t('bottom.data130')}}</text>
			</view>
			<view class="moneyZ">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<text class="money">{{usdtWallBan | moneyto}} USDT</text>
					<text>{{$t('bottom.data145')}}</text>
				</view>
				<view class="moneyZ_top">
					<view class="moneyZ_topIn">
						<text>{{$t('bottom.data143')}}</text>
						<text style="font-weight: 700;">{{userInfo.usdt_flow_reward | moneyto}} USDT</text>
					</view>
					<view class="moneyZ_topIn">
						<text>{{$t('bottom.data125')}}</text>
						<text style="font-weight: 700;">{{userInfo.usdt_flow_ratio}}%</text>
					</view>
					<view class="moneyZ_topIn">
						<text>{{$t('bottom.data23')}}</text>
						<text style="font-weight: 700;">{{userInfo.balance_1_9 | moneyto}} USDT</text>
					</view>
				</view>
			</view>
			<view class="moneyZ">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<text class="money">{{userInfo.money | moneyto}} USDT</text>
					<text>{{$t('bottom.data144')}}</text>
				</view>
				<view class="moneyZ_top">
					<view class="moneyZ_topIn">
						<text>{{$t('bottom.data137')}}</text>
						<text style="font-weight: 700;">{{userInfo.balance_1_5 | moneyto}} USDT</text>
					</view>
					<view class="moneyZ_topIn">
						<text>{{$t('bottom.data125')}}</text>
						<text style="font-weight: 700;">{{userInfo.usdt_pledge_ratio}}%</text>
					</view>
					<view class="moneyZ_topIn">
						<text>{{$t('bottom.data23')}}</text>
						<text style="font-weight: 700;">{{userInfo.balance_1_13 | moneyto}} USDT</text>
					</view>
				</view>
			</view>
			<view class="withdraw">
				<view class="withdraw_title">{{$t('bottom.data131')}}</view>
				<view style="margin-top: 20rpx;border-radius: 15px;border: 1px #fcd436 solid;padding: 15rpx;">
					<u--input v-model="lootNum" color="#fff" border="none" >
						<template slot="suffix">
							<view class="suffix_right">
								<text style="color: #fff; font-size: 28rpx;" @click="max('zusdt')">MAX</text>
								<view class="shu"></view>
								<view style="display: flex;align-items: center;">
									<u--image width="50rpx" height="50rpx" src="/static/img/index/u2.png">
									  <template v-slot:loading>
										<u-loading-icon color="red"></u-loading-icon>
									  </template>
									</u--image>
									<text style="margin-left: 15rpx;">USDT</text>
								</view>
							</view>
						</template>
					</u--input>
				</view>
				<view class="balance">
					<text v-if="withdrawType == 9">{{$t('bottom.data132')}}:${{userInfo.balance_1_9 | moneyto}}</text>
					<text v-if="withdrawType == 13">{{$t('bottom.data132')}}:${{userInfo.balance_1_13 | moneyto}}</text>
				</view>
				<view class="day">
					<view class="datInfo" :class="withdrawType == 9 ? 'active':''" @click="activeBut(9)">{{$t('bottom.data145')}}</view>
					<view class="datInfo" :class="withdrawType == 13 ? 'active':''" @click="activeBut(13)">{{$t('bottom.data144')}}</view>
				</view>
				<view v-if="withdrawType == 13" class="add_but" @click="withdraw(13)">
					<text>{{$t('bottom.data133')}}</text>
				</view>
				<view v-if="withdrawType == 9" class="add_but" @click="withdraw(9)">
					<text>{{$t('bottom.data133')}}</text>
				</view>
				<view class="withdraw_list" @click="towithdraw_list()">
					<text>{{$t('bottom.data134')}}</text>
				</view>
			</view>
		</view>
		<u-gap height="200rpx"></u-gap>
	</view>
</template>

<script>
	var web3;
	let myContract;
	import comHeader from '@/components/header.vue'
	export default{
		components:{
			comHeader
		},
		data (){
			return{
				owerAddress:"",
				lianid:56,
				lootNum:0,
				// 最小投注金额
				minBet: 500,
				// 最大投注金额
				maxBet: 99999999999,
				usdtWallBan:0,
				userInfo:[],
				usdtempower:1,
				withdrawType:9
			}
		},
		onShow() {
			this.initData()
			uni.setTabBarItem({
			  index: 0,
			  text: this.$t('bottom.data146'),
			})
			uni.setTabBarItem({
			  index: 1,
			  text: this.$t('bottom.data147'),
			})
			uni.setTabBarItem({
			  index: 2,
			  text: this.$t('bottom.data148'),
			})
			uni.setTabBarItem({
			  index: 3,
			  text: this.$t('bottom.data149'),
			})
		},
		filters:{
			moneyto(value){
				return parseFloat(value).toFixed(4) * 1
			}
		},
		methods:{
			activeBut(index){
				this.withdrawType = index
			},
			async initData() {
				var Web3 = require('@/components/getWeb3.js');
				console.log(Web3);
				Web3.default.getWeb3().then(res => {
					web3 = res;
				});
				this.initWeb3();
			},
			async initWeb3() {
				let _this = this;
				uni.showLoading({
					title: _this.$t("bottom.data1"),
					mask:true
				})
				var Web3 = require('web3');
				var web3Provider;
				if (window.ethereum) {
					web3Provider = window.ethereum;
					// 新版需要请求用户授权
					try {
						await window.ethereum.enable();
					} catch (error) {
						alert(_this.$t("bottom.data2"));
						return;
					}
				} else if (web3) {
					// MetaMask Legacy dapp browsers...
					web3Provider = web3.currentProvider;
					console.log(web3.currentProvider);
				} else {
					web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org');
				}
				web3 = new Web3(web3Provider);
				console.log(web3);
				if (!web3) {
					alert(_this.$t("bottom.data3"));
					return;
				}
				web3.eth.getChainId().then(res =>{
					_this.lianid = res
					console.log("链id",res);
				})
				// web3.eth.getGasPrice().then(res =>{
				// 	this.gas = web3.utils.fromWei(res, 'ether');
				// 	console.log("gas",web3.utils.fromWei(res, 'ether'));
				// })
				web3.eth.getAccounts(function (error, result) {
					if (!error) {
						_this.owerAddress = result[0];
						uni.setStorageSync('address',_this.owerAddress)
						_this.getbalance()
						_this.getUserInfo()
						_this.getAllowance(1)
						console.log(_this.owerAddress)
					} else {
						uni.getStorageSync('address')
					}
					uni.hideLoading()
				});
			},
			async getUserInfo() {
				let _this = this;
				let urls = "api/Xhsk/userinfo.html?address=" + _this.owerAddress
				_this.$req.post(urls).then(res => {
					console.log(res);
					//res.data = false;
					if (res.data) {
						_this.userInfo = res.data;
					} else {
						//this.showReg = true;
						console.log("获取用户数据失败：" + JSON.stringify(res));
					}
				})
			},
			async switchNetwork(id) {
				console.log(id)
				if(this.lianid == id) return;
				// if (window.ethereum.networkVersion == 56) return;
				try {
					let params = {
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: web3.utils.toHex(id) }],
					}
			
					await window.ethereum.request(params);
					this.initData()
				} catch (switchError) {
					// uni.setStorageSync('address',"")
					// this.initData()
					if (switchError.code === 4902) {
						alert('add this chain id');
					}
				}
			},
			async getbalance(){
				let _this = this;
				let myContract;
				myContract = new web3.eth.Contract(this.$heyu.heyuAbi, this.$contractData.usdtAddress, {});
				// await this.switchNetwork();
				myContract.methods.balanceOf(this.owerAddress).call({}, function (error, result) {
					// _this.refreshing = false;
					// uni.$u.toast(result)
					if (!error) {
						_this.usdtWallBan = web3.utils.fromWei(result, 'ether');
						// uni.$u.toast(_this.usdtWallBan)
						// _this.$refs.heads.diff(1)
						// _this.$toast.clear();
					} else {
						uni.$u.toast(this.$t('bottom.data89'))
					}
				});
			},
			// 查授权
			getAllowance(type){
				var contractAddress = this.$contractData.contantAddress
				var currentAccount = this.owerAddress;
				let that = this;
				let myContract3
				if(type == 1){
					myContract3 = new web3.eth.Contract(that.$heyu.heyuAbi, that.$contractData.usdtAddress, {});
				}
				myContract3.methods.allowance(currentAccount, contractAddress).call({}, function (error, result) {
					if (!error) {
						console.log("获取USDT授权金额：" + web3.utils.fromWei(result, 'ether'));
						if(web3.utils.fromWei(result, 'ether') == 0){
							that.usdtempower = 1
						}else{
							that.usdtempower = 2
						}
					} else {
						console.log(error);
					}
				});
			},
			withdraw(currency_id) {
				if (this.lootNum <= 0) {
					return uni.$u.toast(_this.$t('bottom.data100'))
				}
				let _this = this;
				let urls = "api/Xhsk/withdraw.html?amount=" + _this.lootNum + "&address=" + _this.owerAddress + "&currency_id=" + currency_id
				_this.$req.post(urls).then(res => {
					if (res.code == 0) {
						console.log(res)
						uni.$u.toast(_this.$t('bottom.data101'))
						_this.lootNum = "";
						this.getUserInfo()
						// let myContract = new web3.eth.Contract(_this.$abi.contAbi, _this.$contractData.contantAddress, {});
						// myContract.methods.withdraw(
						// 	res.data.id,
						// 	res.data.currency_id,
						// 	res.data.amount,
						// 	res.data.time,
						// 	res.data.sign
						// ).send({
						// 	from: _this.owerAddress
						// }, function (error, result) {
						// 	console.log(error, result)
						// 	if (!error) {
						// 		console.log(result);
						// 		 uni.$u.toast(_this.$t('bottom.data101'))
						// 		_this.currency_id = 0;
						// 		_this.amount = "";
						// 		let urls =
						// 			"api/Xhsk/updatePay.html?withdrawid=" + res.data.id + "&hash=" + result
						// 		_this.$req.post(urls).then(res => {
						// 			console.log(res)
						// 		})
						// 	} else {
						// 		uni.$u.toast(_this.$t('bottom.data102'))
						// 	}
						// });
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			max(type){
				if(type == 'lusdt'){
					if(this.active_type == 2){
						this.lootNum = this.userInfo.balance_1_9
					}
				}
				if(type == 'zusdt'){
					if(this.withdrawType == 13){
						this.lootNum = this.userInfo.balance_1_13
					}else{
						this.lootNum = this.userInfo.balance_1_9
					}
					
				}
			},
			lootBule() {
				if (this.lootNum < this.minBet) {
					this.lootNum = this.minBet;
				}
				if (this.lootNum > this.maxBet) {
					console.log(this.maxBet)
					this.lootNum = this.maxBet;
				}
			},
			towithdraw_list(){
				uni.navigateTo({
					url: "/pages/index/withdrawalList",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.yunpoolInfo{
		margin: 28rpx 56rpx 28rpx 56rpx;
		.avater{
			display: flex;
			align-items: center;
			color: #fff;
			font-size: 28rpx;
			text{
				margin-left: 15rpx;
			}
		}
		.moneyZ{
			margin-top: 28rpx;
			padding: 28rpx;
			border-radius: 12px;
			background: rgb(252, 212, 54);
			font-size: 28rpx;
			color: #000;
			.money{
				font-size: 38rpx;
				font-weight: 700;
			}
			.moneyZ_top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 28rpx;
				font-size: 28rpx;
				.moneyZ_topIn{
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}
		}
		.withdraw{
			margin-top: 28rpx;
			padding: 28rpx;
			border-radius: 12px;
			background: rgb(40, 39, 44);
			font-size: 28rpx;
			color: #fff;
			.withdraw_title{
				font-size: 32rpx;
				font-weight: 700;
				text-align: center;
			}
			.suffix_right{
				display: flex;
				align-items: center;
				.shu{
					margin: 0 15rpx 0 15rpx;
					width: 1px;
					height: 60rpx;
					background-color: rgb(217, 217, 217);;
				}
			}
			.balance{
				margin-top: 28rpx;
			}
			.add_but{
				margin: 28rpx 0 28rpx 0;
				padding: 28rpx 20rpx 28rpx 20rpx;
				border-radius: 6px;
				display: flex;
				justify-content: center;
				// box-shadow: 0px 1px 4px 1px rgba(205, 211, 35, 0.5);
				/* 线性渐变 */
				background: rgb(252, 212, 54);
				text{
					color: #000;
					font-size: 32rpx;
					font-weight: 700;
				}
			}
			.withdraw_list{
				display: flex;
				align-items: center;
				justify-content: right;
				color: #D9D9D9;
				font-size: 26rpx;
			}
		}
		.day{
			margin-top: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 28rpx;
			.datInfo{
				margin-right: 20rpx;
				padding: 20rpx 15rpx 20rpx 15rpx;
				border-radius: 7px;
				background: rgb(40, 39, 44);
			}
			.active{
				background: rgb(251, 212, 57);
				color: #000;
			}
		}
	}
</style>