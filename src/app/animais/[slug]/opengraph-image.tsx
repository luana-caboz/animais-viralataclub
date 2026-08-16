import { getAnimalBySlug } from "@/modules/animals/services/animal.service";
import { ImageResponse } from "next/og";

export const alt = "Animal para adoção - Vira Lata Club";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;

  const animal = await getAnimalBySlug(slug);

  if (!animal) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          color: "#0f4fb6",
          fontSize: 64,
          fontWeight: 800,
        }}
      >
        Vira Lata Club 🐾
      </div>,
      {
        ...size,
      },
    );
  }

  const foto = animal.fotos?.[0]?.url?.trim();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#edf4ff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* FUNDO */}
      {foto && (
        <img
          src={foto}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(40px)",
            opacity: 0.35,
            transform: "scale(1.15)",
          }}
        />
      )}

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.96) 42%, rgba(255,255,255,0.72) 100%)",
        }}
      />

      {/* CONTEÚDO */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "55px 65px",
          gap: 60,
        }}
      >
        {/* FOTO */}
        <div
          style={{
            width: 430,
            height: 520,
            display: "flex",
            overflow: "hidden",
            borderRadius: 40,
            background: "#cfe7f7",
            boxShadow: "0 20px 45px rgba(15, 79, 182, 0.18)",
          }}
        >
          {foto ? (
            <img
              src={foto}
              alt={animal.nome}
              width={430}
              height={520}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 130,
              }}
            >
              🐶
            </div>
          )}
        </div>

        {/* INFORMAÇÕES */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#f58220",
              marginBottom: 14,
            }}
          >
            🐾 PROCURA UMA FAMÍLIA
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1,
              fontWeight: 900,
              color: "#0f4fb6",
              marginBottom: 28,
            }}
          >
            {animal.nome}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 36,
            }}
          >
            {animal.sexo && (
              <div
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  borderRadius: 999,
                  background: "#dbeafe",
                  color: "#0f4fb6",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                {animal.sexo}
              </div>
            )}

            {animal.porte && (
              <div
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  borderRadius: 999,
                  background: "#ffedd5",
                  color: "#f58220",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                Porte {animal.porte}
              </div>
            )}

            {animal.idadeEstimada && (
              <div
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  borderRadius: 999,
                  background: "#dcfce7",
                  color: "#15803d",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                {animal.idadeEstimada}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              lineHeight: 1.45,
              color: "#475569",
              maxWidth: 500,
            }}
          >
            Conheça minha história e ajude a encontrar uma família. 💛
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 42,
              fontSize: 23,
              fontWeight: 800,
            }}
          >
            <span
              style={{
                color: "#0f4fb6",
              }}
            >
              VIRA LATA
            </span>

            <span
              style={{
                color: "#f58220",
                marginLeft: 7,
              }}
            >
              CLUB
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
