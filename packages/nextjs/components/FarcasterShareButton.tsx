"use client";

import { useFarcaster } from "./providers/FarcasterProvider";

interface ShareButtonProps {
  frameUrl: string;
  text: string;
  className?: string;
}

export function FarcasterShareButton({ frameUrl, text, className = "" }: ShareButtonProps) {
  const { isFrameContext } = useFarcaster();

  // Only show in Farcaster context
  if (!isFrameContext) {
    return null;
  }

  const handleShare = () => {
    // Open frame sharing dialog
    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(frameUrl)}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <button onClick={handleShare} className={`btn btn-primary btn-sm gap-2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
        />
      </svg>
      Share on Farcaster
    </button>
  );
}

// Preset share buttons for common scenarios
export function ShareVaultCreated({ vaultName, whale, amount }: { vaultName: string; whale: string; amount: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://endaoment.app";
  const frameUrl = `${baseUrl}/api/frames/vault-created?name=${encodeURIComponent(vaultName)}&whale=${encodeURIComponent(whale)}&amount=${encodeURIComponent(amount)}`;
  const text = `🏦 I just created a new vault: ${vaultName} with ${amount} USDC! Join me in funding students through DeFi yield.`;

  return <FarcasterShareButton frameUrl={frameUrl} text={text} />;
}

export function ShareStudent({
  studentName,
  university,
  research,
  funding,
  studentId,
}: {
  studentName: string;
  university: string;
  research: string;
  funding: string;
  studentId: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://endaoment.app";
  const frameUrl = `${baseUrl}/api/frames/student?name=${encodeURIComponent(studentName)}&university=${encodeURIComponent(university)}&research=${encodeURIComponent(research)}&funding=${encodeURIComponent(funding)}&id=${encodeURIComponent(studentId)}`;
  const text = `🎓 Help fund ${studentName} from ${university}! They're researching ${research}. Support education through Endaoment.`;

  return <FarcasterShareButton frameUrl={frameUrl} text={text} />;
}
