<template>
<div class="back">
			<div class="time_h">
				<div class="time_h_h">

				</div>
			</div>
			<div class="time_m">
				<div class="time_m_m">

				</div>
			</div>
			<div class="time_s">
				<div class="time_s_s">

				</div>
			</div>
		</div>
</template>
<style scoped>
.back {
			width: 200px;
			height: 200px;
			margin: 1px auto;
			border-radius: 50%;
			background-image: url("/images/clock.png");
      background-size:100%;
			position: relative;
		}

		.time_h {
			width: 6rem;
			height: 0.175rem;
			margin-top: -0.0875rem;
			margin-left: -3rem;
		}

		.time_m {
			width: 8rem;
			height: 0.125rem;
			margin-top: -0.0625rem;
			margin-left: -4rem;
		}

		.time_s {
			width: 10.7rem;
			height: 0.075rem;
			margin-top: -0.0375rem;
			margin-left: -5.35rem;

		}

		.time_h_h {
			width: 3rem;
			height: 0.35rem;
		}

		.time_m_m {
			width: 4rem;
			height: 0.25rem;
		}

		.time_s_s {
			width: 5.25rem;
			height: 0.15rem;

		}

		.time_h_h,
		.time_m_m,
		.time_s_s {
			float: right;
			background: rgba(0, 0, 0, 0.9);
		}

		.time_h,
		.time_m,
		.time_s {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: rotate(-90deg)
		}
</style>
<script>
export default {
  name:'myClock',
  mounted(){
    var divH = document.getElementsByClassName("time_h")
    var divM = document.getElementsByClassName("time_m")
    var divS = document.getElementsByClassName("time_s")
    setInterval(function() {
      var newtime = new Date()
      var h = newtime.getHours()
      var m = newtime.getMinutes()
      var s = newtime.getSeconds()
      divH[0].style.transform = "rotate(" + (-90 + h * 30) + "deg)"
      divM[0].style.transform = "rotate(" + (-90 + m * 6) + "deg)"
      divS[0].style.transform = "rotate(" + (-90 + s * 6) + "deg)"
    }, 1000)
  },
  }

</script>