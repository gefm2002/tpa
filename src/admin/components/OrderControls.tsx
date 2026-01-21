interface OrderControlsProps {
  onUp: () => void;
  onDown: () => void;
}

const OrderControls = ({ onUp, onDown }: OrderControlsProps) => (
  <div className="flex gap-2">
    <button className="rounded-full border border-white/20 px-2 py-1 text-xs" onClick={onUp}>
      ↑
    </button>
    <button className="rounded-full border border-white/20 px-2 py-1 text-xs" onClick={onDown}>
      ↓
    </button>
  </div>
);

export default OrderControls;
