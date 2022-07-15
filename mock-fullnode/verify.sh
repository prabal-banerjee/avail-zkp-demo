# Verify the proof
KEY_DIR='../common'
# PROOF_DIR='../mock-sequencer'
PROOF_DIR='avail-fetcher'
# snarkjs groth16 verify $KEY_DIR/verification_key.json $PROOF_DIR/public.json $PROOF_DIR/proof.json
snarkjs groth16 verify $KEY_DIR/verification_key.json $PROOF_DIR/public.json $PROOF_DIR/proof.json
