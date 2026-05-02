<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef H5
			
			//#endif
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
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	// uni-tabbar, uni-tabbar .uni-tabbar{  
	//         box-shadow: 0px -2px 10px 0px rgba(200,200,200,200);  
	// }
	/deep/ .uni-tabbar__icon{
		width: 20px !important;
		height: 20px !important;
		margin-bottom: 10rpx !important;
	}
	
	.uni-body{
		background-color: rgb(5, 4, 9);
	}
	view{
		font-family: "微软雅黑";
	}
</style>
