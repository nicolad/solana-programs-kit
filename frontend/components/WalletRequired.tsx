import { Paper, Title, Text, Stack, Button } from "@mantine/core";
import { IconWallet } from "@tabler/icons-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface WalletRequiredProps {
  programName?: string;
  message?: string;
}

export function WalletRequired({
  programName = "this program",
  message,
}: WalletRequiredProps) {
  const { setVisible } = useWalletModal();

  return (
    <Paper
      p="xl"
      radius="md"
      withBorder
      style={{
        backgroundColor: "rgba(30, 30, 46, 0.7)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(88, 91, 112, 0.3)",
        textAlign: "center",
      }}
    >
      <Stack gap="md" align="center">
        <IconWallet
          size={48}
          style={{ color: "rgb(180, 190, 254)", opacity: 0.6 }}
        />
        <Title order={3}>Wallet Required</Title>
        <Text c="dimmed" size="sm">
          {message || `Connect your wallet to interact with ${programName}`}
        </Text>
        <Button
          onClick={() => setVisible(true)}
          size="md"
          leftSection={<IconWallet size={20} />}
        >
          Connect Wallet
        </Button>
      </Stack>
    </Paper>
  );
}

export default WalletRequired;
