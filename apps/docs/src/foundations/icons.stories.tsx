import { iconNames } from "@ast/icons";
import arrowRightIcon from "@ast/icons/arrow-right.svg";
import closeIcon from "@ast/icons/close.svg";
import searchIcon from "@ast/icons/search.svg";
import { colors, spacing } from "@ast/tokens";
import type { Meta, StoryObj } from "@storybook/react";

const iconSources = {
  "arrow-right": arrowRightIcon,
  close: closeIcon,
  search: searchIcon
} as const;

const icons = iconNames.map((iconName) => ({
  file: `${iconName}.svg`,
  name: iconName,
  src: iconSources[iconName]
}));

function IconsFoundation() {
  return (
    <div style={{ display: "grid", gap: spacing.md }}>
      <h1 style={{ margin: 0 }}>Icon Assets</h1>
      <p style={{ margin: 0, maxWidth: "720px" }}>
        Plain SVG files owned by the <code>@ast/icons</code> package. The package exposes both a typed catalog and
        explicit SVG subpath exports; the consuming platform decides how to load and render them.
      </p>

      <div style={{ display: "grid", gap: spacing.md, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {icons.map((icon) => (
          <article
            key={icon.name}
            style={{
              alignItems: "center",
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: spacing.sm,
              display: "grid",
              gap: spacing.sm,
              justifyItems: "center",
              padding: spacing.md,
              textAlign: "center"
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: colors.surfaceMuted,
                borderRadius: "999px",
                color: colors.text,
                display: "flex",
                height: "56px",
                justifyContent: "center",
                width: "56px"
              }}
            >
              <img alt="" aria-hidden="true" src={icon.src} style={{ height: spacing.lg, width: spacing.lg }} />
            </div>
            <code>{icon.name}</code>
            <span>{icon.file}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Icons",
  component: IconsFoundation,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof IconsFoundation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
