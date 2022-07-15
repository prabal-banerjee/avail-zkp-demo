import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import fs from 'fs'; 

const keyring = new Keyring({ type: 'sr25519' });

async function createApi(url) {
    const provider = new WsProvider(url);

    // Create the API and wait until ready
    return ApiPromise.create({
        provider,
        types: {
            DataLookup: {
                size: 'u32',
                index: 'Vec<(u32,u32)>'
            },
            KateExtrinsicRoot: {
                hash: 'Hash',
                commitment: 'Vec<u8>',
                rows: 'u16',
                cols: 'u16'
            },
            KateHeader: {
                parentHash: 'Hash',
                number: 'Compact<BlockNumber>',
                stateRoot: 'Hash',
                extrinsicsRoot: 'KateExtrinsicRoot',
                digest: 'Digest',
                appDataLookup: 'DataLookup'
            },
            Header: 'KateHeader',
            AppId: 'u32',
        },
        signedExtensions: {
            CheckAppId: {
                extrinsic: {
                    appId: 'u32'
                },
                payload: {}
            },
        },
    });
}

//async funtion to get the nonce 
async function getNonce(api, address) {
    const nonce = (await api.rpc.system.accountNextIndex(address)).toNumber();
    return nonce;
}

async function getData() {
    const proof = fs.readFileSync('../proof.json', 'utf8');
    const public_input = fs.readFileSync('../public.json', 'utf8');
    let blob = JSON.stringify({proof: proof, public_input: public_input});
    // console.log("Submitting data: ", blob);
    return blob;
}

async function sendTx(api, sender, nonce, appId, data) {
    try {
        let submit = await api.tx.dataAvailability.submitData(data);
        const options = { app_id: appId, nonce: nonce }
        const res = await submit
            .signAndSend(
                sender,  // sender
                options, // options
                (result) => {
                    // console.log(`Tx status: ${result.status}`);
                    if (result.status.isReady) {
                        console.log(`result is ready with nonce ${nonce}`)
                    }
                    if (result.status.isInBlock) {
                        console.log(`\nExtrinsic hash: ${result.txHash} is in block ${result.status.asInBlock}`);
                        // return result.status.asInBlock;
                        process.exit(0);
                    }
                    // if (result.status.isFinalized) {
                    //     console.log(`\nExtrinsic hash: ${result.txHash} is finalized`);
                    // }
                });
            
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

async function getBlockNumber(api, hash) {
    const signedBlock = await api.rpc.chain.getBlock(hash);
    console.log(`Block number is ${signedBlock.number}`);
}

async function main() {
    const api = await createApi('ws://localhost:9944');
    const appId = 2;
    const data = await getData();
    // const mnemonic = 'leader client mosquito wolf street globe donkey tool rapid into deal priority';
    // const account = keyring.addFromUri(mnemonic, 'sr25519'); 
    const account = keyring.addFromUri('//Alice'); 
    let nonce = await getNonce(api, account.address);
    await sendTx(api, account, nonce, appId, data);
    
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});