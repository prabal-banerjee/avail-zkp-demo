# Fetch the app extrinsic from avail and verify

# Starting block number
BLOCK_NUM=326

while :
do
    echo "\nQuerying block number $BLOCK_NUM"
    # Query and save to file
    cd avail-fetcher
    node --no-warnings index.js $BLOCK_NUM
    case $? in
        0) {
            echo 'Successfully fetched proof and public inputs'
            
            # Run verification script
            cd ..
            ./verify.sh
            case $? in
                0) {
                    echo 'Successfully verified. Txn accepted!'
                    echo 'Number accepted:' && cat avail-fetcher/public.json
                } ;;
                *) {
                    echo 'Verification failed. Txn rejected!'
                }
            esac
        } ;;
        *) {
            echo 'Failed fetching proofs. Skipping block.'
            cd ..
        }
    esac

    # Wait for next block
    BLOCK_NUM=$(($BLOCK_NUM + 1))
    sleep 20
done 
