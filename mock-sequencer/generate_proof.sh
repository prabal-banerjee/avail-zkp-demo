# Generate the proof
COMMON_DIR='../common'
snarkjs groth16 prove $COMMON_DIR/multiplier2_0001.zkey witness.wtns proof.json public.json
