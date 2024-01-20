# SimHub profiles
 SimHub looks for these profiles in `Documents\SimHub\`  
 ShakeIt and Custom Serial e.g. for harness tensioning, etc;&nbsp; NOT dashes  
 Where there are file names different only by `.txt` suffix, that `.txt` version is usually older, since unused by SimHub.  
 The newer version is not necessarily better;&nbsp; it may be some ongoing or unsuccessful experiment.  

---

## ShakeIt Bass Shakers
### Tactile
- [Assetto Corsa - Loaded_WheelSlip9.1.20](<Assetto Corsa - Loaded_WheelSlip9.1.20.siprofile>)  discussed [here](https://www.racedepartment.com/threads/simhub-shakeit-bass-shakers-custom-4-corner-tire-slip.198455/post-3739847)  
	SimHub 9.1.20 added `Forced Frequencies` to CUSTOM EFFECT, and AC has `GameRawData.Physics.WheelLoad0x` telemetry properties, 
    allowing this a simple low overhead profile for loaded wheel slip simulating tire squeal to shudder based on increasing slip, with amplitude based on tire load (no load = no tactile)  
#### [SimHub ShakeIt Bass Shakers custom 4 corner tire slip](GmodulatedWheelSlip.siprofile.txt) *updated to* [`Forced Frequencies`](file:///C:/Users/bleke/Documents/SimHub/Any%20Game%20-%204-channel%20wheelslip%20-%20CUSTOM%20Forced%20Frequency.siprofile) 
   AKA [GmodulatedWheelSlip.siprofile.txt](https://www.racedepartment.com/threads/simhub-shakeit-bass-shakers-custom-4-corner-tire-slip.198455/)
   and [the orginal](GmodulatedWheelSlip.siprofile), as described [here](https://blekenbleu.github.io/pedals/#Simshakeseat).  
#### [sierses_4-channel_wheelslip.siprofile](sierses_4-channel_wheelslip.siprofile) - *updated to*: [Forced Frequency squeal-shudder](<Any Game - 4-channel wheelslip mix - CUSTOM Forced Frequency.siprofile>)  
- based on [NewLoaded4-chanWheelslipUndersteer.siprofile](NewLoaded4-chanWheelslipUndersteer.siprofile)
- wrapped effects in an embedded GroupContainer
    - custom effects for property AbsAcc from abs AccelerationSway, Surge
    - custom effects for property proxyL, based on Abs.Acc
    - proxyS properties exported from Wheels Slip effect
    - custom effect generates proxyL * proxyS / 100
    - custom effect for under, oversteer properties (and outputs) from proxyS front-rear differences * AbsAcc
    - custom effect generates mixes of oversteer and loaded slips
#### [NewLoaded4-chanWheelslipUndersteer.siprofile](NewLoaded4-chanWheelslipUndersteer.siprofile)  
    same effects as above  
- *14 Aug 2012* accelerations applied to slip differences for under/oversteer were all wrong  
- **to do**: replace AbsAcc custom effect with G-Forces effects  
#### [SimHub ShakeIt Bass Shaker profiles](https://blekenbleu.github.io/pedals/shakeit.htm) discussion
#### [ShakeIt Formulae JavaScript documentation](https://blekenbleu.github.io/pedals/ShakeIt/)  

## Custom serial devices
- [Fake8.shsds](Fake8.shsds) as used in [**SimHub plugin for Direct Drive harness tension control**](https://github.com/blekenbleu/Direct-Drive-harness-tension-tester)
### Stuyo's sim belt servo tensioner  
- [@Wschuck](https://discord.com/channels/299259397060689920/1075603500609839246/1077844957274062888)'s Updated [Seatbelt_tensioner.siprofile](Seatbelt_tensioner.siprofile)
   and [seatbelt_profile_with_shakeit.shsds](seatbelt_profile_with_shakeit.shsds)  
  for use e.g. with [Stuyo's sim belt servo tensioner](https://github.com/blekenbleu/Arduino-Blue-Pill/tree/main/Blue_ASCII_Servo)  
  as [described here](https://blekenbleu.github.io/Arduino/Blue_ASCII_Servo/)
#### [Arduino sketches for Custom Serial profiles](https://blekenbleu.github.io/Arduino/SimHubCustomSerial) discussion
#### See [SimHub Custom serial profile atlas](https://blekenbleu.github.io/Arduino/shsds.htm) for details about these:  
   - [tension.shsds](tension.shsds.txt)
   - [running.shsds](running.shsds)
   - [proxy_G.shsds](proxy_G.shsds.txt)
   - [Noticeable.shsds](Noticeable.shsds.txt)
   - [JustNoticeable.shsds](JustNoticeable.shsds)
   - [Devices3messages6.shsds](Devices3messages6.shsds)
   - [UpdatedProxyG.shsds](UpdatedProxyG.shsds)
   - [JND_LUT.shsds](JND_LUT.shsds)
   - [BeltTensionner1705.shsds ](BeltTensionner1705.shsds )
   - [BeltTensionner1605.shsds](BeltTensionner1605.shsds)
   - [new_serial.shsds](new_serial.shsds)
   - [compare.shsds](compare.shsds)
