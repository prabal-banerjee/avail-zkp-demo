# 1. Start a ptau ceremony - Phase 1
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v

# 2. Contribute
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="Phase1: Prabal's randomness" -v

# 3. Phase 2: Start
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v

# 4. Generate zkey
snarkjs groth16 setup multiplier2.r1cs pot12_final.ptau multiplier2_0000.zkey

# 5. Contribute
snarkjs zkey contribute multiplier2_0000.zkey multiplier2_0001.zkey --name="Phase2: Prabal's randomness" -v

# 6. Export verification key
snarkjs zkey export verificationkey multiplier2_0001.zkey verification_key.json
