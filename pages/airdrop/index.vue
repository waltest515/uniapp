<template>
	<view class="airdrop">
		<comHeader :activeUrl="activeUrl" :owerAddress="owerAddress"></comHeader>

		<view class="main">
			<view class="title">
				{{$t('bottom.data77')}}
			</view>

			<view class="address-money">
				<view class="address-money-box">
					<input type="text" :placeholder="$t('bottom.data78')" placeholder-class="input-placeholder"
						v-model="owerAddress" />
					<view class="address-money-btn">{{$t('bottom.data79')}}</view>
				</view>
			</view>

			<view class="subtitle">
				{{$t('bottom.data80')}}
			</view>

			<view class="view-guide">
				<view class="view-guide-item">
					<view class="import-item">
						<view class="point"></view>
						<view class="point-content">
							{{$t('bottom.data81')}}
						</view>
					</view>
					<view class="import-item">
						<view class="point"></view>
						<view class="point-content">
							{{$t('bottom.data81')}}
						</view>
					</view>
				</view>

				<view class="view-guide-item">
					{{$t('bottom.data82')}}
				</view>

				<view class="view-guide-item">
					{{$t('bottom.data83')}}
				</view>

				<view class="view-guide-item">
					{{$t('bottom.data84')}}<span style="color:#0078FF;">GitHub repository</span>
				</view>

				<view class="view-guide-item">
					{{$t('bottom.data85')}}
				</view>
			</view>

			<view class="connect">
				<view class="connect-item">
					<image style="width: 150rpx; height: 150rpx;" mode="scaleToFill"
						src="../../static/img/connect/fj-logo.png" alt="" />
				</view>
				<view class="connect-item">
					<image style="width: 150rpx; height: 150rpx;" mode="scaleToFill"
						src="../../static/img/connect/fackbook-logo.png" alt="" />
				</view>
				<view class="connect-item">
					<image style="width: 150rpx; height: 150rpx;" mode="scaleToFill"
						src="../../static/img/connect/t-logo.png" alt="" />
				</view>
				<view class="connect-item">
					<image style="width: 150rpx; height: 150rpx;" mode="scaleToFill"
						src="../../static/img/connect/m-logo.png" alt="" />
				</view>
			</view>

			<image class="bg-001" mode="scaleToFill" src="../../static/img/airdrop/bg001.png" alt="" />
			<image class="bg-002" mode="scaleToFill" src="../../static/img/airdrop/bg002.png" alt="" />
			<image class="bg-003" mode="scaleToFill" src="../../static/img/airdrop/bg003.png" alt="" />
			<image class="bg-004" mode="scaleToFill" src="../../static/img/airdrop/bg004.png" alt="" />
		</view>

		<foot></foot>
	</view>
</template>

<script>
var web3;
import comHeader from '@/components/header.vue'
import foot from '@/components/foot.vue'
export default {
	components: {
		comHeader,
		foot
	},
	data() {
		return {
			title: 'Hello',
			owerAddress: "",
			activeUrl:'',
		}
	},
	onLoad() {
		let lang = uni.getStorageSync('lang') || 'en';
		this.activeUrl = '/static/img/lang/'+lang+'.png';
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
		initWeb3: function () {
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
					console.log(_this.owerAddress)
				} else {
					uni.getStorageSync('address')
				}
				uni.hideLoading()
			});
		},
	}
}
</script>

<style lang="scss" scoped="scoped">
.main {
	width: 90%;
	height: 100%;
	color: #fff;
	margin: 0 auto;
	margin-top: 115rpx;
	padding-top: 300rpx;
	//padding-bottom: 50rpx;
	position: relative;

	.bg-001 {
		position: absolute;
		z-index: -1;
		width: 436.88px;
		height: 436.88px;
		left: 28.02px;
		right: -104.9px;
		top: 169.23px;
		bottom: 980.89px;
	}

	.bg-002 {
		position: absolute;
		z-index: -1;
		z-index: -1;
		width: 400px;
		height: 400px;
		left: 112.98px;
		right: -15.62px;
		top: 406.85px;
		bottom: 928.51px;

	}

	.bg-004 {
		position: absolute;
		z-index: -1;
		width: 600rpx;
		height: 600rpx;
		left: 120px;
		right: 69.16px;
		top: 720px;
		bottom: 680px;
		//filter: blur(200rpx);
		// background: rgb(247, 228, 3);
		opacity: 0.8;
	}

	.bg-003 {
		position: absolute;
		z-index: -1;
		width: 600rpx;
		height: 600rpx;
		left: 30px;
		right: 133.49px;
		top: 750px;
		bottom: 571.11px;
		//filter: blur(200rpx);
		// background: rgb(247, 228, 3);
		opacity: 0.8;
	}

	.title {
		font-size: 2.5rem;
		font-weight: bold;
	}

	.address-money {
		margin-top: 100rpx;
		border-radius: 50rpx;
		box-shadow: inset 0px 0px 20rpx 2rpx rgba(255, 255, 255, 0.6);
		background: rgba(255, 255, 255, 0.12);
		padding: 70rpx 50rpx 70rpx 50rpx;

		.address-money-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 10rpx;
			padding: 0 20rpx;
			height: 90rpx;
			border-radius: 30rpx;
			background: rgb(113, 122, 187);
			position: relative;

			input {
				width: 80%;
				height: 100%;
				border: none;
				outline: none;
			}

			.input-placeholder {
				color: rgb(177, 184, 221);
			}

			.address-money-btn {
				width: 200rpx;
				height: 100%;
				text-align: center;
				border-radius: 30rpx;
				box-shadow: 0px 4rpx 4rpx 0px rgba(0, 0, 0, 0.22);
				background: linear-gradient(36.28deg, rgb(176, 181, 200) 4.101%, rgb(247, 248, 249) 90.759%);
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 0;
				color: rgb(25, 36, 60);
			}
		}
	}

	.subtitle {
		margin-top: 140rpx;
		font-size: 40rpx;
		font-weight: 400;
		line-height: 28px;
		text-align: left;
	}

	.view-guide {
		//margin-top: 0px;

		.view-guide-item {
			margin-top: 80rpx;
			font-weight: 400;
			line-height: 28px;
			font-size: 20px;
			color: #D5D6DE;

			.import-item {
				display: flex;
				align-items: center;
				margin-top: 50rpx;
				font-size: 40rpx;

				.point {
					width: 30rpx;
					height: 20rpx;
					border-radius: 50%;
					/* 线性渐变 */
					background: linear-gradient(90.00deg, rgb(249, 221, 24), rgb(138, 196, 53) 100%);
				}

				.point-content {
					margin-left: 40rpx;
					font-size: 30rpx;
					line-height: 21px;
					text-align: left;
					color: #CDD2E9;
				}
			}
		}
	}

	.connect {
		margin-top: 100rpx;
		display: flex;
		align-items: center;

		.connect-item {
			display: flex;
			justify-content: center;
			align-items: center;
			// border-radius: 15px;
			//box-shadow: 0px 5px 15px 0px rgba(63, 169, 216, 0.45);
			//background: rgb(63, 169, 216);
			// width: 150rpx;
			// height: 150rpx;
			// box-sizing: border-box;
		}
	}
}
</style>