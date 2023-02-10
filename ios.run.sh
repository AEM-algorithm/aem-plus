native-run ios --list --virtual

echo "Enter Target ID:"
read simulator;

echo "Run iOS simulator with Target ID: $simulator"

open -a Simulator --args -CurrentDeviceUDID $simulator

ionic cordova emulate ios --livereload --external --target="$simulator"
