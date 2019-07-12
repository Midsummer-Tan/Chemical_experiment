<template>
    <div class="clock" style="height:100px;">
		<div class="digit big">
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
		</div>
	
		<div class="separator"></div>
		
		<div class="digit small">
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
		</div>
	
		<div class="digit small">
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
		</div>
		
		<div class="digit small">
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
		</div>
		&nbsp;
		<div class="digit g">
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
		</div>	
	</div>
</template>
<style scoped>
@import './css/demo.css';
@import './css/style.css';
@import './css/normalize.css';
</style>


<script>
export default {
  name:'electronic-scale',
  data() {
    return {
		timer:null,
	}
  },
  methods: {
	init(){
		//这样使用电子称
		this.setAllNumber(0, 0, 0, 0);
	},

	setAllNumber(num1, num2, num3, num4) {
		var _big = document.querySelectorAll('.big');
		var _small = document.querySelectorAll('.small');
		var _g = document.querySelectorAll('.g');
		this.setNumber(_big[0], num1, 1);

		this.setNumber(_small[0], num2, 1);
		this.setNumber(_small[1], num3, 1);
		this.setNumber(_small[2], num4, 1);

		this.setNumber(_g[0], 10, 1);
	},

	setNumber(digit, number, on) {
		var digitSegments=[
		[1, 2, 3, 4, 5, 6],
		[2, 3],
		[1, 2, 7, 5, 4],
		[1, 2, 7, 3, 4],
		[6, 7, 2, 3],
		[1, 6, 7, 3, 4],
		[1, 6, 5, 4, 3, 7],
		[1, 2, 3],
		[1, 2, 3, 4, 5, 6, 7],
		[1, 2, 7, 3, 6],
		[1, 2, 7, 3, 6, 4],
		]
		var segments = digit.querySelectorAll('.segment');
		var current = parseInt(digit.getAttribute('data-value'));
		if (isNaN(current) || current != number) {
			//set new number after
			this.clock = setTimeout(function () {
			digitSegments[number].forEach(function (digitSegment, index) {
				setTimeout(function () {
				segments[digitSegment - 1].classList.add('on');
				}, index * 45)
			});
			}, 250);
			digit.setAttribute('data-value', number);
		}
	}
	},
	destroyed(){
		clearInterval(this.timer);        
        this.timer = null;
	}
  }


</script>
