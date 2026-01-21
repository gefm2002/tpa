interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionTitle = ({ title, subtitle, align = "left" }: SectionTitleProps) => (
  <div className={`mb-6 ${align === "center" ? "text-center" : "text-left"}`}>
    <p className="text-xs uppercase tracking-[0.3em] text-accent/80">{subtitle}</p>
    <h2 className="mt-3 text-2xl font-semibold text-soft-white md:text-4xl">
      {title}
    </h2>
  </div>
);

export default SectionTitle;
