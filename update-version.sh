curl -fsSLO https://github.com/AlanLang/beancount-sui/raw/tampermonkey/production.user.js
published_version=$(grep -oE '@version\s+[0-9.]+' ./production.user.js | awk 'NR==1{print $2}')
version=$(grep -oE '@version\s+[0-9.]+' ./src/user.ts | awk 'NR==1{print $2}')
new_version=$(echo $published_version | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' -e "s/$version/$new_version/g" ./src/user.ts
else
  sed -i -e "s/$version/$new_version/g" ./src/user.ts
fi