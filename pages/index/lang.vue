<template>
	<view class="lang">
		<view class="header">
			<view class="header_count">
				<text>{{$t("bottom.data122")}}</text>
				<u-icon @click="back()" name="close" color="#FCD436" size="34"></u-icon>
			</view>
		</view>
		<u-gap height="130rpx"></u-gap>
		<view class="count">
			<view><text>{{$t("bottom.data123")}}</text></view>
		</view>
		<view class="langList_count">
			<view v-for="(listItem,listIndex) in langList" :key="listIndex">
				<view class="langinfo" @click="but(listItem.type)">
					<view style="display: flex;align-items: center;">
						<image style="width: 62rpx; height: 62rpx;" mode="scaleToFill" :src="listItem.url"></image>
						<text style="margin-left: 15rpx;">{{listItem.name}}</text>
					</view>
					<view v-if="active == listItem.type">
						<image style="width: 32rpx; height: 32rpx;" mode="scaleToFill" src="/static/img/index/active.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data (){
			return{
				langList:[
					{
						name:'English',
						url:'/static/img/lang/en.png',
						type:'en',
					},
					{
						name:'Россия',
						url:'/static/img/lang/ru.png',
						type:'ru',
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
					},
					{
						name:'中文',
						url:"/static/img/lang/zh.png",
						type:'zh',
					},
				],
				active:"zh"
			}
		},
		onLoad() {
			this.active = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : "en"
		},
		methods:{
			but(lang){
				this._i18n.locale = lang;
				uni.setStorageSync('lang',lang)
				this.active = lang;
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 130rpx;
		line-height: 130rpx;
		color: #fff;
		background-color: #28272C;
		font-size: 32rpx;
		.header_count{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 28rpx 0 28rpx;
			border-bottom: 1px #28272C solid;
		}
	}
	.count{
		color: #fff;
		padding: 28rpx;
		font-size: 28rpx;
	}
	.langList_count{
		color: #fff;
		font-size: 28rpx;
		.langinfo{
			padding: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>