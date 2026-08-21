import { formatarData } from "@/lib/slug";
import { HealthCheck } from "@/modules/admin/components/CheckImage";
import { getAnimalBySlug } from "@/modules/animals/services/animal.service";
import { headers } from "next/headers";
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

function resumirHistoria(historia: string | null | undefined, limite = 170) {
  if (!historia) {
    return "Ainda estamos preparando a história deste animal.";
  }

  const texto = historia.trim();

  if (texto.length <= limite) {
    return texto;
  }

  const corte = texto.slice(0, limite);
  const ultimoEspaco = corte.lastIndexOf(" ");

  return `${corte.slice(0, ultimoEspaco)}...`;
}

function getNomeFontSize(nome: string) {
  if (nome.length > 14) return 52;
  if (nome.length > 10) return 58;
  if (nome.length > 7) return 64;

  return 70;
}

export default async function OpenGraphImage({ params }: Props) {
  const headersList = await headers();

  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");

  const protocol =
    headersList.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");

  const logoUrl = host ? `${protocol}://${host}/logo.png` : null;

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
          background: "#fffdf9",
          color: "#0f4fb6",
          fontSize: 64,
          fontWeight: 800,
        }}
      >
        Vira Lata Club
      </div>,
      size,
    );
  }

  const foto = animal.fotos?.[0]?.url?.trim();
  const historia = resumirHistoria(animal.historia);
  const nomeFontSize = getNomeFontSize(animal.nome);

  const dataResgate = animal.dataResgate
    ? formatarData(animal.dataResgate)
    : "Data não informada";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#fffdf9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 38,
          height: 46,
          display: "flex",
          alignItems: "center",
        }}
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt=""
            width={46}
            height={46}
            style={{
              width: 46,
              height: 46,
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: 12,
            }}
          />
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 27,
            fontWeight: 900,
          }}
        >
          <span style={{ color: "#0f4fb6" }}>VIRA LATA</span>

          <span
            style={{
              color: "#f58220",
              marginLeft: 8,
            }}
          >
            CLUB
          </span>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div
        style={{
          position: "absolute",
          top: 88,
          left: 38,
          right: 38,
          bottom: 30,
          display: "flex",
          gap: 44,
        }}
      >
        {/* FOTO */}
        <div
          style={{
            width: 455,
            height: "100%",
            display: "flex",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            borderRadius: 32,
            background: "#cfe7f7",
            boxShadow: "0 14px 30px rgba(15,79,182,0.12)",
          }}
        >
          {foto ? (
            <img
              src={foto}
              alt={animal.nome}
              width={455}
              height={512}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 42%",
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

          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              display: "flex",
              alignItems: "center",
              padding: "11px 20px",
              borderRadius: 999,
              background: "#f58220",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              boxShadow: "0 8px 20px rgba(0,0,0,0.14)",
            }}
          >
            🏠 Procuro uma família
          </div>
        </div>

        {/* INFO */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* NOME */}
          <div
            style={{
              display: "flex",
              color: "#0f4fb6",
              fontSize: nomeFontSize,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: "-2px",
            }}
          >
            {animal.nome}
          </div>

          {/* CHIPS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 18,
            }}
          >
            {animal.sexo && (
              <div
                style={{
                  display: "flex",
                  padding: "9px 17px",
                  borderRadius: 999,
                  background: "#dcecff",
                  color: "#0f4fb6",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {animal.sexo}
              </div>
            )}

            {animal.porte && (
              <div
                style={{
                  display: "flex",
                  padding: "9px 17px",
                  borderRadius: 999,
                  background: "#fff0dd",
                  color: "#f58220",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Porte {animal.porte}
              </div>
            )}

            {animal.idadeEstimada && (
              <div
                style={{
                  display: "flex",
                  padding: "9px 17px",
                  borderRadius: 999,
                  background: "#dcf8e8",
                  color: "#15803d",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {animal.idadeEstimada}
              </div>
            )}
          </div>

          {/* DESDE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 25,
              padding: "17px 20px",
              borderRadius: 22,
              background: "linear-gradient(90deg, #f2f7ff 0%, #fff7ef 100%)",
              color: "#475569",
              fontSize: 18,
            }}
          >
            <span
              style={{
                display: "flex",
                marginRight: 8,
              }}
            >
              🏡
            </span>

            <span
              style={{
                display: "flex",
              }}
            >
              Procurando uma família desde&nbsp;
              <strong>{dataResgate}</strong>
            </span>
          </div>

          {/* HISTÓRIA */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 22,
              padding: "22px 24px",
              borderRadius: 28,
              background: "#ffffff",
              border: "1px solid #eef1f5",
              boxShadow: "0 10px 22px rgba(15, 23, 42, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#0f4fb6",
                fontSize: 23,
                fontWeight: 800,
              }}
            >
              <span
                style={{
                  display: "flex",
                  marginRight: 10,
                  color: "#0f4fb6",
                  fontSize: 25,
                }}
              >
                🐾
              </span>
              Conheça {animal.sexo === "Fêmea" ? "a" : "o"} {animal.nome}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 15,
                color: "#475569",
                fontSize: 19,
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              {historia}
            </div>

              {/* DIVISOR */}
<div
  style={{
    width: "100%",
    height: 1,
    display: "flex",
    marginTop: 18,
    background: "#edf1f5",
  }}
/>

{/* SAÚDE */}
<div
  style={{
    display: "flex",
    width: "100%",
    gap: 12,
    marginTop: 14,
  }}
>
  {animal.vacinado && (
    <HealthCheck>
      {animal.sexo === "Fêmea" ? "Vacinada" : "Vacinado"}
    </HealthCheck>
  )}

  {animal.castrado && (
    <HealthCheck>
      {animal.sexo === "Fêmea" ? "Castrada" : "Castrado"}
    </HealthCheck>
  )}

  {animal.vermifugado && (
    <HealthCheck>
      {animal.sexo === "Fêmea" ? "Vermifugada" : "Vermifugado"}
    </HealthCheck>
  )}
</div>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
