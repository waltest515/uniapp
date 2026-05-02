<template>
	<view class="withdrawList">
		<view class="header">
			<u-navbar
			            :title="$t('bottom.data106')"
						@leftClick="leftClick"
			            :safeAreaInsetTop="false"
						bgColor="#28272c"
						height="172rpx"
						leftIconSize="30rpx"
						leftIconColor="#FFFFFF"
						:titleStyle="{
							color: '#FFFFFF',
							fontSize: '34rpx',
							fontWeight: 'bold'
						}"
			        >
			</u-navbar>
		</view>
		<view class="count_list">
			<view class="count" v-for="(listItem,listIndex) in withdrawList" :key="listIndex">
				<view class="count_top">
					<view class="num">{{listItem.money * 1}}</view>
					<view class="status">
						<u--image width="80rpx" height="80rpx" src="/static/img/index/list4.png">
						  <template v-slot:loading>
						    <u-loading-icon color="red"></u-loading-icon>
						  </template>
						</u--image>
					</view>
					<!-- <view class="status" v-if="listItem.status == 1">{{$t('bottom.shcg')}}</view>
					<view class="status" v-if="listItem.status == 2">{{$t('bottom.shbh')}}</view>
					<view class="status" v-if="listItem.status == 3">{{$t('bottom.jycg')}}</view>
					<view class="status" v-if="listItem.status == 4">{{$t('bottom.jysb')}}</view> -->
				</view>
				<view class="count_top">
					<view class="add_time" v-if="listItem.status == 1">{{$t('bottom.data150')}}</view>
					<view class="add_time" v-if="listItem.status == 2">{{$t('bottom.data151')}}</view>
					<view class="add_time" v-if="listItem.status == 3">{{$t('bottom.data152')}}</view>
					<view class="add_time" v-if="listItem.status == 4">{{$t('bottom.data153')}}</view>
					<view class="add_time" v-if="listItem.status == 5">{{$t('bottom.data154')}}</view>
					<view class="add_time" v-if="listItem.status == 6">{{$t('bottom.data155')}}</view>
					<view class="add_time">{{listItem.create_time}}</view>
				</view>
				<!-- <view v-if="listItem.status == 2" @click="reinitiate(listItem)">去提现</view> -->
			</view>
			<u-gap height="30rpx"></u-gap>
			<u-loadmore :nomoreText="$t('bottom.mygd')" :loadingText="$t('bottom.zzjz')" @loadmore="loadmore_but" :status="status" :loadmore-text="loadmoreText" :dashed="true" line fontSize="28rpx" />
			<u-gap height="30rpx"></u-gap>
		</view>
	</view>
</template>

<script>
	var web3;
	let myContract;
	export default{
		data(){
			return{
				withdrawList:[],
				status: 'loadmore',
				loadmoreText:this.$t('bottom.jzgd'),
				page:1,
			}
		},
		filters:{
			money(val){
				return parseFloat(val).toFixed(4) * 1
			},
			address(data){
				let mphone = data.substring(0, 8) + '...' + data.substring(data.length -8,data.length);
				return mphone;
			}
		},
		onLoad() {
			this.initData()
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
						window.ethereum.enable();
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
					console.log("链id",res);
				})
				web3.eth.getAccounts(function (error, result) {
					if (!error) {
						_this.owerAddress = result[0];
						uni.setStorageSync('address',_this.owerAddress)
						_this.getlist()
						console.log(_this.owerAddress)
					} else {
						uni.getStorageSync('address')
					}
					uni.hideLoading()
				});
			},
			leftClick(){
				uni.navigateBack();
			},
			getlist(){
				let _this = this
				let urls =
					"api/Xhsk/withdrawlist.html?page=" + _this.page + "&pagesize=10&address=" + _this.owerAddress
				this.$req.post(urls).then(res => {
					if(res){
						this.withdrawList = this.withdrawList.concat(res.data);
						if (res.data && res.data.length == 10) {
						  this.page++
						} else {
						  this.status = "nomore"
						}
					}else{
						this.status = "nomore"
					}
				})
			},
			loadmore_but(){
				// this.status = "loading";
				this.getlist();
			},
			reinitiate(record) {
				console.log('reinitiate', record);
				let _this = this;
			
				// 获取提现签名
				let urls = "api/Xhsk/getSign.html?withdrawid=" + record.id + "&address=" + _this.owerAddress;
				this.$req.post(urls).then(res => {
					console.log(res);
					let myContract = new web3.eth.Contract(_this.$abi.contAbi, _this.$contractData.contantAddress, {});
					myContract.methods.withdraw(
						res.data.id,
						res.data.currency_id,
						res.data.amount,
						res.data.time,
						res.data.sign
					).send({
						from: _this.owerAddress
					}, function (error, result) {
						console.log(error, result)
						if (!error) {
							console.log(result);
							uni.$u.toast(_this.$t('bottom.data108'))
							let urls =
								"api/Xhsk/updatePay.html?withdrawid=" + res.data.id + "&hash=" + result
							this.$req.post(urls).then(res => {
								console.log(res)
							})
						} else {
							uni.$u.toast(_this.$t('bottom.data109'))
						}
					});
				})
			
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.status = 'loadmore';
			this.withdrawList = [];
			this.getlist();
			//下拉
			uni.stopPullDownRefresh();
		},
		onReachBottom(){
			if(this.status == "loadmore"){
				// this.status = "loading";
				this.getlist();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdrawList{
		.count_list{
			margin-top: 200rpx;
			.count{
				margin: 28rpx 56rpx 28rpx 56rpx;
				padding: 28rpx;
				border-radius: 24px;
				background: rgba(255, 255, 255, 0.2);
				.count_top{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 10rpx;
					.num{
						font-size: 32rpx;
						font-weight: bold;
						color: #FFFFFF;
					}
					.status{
						font-size: 28rpx;
						color: rgb(255, 174, 2);
					}
					.add_time{
						font-size: 23rpx;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
