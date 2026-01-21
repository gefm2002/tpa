interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionTitle = ({ title, subtitle, align = "left" }: SectionTitleProps) => (
  <div className={`mb-6 ${align === "center" ? "text-center" : "text-left"}`}>
    <p className="text-sm uppercase tracking-[0.2em] text-accent/80">{subtitle}</p>
    <h2 className="mt-2 text-2xl font-semibold text-soft-white md:text-3xl">
      {title}
    </h2>
  </div>
);

export default SectionTitle;
