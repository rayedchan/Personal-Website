import Image from "next/image";

export default function ICIMSLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Image src="/logos/icims.svg" alt="Logo" width={40} height={40} />
    </div>
  );
}
