# Generate inputs, proof and submit to Avail
# TODO: Error handling (not very imp for sequencer)

while :
do
	# Generate a two numbers and create the witness
    echo '\n\nGenerating numbers and witness'
    ./generate_witness.sh

    # Generate proof
    echo 'Generating zk proof'
    ./generate_proof.sh

    # Submit to Avail
    echo 'Submitting proof and public parameters to Avail'
    cd avail-submitter
    node submit.js
    cd ..

    echo 'Submitted number:'
    cat public.json

    # Wait for next block
	sleep 20
done

