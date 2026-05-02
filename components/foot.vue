<template>
    <div class="foot">
        <div class="foot-title">
            <img src="../static/img/foot/logo.png" />
            <p>DeFireX</p>
        </div>

        <div class="foot-text">
            <view @click="towUrl('https://github.com/pessimistic-io/audits/blob/main/DeFireX%20Security%20Audit%20by%20Pessimistic%20Public.pdf')">{{$t('bottom.data72')}}</view>
            <view @click="towUrl('https://etherscan.io/address/0xb942ca22e0eb0f2524f53f999ae33fd3b2d58e3e#code')">{{$t('bottom.data73')}}</view>
            <view>GitHub</view>
            <view @click="towUrl('https://www.teatmik.ee/en/captcha')">{{$t('bottom.data74')}}</view>
            <view>{{$t('bottom.data75')}}</view>
        </div>
        <!-- <div class="contact">
            <span style="color: rgb(103, 115, 127);font-size: 12px;font-weight: 400;">{{$t('bottom.data76')}}</span>
            <div class="mode">
                <img src="../static/img/foot/f1.png" />
                <img src="../static/img/foot/f2.png" />
                <img src="../static/img/foot/f3.png" />
                <img src="../static/img/foot/f4.png" />
                <img src="../static/img/foot/f5.png" />
            </div>
        </div> -->
    </div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			towUrl(url){
				window.location.href = url;
			},
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
.foot {
    margin-top: 5rem;
    width: 100%;
    min-height: 6.3rem;

    .foot-title {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.6rem;

        img {
            width: 50rpx;
            height: 50rpx;
        }

        p {
            font-size: 1.5rem;
            color: #fff;
            margin-left: 0.2rem;
            color: rgb(255, 255, 255);
            font-size: 20px;
            font-weight: 700;
        }
    }

    .foot-text {
        width: 600rpx;
        margin: auto;
        display: flex;
        justify-content: space-around;
        color: rgb(204, 210, 226);
        font-size: 14px;
    }

    .contact {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.6rem;
        font-size: 1.1rem;
        color: #fff;
        margin-top: 0.9rem;

        .mode {
            padding-top: 40rpx;
            padding-bottom: 100rpx;

            img {
                width: 60rpx;
                height: 60rpx;
                margin-left: 0.75rem;
            }
        }
    }
}
</style>