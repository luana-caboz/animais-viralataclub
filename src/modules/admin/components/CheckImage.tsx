export function HealthCheck({ children }: { children: React.ReactNode }) {
  return (
    <div
 style={{
        flex: 1,
        height: 32,
        display: "flex",
        alignItems: "center",
        color: "#475569",
        fontSize: 16,
        fontWeight: 700,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          minWidth: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 9,
          borderRadius: "50%",
          background: "#dcf8e8",
          position: "relative",
        }}
      >
        <div
           style={{
            position: "absolute",
            width: 9,
            height: 5,
            borderLeft: "2px solid #16a34a",
            borderBottom: "2px solid #16a34a",
            transform: "rotate(-45deg)",
            top: 9,
            left: 3.5,
          }}
        />
      </div>
<div
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
      {children}
      </div>
    </div>
  );
}