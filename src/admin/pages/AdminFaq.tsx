import { useMemo, useState } from "react";
import type { FaqItem } from "../../types";
import { getSnapshot, saveSnapshot } from "../../utils/storage";
import Modal from "../../components/Modal";
import Card from "../../components/Card";
import Button from "../../components/Button";
import OrderControls from "../components/OrderControls";
import { faqSchema } from "../validators/faq";

const buildEmptyForm = (order: number) => ({
  question: "",
  answer: "",
  isActive: true,
  order,
});

type FaqFormState = ReturnType<typeof buildEmptyForm> & { id?: string };

const AdminFaq = () => {
  const snapshot = getSnapshot();
  const [faqs, setFaqs] = useState<FaqItem[]>(snapshot.faqs);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FaqFormState>(buildEmptyForm(faqs.length + 1));
  const [errors, setErrors] = useState<string[]>([]);

  const sorted = useMemo(() => [...faqs].sort((a, b) => a.order - b.order), [faqs]);

  const sync = (next: FaqItem[]) => {
    const updated = { ...getSnapshot(), faqs: next };
    saveSnapshot(updated);
    setFaqs(next);
  };

  const openCreate = () => {
    setForm(buildEmptyForm(faqs.length + 1));
    setErrors([]);
    setIsOpen(true);
  };

  const openEdit = (faq: FaqItem) => {
    setForm({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
      order: faq.order,
    });
    setErrors([]);
    setIsOpen(true);
  };

  const handleSave = () => {
    const parsed = faqSchema.safeParse({ question: form.question, answer: form.answer });
    if (!parsed.success) {
      setErrors(parsed.error.issues.map((issue) => issue.message));
      return;
    }

    const now = Date.now();
    const faqData: FaqItem = {
      id: form.id ?? `faq-${now}`,
      question: form.question,
      answer: form.answer,
      isActive: form.isActive,
      order: form.order,
    };

    const next = form.id ? faqs.map((item) => (item.id === form.id ? faqData : item)) : [...faqs, faqData];
    sync(next);
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Querés borrar esta FAQ?")) return;
    sync(faqs.filter((faq) => faq.id !== id));
  };

  const move = (index: number, direction: number) => {
    const updated = [...sorted];
    const target = index + direction;
    if (target < 0 || target >= updated.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    sync(updated.map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-soft-white">FAQs</h2>
        <Button onClick={openCreate}>Crear FAQ</Button>
      </div>
      <div className="space-y-4">
        {sorted.map((faq, index) => (
          <Card key={faq.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-soft-white">{faq.question}</h3>
                <p className="text-sm text-neutral-300">{faq.answer}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => openEdit(faq)}>
                  Editar
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(faq.id)}>
                  Borrar
                </Button>
                <OrderControls onUp={() => move(index, -1)} onDown={() => move(index, 1)} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="FAQ">
        <div className="space-y-4">
          {errors.length ? (
            <div className="rounded-xl border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Pregunta</label>
            <input
              className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
              value={form.question}
              onChange={(event) => setForm((prev) => ({ ...prev, question: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Respuesta</label>
            <textarea
              className="min-h-[100px] w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
              value={form.answer}
              onChange={(event) => setForm((prev) => ({ ...prev, answer: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Activo</label>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminFaq;
