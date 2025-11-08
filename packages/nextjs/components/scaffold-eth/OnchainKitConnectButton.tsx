"use client";

import { AddressInfoDropdown } from "./RainbowKitCustomConnectButton/AddressInfoDropdown";
import { AddressQRCodeModal } from "./RainbowKitCustomConnectButton/AddressQRCodeModal";
import { WrongNetworkDropdown } from "./RainbowKitCustomConnectButton/WrongNetworkDropdown";
import { Balance } from "@scaffold-ui/components";
import { Address } from "viem";
import { useAccount, useConnect } from "wagmi";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

/**
 * OnchainKit-compatible Connect Button with Scaffold-ETH styling
 */
export const OnchainKitConnectButton = () => {
  const { address, chain, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();

  const blockExplorerAddressLink = address ? getBlockExplorerAddressLink(targetNetwork, address) : undefined;

  if (!isConnected || !address) {
    return (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => {
          const injectedConnector = connectors.find(c => c.id === "injected");
          if (injectedConnector) {
            connect({ connector: injectedConnector });
          }
        }}
        type="button"
      >
        Connect Wallet
      </button>
    );
  }

  if (!chain || chain.id !== targetNetwork.id) {
    return <WrongNetworkDropdown />;
  }

  return (
    <>
      <div className="flex flex-col items-center mr-2">
        <Balance
          address={address as Address}
          style={{
            minHeight: "0",
            height: "auto",
            fontSize: "0.8em",
          }}
        />
        <span className="text-xs" style={{ color: networkColor }}>
          {chain.name}
        </span>
      </div>
      <AddressInfoDropdown
        address={address as Address}
        displayName={address.slice(0, 6)}
        ensAvatar={undefined}
        blockExplorerAddressLink={blockExplorerAddressLink}
      />
      <AddressQRCodeModal address={address as Address} modalId="qrcode-modal" />
    </>
  );
};
