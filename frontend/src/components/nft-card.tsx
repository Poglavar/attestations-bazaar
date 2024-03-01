import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";

export default function NFTCard() {
  const { contract } = useContract('0xb52ED2Dc8EBD49877De57De3f454Fd71b75bc1fD')
  const { data: nft, isLoading } = useNFT(contract, 0);

  return (
    <div>
      {!isLoading && nft ? (
        <ThirdwebNftMedia metadata={nft.metadata} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}