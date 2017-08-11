Welcome to the Emacs shell

~/.emacs.d $ cd 
Applications  Desktop  Documents  Downloads  KeyStore  Library  Movies  Music  Pictures  Public  UMLet  VirtualBox VMs  Wine Files  bitcoin  old.emacs.d  old_macs  repos  sdk  tmp
~ $ cd repos/construct/
README.md  build  config  index.html  node_modules  package-lock.json  package.json  src
~/repos/construct $ ls
README.md  build  config  index.html  node_modules  package-lock.json  package.json  src
~/repos/construct $ ls
README.md  build  config  index.html  node_modules  package-lock.json  package.json  src
~/repos/construct $ 
~/repos/construct $ cd src/pages/
CoinPage.vue  ExchangePage.vue  Home.vue  index.js
~/repos/construct/src/pages $ mv Home.vue HomePage.vue
~/repos/construct/src/pages $ 
~/repos/construct/src/pages $ ls
CoinPage.vue  ExchangePage.vue  HomePage.vue  index.js
~/repos/construct/src/pages $ cd ..
App.vue  assets  components  fonts  main.js  pages  router  store  styles
~/repos/construct/src $ cd store/
components  exchanges  index.js  models
~/repos/construct/src/store $ mkdir coins
~/repos/construct/src/store $ cd coins/
~/repos/construct/src/store/coins $ cd ..
coins  components  exchanges  index.js  models
~/repos/construct/src/store $ rm -r coins/
~/repos/construct/src/store $ cp -r exchanges/ coins
~/repos/construct/src/store $ cd components/
index.js  leftNav.js  modal.js  rightNav.js
~/repos/construct/src/store/components $ cd ..
coins  components  exchanges  index.js  models
~/repos/construct/src/store $ c components/
index.js  leftNav.js  modal.js  rightNav.js
index.js  leftNav.js  modal.js  rightNav.js
~/repos/construct/src/store/components $ cd ..
coins  components  exchanges  index.js  models
~/repos/construct/src/store $ cd coins/
GDAX  index.js
~/repos/construct/src/store/coins $ cd GDAX/
actions.js  api.js  getters.js  index.js  mutation-types.js  mutations.js
~/repos/construct/src/store/coins/GDAX $ cd ..
GDAX  index.js
~/repos/construct/src/store/coins $ mv GDAX/ All
~/repos/construct/src/store/coins $ ls
All  index.js
~/repos/construct/src/store/coins $ cd All/
actions.js  api.js  getters.js  index.js  mutation-types.js  mutations.js
~/repos/construct/src/store/coins/All $ 