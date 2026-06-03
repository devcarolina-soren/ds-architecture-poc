import { colors as colorTokens, spacing } from "@ast/primitives";
import type { Meta, StoryObj } from "@storybook/react";

const colors = [
  {
    name: "Primary",
    token: "colors.primary",
    value: colorTokens.primary,
    usage: "Primary actions and highlighted elements"
  },
  {
    name: "Primary Hover",
    token: "colors.primaryHover",
    value: colorTokens.primaryHover,
    usage: "Hover state for primary actions"
  },
  {
    name: "Secondary",
    token: "colors.secondary",
    value: colorTokens.secondary,
    usage: "Secondary actions and supporting elements"
  },
  {
    name: "Secondary Hover",
    token: "colors.secondaryHover",
    value: colorTokens.secondaryHover,
    usage: "Hover state for secondary actions"
  },
  {
    name: "Surface",
    token: "colors.surface",
    value: colorTokens.surface,
    usage: "Main surfaces"
  },
  {
    name: "Surface Muted",
    token: "colors.surfaceMuted",
    value: colorTokens.surfaceMuted,
    usage: "Neutral backgrounds and documentation areas"
  },
  {
    name: "Border",
    token: "colors.border",
    value: colorTokens.border,
    usage: "Borders and dividers"
  },
  {
    name: "Text",
    token: "colors.text",
    value: colorTokens.text,
    usage: "Default text"
  },
  {
    name: "Text Inverse",
    token: "colors.textInverse",
    value: colorTokens.textInverse,
    usage: "Text over dark or colored backgrounds"
  }
];

function ColorsFoundation() {
  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <h1 style={{ margin: 0 }}>Color Tokens</h1>
      <p style={{ margin: 0, maxWidth: "720px" }}>
        Platform-independent primitives exposed by the <code>@ast/primitives</code> package as TypeScript objects.
      </p>

      <div
        style={{
          display: "grid",
          gap: spacing.md,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
        }}
      >
        {colors.map((color) => (
          <article
            key={color.token}
            style={{
              background: colorTokens.surface,
              border: `1px solid ${colorTokens.border}`,
              borderRadius: spacing.sm,
              overflow: "hidden"
            }}
          >
            <div
              aria-label={`${color.name} color swatch`}
              style={{
                background: color.value,
                height: "72px"
              }}
            />
            <div style={{ display: "grid", gap: spacing.xs, padding: spacing.md }}>
              <strong>{color.name}</strong>
              <code>{color.token}</code>
              <code>{color.value}</code>
              <span>{color.usage}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: ColorsFoundation,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof ColorsFoundation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
