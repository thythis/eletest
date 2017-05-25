<template>
	<div>
		<main-header></main-header>
		<div class="news-wrapper">
			<el-row>
				<el-col :span="5">
					<menu-tree :list="list"></menu-tree>
				</el-col>
				<el-col :span="19">
					<div class="news-item">
						<h3>【2014-08-24·深圳市】深圳市福田妇幼保健院</h3>
						<div class="news-content">
							<img src="../assets/img/news_item1.jpg" alt="">
							<div class="news-desc">
								<h3>活动简介</h3>	
								<p>2017年4月26日下午，由院团委摩天轮的“唱响青春，放飞梦想”深圳市妇幼保健<br>
								辽第三届青年歌手大赛决赛在我院红荔院区作楼会议厅隆重举行！现场座无<br>
								虚席，舞台两侧搭建的LED屏美轮美奂，台下高兴加油牌的粉丝团意兴盎然，<br>
								等待着台上精心准备的歌手们“放大招”。大赛特邀共青团深圳市委卫生工委<br>
								长添栋书记，我院姚吉龙院长、院党委林怿昊书记、林川副院长、赵晓山副院<br>
								长、汪皓副院长等领导莅临现场观赛。</p>
							</div>
						</div>
						<a href="">查看详情</a>
					</div>
					<div class="news-item">
						<h3>【2014-08-24·深圳市】深圳市福田妇幼保健院</h3>
						<div class="news-content">
							<img src="../assets/img/news_item1.jpg" alt="">
							<div class="news-desc">
								<h3>活动简介</h3>	
								<p>2017年4月26日下午，由院团委摩天轮的“唱响青春，放飞梦想”深圳市妇幼保健<br>
								辽第三届青年歌手大赛决赛在我院红荔院区作楼会议厅隆重举行！现场座无<br>
								虚席，舞台两侧搭建的LED屏美轮美奂，台下高兴加油牌的粉丝团意兴盎然，<br>
								等待着台上精心准备的歌手们“放大招”。大赛特邀共青团深圳市委卫生工委<br>
								长添栋书记，我院姚吉龙院长、院党委林怿昊书记、林川副院长、赵晓山副院<br>
								长、汪皓副院长等领导莅临现场观赛。</p>
							</div>
						</div>
						<a href="">查看详情</a>
					</div>
					<div class="news-item">
						<h3>【2014-08-24·深圳市】深圳市福田妇幼保健院</h3>
						<div class="news-content">
							<img src="../assets/img/news_item1.jpg" alt="">
							<div class="news-desc">
								<h3>活动简介</h3>	
								<p>2017年4月26日下午，由院团委摩天轮的“唱响青春，放飞梦想”深圳市妇幼保健<br>
								辽第三届青年歌手大赛决赛在我院红荔院区作楼会议厅隆重举行！现场座无<br>
								虚席，舞台两侧搭建的LED屏美轮美奂，台下高兴加油牌的粉丝团意兴盎然，<br>
								等待着台上精心准备的歌手们“放大招”。大赛特邀共青团深圳市委卫生工委<br>
								长添栋书记，我院姚吉龙院长、院党委林怿昊书记、林川副院长、赵晓山副院<br>
								长、汪皓副院长等领导莅临现场观赛。</p>
							</div>
						</div>
						<a href="">查看详情</a>
					</div>
					<div class="news-item">
						<h3>【2014-08-24·深圳市】深圳市福田妇幼保健院</h3>
						<div class="news-content">
							<img src="../assets/img/news_item1.jpg" alt="">
							<div class="news-desc">
								<h3>活动简介</h3>	
								<p>2017年4月26日下午，由院团委摩天轮的“唱响青春，放飞梦想”深圳市妇幼保健<br>
								辽第三届青年歌手大赛决赛在我院红荔院区作楼会议厅隆重举行！现场座无<br>
								虚席，舞台两侧搭建的LED屏美轮美奂，台下高兴加油牌的粉丝团意兴盎然，<br>
								等待着台上精心准备的歌手们“放大招”。大赛特邀共青团深圳市委卫生工委<br>
								长添栋书记，我院姚吉龙院长、院党委林怿昊书记、林川副院长、赵晓山副院<br>
								长、汪皓副院长等领导莅临现场观赛。</p>
							</div>
						</div>
						<a href="">查看详情</a>
					</div>
				</el-col>
			</el-row>
		</div>
		<main-footer></main-footer>
	</div>
</template>

<script>
	import MainHeader from '../components/MainHeader.vue';
	import MainFooter from '../components/MainFooter.vue';
	import MenuTree from '../components/MenuTree.vue';

	export default {
		components: {
			MainHeader,
			MainFooter,
			MenuTree
		},
		data() {
	      return {
	      	list: [{
	      	  label: '所有活动',
	      	  id: 'c1',
	      	  children: [{
	      	    label: '2017',
	      	    id: 'c2'
	      	  },{
	      	  	label: '2016',
	      	  	id: 'c2'
	      	  }]
	      	}],
	      	
	      };
	    }
	}
</script>

<style lang="scss" type="text/css" scoped>
	.news-wrapper {
		width: 60%;
		margin: 0 auto;
		.news-item {
			padding: 30px 25px 140px 0;
			border-bottom: 1px dashed #a9a9a9;
			position: relative;
			a {
				position: absolute;
				right: 25px;
				bottom: 42px;
				color: #d15144;
				font-size: 16px;
				&:hover {
					text-decoration: underline;
				}
			}
			h3 {
				font-size: 18px;
				line-height: 26px;
				color: #454545;
				font-weight: normal;
				margin-bottom: 25px;
			}
			.news-content {
				height: 150px;
				line-height: 150px; 
				.news-desc {
					display: inline-block;
					padding-left: 16px;
					h3 {
						margin-bottom: 8px;
					}
					p {
						font-size: 16px;
						line-height: 20px;
						color: #a9a9a9;
					}
				}	
			}
		}
	}
</style>