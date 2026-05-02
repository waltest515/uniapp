<template>
	<view class="yunpool">
		<comHeader :owerAddress="owerAddress" :lianid = "lianid" @switchNetwork="switchNetwork"></comHeader>
		<u-gap height="114rpx"></u-gap>
		<view class="yunpoolInfo">
			<view class="suo">
				<view class="suoInfo">
					<text>{{$t('bottom.data126')}}</text>
					<text style="margin-top: 15rpx;">{{userInfo.money | moneyto}}USDT</text>
				</view>
				<view class="suoInfo">
					<text>{{$t('bottom.data125')}}</text>
					<text style="margin-top: 15rpx;">{{userInfo.usdt_pledge_ratio}}%</text>
				</view>
			</view>
			<view class="zhiya">
				<text style="font-weight: 700;">{{$t('bottom.data127')}}</text>
				<text style="font-weight: 700;">{{userInfo.usdt_pledge_balance | moneyto}}USDT</text>
			</view>
			<view class="zhiya">
				<view style="display: flex;align-items: center;">
					<view style="border-radius: 15px;border: 1px #fcd436 solid;padding: 15rpx;">
						<u--input v-model="lootNum" border="none" color="#fff">
							<!-- <template slot="suffix"> @blur="lootBule"
								<text style="color: #fff; font-size: 28rpx;" @click="max('zusdt')">MAX</text>
							</template> -->
						</u--input>
					</view>
					<view style="padding: 15rpx;background-color: #fcd436;border-radius: 8px;margin-left: 15rpx;">
						<text style="color: #fff; font-size: 28rpx; font-weight: 700;" @click="max('zusdt')">MAX</text>
					</view>
				</view>
				<text>USDT</text>
			</view>
			<view class="day">
				<view class="datInfo" :class="activeDay == 7 ? 'active':''" @click="activeBut(7)">7</view>
				<view class="datInfo" :class="activeDay == 15 ? 'active':''" @click="activeBut(15)">15</view>
				<view class="datInfo" :class="activeDay == 30 ? 'active':''" @click="activeBut(30)">30</view>
				<view class="datInfo" :class="activeDay == 60 ? 'active':''" @click="activeBut(60)">60</view>
				<view class="datInfo" :class="activeDay == 90 ? 'active':''" @click="activeBut(90)">90</view>
<!-- 				<view class="datInfo" :class="activeDay == 180 ? 'active':''" @click="activeBut(180)">180</view>
				<view class="datInfo" :class="activeDay == 360 ? 'active':''" @click="activeBut(360)">360</view> -->
			</view>
			<view class="add_but" @click="partIn(1)">
				<text>{{$t('bottom.data128')}}</text>
			</view>
			<view class="zhiya" style="background-color: #28272C;padding: 28rpx; border-radius: 10px; font-weight: 700;">
				<view style="display: flex;align-items: center;">
					<text style="margin-right: 15rpx;">{{$t('bottom.data129')}}</text>
					<u--image width="36rpx" height="34rpx" src="/static/img/index/xin.png">
					  <template v-slot:loading>
						<u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
				</view>
				<text>333,323</text>
			</view>
			<view class="record">
				<view class="record_info">
					<u--image width="64rpx" height="64rpx" src="/static/img/index/he1.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
					<text style="margin: 15rpx 0 15rpx 0;">{{$t('bottom.data13')}}</text>
					<text style="font-weight: 700;">{{statistics.capital_pool * 1}}</text>
				</view>
				<view class="record_info">
					<u--image width="64rpx" height="64rpx" src="/static/img/index/he2.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
					<text style="margin: 15rpx 0 15rpx 0;">{{$t('bottom.data14')}}</text>
					<text style="font-weight: 700;">{{statistics.participants}}</text>
				</view>
				<view class="record_info">
					<u--image width="64rpx" height="64rpx" src="/static/img/index/he3.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
					<text style="margin: 15rpx 0 15rpx 0;">{{$t('bottom.data15')}}</text>
					<text style="font-weight: 700;">{{statistics.income * 1}}</text>
				</view>
			</view>
		</view>
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
				activeDay:7,
				usdtempower:1,
				statistics:[],
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
						_this.getStatistics()
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
				myContract = new web3.eth.Contract(_this.$heyu.heyuAbi, _this.$contractData.usdtAddress, {});
				// await this.switchNetwork();
				myContract.methods.balanceOf(_this.owerAddress).call({}, function (error, result) {
					// _this.refreshing = false;
					if (!error) {
						_this.usdtWallBan = web3.utils.fromWei(result, 'ether');
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
			getStatistics() {
				let _this = this;
				let urls =
					"api/Xhsk/getStatistics.html?address=" + _this.owerAddress
				_this.$req.post(urls).then(res => {
					this.statistics = res.data
				})
			},
			//参与
			partIn(type){
				if(type ==1){
					if(this.usdtempower == 1){
						return uni.$u.toast(this.$t('bottom.data95'))
					}
					let _this = this;
					uni.showLoading({
						title: this.$t('bottom.data96'),
						mask:true
					})
					//console.log(web3.utils.toWei(_this.lootNum + "", 'ether'));
					let myContract = new web3.eth.Contract(_this.$abi.contAbi, _this.$contractData.contantAddress, {});
					myContract.methods.createdex(web3.utils.toWei(_this.lootNum + "", 'ether'), 0).send(
						{
							//gasPrice: web3.utils.toHex(web3.utils.toWei("3", "gwei")),
							//gasLimit: web3.utils.toHex(web3.utils.toWei("15", "gwei")),
							//gas: web3.utils.toHex(60000),
							from: _this.owerAddress
						},
						function (error, result) {
							console.log(error, result, 'partIn')
							if (!error) {
								let count = 0;
								// 0.5秒循环查询
								window.timer = setInterval(function () {
									web3.eth.getTransactionReceipt(result).then(___res => {
										if (___res) {
											// 结束循环
											clearInterval(window.timer);
											// 写入日志
											// let urls = "api/Xhsk/log.html?address=" + _this.owerAddress;
											// _this.$req.post(urls).then(res => {
											// 	console.log(res, 'taskslist');
											// });
					
											if (___res.transactionIndex) {
												uni.hideLoading()
												_this.lootNum = ""
												uni.$u.toast(_this.$t('bottom.data98'))
												setTimeout(function () {
													let urls = "api/Xhsk/setDay.html?address=" + _this.owerAddress + "&day=" + _this.activeDay + "&transactionHash="+___res.transactionHash;
													_this.$req.post(urls).then(res => {
														console.log(res, 'taskslist');
													});
												}, 5000);
												// _this.$toast(_this.$t("message.a75"));
												// _this.$router.push({ path: '/l_detailed' });
												// _this.isLoading = false;
											}
										}
									});
									count++;
									if (count > 5) {
										clearInterval(window.timer);
										uni.hideLoading()
										uni.$u.toast(_this.$t('bottom.data97'))
									}
								}, 1000);
							} else {
								uni.hideLoading()
								uni.$u.toast(_this.$t('bottom.data97'))
							}
						});
				}
			},
			max(type){
				if(type == 'lusdt'){
					if(this.active_type == 2){
						this.lootNum = this.userInfo.balance_1_9
					}
				}
				if(type == 'zusdt'){
					// if(this.usdtWallBan > this.maxBet){
					// 	this.lootNum = this.maxBet
					// }else{
						this.lootNum = this.usdtWallBan
					// }
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
			activeBut(index){
				this.activeDay = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.yunpoolInfo{
		margin: 28rpx 56rpx 28rpx 56rpx;
		.suo{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.suoInfo{
				width: 40%;
				padding: 28rpx;
				border-radius: 10px;
				background: rgba(240, 185, 11, 0.22);
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #fff;
				font-size: 28rpx;
			}
		}
		.zhiya{
			margin-top: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			font-size: 28rpx;
		}
		.day{
			margin-top: 28rpx;
			display: flex;
			align-items: center;
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
			}
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
		.record{
			margin-top: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 28rpx;
			background-color: #28272C;
			border-radius: 10px;
			.record_info{
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>