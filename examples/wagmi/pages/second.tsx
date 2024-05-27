import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function Second() {
  const { connector, address, isConnected } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }
  return (
    <div className="main">
      {isConnected && (
        <div className="connected-msg">
          Connected to {connector?.name} with address {address}
        </div>
      )}
    </div>
  );
}
