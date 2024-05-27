import { ArcanaConnector } from "@arcana/auth-wagmi";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function Home() {
  const { connect, connectors, error } = useConnect();
  const { connector, address, isConnected, status } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }
  if (isConnected) {
    return (
      <div className="main">
        <div className="connected-msg">
          Connected to {connector?.name} with address {address}
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div>
          {!isConnected &&
            connectors.map((connector, i) => (
              <>
                <button
                  className="connect-btn"
                  key={i}
                  onClick={() => connect({ connector })}
                >
                  Connect to {connector.name}
                </button>
              </>
            ))}
        </div>
        {error && <div className="error-box">{error.message}</div>}
      </div>
    );
  }
}
