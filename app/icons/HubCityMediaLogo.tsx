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
      <Image src="/logos/hubcitymedia.png" alt="Logo" width={50} height={50} />
    </div>
  );
}
