<template>
	<view>
		<text style="color: #fff;">ssss</text>
	</view>
</template>

<script>
	import { ethers,Contract } from 'ethers';
	export default{
		data (){
			return{
				
			}
		},
		onShow() {
			this.initData()
		},
		methods:{
			async initData() {
				// 创建一个provider实例，连接到以太坊主网
				const provider = new ethers.providers.Web3Provider(window.ethereum)
				const contract = new Contract(this.$contractData.usdtAddress, this.$heyu.heyuAbi, provider);
				// const b = provider.getBalance("0x5899495CB1B582793f429659C398355FA52d2710")
				const b = await contract.balanceOf("0x5899495CB1B582793f429659C398355FA52d2710");
				uni.$u.toast(b)
				const banner = ethers.utils.formatEther(b)
				console.log(banner)
				uni.$u.toast(banner)
			},
		}
	}
</script>

<style>
</style>