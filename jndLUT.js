// servo movement range and steps
// 20 experimental just noticeable tension increments (21 steps)
var jndx = [2,9,13,16,19,22,25,28,31,34,37,41,44,48,52,57,62,67,74,82,90];
var n = jndx.length - 1;
var base = jndx[0];
function tweak(value) {
  return value - base;
}
var jnd = jndx.map(tweak);
//return jnd.toString();

var step = [0];	// warn Arduino of LUT load
step[1] = $prop('Settings.LeftOffset');
step[2] = $prop('Settings.RightOffset');
var m = ($prop('Settings.tmax') - base) / jnd[n];	// max tension rescale factor

step[17] = Math.round(m * jnd[n]);	// rescale last step
// Bresenham thru jnd increments to resample 14 steps
var l = 0;
for (i = 3; i < 17; i++) {
  l += n;
  var x = l / 15;			// location in jnd[] corresponding to step[i]
  var k = Math.floor(x);		// linear interpolation: index into jnd[]
  var d = jnd[k + 1] - jnd[k];		// servo steps
  x -= k;				// jnd[] fraction
  step[i] = Math.round(m * (jnd[k] + x * d));
}
step[18] = 127;				// Arduino sketch sync code
//return step.toString();

step[19] = 16;		// left slackest control index
step[20] = 32;		// right
if ($prop('Settings.max_test')) {
  step[19] += 15; 	// most tense control indices
  step[20] += 15;
}

// send calibration table, then 127, then update servo positions
//return step.toString(); // Arduino would have to parse ASCII
return String.fromCharCode.apply(null,step);
