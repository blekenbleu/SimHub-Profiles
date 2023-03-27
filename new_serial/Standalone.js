// standalone G-force estimation with sampling deglitch and simple low pass IIR filters
var t = 2;                                   // non-linear spike threshold
var tc = $prop('Settings.smooth');  // lowpass IIR

// Initialize history
if(root["speed"]==null) {
   root["speed"] = $prop('SpeedMph');
   root["delta_s"] = 0.2;
}
if(root["yaw"]==null) {
   root["yaw"] = $prop('OrientationYaw');
   root["delta_y"] = 0.2;
}

var s = $prop('SpeedMph');
var y = $prop('OrientationYaw');
var ds = root["speed"] - s;		// negative of speed change
var dy = y - root["yaw"];

if (0 > ds)     // we are only interested in deceleration
     ds = 0;

if (Math.abs(dy) > 180) {  // yaw went +/- 180
  if (Math.abs(root["yaw"]) > 150)
    dy = -(y + root["yaw"]);
}

var Gy = $prop('Settings.yaw_gain') * dy;
var Gs = $prop('Settings.decel_gain') * ds;
var ms = 1;
var my = 1;  // sample interval factors

// check for delta spikes from missed samples
if (Math.abs(dy * root["delta_y"]) > t && Math.abs(dy) > Math.abs(1.8 * root["delta_y"]))
  Gy /= (my = 2);      // compensate sampling artifacts
if ((ds * root["delta_s"])  > t && ds > 1.8 * root["delta_s"])
  Gs /= (ms = 2);      // compensate sampling artifacts
  
// low-pass IIR filters
if (null==root["Gsb4"]) {
  root["Gsb4"] = $prop('Settings.decel_gain') * 0.5;
  root["Gyb4"] = $prop('Settings.yaw_gain') * 0.5;
}
var Gsb4 = root["Gsb4"], Gyb4 = root["Gyb4"];
Gsb4 += ms * (Gs - Gsb4) / tc;
Gyb4 += my * (Gy - Gyb4) / tc;
root["Gsb4"] = Gsb4; root["Gyb4"] = Gyb4; // preserve lowpass IIR outputs for next samples

// store unfiltered values for next increment
root["speed"] = s;
root["yaw"] = y;
root["delta_y"] = dy;
root["delta_s"] = ds;

// convert from braking and delta yaw to left and right tension control values
var l = Math.round(Gsb4 + Gyb4);	// your other left
var r = Math.round(Gsb4 - Gyb4);
var tmax = $prop('Settings.tmax') & 126;
if (l > tmax)
  l = tmax;
else if (2 > l)
  l = 2;
l &= 0x7E;      // left lsb is 0
tmax |= 1;
if (r > tmax)
  r = tmax;
else if (3 > r)
  r = 3;
r |= 1;         // right lsb is 1
/* gnuplot output **************************************
var ls = l.toString();	// to debug, e.g. substitute s,y or ds,dy or Gs,Gy for l,r
var rs = r.toString();
var ss = s.toString();
var ys = y.toString();
var Gys = Gyb4.toString();
var Gss = Gsb4.toString();
var dys = dy.toString();
var dss = ds.toString();
Gyb4 = Math.round(Gyb4);
Gsb4 = Math.round(Gsb4);
return ls.concat(' ',rs,' ',ss,' ',ys,' ',Gss,' ',Gys,' ',dss,' ',dys,'\r\n');	// gnuplot columns 
*/

// servo control output
if ($prop('Settings.TestOffsets')) {
// disable normal output
// any untensioned slider changes provoke first message
  root["delta_s"] = 0.2;  // re-initialize
  root["delta_y"] = 0.2;
  root["Gyb4"] = $prop('Settings.yaw_gain') * 0.5;
  root["Gsb4"] = $prop('Settings.decel_gain') * 0.5;
}
else {
  var ls = String.fromCharCode(l);	// tension control characters
  var rs = String.fromCharCode(r);
  return ls.concat(rs);
}
