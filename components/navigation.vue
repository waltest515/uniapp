<template>
	<view class="navigation">
		<view class="navigation_top">
			<view>
				<u--image width="280rpx" height="83rpx" src="/static/img/hedaer/logo.png">
				  <template v-slot:loading>
				    <u-loading-icon color="red"></u-loading-icon>
				  </template>
				</u--image>
			</view>
			<u-icon name="close" color="white" size="36" @click="close"></u-icon>
		</view>
		<view style="padding: 0 28rpx 28rpx 28rpx;">
			<u-line color="hsla(0,0%,100%,.1)"></u-line>
		</view>
		<view class="list">
			<!-- <u-collapse accordion :border="false"> -->
			    <!-- <u-collapse-item :title="$t('bottom.data4')"> -->
					<view class="list_info">
						<u--image width="26rpx" height="32rpx" src="/static/img/hedaer/my.png">
						  <template v-slot:loading>
							<u-loading-icon color="red"></u-loading-icon>
						  </template>
						</u--image>
						<text>{{$t('bottom.data4')}}</text>
						<u-icon style="margin-left: 28rpx;" name="arrow-up" color="#fff" size="28"></u-icon>
					</view>
					<view class="list_info" style="margin-left: 20rpx;" @click="toUrl('/pages/index/friends')">
						<u--image width="28rpx" height="30rpx" src="/static/img/hedaer/yao.png">
						  <template v-slot:loading>
							<u-loading-icon color="red"></u-loading-icon>
						  </template>
						</u--image>
						<text>{{$t('bottom.data103')}}</text>
					</view>
					<view class="list_info" style="margin-left: 20rpx;" @click="toUrl('/pages/index/pledgeList')">
						<u--image width="28rpx" height="30rpx" src="/static/img/hedaer/zi.png">
						  <template v-slot:loading>
							<u-loading-icon color="red"></u-loading-icon>
						  </template>
						</u--image>
						<text>{{$t('bottom.data105')}}</text>
					</view>
					<view class="list_info" style="margin-left: 20rpx;" @click="toUrl('/pages/index/withdrawalList')">
						<u--image width="28rpx" height="30rpx" src="/static/img/hedaer/ti.png">
						  <template v-slot:loading>
							<u-loading-icon color="red"></u-loading-icon>
						  </template>
						</u--image>
						<text>{{$t('bottom.data106')}}</text>
					</view>
					<view class="list_info" style="margin-left: 20rpx;" @click="toUrl('/pages/index/incomeList')">
						<u--image width="28rpx" height="30rpx" src="/static/img/hedaer/shou.png">
						  <template v-slot:loading>
							<u-loading-icon color="red"></u-loading-icon>
						  </template>
						</u--image>
						<text>{{$t('bottom.data107')}}</text>
					</view>
				<!-- </u-collapse-item> -->
			<!-- </u-collapse> -->
			<!-- <view class="list_info" @click="toUrl('/pages/index/index')">
				<u--image width="30rpx" height="28rpx" src="/static/img/hedaer/pool.png">
				  <template v-slot:loading>
				    <u-loading-icon color="red"></u-loading-icon>
				  </template>
				</u--image>
				<text>{{$t('bottom.data5')}}</text>
			</view>
			<view class="list_info" @click="towUrl('https://wiki.defirex.org/')">
				<u--image width="30rpx" height="28rpx" src="/static/img/hedaer/msg.png">
				  <template v-slot:loading>
				    <u-loading-icon color="red"></u-loading-icon>
				  </template>
				</u--image>
				<text>{{$t('bottom.data6')}}</text>
			</view> -->
			<!-- <view class="but-info" @click="toUrl('/pages/index/index')">
				<text>{{$t('bottom.data5')}}</text>
			</view> -->
			<view class="but-info">
				<text>{{$t('bottom.data6')}}</text>
			</view>
			<!-- <view class="but-info" @click="toUrl('/pages/index/friends')">
				<text>{{$t('bottom.data103')}}</text>
			</view>
			<view class="but-info" @click="toUrl('/pages/index/pledgeList')">
				<text>{{$t('bottom.data105')}}</text>
			</view>
			<view class="but-info" @click="toUrl('/pages/index/withdrawalList')">
				<text>{{$t('bottom.data106')}}</text>
			</view>
			<view class="but-info" @click="toUrl('/pages/index/incomeList')">
				<text>{{$t('bottom.data107')}}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default{
		name:'navigation',
		data() {
			return {
				
			}
		},
		methods:{
			close(){
				this.$emit('closeNav')
			},
			towUrl(url){
				window.location.href = url;
			},
			toUrl(url){
				// this.$emit('closeNav')
				uni.navigateTo({
					url: url,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navigation{
		width: 460rpx;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgb(8, 32, 61);
		.navigation_top{
			padding: 28rpx;
			display: flex;
			justify-content: space-between;
		}
		.list{
			display: flex;
			flex-direction: column;
			align-items: center;
			/deep/ .u-cell__title-text{
				font-size: 32rpx;
				color: #fff;
			}
			/deep/ .u-icon__icon{
				font-size: 28rpx !important;
				color: #fff !important;
			}
			.list_info{
				display: flex;
				align-items: flex-end;
				padding: 20rpx 0 20rpx 0;
				// margin-top: 20rpx;
				text{
					margin: 0 10rpx 0 10rpx;
					font-size: 32rpx;
					color: white;
				}
			}
			.but-info{
				margin: 10rpx 0 10rpx 0;
				width: 85%;
				padding: 15rpx 0 15rpx 0;
				border: 1px solid #fff;
				font-size: 32rpx;
				color: #fff;
				border-radius: 5px;
				text-align: center;
			}
		}
	}
</style>