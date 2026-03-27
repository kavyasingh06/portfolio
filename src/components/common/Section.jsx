import useFadeIn from "../../hooks/useFadeIn";

export default function Section({ id, children }) {
  const [ref, visible] = useFadeIn();

  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: 1080,
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </section>
  );
}