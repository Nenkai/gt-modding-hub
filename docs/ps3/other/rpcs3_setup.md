# Ideal RPCS3 Setup

## Quickstart Guide

The Quickstart guide has all the information you need to set up the emulator, and how to make a proper copy of your game that could be used with it.
Read it at [The Quickstart Guide](https://rpcs3.net/quickstart)

You can also join the [RPCS3 Discord](https://discord.com/invite/Af7H9yp)

---

## Recommended Settings

![aa](../../images/rpcs3_settings.png)

!!! warning "Important notes"
    The game will freeze sooner or later regardless of settings, PPU Interpreter (Fast) may help but at a performance loss.
    TSX Instructions are only found in some Intel CPUs, if this option is greyed out, enable Accurate RSX Reservations in the Advanced tab.


    To enable the Debug Tab:

    * Go to RPCS3's folder, and into `GuiConfigs` on **Windows** or `~/.config/rpcs3/GuiConfigs` on **Linux**.
    * Then open CurrentSettings.ini and change `showDebugTab=false`  to showDebugTab=true and save the file. You should now see the Debug tab in settings.

---

## MGS4/GT5 Build
Improves performance and stability on GT5 with the Reprotect Hack and VK Event Hack. If you already have an existing installation of RPCS3, extract rpcs3.exe and place it in your current installation folder.  

[:octicons-download-16: Download](https://artprodcus3.artifacts.visualstudio.com/A357dbb78-2f51-4769-bd1b-0c292044d605/147c0692-6119-4342-8d20-a7b797e8fec1/_apis/artifact/cGlwZWxpbmVhcnRpZmFjdDovL2lsbHVzaW9uOTgwNC9wcm9qZWN0SWQvMTQ3YzA2OTItNjExOS00MzQyLThkMjAtYTdiNzk3ZThmZWMxL2J1aWxkSWQvNTQ2L2FydGlmYWN0TmFtZS9SUENTMytmb3IrV2luZG93cw2/content?format=zip)

---

## Develop/Debug Menu for GT6 1.02

GT6 1.02 mod since it runs better on that version - unlocks develop/debug menu (SELECT + R1)

[:octicons-download-16: Download](GT6_1.02_Develop.zip)

---

## RPCS3 Online LAN Tutorial.

!!! note
    Only RPCS3 <-> RPCS3 at the moment.

1. Set up GT5 on RPCS3 (make sure you have the latest RPCS3), Update the game to 2.11 by installing each update in order, and install Nenkai's LAN Mod.
2. Download RadminVPN and install it.
3. Connect to the Network "RPCS3 LAN", Password is "Onlineplz".
4. Copy the IP shown below your name in RadminVPN.
5. Open RPCS3s Config File for GT5, located in /config/custom_configs/GT5s-GameID.yml. If said file doesn't exist, right-click on GT5 and select "Create Custom Configuration", then click save and check again.
6. Paste the IP you copied earlier in the IP Address field at the bottom.
7. Open RPCS3, and make sure you have Network Status set to Connected, and PSN Status set to Disconnected for GT5. (Right-click on GT5 and select "Create Custom Configuration")
8. Run GT5, go to the Secret Settings at the very bottom of the Settings menu, and enable "label_lounge" under Display Options. Also enable Online Lounge Demo under Special Network Options to the right.
9. Go to the LAN Racing Symbol in the Main Menu, select "LAN Battle" and you should be good to go!

