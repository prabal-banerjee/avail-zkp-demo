# avail-zkp-demo
Prototype of a ZK-Proof based application chain using [Avail](https://github.com/maticnetwork/avail). 

For the ZKP, we use [circom](https://docs.circom.io/). For the Avail interaction we use [avail-light](https://github.com/maticnetwork/avail-light) to fetch app specific data and [polkadot.js API](https://github.com/polkadot-js/api) to submit app data.

Note: This is a PoC. So code is of very low quality. 
## Roles
The prototype is broken into three parts:
- **Mock Sequencer**: The mock sequencer generates proofs of valid execution and then submits the proof and public inputs to Avail.
- **Mock Fullnode**: The mock fullnode tries to keep up with the chain, accepting only valid proofs submitted by any sequencer (and possibly maintaining state locally).
- **Common**: This contains the artifacts which are common to the sequencers and the fullnodes, like the circuit, SRS, etc. 

## Setup 
1. Install `snarkjs`.
    ```
    npm install -g snarkjs
    ```
2. Perform powers of tau ceremony
    ```
    cd common
    ./powers-of-tau.sh
    ```

## Run
1. Make sure you have access to an `avail` node `ws` endpoint. The endpoint URL needs to be correctly mentioned in [`mock-sequencer/avail-submitter/submit.js`](https://github.com/prabal-banerjee/avail-zkp-demo/blob/7948580eae1ea5e49201f3897ada0155304bb862/mock-sequencer/avail-submitter/submit.js#L94)

2. Make sure you have access to a working `avail-light` client `http` endpoint. The endpoint URL needs to be correctly mentioned in [`mock-fullnode/avail-fetcher/index.js`](https://github.com/prabal-banerjee/avail-zkp-demo/blob/7948580eae1ea5e49201f3897ada0155304bb862/mock-fullnode/avail-fetcher/index.js#L3)

3. Sequencer: In a window, run `sequencer.sh`

4. Full node: 
    - Modify the block number to start listening from inside [`mock-fullnode/fullnode.sh`](https://github.com/prabal-banerjee/avail-zkp-demo/blob/7948580eae1ea5e49201f3897ada0155304bb862/mock-fullnode/fullnode.sh#L4)
    - Run `fullnode.sh`

    - [Optional] If you want to mock malicious proof, just run another instance of `fullnode.sh` in a separate window by passing another argument to `index.js` call inside [`mock-fullnode/fullnode.sh`](https://github.com/prabal-banerjee/avail-zkp-demo/blob/7948580eae1ea5e49201f3897ada0155304bb862/mock-fullnode/fullnode.sh#L11)
