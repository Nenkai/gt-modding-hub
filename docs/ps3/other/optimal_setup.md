# Optimal Setup for Modding

!!! tip 
    You can skip all of this if you are using FSRoot or RPCS3.

As it may be tiring to always pack files for each edit being made, here is a simple table of things to do to remedy that process.

---

## Batch Script File
Use a [Batch File](https://en.wikipedia.org/wiki/Batch_file) to pack the files for you and automatically transfer them over to your PS3 through FTP with [WinSCP](https://winscp.net/eng/download.php). 

Create a file named `Pack_And_Transfer.bat`, and inside it, put the following :
```batch title="Pack_And_Transfer.bat"
GTToolsSharp pack -i <PDIPFS_INPUT> -p <Mod_Folder> -o <Output_Path>
"C:\Program Files (x86)\WinSCP\WinSCP.exe" /console /script=ftp_script.txt
```
Replace `<PDIPFS_INPUT>` , `<Mod_Folder>` , `<Output_Path>` accordingly.

Now, create a file named `ftp_script.txt` with the following contents : 
```batch title="ftp_script.txt"
# Execute the script using a command like:
# "C:\Program Files (x86)\WinSCP\WinSCP.exe" /log="C:\writable\path\to\log\WinSCP.log" /ini=nul /script="C:\path\to\script\script.txt"

open ftp://anonymous:anonymous%40example.com@<IP>/ -passive=0 -rawsettings ProxyPort=1 FtpPingInterval=3

option confirm off

lcd <Out_Path>
cd /dev_hdd0/game/<Game_Code>/USRDIR

put *

exit
```
Replace:

*  `<IP>` with the PS3's IP
*  `<Game_Code>` with the target game code i.e BCES00569 
* `<Output_Path>` with the output packed files.

---

!!! tip "Extra Tips"
    * Consider plugging your PS3 to your PC through Ethernet to speed up sending files. This [guide](https://gbatemp.net/threads/how-to-have-very-fast-ftp-ps3-cfw-dex-cex.441180/) is helpful.
    * Consider investing in a capture card, like an Elgato. This will allow you to preview your PS3 in its own window so you don't have to keep moving around.
    * Consider using a second screen/monitor for the PS3 if above is not possible.
    * If above is still not possible, consider using an HDMI Switch.
    * RPCS3 can be helpful for anything that is not in-race mods on GT6 (due to [desyncs](https://github.com/RPCS3/rpcs3/issues/10882)).
