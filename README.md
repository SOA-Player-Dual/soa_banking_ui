# Environment
 - Node: v18.8.0
 - npm: 8.19.3
 
# Run
 - npm install
 - npm start
 - Run on localhost: 3000 (by https: `https://localhost:3000/`)

# Issue
 ```diff
- Unable to resolve dependency tree error when installing npm packages
```
 - Description error: Perhaps resolve dependency on another local.
 - Fix: npm install --save --legacy-peer-deps 
 - Or: npm install --force
 
# Project manual
 - Browser: Chorme (https work best on Chorme, please dont try another browser because cookie unable set on browser)
 - You need access https on your local by step:
   + Access `https://13.215.191.9/`
   + Click advance button on warning screen
   + Click `Process to https://13.215.191.9(unsafe)`
   + Try to run project again
