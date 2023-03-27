// Initialize history
var s = $prop('SpeedMph');
var y = $prop('OrientationYaw');
if(null == root["speed"]) {
   root["speed"] = s;
   root["delta_s"] = 0.2;
   root["yaw"] = y;
   root["delta_y"] = 0.2;
}

var ds = root["speed"] - s;		// negative of speed change
var dy = y - root["yaw"];

if (Math.abs(dy) > 180) {  // yaw went +/- 180
  if (Math.abs(root["yaw"]) > 150)
    dy = -(y + root["yaw"]);
}
var YawGain = 72;
var DecelGain = 178;
dy *= YawGain;
ds *= DecelGain;
var ms = 1;
var my = 1;  // sample interval factors
var Gy = root["delta_y"];
var Gs = root["delta_s"];

// check for delta spikes from missed samples
var t = 2;                                   // non-linear spike threshold
if (Math.abs(Gy * dy) > t && Math.abs(dy) > Math.abs(1.8 * Gy))
  dy /= (my = 2);      // compensate sampling artifacts
if (Math.abs(Gs * ds)  > t && Math.abs(ds) > 1.8 * Math.abs(Gs))
  ds /= (ms = 2);      // compensate sampling artifacts
// low-pass IIR filters
var tc = 3;  // lowpass IIR
Gs += ms * (ds - Gs) / tc;
Gy += my * (dy - Gy) / tc;
root["delta_y"] = Gy;
root["delta_s"] = Gs;
// store unfiltered values for next increment
root["speed"] = s;
root["yaw"] = y;


// SimHub
var accel = $prop('GlobalAccelerationG');
var acc01 = $prop('GameRawData.Physics.AccG01');
var acc02 = $prop('GameRawData.Physics.AccG02');
var acc03 = $prop('GameRawData.Physics.AccG03');
var acs = accel.toString();
var a1s = acc01.toString();
var a2s = acc02.toString();
var a3s = acc03.toString();
var dys = Gy.toString();
var dss = Gs.toString();
return dys.concat('\t',dss,'\t',acs,'\t',a1s,'\t',a2s,'\t',a3s,'\r\n');
