<template>
	<view class="header">
		<view class="header_count">
			<view class="header_top">
				<view class="header_left">
					<image style="width: 65rpx; height: 77rpx;" mode="scaleToFill" src="../static/img/hedaer/logo.png"></image>
					<view class="lianName" v-if="lianid == 1">ERC20</view>
					<view class="lianName" v-if="lianid == 56">BSC</view>
					<view class="lianAddress">
						{{ owerAddress.substring(0, 6) }}***{{ owerAddress.substring(owerAddress.length - 4,
							owerAddress.length) }}
					</view>
				</view>
				<view class="header_right">
					<view @click.stop="biswitch">
						<view v-if="lianid == 1">
							<u--image width="55rpx" height="55rpx" src="/static/img/lang/eth.png">
							  <template v-slot:loading>
								<u-loading-icon color="red"></u-loading-icon>
							  </template>
							</u--image>
						</view>
						<view v-if="lianid == 56">
							<u--image width="55rpx" height="55rpx" src="/static/img/lang/bsc.png">
							  <template v-slot:loading>
								<u-loading-icon color="red"></u-loading-icon>
							  </template>
							</u--image>
						</view>
					</view>
					
					<view class="shu"></view>
					<!-- <view class="dao" @click="navigation">
						<image style="width: 48rpx; height: 40rpx; background-color: #1E3956;" mode="scaleToFill" src="../static/img/hedaer/dao.png"></image>
					</view> -->
					<view @click.stop="lang" style="width: 40rpx; height: 40rpx;">
						<image style="width: 40rpx; height: 40rpx;" mode="scaleToFill" src="/static/img/index/lang.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view v-show="langShow" class="langList">
			<view class="langList_count">
				<view v-for="(listItem,listIndex) in langList" :key="listIndex">
					<view class="langinfo" @click="but(listItem.type)">
						<image style="width: 62rpx; height: 62rpx;" mode="scaleToFill" :src="listItem.url"></image>
						<text>{{listItem.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-show="biShow" class="langList bi">
			<view class="langList_count">
				<view v-for="(listItem,listIndex) in biList" :key="listIndex">
					<view class="langinfo" @click="butbi(listItem.id)">
						<image style="width: 55rpx; height: 55rpx;" mode="scaleToFill" :src="listItem.url"></image>
						<text>{{listItem.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="navigationShow" @close="navigationclose" mode="left" bgColor="transparent" :overlay="true">
			<navigation @closeNav="closeNav"></navigation>
		</u-popup>
	</view>
</template>

<script>
	import navigation from '@/components/navigation.vue'
	export default{
		components:{
			navigation
		},
		name:"comHeader",
		props:{
			activeUrl: String,
			owerAddress: String,
			lianid:Number
		},
		data(){
			return{
				langShow:false,
				navigationShow:false,
				biShow:false,
				langList:[
					{
						name:'中文',
						url:"/static/img/lang/zh.png",
						type:'zh',
					},
					{
						name:'English',
						url:'/static/img/lang/en.png',
						type:'en',
					},
					{
						name:'Español',
						url:'/static/img/lang/sp.png',
						type:'sp',
					},
					{
						name:'العرب',
						url:'/static/img/lang/al.png',
						type:'al',
					},
					{
						name:'Japan',
						url:'/static/img/lang/jp.png',
						type:'jp',
					},
					{
						name:'România',
						url:'/static/img/lang/ro.png',
						type:'ro',
					}
				],
				biList:[
					{
						name:"BSC",
						url:"/static/img/lang/bsc.png",
						id:56
					},
					{
						name:"ERC20",
						url:"/static/img/lang/eth.png",
						id:1
					}
				],
				activeImg:this.activeUrl
			}
		},
		mounted() {
			document.addEventListener('click', this.HiddenClick)
		},
		methods: {
			lang(){
				// if(this.biShow){
				// 	this.biShow = false
				// }
				// this.langShow = this.langShow ? false : true
				uni.navigateTo({
					url: "/pages/index/lang",
				})
			},
			biswitch(){
				if(this.langShow){
					this.langShow = false
				}
				this.biShow = this.biShow ? false : true
			},
			HiddenClick(){
				this.langShow = false
				this.biShow = false
			},
			navigation(){
				this.navigationShow = true
			},
			navigationclose(){
				this.navigationShow = false
			},
			closeNav(){
				this.navigationShow = false
			},
			but(lang){
				this._i18n.locale = lang;
				uni.setStorageSync('lang',lang)
				this.activeImg = '/static/img/lang/'+lang+'.png';
				this.langShow = false
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			butbi(id){
				this.$emit('switchNetwork',id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		width: 100%;
		height: 115rpx;
		background-color: rgb(40, 39, 44);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.header_count{
			height: 100%;
			padding: 0 28rpx 0 28rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.header_top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.header_left{
					display: flex;
					align-items: center;
					.lianName{
						font-size: 32rpx;
						font-weight: 700;
						color: #F9BD03;
						margin-left: 10rpx;
					}
					.lianAddress{
						font-size: 28rpx;
						color: #000;
						margin-right: 28rpx;
						padding: 15rpx;
						margin-left: 15rpx;
						background-color: #FCD436;
						border-radius: 25px;
					}
				}
				.header_right{
					display: flex;
					align-items: center;
					.dao{
						margin-right: 20rpx;
					}
					.shu{
						width: 1px;
						height: 50rpx;
						margin: 0 25rpx 0 25rpx;
						background-color: #8E8E8E;
					}
				}
			}
		}
		.bi{
			.langList_count{
				margin-right: 68rpx !important;
			}
		}
		.langList{
			display: flex;
			justify-content: right;
			.langList_count{
				padding: 28rpx;
				margin-right: 28rpx;
				border-radius: 10px;
				background-color: rgb(244, 244, 246);
				.langinfo{
					margin: 10rpx 0 10rpx 0;
					display: flex;
					align-items: center;
					text{
						font-size: 30rpx;
						padding-left: 10rpx;
					}
				}
			}
		}
	}
</style>