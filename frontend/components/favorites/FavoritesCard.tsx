"use client";

import { useState } from "react";
import {
  Card,
  TextInput,
  Button,
  Stack,
  Group,
  Text,
  Badge,
  ActionIcon,
  Pill,
} from "@mantine/core";
import { IconHeart, IconPlus, IconX } from "@tabler/icons-react";
import { useFavorites } from "./hooks/useFavorites";

export function FavoritesCard() {
  const {
    favorites,
    isLoading,
    connected,
    setFavorites: saveFavorites,
  } = useFavorites();

  const [number, setNumber] = useState("");
  const [color, setColor] = useState("");
  const [hobbyInput, setHobbyInput] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddHobby = () => {
    if (hobbyInput.trim() && hobbies.length < 5) {
      setHobbies([...hobbies, hobbyInput.trim()]);
      setHobbyInput("");
    }
  };

  const handleRemoveHobby = (index: number) => {
    setHobbies(hobbies.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!number || !color) return;

    setIsSaving(true);
    try {
      await saveFavorites(BigInt(number), color, hobbies);
      // Optionally reset form
    } catch (error) {
      console.error("Failed to save favorites:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!connected) {
    return (
      <Card
        shadow="xl"
        radius="lg"
        p="xl"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(75, 85, 99, 0.3)",
        }}
      >
        <Text ta="center" c="dimmed">
          Connect your wallet to set your favorites
        </Text>
      </Card>
    );
  }

  return (
    <Card
      shadow="xl"
      radius="lg"
      p="xl"
      style={{
        background: "rgba(17, 24, 39, 0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(75, 85, 99, 0.3)",
        minWidth: "400px",
      }}
    >
      <Stack gap="lg">
        <Group justify="space-between">
          <Text size="xl" fw={700} style={{ color: "rgb(168 85 247)" }}>
            <IconHeart size={24} style={{ verticalAlign: "middle", marginRight: 8 }} />
            My Favorites
          </Text>
          {favorites && (
            <Badge color="green" variant="light">
              Saved
            </Badge>
          )}
        </Group>

        {isLoading ? (
          <Text c="dimmed" ta="center">
            Loading...
          </Text>
        ) : favorites ? (
          <Stack gap="md" p="md" style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8 }}>
            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Favorite Number
              </Text>
              <Text size="lg" fw={600}>
                {favorites.number.toString()}
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Favorite Color
              </Text>
              <Text size="lg" fw={600} style={{ color: favorites.color }}>
                {favorites.color}
              </Text>
            </div>
            {favorites.hobbies.length > 0 && (
              <div>
                <Text size="sm" c="dimmed" mb={8}>
                  Hobbies
                </Text>
                <Group gap="xs">
                  {favorites.hobbies.map((hobby, i) => (
                    <Pill key={i}>{hobby}</Pill>
                  ))}
                </Group>
              </div>
            )}
          </Stack>
        ) : null}

        <Stack gap="md">
          <TextInput
            label="Favorite Number"
            placeholder="42"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <TextInput
            label="Favorite Color"
            placeholder="purple"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <div>
            <Text size="sm" mb={8}>
              Hobbies (max 5)
            </Text>
            <Group gap="xs" mb="xs">
              {hobbies.map((hobby, i) => (
                <Pill
                  key={i}
                  withRemoveButton
                  onRemove={() => handleRemoveHobby(i)}
                >
                  {hobby}
                </Pill>
              ))}
            </Group>
            <Group gap="xs">
              <TextInput
                placeholder="Add a hobby"
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddHobby()}
                style={{ flex: 1 }}
                disabled={hobbies.length >= 5}
              />
              <ActionIcon
                onClick={handleAddHobby}
                disabled={!hobbyInput.trim() || hobbies.length >= 5}
                size="lg"
                variant="light"
              >
                <IconPlus size={18} />
              </ActionIcon>
            </Group>
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={handleSave}
            loading={isSaving}
            disabled={!number || !color}
            gradient={{ from: "violet", to: "blue", deg: 90 }}
            variant="gradient"
          >
            Save Favorites
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
