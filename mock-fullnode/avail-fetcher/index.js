import fs from 'fs'; 

const url = "http://127.0.0.1:7001/v1/appdata/";
const block_number = process.argv[2];

let malicious_flag = false;
// console.log(process.argv[3]);
if (process.argv[3] !== undefined) {
    malicious_flag = true;
    console.log('Malicious flag set');
}


fetch(url+block_number)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);

        // Assuming a single extrinsic per block
        // TODO: Extend to multiple extrinsics
        let proof_and_pub;
        try {
            proof_and_pub = JSON.parse(data.extrinsics[0].data);
        } catch(e) {
            console.log('Unable to parse proof and inputs from retrieved data');
            process.exit(2);
        }
        let proof = proof_and_pub.proof.toString();

        if (malicious_flag) {
            proof = proof + 'randomstring';
        }
        const public_input = proof_and_pub.public_input.toString();
        try {
            fs.writeFileSync('proof.json', proof);
            fs.writeFileSync('public.json', public_input);
        } catch(e) {
            console.log('Unable to write files');
            process.exit(3);
        }
        process.exit(0)
    })
    .catch((e) => {
        console.log(e);
        process.exit(4);
    });
