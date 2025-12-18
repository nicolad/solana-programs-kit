"use client";

import { useState } from "react";
import { AppShell, NavLink, Text, Group, Box } from "@mantine/core";
import { IconHome, IconTransfer, IconPlus } from "@tabler/icons-react";

interface Program {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export function ProgramSidebar({
  programs,
  activeProgram,
  onProgramChange,
}: {
  programs: Program[];
  activeProgram: string;
  onProgramChange: (id: string) => void;
}) {
  return (
    <Box p="md">
      <Text size="xs" fw={700} c="dimmed" mb="md">
        DEPLOYED PROGRAMS
      </Text>
      {programs.map((program) => (
        <NavLink
          key={program.id}
          active={activeProgram === program.id}
          label={program.name}
          description={program.description}
          leftSection={program.icon}
          onClick={() => onProgramChange(program.id)}
          mb="xs"
          styles={{
            root: {
              borderRadius: "8px",
              "&[data-active]": {
                background: "rgba(180, 190, 254, 0.12)",
                borderLeft: "3px solid rgb(180, 190, 254)",
              },
              "&:hover": {
                background: "rgba(88, 91, 112, 0.2)",
              },
            },
          }}
        />
      ))}

      <Text size="xs" fw={700} c="dimmed" mt="xl" mb="md">
        ACTIONS
      </Text>
      <NavLink
        label="Deploy New Program"
        description="From inspiration folder"
        leftSection={<IconPlus size={18} />}
        styles={{
          root: {
            borderRadius: "8px",
            opacity: 0.6,
          },
        }}
      />
    </Box>
  );
}
