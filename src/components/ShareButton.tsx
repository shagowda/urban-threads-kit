import { useState } from "react";
import { Share2, Facebook, Twitter, MessageCircle, Copy, Check } from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButton({ url, title, description }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const shareText = `${title}${description ? ` - ${description}` : ""}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url,
        });
      } catch (err) {
        // Fallback to manual sharing
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
        aria-label="Share product"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-lg shadow-lg p-3 z-10 min-w-48">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 p-2 hover:bg-muted rounded text-sm"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>

            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded text-sm"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="h-4 w-4 text-green-500" />
              WhatsApp
            </a>

            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded text-sm"
              onClick={() => setOpen(false)}
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              Facebook
            </a>

            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded text-sm"
              onClick={() => setOpen(false)}
            >
              <Twitter className="h-4 w-4 text-blue-400" />
              Twitter
            </a>
          </div>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}