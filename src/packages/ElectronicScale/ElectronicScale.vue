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

		<div class="digit big">
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
			<div class="segment"></div>
		</div>

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
import { setAllNumber } from "./js/digital-clock.js";
//setNumber是由setAllNumber调用的 也需要引用
export default {
  name:'electronic-scale',
  data() {
    return {
		
	}
  },
  methods:{
	  setAllNumber(num1,num2,num3,num4,num5,num6){
		  setAllNumber(num1,num2,num3,num4,num5,num6)
		  //用法 000.000g
		  //对应 num1 num2 num3.num4 num5,num6g
	  }
  }
  }

</script>
