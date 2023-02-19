version=$(grep -oE '@version\s+[0-9.]+' ./src/user.ts | awk 'NR==1{print $2}')
new_version=$(echo $version | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' -e "s/$version/$new_version/g" ./src/user.ts
else
  sed -i -e "s/$version/$new_version/g" ./src/user.ts
fi