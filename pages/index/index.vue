<template>
	<view class="content">
		<comHeader :activeUrl="activeUrl" :owerAddress="owerAddress" :lianid = "lianid" @switchNetwork="switchNetwork"></comHeader>
		<u-gap height="114rpx"></u-gap>
		<view style="display: flex;justify-content: center;margin-top: 48rpx;">
			<!-- <u--image width="665rpx" height="300rpx" src="/static/img/index/bag.png">
			  <template v-slot:loading>
				<u-loading-icon color="red"></u-loading-icon>
			  </template>
			</u--image> -->
			<view class="swiper">
				<u-swiper
				            :list="list_banner"
				            indicator
				            indicatorMode="line"
				            circular
							keyName="banner_image"
							height="307rpx"
							radius="25px"
							imgMode="scaleToFill"
							bgColor="#000"
				    ></u-swiper>
			</view>
		</view>
		<view class="content_top">
			<view class="content_topinfo">
				<text style="padding-left: 28rpx;">{{$t('bottom.data113')}}</text>
			</view>
			<view class="record">
				<view class="record_info">
					<!-- <u--image width="105rpx" height="95rpx" src="/static/img/index/record3.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image> -->
					<text style="font-weight: 700;">{{statistics.walletNum * 1}}</text>
					<text>{{$t('bottom.data114')}}</text>
				</view>
				<view class="record_info">
					<!-- <u--image width="95rpx" height="95rpx" src="/static/img/index/record1.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image> -->
					<text style="font-weight: 700;">{{statistics.capital_pool * 1}}</text>
					<text>{{$t('bottom.data13')}}</text>
				</view>
				<view class="record_info">
					<!-- <u--image width="95rpx" height="108rpx" src="/static/img/index/record2.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image> -->
					<text style="font-weight: 700;">{{statistics.participants}}</text>
					<text>{{$t('bottom.data14')}}</text>
				</view>
				<view class="record_info">
					<!-- <u--image width="105rpx" height="95rpx" src="/static/img/index/record3.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image> -->
					<text style="font-weight: 700;">{{statistics.income * 1}}</text>
					<text>{{$t('bottom.data15')}}</text>
				</view>
			</view>
			<view class="content_topinfo1">
				<text>{{$t('bottom.data11')}}</text>
			</view>
			<view class="content_topinfo2">
				<view class="content_info">
					<text class="tetx1">1</text>
					<u--image style="margin: 15rpx 0 15rpx 0;" width="125rpx" height="125rpx" src="/static/img/index/index1.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
					<text>{{$t('bottom.data116')}}</text>
				</view>
				<view> 
					<u--image width="58rpx" height="38rpx" src="/static/img/index/left.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
				</view>
				<view class="content_info">
					<text class="tetx1">2</text>
					<u--image style="margin: 15rpx 0 15rpx 0;" width="125rpx" height="125rpx" src="/static/img/index/index2.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
					<text>{{$t('bottom.data117')}}</text>
				</view>
				<view>
					<u--image width="58rpx" height="38rpx" src="/static/img/index/left.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
				</view>
				<view class="content_info">
					<text class="tetx1">3</text>
					<u--image style="margin: 15rpx 0 15rpx 0;" width="125rpx" height="125rpx" src="/static/img/index/index3.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
					<text>{{$t('bottom.data118')}}</text>
				</view>
			</view>
		</view>
		<view v-if="active_type == 1" class="add_but" @click="participate(1)">
			<text>{{usdtText}}</text>
		</view>
		<view class="roll">
			<text style="color: #fff;font-size: 32rpx;display: flex;justify-content: center;margin-bottom: 28rpx;">{{$t('bottom.data119')}}</text>
			<view class="view_box">
				<view class="view_box_nei">
					<view :style="transitionStyle">
						<template v-for="item in listInfo">
							<view class="box_info" v-if="item.currency_id == 5">
								<view style="width: 50%;">{{item.user_name | address}}</view>
								<view style="width: 25%;" v-if="item.currency_id == 5">USDT</view>
								<view style="width: 25%;" v-if="item.currency_id == 6">BTCM</view>
								<view style="width: 25%;" v-if="item.currency_id == 7">BTC</view>
								<view style="width: 25%;" v-if="item.currency_id == 8">ETH</view>
								<view style="width: 25%; text-align: right;">{{item.amount | money}}</view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</view>
		<view class="apr">
			<view style="display: flex;justify-content: center;">
				<u--image style="margin-bottom: 15rpx;" width="665rpx" height="525rpx" src="/static/img/index/index4.png">
				  <template v-slot:loading>
				    <u-loading-icon color="red"></u-loading-icon>
				  </template>
				</u--image>
			</view>
			<text>
				{{$t('bottom.data120')}}
			</text>
		</view>
		<!-- <view class="subsection">
			<u-subsection :list="list" activeColor="rgb(25, 36, 60)" inactiveColor="rgb(133, 142, 160)" bgColor="rgba(255, 255, 255, 0.1)" :current="current" fontSize="32rpx" @change="sectionChange"></u-subsection>
		</view> -->
		<!-- <view class="investList" v-if="currency[0]">
			<view class="investInfo" v-if="current == 0">
				<view :class="show1 ? 'showback1' : 'showback2'" @click="isShowBut('show1')">
					<view class="investHeader back1">Low Market Risk</view>
					<view class="investInfoLeft">
						<view class="investInfoLeft_info">
							<u--image width="95rpx" height="95rpx" src="/static/img/index/u1.png">
							  <template v-slot:loading>
							    <u-loading-icon color="red"></u-loading-icon>
							  </template>
							</u--image>
							<view class="name" :style="{color : show1 ? '#182a68' : '#fff'}">
								<view>
									<text>USDT</text>
								</view>
							</view>
						</view>
						<view>
							<view class="title1">{{currency[0].flow_max}}%</view>
							<view class="title2" :style="{color : show1 ? '#182a68' : '#fff'}">{{userInfo.usdt_flow_ratio}}%</view>
						</view>
					</view>
					<view style="padding: 0 28rpx 0 28rpx;">
						<u-line :color="show1 ? '#182a68' : 'hsla(0,0%,100%,.2)'"></u-line>
					</view>
					<view class="investcenter">
						<view class="investcenterInfo">
							<view class="investcenterInfo1" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{$t('bottom.data19')}}</view>
							<view class="investcenterInfo2" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{userInfo.usdt_flow_reward | moneyto}}USDT</view>
						</view>
						<view class="investcenterInfo">
							<view class="investcenterInfo1" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{$t('bottom.data20')}}</view>
							<view class="investcenterInfo2" :style="{color : show1 ? '#182a68' : '#f4f4f6'}" v-if="usdtempower == 2">{{usdtWallBan | moneyto}}USDT</view>
							<view class="investcenterInfo2" :style="{color : show1 ? '#182a68' : '#f4f4f6'}" v-if="usdtempower == 1">0USDT</view>
						</view>
						<view class="investcenterInfo">
							<view class="investcenterInfo1" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{$t('bottom.data21')}}</view>
							<view class="investcenterInfo2" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">${{usdtWallBan | moneyto}}</view>
						</view>
						<u-gap height="40rpx"></u-gap>
					</view>
				</view>
				<view class="add" v-show="show1">
					<view>
						<text class="banc">{{$t('bottom.data22')}}</text>
						<view class="banc_top">
							<u--image width="65rpx" height="65rpx" src="/static/img/index/u1.png">
							  <template v-slot:loading>
							    <u-loading-icon color="red"></u-loading-icon>
							  </template>
							</u--image>
							<text>{{userInfo.balance_1_1 | moneyto}}USDT</text>
						</view>
					</view>
					<view>
						<text class="banc">{{$t('bottom.data23')}}</text>
						<view class="banc_top">
							<u--image width="65rpx" height="65rpx" src="/static/img/index/u1.png">
							  <template v-slot:loading>
							    <u-loading-icon color="red"></u-loading-icon>
							  </template>
							</u--image>
							<text>{{userInfo.balance_1_9 | moneyto}}USDT</text>
						</view>
					</view>
					<view style="margin-top: 38rpx;">
						<u-line color="hsla(0,0%,100%,.2)"></u-line>
					</view>
					<view class="active_type">
						<view @click="active_typeBut(1)" class="active_typeText" :style="{color : active_type == 1 ? '#ffde16' : 'hsla(0,0%,100%,.5)',fontWeight : active_type == 1 ? '700' : 'none'}">{{$t('bottom.data24')}}</view>
						<view class="shux"></view>
						<view @click="active_typeBut(2)" class="active_typeText" :style="{color : active_type == 2 ? '#ffde16' : 'hsla(0,0%,100%,.5)',fontWeight : active_type == 2 ? '700' : 'none'}">{{$t('bottom.data25')}}</view>
					</view>
					<view>
						<view>
							<p class="rante">{{$t('bottom.data26')}}：{{gas}}BNB</p>
						</view>
					</view>
					<view v-if="current == 1 || active_type == 2">
						<view class="u-demo-block__content" style="margin-top: 15px;">
							<u--input :placeholder="active_text" v-model="lootNum" color="#fff">
								<template slot="suffix">
									<text style="color: #fff; font-size: 28rpx;" @click="max('lusdt')">{{$t('bottom.data27')}}</text>
								</template>
							</u--input>
						</view>
					</view>
					<view v-if="active_type == 1" class="add_but" @click="participate(1)">
						<text>{{usdtText}}</text>
					</view>
					<view v-if="active_type == 2" class="add_but" @click="withdraw(9)">
						<text>{{$t('bottom.data25')}}</text>
					</view>
					<view>
						<p class="rante">{{$t('bottom.data29')}}：{{usdtWallBan | moneyto}} USDT</p>
					</view>
				</view>
			</view>
			<view class="investInfo" v-if="current == 1">
				<view :class="show1 ? 'showback1' : 'showback2'" @click="isShowBut('show1')">
					<view class="investHeader back1">Low Market Risk</view>
					<view class="investInfoLeft">
						<view class="investInfoLeft_info">
							<u--image width="95rpx" height="95rpx" src="/static/img/index/u1.png">
							  <template v-slot:loading>
							    <u-loading-icon color="red"></u-loading-icon>
							  </template>
							</u--image>
							<view class="name" :style="{color : show1 ? '#182a68' : '#fff'}">
								<view>
									<text>USDT</text>
								</view>
							</view>
						</view>
						<view>
							<view class="title1">{{currency[4].flow_max}}%</view>
							<view class="title2" :style="{color : show1 ? '#182a68' : '#fff'}">{{userInfo.usdt_pledge_ratio}}%</view>
						</view>
					</view>
					<view style="padding: 0 28rpx 0 28rpx;">
						<u-line :color="show1 ? '#182a68' : 'hsla(0,0%,100%,.2)'"></u-line>
					</view>
					<view class="investcenter">
						<view class="investcenterInfo">
							<view class="investcenterInfo1" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{$t('bottom.data19')}}</view>
							<view class="investcenterInfo2" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{userInfo.usdt_pledge_reward | moneyto}}USDT</view>
						</view>
						<view class="investcenterInfo">
							<view class="investcenterInfo1" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{$t('bottom.data20')}}</view>
							<view class="investcenterInfo2" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{usdtWallBan | moneyto}}USDT</view>
						</view>
						<view class="investcenterInfo">
							<view class="investcenterInfo1" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">{{$t('bottom.data21')}}</view>
							<view class="investcenterInfo2" :style="{color : show1 ? '#182a68' : '#f4f4f6'}">${{userInfo.money | moneyto}}</view>
						</view>
						<u-gap height="40rpx"></u-gap>
					</view>
				</view>
				<view class="add" v-show="show1">
					<view>
						<text class="banc">{{$t('bottom.data22')}}</text>
						<view class="banc_top">
							<u--image width="65rpx" height="65rpx" src="/static/img/index/u1.png">
							  <template v-slot:loading>
							    <u-loading-icon color="red"></u-loading-icon>
							  </template>
							</u--image>
							<text>{{userInfo.balance_1_5 | moneyto}}USDT</text>
						</view>
					</view>
					<view>
						<text class="banc">{{$t('bottom.data23')}}</text>
						<view class="banc_top">
							<u--image width="65rpx" height="65rpx" src="/static/img/index/u1.png">
							  <template v-slot:loading>
							    <u-loading-icon color="red"></u-loading-icon>
							  </template>
							</u--image>
							<text>{{userInfo.balance_1_13 | moneyto}}USDT</text>
						</view>
					</view>
					<view style="margin-top: 38rpx;">
						<u-line color="hsla(0,0%,100%,.2)"></u-line>
					</view>
					<view class="active_type">
						<view @click="active_typeBut(1)" class="active_typeText" :style="{color : active_type == 1 ? '#ffde16' : 'hsla(0,0%,100%,.5)',fontWeight : active_type == 1 ? '700' : 'none'}">{{$t('bottom.data24')}}</view>
						<view class="shux"></view>
						<view @click="active_typeBut(2)" class="active_typeText" :style="{color : active_type == 2 ? '#ffde16' : 'hsla(0,0%,100%,.5)',fontWeight : active_type == 2 ? '700' : 'none'}">{{$t('bottom.data25')}}</view>
					</view>
					<view>
						<view>
							<p class="rante">{{$t('bottom.data26')}}：{{gas}}BNB</p>
						</view>
					</view>
					<view v-if="current == 1">
						<view class="u-demo-block__content" style="margin-top: 15px;">
							<u--input :placeholder="active_text" v-model="lootNum" @blur="lootBule" color="#fff">
								<template slot="suffix">
									<text style="color: #fff; font-size: 28rpx;" @click="max('zusdt')">{{$t('bottom.data27')}}</text>
								</template>
							</u--input>
						</view>
					</view>
					<view v-if="active_type == 1" class="add_but" @click="partIn(1)">
						<text>{{$t('bottom.data99')}}</text>
					</view>
					<view v-if="active_type == 2" class="add_but" @click="withdraw(13)">
						<text>{{$t('bottom.data25')}}</text>
					</view>
					<view>
						<p class="rante">{{$t('bottom.data29')}}：{{usdtWallBan | moneyto}} USDT</p>
					</view>
				</view>
			</view>
		</view> -->
		<view class="count_button">
			<view class="record_info">
				<view style="margin: 15rpx 0 15rpx;">
					<u--image width="105rpx" height="95rpx" src="/static/img/index/index5.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
				</view>
				<text>{{$t('bottom.data139')}}</text>
			</view>
			<view class="record_info">
				<view style="margin: 15rpx 0 15rpx;">
					<u--image width="105rpx" height="95rpx" src="/static/img/index/index6.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
				</view>
				<text>{{$t('bottom.data140')}}</text>
			</view>
			<view class="record_info">
				<view style="margin: 15rpx 0 15rpx;">
					<u--image width="105rpx" height="95rpx" src="/static/img/index/index7.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
				</view>
				<text>{{$t('bottom.data141')}}</text>
			</view>
			<view class="record_info">
				<view style="margin: 15rpx 0 15rpx;">
					<u--image width="105rpx" height="95rpx" src="/static/img/index/index8.png">
					  <template v-slot:loading>
					    <u-loading-icon color="red"></u-loading-icon>
					  </template>
					</u--image>
				</view>
				<text>{{$t('bottom.data142')}}</text>
			</view>
		</view>
		<view class="hezuo">
			<text>{{$t('bottom.data121')}}</text>
			<view style="display: flex;justify-content: center;margin-top: 48rpx;">
				<u--image width="645rpx" height="820rpx" src="/static/img/index/index9.png">
				  <template v-slot:loading>
					<u-loading-icon color="red"></u-loading-icon>
				  </template>
				</u--image>
			</view>
		</view>
		<u-gap height="200rpx"></u-gap>
		<u-popup :show="readShow" @close="readShow = false" mode="center" :round="22">
			<view class="notice">
				<view class="update_top">
				   <view class="update_top_logo">
					   {{$t('bottom.data112')}}
				   </view>
				   <u-icon class="update_icon" @click="readShow = false" size="38" name="close-circle-fill" color="#FFFFFF"></u-icon>
				</view>
				<view class="update_bot">
				   <view>{{ currentNotice.title }}</view>
				</view>
				<view class="content" style="width: 90%;word-wrap:break-word;padding: 28rpx;">
					{{ currentNotice.content | filterHtml}}
					<!-- <u-parse :content="currentNotice.content"></u-parse> -->
				</view>
			</view>
		 </u-popup>
		<!-- <foot></foot> -->
	</view>
</template>

<script>
	var web3;
	let myContract;
	import comHeader from '@/components/header.vue'
	// import foot from '@/components/foot.vue'
	export default {
		components:{
			comHeader,
			// foot
		},
		data() {
			return {
				owerAddress:"",
				userInfo:[],
				list: [],
				current: 0,
				active_type:1,
				active_text:this.$t('bottom.data70'),
				activeUrl:'',
				show1:true,
				show2:false,
				show3:false,
				show4:false,
				currentMatIndex: -1,
				transitionStyle: '',
				listInfo: [],
				usdtWallBan:0,
				usdtempower:1,
				usdtText: this.$t('bottom.data28'),
				inviteAds:'',
				lootNum:"",
				// 最小投注金额
				minBet: 500,
				// 最大投注金额
				maxBet: 99999999999,
				statistics:[],
				currency:[],
				gas:0,
				currentNoticeIndex: 0,
				currentNotice: {},
				marqueeList:[],
				readShow:false,
				lianid:56,
				list_banner:[
					{
						banner_image:"/static/img/index/bag.png"
					},
					{
						banner_image:"/static/img/index/bag2.png"
					}
				]
			}
		},
		filters:{
			address(value){
				return value.substring(0, 6) + '***' + value.substring(value.length - 4,value.length)
			},
			money(value){
				return parseFloat(value).toFixed(2) * 1
			},
			moneyto(value){
				return parseFloat(value).toFixed(4) * 1
			},
			filterHtml(str) {
	            if (str == undefined) {
	                return '';
	            }
	            // 转字符串
	            console.log(str, 'str');
	
	            // 过滤p标签
	            str = str.replace(/<p>/g, '');
	
	            str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
	            str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
	            str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
	            str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
	            return str;
	        }
		},
		onLoad(opinos) {
			this.inviteAds = opinos.address
			let lang = uni.getStorageSync('lang') || 'sp';
			this.activeUrl = '/static/img/lang/'+lang+'.png';
		},
		onShow() {
			this.initData()
			this.list = [this.$t('bottom.data17'),this.$t('bottom.data18')]
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
		methods: {
			init(leng) {
				let time = leng * 1000
				// 主要通过 transition 的过度时间 控制 滚动速度
				setTimeout(() => {
					this.transitionStyle = 'transition: all '+leng+'s linear 0s;transform: translateY(-50%);'
					setInterval(() => {
						this.transitionStyle = ''
						setTimeout(() => {
							this.transitionStyle =
								'transition: all '+leng+'s linear 0s;transform: translateY(-50%);'
						}, 20)
					}, time)
				}, 20)
			},
			// 模拟接口请求
			getList() {
				return new Promise((resolve) => {
					let _this = this;
					let urls =
						"api/Xhsk/pledgelist.html?address=" + _this.owerAddress
					_this.$req.post(urls).then(res => {
						resolve({
							code: '200',
							data: res.data
						}) 
					})
				})
			},
			showNotice(currentNoticeIndex) {
			            let _this = this;
			            _this.currentNoticeIndex = currentNoticeIndex;
			            let articles = _this.marqueeList[_this.currentNoticeIndex];
						let url = "api/Xhsk/artdetail.html?address=" + _this.owerAddress + "&articles_id=" + articles.id
			            _this.$req.post(url).then(res => {
			                if (res1) {
			                    _this.marqueeList[_this.currentNoticeIndex].user_read_times + 1;
			                    _this.currentNotice = _this.marqueeList[_this.currentNoticeIndex];
			                    _this.readShow = true;
			
			                }
			            })
			            this.currentNotice = this.marqueeList[currentNoticeIndex];
			            this.readShow = true;
			        },
			 // 公告列表
			getNoticeList() {
	            let _this = this;
	            _this.currentNoticeIndex = 0;
	            _this.currentNotice = [];
	            _this.readShow = false;
	            let urls = "api/Xhsk/articles.html?page=1&limit=100&address=" + _this.owerAddress;
	            _this.$req.post(urls).then(res => {
	                if (res.data) {
	                    _this.marqueeList = res.data;
	                    if (_this.marqueeList.length > 0) {
	                        //_this.currentNotice = _this.marqueeList[0];
	                        // 遍历数组
	                        _this.marqueeList.forEach((item, index) => {
	                            if (item.user_read_times < 3) {
									_this.currentNoticeIndex = index;
									let urlT = "api/Xhsk/artdetail.html?address=" + _this.owerAddress + "&articles_id=" + item.id
	                                _this.$req.post(urlT).then(res1 => {
									if (res1) {
											_this.marqueeList[_this.currentNoticeIndex].user_read_times + 1;
	                                        _this.currentNotice = _this.marqueeList[_this.currentNoticeIndex];
	                                        _this.readShow = true;
	                                    }
	                                })
	                                return;
	                            }
	                        })
	                    }
	                }
	            })
			 },
			getcurrency(){
				let _this = this;
				let urls =
					"api/Xhsk/getCurrency.html?address=" + _this.owerAddress
				_this.$req.post(urls).then(res => {
					this.currency = res.data
				})
			},
			getStatistics() {
				let _this = this;
				let urls =
					"api/Xhsk/getStatistics.html?address=" + _this.owerAddress
				_this.$req.post(urls).then(res => {
					this.statistics = res.data
				})
			},
			sectionChange(index){
				this.lootNum = ""
				this.current = index
			},
			towUrl(url){
				window.location.href = url;
			},
			isShowBut(name){
				switch (name) {
				   case "show1":
				      this.show1 = this.show1 ? false : true
					  if(this.show1){
						  this.show2 = false
						  this.show3 = false
						  this.show4 = false
					  }
				      break;
				   case "show2":
				      this.show2 = this.show2 ? false : true
					  if(this.show2){
						  this.show1 = false
						  this.show3 = false
						  this.show4 = false
					  }
				      break;
					case "show3":
					   this.show3 = this.show3 ? false : true
						if(this.show3){
							  this.show1 = false
							  this.show2 = false
							  this.show4 = false
						}
					   break;
					case "show4":
					   this.show4 = this.show4 ? false : true
						if(this.show4){
							  this.show1 = false
							  this.show3 = false
							  this.show2 = false
						}
					   break;
				   default:
				      // statements_def
				      break;
				}
			},
			max(type){
				if(type == 'lusdt'){
					if(this.active_type == 2){
						this.lootNum = this.userInfo.balance_1_9
					}
				}
				if(type == 'zusdt'){
					if(this.active_type == 1){
						if(this.usdtWallBan > this.maxBet){
							this.lootNum = this.maxBet
						}else{
							this.lootNum = this.usdtWallBan
						}
					}else if(this.active_type == 2){
						this.lootNum = this.userInfo.balance_1_13
					}
				}
			},
			active_typeBut(index){
				this.lootNum = ""
				this.active_type = index
				if(index == 1){
					this.active_text = this.$t('bottom.data70')
				}else if(index == 2){
					this.active_text = this.$t('bottom.data71')
				}
			},
			getGas(){
				const transaction = {
					from: this.owerAddress,
					to:"0xe89E8316d9a4F09583BD7E50178479cc5588AF05",
					// value: web3.utils.toWei("1", "ether")
				}
				const gasPrice = web3.eth.estimateGas(transaction).then(res =>{ // 获取当前最新的gas price
					let gas = web3.utils.fromWei(String(res), 'gwei')
					this.gas = gas;
					console.log("gas",res);
				});
			},
			async initData() {
				var Web3 = require('@/components/getWeb3.js');
				console.log(Web3);
				Web3.default.getWeb3().then(res => {
					web3 = res;
				});
				this.initWeb3();
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
						_this.getGas()
						_this.getList().then((res) => {
							_this.listInfo = [...res.data, ...res.data]
							// list赋值后调用初始化
							_this.init(res.data.length)
						})
						_this.getNoticeList()
						_this.getStatistics()
						_this.getcurrency()
						_this.getUserInfo()
						_this.getbalance()
						let urls = "api/Xhsk/log.html?address=" + _this.owerAddress;
						_this.$req.post(urls).then(res => {
							console.log(res, 'taskslist');
						});
						console.log(_this.owerAddress)
					} else {
						uni.getStorageSync('address')
					}
					uni.hideLoading()
				});
			},
			async getUserInfo() {
				let _this = this;
				let urls = "api/Xhsk/userinfo.html?address=" + _this.owerAddress
				_this.$req.post(urls).then(res => {
					console.log(res);
					//res.data = false;
					if (res.data) {
						_this.userInfo = res.data;
						_this.getAllowance(1);
					} else {
						//this.showReg = true;
						console.log("获取用户数据失败：" + JSON.stringify(res));
						// 获取邀请链接
						console.log("inviteAds",this.inviteAds)
						if (this.inviteAds) {
							this.toRegister();
						} else {
							// 404 https://app.arenamt.com/404.html
							 let url = window.location.host;
							window.location.href = "https://"+url+"/404.html";
						}
					}
				})
			},
			toRegister() {
				let _this = this;
				console.log(this.owerAddress);
				let urls = "api/Xhsk/bind.html?address=" + this.owerAddress + "&inviter=" + this.inviteAds;
				_this.$req.post(urls).then(res => {
					if (res.data) {
						uni.$u.toast(this.$t('bottom.data93'))
					} else {
						uni.$u.toast(this.$t('bottom.data94'))
					}
				})
			},
			async getbalance(){
				let _this = this;
				myContract = new web3.eth.Contract(_this.$heyu.heyuAbi, _this.$contractData.usdtAddress, {});
				// await this.switchNetwork();
				myContract.methods.balanceOf(_this.owerAddress).call({}, function (error, result) {
					// _this.refreshing = false;
					if (!error) {
						_this.usdtWallBan = web3.utils.fromWei(result, 'ether');
						// _this.$refs.heads.diff(1)
						// _this.$toast.clear();
					} else {
						uni.$u.toast(this.$t('bottom.data89'))
					}
				});
			},
			// 查授权
			getAllowance(type){
				let that = this;
				if(that.userInfo.allowance_money == 0){
					// that.usdtText = that.$t('bottom.data28')
					// that.usdtempower = 1
					var contractAddress = this.$contractData.contantAddress
					var currentAccount = this.owerAddress;
					// let that = this;
					let myContract3
					if(type == 1){
						myContract3 = new web3.eth.Contract(that.$heyu.heyuAbi, that.$contractData.usdtAddress, {});
					}
					myContract3.methods.allowance(currentAccount, contractAddress).call({}, function (error, result) {
						// uni.$u.toast(error)
						if (!error) {
							// console.log("获取USDT授权金额：" + web3.utils.fromWei(result, 'ether'));
							if(web3.utils.fromWei(result, 'ether') == 0){
								that.usdtText = that.$t('bottom.data28')
								that.usdtempower = 1
							}else{
								that.usdtText = that.$t('bottom.data88')
								that.usdtempower = 2
							}
						} else {
							// console.log(error);
						}
					});
				}else{
					that.usdtText = that.$t('bottom.data88')
					that.usdtempower = 2
				}
			},
			// 授权
			participate(type) {
				if (this.usdtempower == 2) { //参与
					return uni.$u.toast(this.$t('bottom.data88'))
				} else {
					this.toApprove(type);
				}
			},
			//授权
			toApprove(type){
				// 合约地址
				uni.showLoading({
					title: this.$t('bottom.data90'),
					mask:true
				})
				let _this = this;
				let myContract3
				if (type == 1) {
					myContract3 = new web3.eth.Contract(this.$heyu.heyuAbi, this.$contractData.usdtAddress, {});
				}
				myContract3.methods.approve(this.$contractData.contantAddress, web3.utils.toWei(1000000 + "", 'ether')).send(
					{
						gasPrice: web3.utils.toHex(web3.utils.toWei("3", "gwei")),
						//gasLimit: web3.utils.toHex(web3.utils.toWei("15", "gwei")),
						gas: web3.utils.toHex(60000),
						from: _this.owerAddress
					},
					function (error, result) {
						if (!error) {
							uni.$u.toast(_this.$t('bottom.data92'))
							_this.getAllowance(type)
							uni.hideLoading()
							// console.log('授权成功：' + JSON.stringify(result));
							// _this.time = setInterval(function () {
							// 	if (_this.step == 1) {
							// 		_this.getAllowance();
							// 	} else {
							// 		_this.getAllowance(2);
							// 	}
							// }, 3000);
						} else {
							uni.hideLoading()
							uni.$u.toast(_this.$t('bottom.data91'))
							// console.log(error)
						}
					});
			},
			//参与
			partIn(type){
				if(type ==1){
					if(this.usdtempower == 1){
						return uni.$u.toast(this.$t('bottom.data95'))
					}
					let _this = this;
					uni.showLoading({
						title: this.$t('bottom.data96'),
						mask:true
					})
					//console.log(web3.utils.toWei(_this.lootNum + "", 'ether'));
					let myContract = new web3.eth.Contract(_this.$abi.contAbi, _this.$contractData.contantAddress, {});
					myContract.methods.createdex(web3.utils.toWei(_this.lootNum + "", 'ether'), 0).send(
						{
							//gasPrice: web3.utils.toHex(web3.utils.toWei("3", "gwei")),
							//gasLimit: web3.utils.toHex(web3.utils.toWei("15", "gwei")),
							//gas: web3.utils.toHex(60000),
							from: _this.owerAddress
						},
						function (error, result) {
							console.log(error, result, 'partIn')
							if (!error) {
								let count = 0;
								// 0.5秒循环查询
								window.timer = setInterval(function () {
									web3.eth.getTransactionReceipt(result).then(___res => {
										if (___res) {
											// 结束循环
											clearInterval(window.timer);
											// 写入日志
											// let urls = "api/Xhsk/log.html?address=" + _this.owerAddress;
											// _this.$req.post(urls).then(res => {
											// 	console.log(res, 'taskslist');
											// });
					
											if (___res.transactionIndex) {
												uni.hideLoading()
												_this.lootNum = ""
												uni.$u.toast(_this.$t('bottom.data98'))
												// _this.$toast(_this.$t("message.a75"));
												// _this.$router.push({ path: '/l_detailed' });
												// _this.isLoading = false;
											}
										}
									});
									count++;
									if (count > 5) {
										clearInterval(window.timer);
										uni.hideLoading()
										uni.$u.toast(_this.$t('bottom.data97'))
									}
								}, 1000);
							} else {
								uni.hideLoading()
								uni.$u.toast(_this.$t('bottom.data97'))
							}
						});
				}
			},
			withdraw(currency_id) {
				if (this.lootNum <= 0) {
					return uni.$u.toast(_this.$t('bottom.data100'))
				}
				let _this = this;
				let urls = "api/Xhsk/withdraw.html?amount=" + _this.lootNum + "&address=" + _this.owerAddress + "&currency_id=" + currency_id
				_this.$req.post(urls).then(res => {
					if (res.data) {
						console.log(res)
						uni.$u.toast(_this.$t('bottom.data101'))
						_this.lootNum = "";
						this.getUserInfo()
						// let myContract = new web3.eth.Contract(_this.$abi.contAbi, _this.$contractData.contantAddress, {});
						// myContract.methods.withdraw(
						// 	res.data.id,
						// 	res.data.currency_id,
						// 	res.data.amount,
						// 	res.data.time,
						// 	res.data.sign
						// ).send({
						// 	from: _this.owerAddress
						// }, function (error, result) {
						// 	console.log(error, result)
						// 	if (!error) {
						// 		console.log(result);
						// 		 uni.$u.toast(_this.$t('bottom.data101'))
						// 		_this.currency_id = 0;
						// 		_this.amount = "";
						// 		let urls =
						// 			"api/Xhsk/updatePay.html?withdrawid=" + res.data.id + "&hash=" + result
						// 		_this.$req.post(urls).then(res => {
						// 			console.log(res)
						// 		})
						// 	} else {
						// 		uni.$u.toast(_this.$t('bottom.data102'))
						// 	}
						// });
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			lootInput() {
				if (this.lootNum > this.maxBet) {
					this.lootNum = this.maxBet;
				}
				// parseInt
			},
			lootBule() {
				if (this.lootNum < this.minBet) {
					this.lootNum = this.minBet;
				}
				if (this.lootNum > this.maxBet) {
					console.log(this.maxBet)
					this.lootNum = this.maxBet;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		width: 665rpx;
		margin: 0 auto;
	}
	.notice{
		width: 600rpx;
		background-color: #FFFFFF;
		border-radius: 12px;
		.update_top{
			width: 100%;
			height: 130rpx;
			background: linear-gradient(135.00deg, rgba(255, 235, 59, 0.77),rgba(2, 192, 142, 0.48) 55.1%,rgba(61, 200, 67, 0.9) 100%);
			border-top-left-radius: 12px;
			border-top-right-radius: 12px;
			border-bottom-left-radius: 50px;
			border-bottom-right-radius: 50px;
			position: relative;
			.update_top_logo{
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				color: #fff;
				font-weight: 700;
			}
			.update_icon{
				position: absolute;
				right: 28rpx;
				top: 28rpx;
			}
		}
		.update_bot{
			margin: 28rpx 0 28rpx 0;
			font-size: 28rpx;
			color: #000;
			display: flex;
			justify-content: center;
		}
	}
	.add_but{
		margin: 0 56rpx 28rpx 56rpx;
		padding: 28rpx 20rpx 28rpx 20rpx;
		border-radius: 6px;
		display: flex;
		justify-content: center;
		// box-shadow: 0px 1px 4px 1px rgba(205, 211, 35, 0.5);
		/* 线性渐变 */
		background: rgb(252, 212, 54);
		text{
			color: #000;
			font-size: 32rpx;
			font-weight: 700;
		}
	}
	.hezuo{
		font-size: 34rpx;
		color: #fff;
		text-align: center;
	}
	.content {
		// background-color: #0B1431;
		.content_top{
			padding: 28rpx;
			.content_topinfo{
				font-size: 30rpx;
				color: #ffffff;
				font-style: normal;
				font-weight: 400;
				margin-top: 18rpx;
				text-align: center;
			}
			.gradientText{
				display: inline-block;
				-webkit-background-clip: text;
				color: transparent;
				background-image: linear-gradient(rgb(249, 221, 24), rgb(138, 196, 53));
			}
			.content_topinfo1{
				color: #ffffff;
				margin-top: 38rpx;
				font-weight: 400;
				opacity: .8;
				text-align: center;
			}
			.content_topinfo2{
				margin: 28rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 27rpx;
				.content_info{
					color: #fff;
					display: flex;
					flex-direction: column;
					align-items: center;
					.tetx1{
						padding: 10rpx 15rpx 10rpx 15rpx;
						border-radius: 15px;
						background: rgb(40, 39, 44);
					}
				}
			}
		}
		.count_button{
			margin: 48rpx 56rpx 28rpx 56rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			.record_info{
				width: 48%;
				display: flex;
				flex-direction: column;
				align-items: center;
				background: rgb(40, 39, 44);
				border-radius: 15px;
				margin-bottom: 15rpx;
				padding: 28rpx 0 28rpx 0;
				text{
					color: #ffffff;
					font-size: 28rpx;
				}
			}
		}
		.record{
			margin: 48rpx 28rpx 28rpx 28rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			// border-radius: 28px;
			// box-shadow: inset 0px 0px 8px 1px rgba(255, 255, 255, 0.6);
			// background: rgba(255, 255, 255, 0.12);
			.record_info{
				width: 48%;
				display: flex;
				flex-direction: column;
				align-items: center;
				background: rgb(40, 39, 44);
				border-radius: 15px;
				margin-bottom: 15rpx;
				text{
					padding-top: 15rpx;
					padding-bottom: 15rpx;
					color: #ffffff;
					font-size: 28rpx;
				}
			}
		}
		.roll{
			margin: 28rpx 56rpx 28rpx 56rpx;
			.view_box {
				padding: 0 48rpx 0 48rpx;
				border-radius: 18px;
				// box-shadow: inset 0px 0px 8px 1px rgba(255, 255, 255, 0.6);
				background: #28272C;
				height: 450rpx;
				overflow: hidden;
				.box_info{
					margin: 15rpx 0 15rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #fff;
					font-size: 26rpx;
				}
			}
			.view_box_nei{
				margin: 28rpx 0 28rpx 0;
				height: 400rpx;
				overflow: hidden;
			}
		}
		.apr{
			margin: 58rpx 28rpx 28rpx 28rpx;
			color: #ffffff;
			font-size: 30rpx;
			opacity: .8;
			text-align: center;
		}
		.subsection{
			margin: 58rpx 88rpx 28rpx 88rpx;
			/deep/ .u-subsection--button{
				height: 100rpx !important;
				padding: 0 !important;
				border: 1px solid rgba(255, 255, 255, 0.12);
				box-shadow: inset 0px 0px 2px 1px rgba(255, 255, 255, 0.3);
				border-radius: 10px !important;
			}
		}
		.investList{
			margin: 88rpx 28rpx 28rpx 28rpx;
			.showback1{
				background-color: #fff;
				border-radius: 28px;
			}
			.showback2{
				
			}
			.investInfo{
				margin-top: 28rpx;
				border-radius: 28px;
				background-color: hsla(0,0%,100%,.089);
				background-image: linear-gradient(95.4deg,hsla(0,0%,100%,.1),rgba(244,244,246,.2) 50%,rgba(244,244,246,.3));
				box-shadow: inset 2px -2px 7px hsla(0,0%,82.4%,.378), inset -2px 2px 7px hsla(0,0%,100%,.3);
				.investHeader{
					padding: 10rpx;
					text-align: center;
					border-radius: 28rpx 28rpx 0 0;
					font-size: 26rpx;
				}
				.back1{
					background: linear-gradient(180deg,#ffde16,#c0a400);
					color: #182a68;
				}
				.back2{
					background: linear-gradient(180deg,#87c433,#0eaa4f);
					color: #fff;
				}
				.investInfoLeft{
					padding: 28rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.investInfoLeft_info{
						display: flex;
						align-items: center;
						.name{
							padding-left: 15rpx;
							font-weight: 700;
							font-size: 40rpx;
							display: flex;
							flex-direction: column;
						}
					}
					.title1{
						font-size: 40rpx;
						font-weight: 700;
						display: inline-block;
						-webkit-background-clip: text;
						color: transparent;
						background-image: linear-gradient(180deg,#ffde16,#87c433);
					}
					.title2{
						font-size: 26rpx;
						opacity: 0.6;
						text-align: right;
					}
				}
				.investcenter{
					padding: 28rpx;
					.investcenterInfo{
						margin-bottom: 10rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						.investcenterInfo1{
							opacity: 0.6;
						}
					}
				}
				.add{
					padding: 28rpx;
					.banc{
						font-size: 26rpx;
						color: #f4f4f6;
						opacity: 0.6;
					}
					.banc_top{
						display: flex;
						align-items: center;
						margin-top: 8rpx;
						text{
							padding-left: 10rpx;
							font-weight: 600;
							font-size: 48rpx;
							color: #f4f4f6;
						}
					}
					.active_type{
						margin: 28rpx 0 28rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.shux{
							width: 1px;
							height: 40rpx;
							background-color: hsla(0,0%,100%,.5);
						}
						.active_typeText{
							width: 33%;
							font-size: 28rpx;
							text-align: center;
						}
					}
					.rante{
						color: #fff;
						font-size: 28rpx;
						opacity: 0.6;
						text-align: center;
						margin-top: 28rpx;
					}
					.add_but{
						margin-top: 28rpx;
						padding: 20rpx;
						border-radius: 6px;
						display: flex;
						justify-content: center;
						box-shadow: 0px 1px 4px 1px rgba(205, 211, 35, 0.5);
						/* 线性渐变 */
						background: linear-gradient(90.00deg, rgb(249, 221, 24),rgb(138, 196, 53) 100%);
						text{
							color: rgb(27, 33, 68);
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}
</style>
