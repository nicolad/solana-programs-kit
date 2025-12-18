"use client";

import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons-react";
import React, { MouseEvent, useState } from "react";
import { Stack, Group, Button, Code } from "@mantine/core";

interface ToastContentProps {
  transactionSignature: string;
  explorerUrl: string;
}

export function ToastContent({
  transactionSignature,
  explorerUrl,
}: ToastContentProps) {
  const [isContentCopied, setIsContentCopied] = useState(false);

  const handleContentCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(transactionSignature);
    setIsContentCopied(true);
    setTimeout(() => setIsContentCopied(false), 500);
  };

  return (
    <Stack gap="xs" mt="xs">
      <Code
        block
        style={{
          fontSize: "11px",
          background: "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(31, 41, 55, 1)",
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        {transactionSignature}
      </Code>
      <Group gap="xs" w="100%">
        <Button
          variant="outline"
          size="xs"
          style={{
            flex: 1,
            background: isContentCopied
              ? "rgba(147, 51, 234, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
            borderColor: isContentCopied
              ? "rgba(147, 51, 234, 0.5)"
              : "rgba(147, 51, 234, 0.3)",
          }}
          onClick={handleContentCopy}
          leftSection={
            isContentCopied ? (
              <IconCheck size={14} color="rgb(74, 222, 128)" />
            ) : (
              <IconCopy size={14} />
            )
          }
        >
          {isContentCopied ? "Copied!" : "Copy Signature"}
        </Button>
        <Button
          variant="outline"
          size="xs"
          style={{
            flex: 1,
            background: "rgba(0, 0, 0, 0.2)",
            borderColor: "rgba(59, 130, 246, 0.3)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(explorerUrl, "_blank");
          }}
          leftSection={<IconExternalLink size={14} />}
        >
          View in Explorer
        </Button>
      </Group>
    </Stack>
  );
}
