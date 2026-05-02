<template>
	<view class="yunpool">
		<comHeader :owerAddress="owerAddress" :lianid = "lianid" @switchNetwork="switchNetwork"></comHeader>
		<u-gap height="114rpx"></u-gap>
		<view style="display: flex;justify-content: center;">
			<u--image width="665rpx" height="500rpx" src="/static/img/index/pool.png">
			  <template v-slot:loading>
				<u-loading-icon color="red"></u-loading-icon>
			  </template>
			</u--image>
		</view>
		<view class="poolInfo">
			<view class="poolInfo_header">
				<text style="width: 33%; text-align: left;">{{$t('bottom.data124')}}</text>
				<text style="width: 33%; text-align: center;">{{$t('bottom.data125')}}</text>
				<text style="width: 33%; text-align: right;">{{$t('bottom.data143')}}</text>
			</view>
			<template v-for="item in listInfo">
				<view class="box_info">
					<text style="width: 33%; text-align: left;">{{item.invest}}USDT</text>
					<text style="width: 33%; text-align: center;">{{item.rate}}%</text>
					<text style="width: 33%; text-align: right;">{{item.compartment}}USDT</text>
				</view>
			</template>
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
				listInfo:[
					{
						touz:"500-999",
						li:'1',
						money:'5-9.9'
					},
					{
						touz:"500-999",
						li:'1',
						money:'5-9.9'
					},
					{
						touz:"500-999",
						li:'1',
						money:'5-9.9'
					},
					{
						touz:"500-999",
						li:'1',
						money:'5-9.9'
					}
				]
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
						_this.getyunPool()
						console.log(_this.owerAddress)
					} else {
						uni.getStorageSync('address')
					}
					uni.hideLoading()
				});
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
			getyunPool(){
				let _this = this;
				let urls =
					"api/Xhsk/getYunPool.html?address=" + _this.owerAddress
				_this.$req.post(urls).then(res => {
					this.listInfo = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.poolInfo{
		margin: 28rpx 56rpx 28rpx 56rpx;
		padding: 28rpx 20rpx 28rpx 20rpx;
		background-color: #28272C;
		border-radius: 8px;
		.poolInfo_header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			font-size: 30rpx;
			font-weight: 700;
		}
		.box_info{
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			font-size: 28rpx;
			margin: 25rpx 0 25rpx 0;
		}
	}
</style>