// G-force estimation from ShakeIt CUSTOM EFFECT Javascript proxy_G properties
var Gy = $prop('ShakeITBSV3Plugin.Export.proxy_G.FrontLeft');
Gy -= $prop('ShakeITBSV3Plugin.Export.proxy_G.RearLeft');	// lateral (yaw) acceleration proxy
var Gs = $prop('ShakeITBSV3Plugin.Export.proxy_G.FrontRight');	// deceleration proxy
Gs -= $prop('ShakeITBSV3Plugin.Export.proxy_G.RearRight');
Gy *= $prop('Settings.yaw_gain')/60;
Gs *= ($prop('Settings.decel_gain')/200);	// positive deceleration

// convert speed and yaw changes to left and right tension values
// turning left increases left harness tension
var l = Math.round(Gs - Gy) / 2;        // your other left
var r = Math.round(Gs + Gy) / 2;

// Low-pass IIR filtering of left and right tension values
if (null==root["lb4"]) {
  root["rb4"] = r;  root["lb4"] = l;	// initialize
}
var rb4 = root["rb4"], lb4 = root["lb4"]; // previously filtered values
var tc = $prop('Settings.smooth');
rb4 += (r - rb4) / tc;
lb4 += (l - lb4) / tc;
root["lb4"] = lb4;
root["rb4"] = rb4;

l = lb4; r = rb4; // filtered tensions;  comment out for unfiltered (or set Settings.smooth = 1)
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
var s = $prop('SpeedMph');
var y = $prop('OrientationYaw');

// Initialize history
if(root["speed"]==null) {
   root["speed"] = s;
}
if(root["yaw"]==null) {
   root["yaw"] = y;
}  
var ds = 100 * (root["speed"] - s);	// unfiltered, glitchy deltas
var dy = 80 * (y - root["yaw"]);

root["yaw"] = y;
root["speed"] = s;
var ls = l.toString();		// to debug, e.g. substitute s,y or ds,dy or Gs,Gy for l,r
var rs = r.toString();
var ss = s.toString();
var ys = y.toString();
var Gys = Gy.toString();
var Gss = Gs.toString();
var dys = dy.toString();
var dss = ds.toString();
var rb4s = rb4.toString();
var lb4s = lb4.toString();
return ls.concat(' ',rs,' ',Gss,' ',Gys,' ',ss,' ',ys,' ',dss,' ',dys,' ',lb4s,' ',rb4s,'\r\n');  // gnuplot columns
*/

// servo control output
if ($prop('Settings.TestOffsets') || $prop('Settings.max_test')) {
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
