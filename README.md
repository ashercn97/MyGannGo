# MyGannGo

MyGannGo implements a bunch of **modular** code that can be used to interact with MyGann (Gann Academy's _amazing_ learning managment system) through code.

## Usage :-)
First, run `npm install myganngo` in a node package. Then, in the root directory create a `.env` file with the following fields:
```
USERNAME=your_email
PASS=you_pass
```
Then, you are ready to go! Import files/modules like this:
```
import get_cookies from '@ashersopro/myganngo/src/utils/cookies'
```
Then you are ready to go! 

## How it works
MyGannGo utilizes mainly puppeteer to interact with MyGann. For getting your schedule or your assignment center, it has a proxy server so the requests don't get blocked. 

## Future Plans
* possibly make a python version of this
* move to typescript
* add more functionality

