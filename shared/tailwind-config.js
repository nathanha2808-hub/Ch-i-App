// =============================================
// Chị Ơi! — Shared Tailwind Config
// Dùng chung cho tất cả trang (giupviec + khachhang)
// =============================================
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "error-container": "#ffdad6",
        "inverse-on-surface": "#ffede6",
        "secondary": "#895032",
        "on-tertiary": "#ffffff",
        "on-primary-container": "#642600",
        "on-tertiary-fixed": "#001f28",
        "on-tertiary-fixed-variant": "#004d61",
        "on-surface": "#241914",
        "surface-container-highest": "#f4ded5",
        "primary-container": "#ff7e36",
        "tertiary-container": "#00b1da",
        "on-background": "#241914",
        "tertiary-fixed": "#b8eaff",
        "primary": "#a04100",
        "secondary-fixed": "#ffdbcc",
        "on-secondary-container": "#794226",
        "surface-variant": "#f4ded5",
        "background": "#fff8f6",
        "surface-bright": "#fff8f6",
        "surface-tint": "#a04100",
        "outline-variant": "#dfc0b3",
        "error": "#ba1a1a",
        "on-primary-fixed": "#351000",
        "tertiary": "#006780",
        "outline": "#8b7266",
        "on-primary-fixed-variant": "#7a3000",
        "on-surface-variant": "#584238",
        "surface-container-low": "#fff1eb",
        "primary-fixed-dim": "#ffb693",
        "on-secondary": "#ffffff",
        "surface-container-high": "#fae4da",
        "surface": "#fff8f6",
        "surface-dim": "#ecd6cc",
        "inverse-primary": "#ffb693",
        "on-tertiary-container": "#003f4f",
        "inverse-surface": "#3b2e28",
        "on-error": "#ffffff",
        "surface-container": "#ffeae1",
        "primary-fixed": "#ffdbcc",
        "tertiary-fixed-dim": "#52d5ff",
        "on-secondary-fixed": "#351000",
        "on-secondary-fixed-variant": "#6d391d",
        "secondary-fixed-dim": "#ffb693",
        "secondary-container": "#feb28e",
        "on-error-container": "#93000a",
        "surface-container-lowest": "#ffffff",
        "on-primary": "#ffffff"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "xl": "32px",
        "xs": "4px",
        "md": "16px",
        "lg": "24px",
        "container-padding": "16px",
        "sm": "8px",
        "stack-gap": "12px",
        "base": "4px"
      },
      "fontFamily": {
        "label-caps": ["Be Vietnam Pro"],
        "headline-md": ["Be Vietnam Pro"],
        "display-lg": ["Be Vietnam Pro"],
        "body-lg": ["Be Vietnam Pro"],
        "title-sm": ["Be Vietnam Pro"],
        "body-sm": ["Be Vietnam Pro"]
      },
      "fontSize": {
        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "700"}],
        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "display-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "title-sm": ["18px", {"lineHeight": "24px", "fontWeight": "600"}],
        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
        "label-sm": ["11px", {"lineHeight": "16px", "fontWeight": "500"}]
      }
    }
  }
}
