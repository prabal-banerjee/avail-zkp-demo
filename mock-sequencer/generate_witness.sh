# 1. Generate the input.json file
A=$(( $RANDOM % 100 + 1 ))
B=$(( $RANDOM % 100 + 1 ))
echo "{\"a\": $A, \"b\": $B}" > input.json

# 2. Generate the witness
CIRCUIT_DIR='../common/multiplier2_js'
node $CIRCUIT_DIR/generate_witness.js $CIRCUIT_DIR/multiplier2.wasm input.json witness.wtns
