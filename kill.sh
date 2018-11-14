ps -A | grep node | awk 'BEGIN {FS=" "} {system("kill -9 "$1)}'
