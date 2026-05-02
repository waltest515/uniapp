<template>
	<view class="friends">
		<view class="header">
			<u-navbar
			            :title="$t('bottom.data103')"
						@leftClick="leftClick"
			            :safeAreaInsetTop="false"
						bgColor="transparent"
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
		<view class="friends_count">
			<view style="display: flex;justify-content: center;">
				<view class="code">
					<view class="code_back">
						<w-qrcode :options="options"></w-qrcode>
						<!-- <uqrcode ref="uqrcode" @complete="complete" canvas-id="qrcode" :value="'http://app.turingptg.com/#/pages/login/register?code='+userInfo.invite_code" size="184" sizeUnit="rpx" ></uqrcode> -->
					</view>
				</view>
			</view>
			<view class="title_t">
				<text>{{$t('bottom.data110')}}:{{ owerAddress.substring(0, 6) }}***{{ owerAddress.substring(owerAddress.length - 4,
							owerAddress.length) }}</text>
				<u--image width="26rpx" height="26rpx" src="/static/img/index/copy.png" @click="coyID()">
				  <template v-slot:loading>
				    <u-loading-icon color="red"></u-loading-icon>
				  </template>
				</u--image>
			</view>
			<view class="title_t">
				<text style="width: 400rpx;" class="u-line-1">{{$t('bottom.data111')}}:{{urlHost}}?address={{owerAddress}}</text>
				<u--image width="26rpx" height="26rpx" src="/static/img/index/copy.png" @click="coy()">
				  <template v-slot:loading>
				    <u-loading-icon color="red"></u-loading-icon>
				  </template>
				</u--image>
			</view>
		</view>
	</view>
</template>

<script>
	var web3;
	let myContract;
	export default{
		data() {
			return{
				owerAddress: "",
				urlHost:"",
				options:{
					code: '',// 生成二维码的值
					size: 260,// 460代表生成的二维码的宽高均为460rpx
				},
			}
		},
		onLoad() {
			let url = window.location.host
			this.urlHost = "https://"+url+"/#/"
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
					console.log("链id",res);
				})
				web3.eth.getAccounts(function (error, result) {
					if (!error) {
						_this.owerAddress = result[0];
						uni.setStorageSync('address',_this.owerAddress)
						_this.options.code = this.urlHost+"?address="+_this.owerAddress
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
			coy(){
				let text = this.urlHost+"?address="+this.owerAddress
				var that = this
				uni.setClipboardData({
					data: text ,
					success: function (res) {
						uni.showToast({
							 title: that.$t('bottom.data104'),
						});
					}
				});
			},
			coyID(){
				let text = this.owerAddress
				var that = this
				uni.setClipboardData({
					data: text ,
					success: function (res) {
						uni.showToast({
							 title: that.$t('bottom.data104'),
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.friends{
		width: 100%;
		height: 100vh;
		position: relative;
		background-image: url('../../static/img/index/yao.png');
		background-size: 100% 100vh;
		.friends_count{
			width: 100%;
			position: absolute;
			left: 0;
			top: 38%;
			.code{
				padding: 58rpx;
				border-radius: 14px;
				box-shadow: 0px 1px 4px 1px rgba(205, 211, 35, 0.5);
				background: linear-gradient(36.28deg, rgb(176, 181, 200) -2.064%,rgb(247, 248, 249) 94.959%);
			}
			.title_t{
				margin-top: 38rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				color: #fff;
				text{
					margin-right: 58rpx;
				}
			}
		}
	}
</style>